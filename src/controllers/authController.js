import bcrypt from 'bcrypt';
import { getDB } from '../config/db.js';
import { generateToken } from '../config/jwtConfig.js';

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

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const db = getDB();

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    const token = generateToken({ id: user._id, email: user.email });

    res.status(200).json({
      message: 'Autenticação realizada com sucesso.',
      token: `Bearer ${token}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro ao tentar autenticar o usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor. Tente novamente mais tarde.' });
  }
}