// Importa os módulos necessários para o bot do WhatsApp
import * as baileys from "@whiskeysockets/baileys"; // Biblioteca para integrar com o WhatsApp
import { useMultiFileAuthState } from "@whiskeysockets/baileys"; // Hook para gerenciar o estado de autenticação do WhatsApp
import qrcode from "qrcode-terminal"; // Para exibir o QR Code no terminal
import P from "pino"; // Biblioteca para logs detalhados

// Função para inicializar o bot do WhatsApp
export async function startWhatsAppBot() {
  try {
    // Configura o estado de autenticação usando múltiplos arquivos para salvar as credenciais
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");

    // Cria a conexão com o WhatsApp usando o socket
    const sock = baileys.makeWASocket({
      auth: state, // Estado de autenticação
      logger: P({ level: "debug" }), // Define o nível de log como 'debug' para logs detalhados
      printQRInTerminal: true, // Configura para exibir o QR Code no terminal
    });

    // Evento para salvar as credenciais quando forem atualizadas
    sock.ev.on("creds.update", saveCreds);

    // Evento para monitorar o estado da conexão com o WhatsApp
    sock.ev.on("connection.update", (update) => {
      console.log("Estado de conexão:", update);

      const { connection, lastDisconnect } = update;

      // Verifica se a conexão foi fechada e decide se deve tentar reconectar
      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error)?.output?.statusCode !== 401;

        console.log("Conexão fechada. Reconectar:", shouldReconnect);

        if (shouldReconnect) startWhatsAppBot(); // Re-inicia o bot em caso de erro
      } else if (connection === "open") {
        console.log("Conexão estabelecida com sucesso!");
      }
    });

    // Evento para processar mensagens recebidas
    sock.ev.on("messages.upsert", async ({ messages, type }) => {
      if (type === "notify") {
        const msg = messages[0]; // Pega a primeira mensagem
        if (!msg.message) {
          console.error("Erro: Mensagem não contém conteúdo.");
          return; // Se não houver conteúdo na mensagem, sai
        }

        const from = msg.key.remoteJid; // Obtém o número de telefone do remetente
        let text = '';

        // Verifica se a mensagem é do tipo ExtendedTextMessage ou TextMessage
        if (msg.message.extendedTextMessage) {
          text = msg.message.extendedTextMessage.text?.toLowerCase();
        } else if (msg.message.conversation) {
          text = msg.message.conversation?.toLowerCase();
        }

        console.log(`Mensagem de ${from}:`, msg.message); // Loga toda a mensagem recebida
        console.log("Texto extraído:", text); // Loga o texto extraído da mensagem

        try {
          if (!text) {
            console.error("Erro: Texto não encontrado na mensagem.");
            await sock.sendMessage(from, {
              text: "Desculpe, não entendi. Por favor, envie um texto para que eu possa ajudar.",
            });
            return;
          }

          // Verifica se a mensagem contém uma saudação
          const greetings = ["oi", "olá", "bom dia", "boa tarde", "boa noite", "hey", "e aí", "salve"];
          if (greetings.some(greeting => text.includes(greeting))) {
            console.log("Enviando mensagem com botões...");

            // Estrutura da mensagem com botões
            const buttonMessage = {
                buttons: [
                    {
                      buttonId: "ver_produtos",
                      buttonText: { displayText: "Ver Produtos" },
                      type: 1, // Tipo de botão
                    },
                    {
                      buttonId: "falar_suporte",
                      buttonText: { displayText: "Falar com Suporte" },
                      type: 1, // Tipo de botão
                    },
                  ],
                  text: "Olá, seja bem-vindo! Como posso ajudar você?", // Texto da mensagem
                  footer: "", // Removido o footer para simplificar
                  headerType: 1, // Tentando outro tipo de header
                };

            // Loga os botões de forma mais detalhada
            console.log("Estrutura da mensagem com botões:", JSON.stringify(buttonMessage, null, 2));

            try {
              // Verifica se a estrutura dos botões está correta
              if (!buttonMessage.buttons || buttonMessage.buttons.length === 0) {
                console.error("Erro: Nenhum botão definido para a mensagem.");
                return;
              }

              // Envia a mensagem com os botões para o usuário
              await sock.sendMessage(from, buttonMessage);
              console.log("Mensagem com botões enviada com sucesso!");
            } catch (error) {
              console.error("Erro ao enviar mensagem com botões:", error);
            }
          } else {
            console.log("Mensagem não reconhecida.");
            try {
              // Se a mensagem não for uma saudação, responde com uma mensagem padrão
              await sock.sendMessage(from, {
                text: "Desculpe, não entendi. Por favor, escolha uma das opções.",
              });
            } catch (error) {
              console.error("Erro ao enviar mensagem de resposta padrão:", error);
            }
          }
        } catch (error) {
          console.error("Erro ao processar a mensagem:", error);
        }
      }
    });

    // Exibe no console que o bot foi iniciado com sucesso
    console.log("WhatsApp bot iniciado com sucesso.");
  } catch (error) {
    // Se houver um erro ao iniciar o bot, ele é capturado e mostrado no console
    console.error("Erro ao iniciar o WhatsApp bot:", error);
    throw error;
  }
}