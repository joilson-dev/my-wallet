import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let dbInstance = null;

export async function connectDB() {
  if (dbInstance) {
    console.log("Banco de dados já conectado.");
    return dbInstance;
  }

  try {
    const client = new MongoClient(process.env.CONNECTION_MONGO);
    await client.connect();
    dbInstance = client.db('MyWallet');
    console.log("Conectado ao MongoDB com sucesso.");
    return dbInstance;
  } catch (error) {
    console.error("Falha ao conectar ao MongoDB:", error);
    throw error;
  }
}

export function getDB() {
  if (!dbInstance) {
    throw new Error("Banco de dados não inicializado.");
  }
  return dbInstance;
}
