// Importa o serviço responsável pela lógica de inicialização do bot do WhatsApp
import { startWhatsAppBot } from "../services/whatsappBotService.js";

class WhatsAppController {
  // Método para inicializar o bot do WhatsApp
  async startBot(req, res) {
    try {
      // Chama o serviço para inicializar o bot
      await startWhatsAppBot();
      
      // Envia uma resposta de sucesso ao cliente, indicando que o bot foi inicializado
      res.status(200).json({ message: "Bot inicializado com sucesso!" });
    } catch (error) {
      // Loga o erro no console para facilitar o debug
      console.error("Erro ao iniciar o WhatsApp bot: ", error);

      // Envia uma resposta de erro ao cliente, informando que ocorreu um problema
      res.status(500).json({ error: "Erro ao iniciar o WhatsApp bot" });
    }
  }
}

// Exporta uma instância do controlador para ser usado nas rotas
export const whatsappController = new WhatsAppController();
