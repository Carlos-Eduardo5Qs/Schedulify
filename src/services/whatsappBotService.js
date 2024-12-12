import * as baileys from "@whiskeysockets/baileys";
import { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";

export async function startWhatsAppBot() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");

    const sock = baileys.makeWASocket({
      auth: state,
      printQRInTerminal: true, // Exibe o QR Code no terminal
    });

    // Salvar credenciais sempre que forem atualizadas
    sock.ev.on("creds.update", saveCreds);

    // Escuta mensagens recebidas
    sock.ev.on("messages.upsert", async ({ messages, type }) => {
      if (type === "notify") {
        const msg = messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const text = msg.message.conversation;

        console.log(`Mensagem de ${from}: ${text}`);

        // Responder à mensagem
        if (text.toLowerCase() === "oi") {
          await sock.sendMessage(from, { text: "Olá! Como posso ajudar você?" });
        } else {
          await sock.sendMessage(from, { text: "Desculpe, não entendi." });
        }
      }
    });

    console.log("WhatsApp bot iniciado com sucesso.");
  } catch (error) {
    console.error("Erro ao iniciar o WhatsApp bot:", error);
    throw error; // Propaga o erro para ser tratado pelo controlador
  }
}
