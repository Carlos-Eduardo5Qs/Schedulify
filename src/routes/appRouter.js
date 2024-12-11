import express from 'express';
import { appController } from '../controllers/AppController.js';

const router = express.Router();

router.get('/home', appController.getHome);
router.get('/status', appController.getStatus);

export const Router = router;
