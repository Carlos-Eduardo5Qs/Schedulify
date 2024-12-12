import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { CORSconfig } from './src/config/cors.js';
import { Router } from './src/routes/appRouter.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
  }

  configureCors () {
    this.app.use(cors(CORSconfig));
  }

  configureBodyParser () {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  configureRoutes () {
    this.app.use('/api', Router);
  }

  startServer () {
    this.configureCors();
    this.configureBodyParser();
    this.configureRoutes();

    this.app.listen(this.port, () => {
      console.log(`Server running in the port ${this.port}`);
    });
  }
}

const server = new Server();

server.startServer();
