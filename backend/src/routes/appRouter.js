// Importa o Express para criar e gerenciar rotas
import express from 'express';

// Importa o controlador da aplicação, responsável por gerenciar as rotas gerais
import { appController } from '../controllers/AppController.js';

// Importa o controlador do WhatsApp, responsável por gerenciar funcionalidades do bot
import { whatsappController } from '../controllers/WhatsAppController.js';

// Cria um roteador do Express para definir as rotas do aplicativo
const router = express.Router();

// Rota inicial para testar se a API está funcionando
// Responde com uma mensagem básica configurada no appController
router.get('/home', appController.getHome);

// Rota para verificar o status da API
// Responde com um status em JSON, indicando que o servidor está funcionando
router.get('/status', appController.getStatus);

// Rota para iniciar o bot do WhatsApp
// Aceita requisições POST e chama o método `startBot` do whatsappController
router.post("/start-bot", whatsappController.startBot);

// Exporta o roteador para ser usado no servidor principal
export const Router = router;
