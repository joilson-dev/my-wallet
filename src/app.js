// src/app.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRouter from './routers/authRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/auth', authRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
  }
};

startServer();
