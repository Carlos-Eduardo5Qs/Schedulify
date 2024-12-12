// Importa e configura o dotenv para carregar variáveis de ambiente do arquivo .env
import dotenv from 'dotenv';
dotenv.config();

// Importa o Express, que é um framework para criar servidores web
import express from 'express';

// Importa o CORS para configurar permissões de acesso entre domínios
import cors from 'cors';

// Importa a configuração personalizada de CORS de outro arquivo
import { CORSconfig } from './src/config/cors.js';

// Importa as rotas definidas no arquivo de roteamento
import { Router } from './src/routes/appRouter.js';

// Classe responsável por configurar e iniciar o servidor
class Server {
  constructor() {
    // Cria uma instância do servidor Express
    this.app = express();

    // Define a porta em que o servidor vai rodar, buscando no arquivo .env ou utilizando a porta padrão 4000
    this.port = process.env.PORT || 4000;
  }

  // Configura o middleware de CORS com as definições importadas
  configureCors () {
    this.app.use(cors(CORSconfig));
  }

  // Configura o middleware para interpretar JSON e dados enviados via formulário no corpo da requisição
  configureBodyParser () {
    this.app.use(express.json()); // Permite interpretar JSON no corpo das requisições
    this.app.use(express.urlencoded({ extended: true })); // Permite interpretar dados codificados como URL
  }

  // Configura as rotas principais do servidor usando o roteador importado
  configureRoutes () {
    this.app.use('/api', Router); // Define que todas as rotas da API devem começar com "/api"
  }

  // Método que inicia o servidor, configurando middlewares e rotas, e depois escutando na porta definida
  startServer () {
    // Configura CORS para permitir ou restringir acessos
    this.configureCors();

    // Configura o middleware para lidar com dados recebidos no corpo da requisição
    this.configureBodyParser();

    // Configura as rotas da API
    this.configureRoutes();

    // Inicia o servidor na porta especificada
    this.app.listen(this.port, () => {
      console.log(`Server running in the port ${this.port}`); // Exibe mensagem no console ao iniciar o servidor
    });
  }
}

// Cria uma nova instância do servidor
const server = new Server();

// Inicia o servidor chamando o método responsável
server.startServer();
