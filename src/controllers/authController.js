import bcrypt from 'bcrypt';
import { getDB } from '../config/db.js';

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const db = getDB();

  try {
    const userExists = await db.collection('users').findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'E-mail já registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { name, email, password: hashedPassword };
    await db.collection('users').insertOne(newUser);

    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
}
