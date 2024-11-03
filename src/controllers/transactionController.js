import { getDB } from '../config/db.js';
import { transactionSchema } from '../schemas/transactionSchema.js';

export async function addTransaction(req, res) {
    const { value, description, type } = req.body;
    const db = getDB();


    const { error } = transactionSchema.validate({ value, description, type });
    if (error) {
        return res.status(422).json({ message: 'Dados inválidos', details: error.details });
    }

    try {

        const transaction = {
            value,
            description,
            type,
            userId: req.user.id,
            date: new Date(),
        };

        await db.collection('transactions').insertOne(transaction);

        res.status(201).json({ message: 'Transação adicionada com sucesso', transaction });
    } catch (err) {
        console.error('Erro ao adicionar transação:', err);
        res.status(500).json({ message: 'Erro ao adicionar transação' });
    }
}
