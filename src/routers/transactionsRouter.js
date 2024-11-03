import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { addTransaction, listTransactions } from '../controllers/transactionController.js';
import { validateTransaction } from '../middlewares/transactionsMiddleware.js';

const transactions = Router();

transactions.post('/input-output', authenticateToken, validateTransaction, addTransaction);
transactions.get('/transactions', authenticateToken, listTransactions);

export default transactions;