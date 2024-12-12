// Importa o módulo Baileys para integrar com o WhatsApp
import * as baileys from "@whiskeysockets/baileys";
// Importa o método de autenticação que utiliza múltiplos arquivos
import { useMultiFileAuthState } from "@whiskeysockets/baileys";
// Importa o módulo para gerar QR Code no terminal
import qrcode from "qrcode-terminal";

// Função responsável por inicializar o bot do WhatsApp
export async function startWhatsAppBot() {
  try {
    // Configura o estado de autenticação, criando ou carregando credenciais
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");

    // Cria o socket de conexão com o WhatsApp
    const sock = baileys.makeWASocket({
      auth: state, // Passa o estado de autenticação para a conexão
      printQRInTerminal: true, // Exibe o QR Code automaticamente no terminal
    });

    // Evento disparado sempre que houver atualização das credenciais
    sock.ev.on("creds.update", saveCreds);

    // Monitora o estado da conexão com o WhatsApp
    sock.ev.on("connection.update", (update) => {
      console.log("Estado de conexão:", update); // Exibe o estado da conexão

      const { connection, lastDisconnect } = update;

      if (connection === "close") {
        // Verifica se a desconexão não foi causada por erro de autenticação
        const shouldReconnect =
          (lastDisconnect?.error)?.output?.statusCode !== 401;

        console.log("Conexão fechada. Reconectar:", shouldReconnect);

        // Tenta reconectar o bot se a desconexão não for causada por erro de autenticação
        if (shouldReconnect) {
          startWhatsAppBot(); // Chama a função recursivamente para tentar reconectar
        } else {
          console.error(
            "Falha na autenticação. Por favor, escaneie o QR code novamente."
          ); // Informa o usuário que é necessário escanear o QR code novamente
        }
      } else if (connection === "open") {
        // Quando a conexão for bem-sucedida
        console.log("Conexão estabelecida com sucesso!");
      }
    });

    // Evento para escutar novas mensagens recebidas
    sock.ev.on("messages.upsert", async ({ messages, type }) => {
      if (type === "notify") {
        const msg = messages[0]; // Pega a primeira mensagem do evento
        if (!msg.message) return; // Ignora mensagens sem conteúdo

        const from = msg.key.remoteJid; // Identifica o remetente da mensagem
        const text = msg.message.conversation; // Extrai o texto da mensagem

        console.log(`Mensagem de ${from}: ${text}`); // Exibe a mensagem no console

        // Lógica para responder à mensagem recebida
        if (text.toLowerCase() === "oi") {
          // Se a mensagem for "oi", responde com "Olá! Como posso ajudar?"
          await sock.sendMessage(from, {
            text: "Olá! Como posso ajudar você?",
          });
        } else {
          // Caso contrário, responde com "Desculpe, não entendi."
          await sock.sendMessage(from, {
            text: "Desculpe, não entendi.",
          });
        }
      }
    });

    // Informa no console que o bot foi iniciado com sucesso
    console.log("WhatsApp bot iniciado com sucesso.");
  } catch (error) {
    // Em caso de erro, exibe uma mensagem no console e propaga o erro para o tratamento posterior
    console.error("Erro ao iniciar o WhatsApp bot:", error);
    throw error;
  }
}
