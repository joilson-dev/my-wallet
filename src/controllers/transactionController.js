import { ObjectId } from 'mongodb';
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

export async function listTransactions(req, res) {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;

    if (page <= 0) {
        return res.status(400).json({ message: 'Invalid page number. It should be a positive integer.' });
    }

    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const db = getDB();

        const transactions = await db.collection('transactions')
            .find({ userId })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();

        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'An error occurred while fetching transactions.' });
    }
}

export async function updateTransaction(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedData = req.body;

    const db = getDB();

    const existingTransaction = await db.collection('transactions').findOne({
        _id: new ObjectId(id),
        userId: userId
    });

    if (!existingTransaction) {
        return res.status(404).json({ message: 'Transação não encontrada ou não autorizada.' });
    }

    const result = await db.collection('transactions').findOneAndUpdate(
        { _id: new ObjectId(id), userId: userId },
        { $set: updatedData },
        { returnDocument: 'after' }
    );

    if (!result.value) {
        return res.status(404).json({ message: 'Erro ao atualizar a transação.' });
    }

    return res.sendStatus(204)
}