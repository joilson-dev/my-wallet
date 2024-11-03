import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { addTransaction, listTransactions, updateTransaction } from '../controllers/transactionController.js';
import { validateTransaction } from '../middlewares/transactionsMiddleware.js';
import { validateObjectId } from '../middlewares/validateObjectIdMiddlewares.js';

const transactions = Router();

transactions.post('/input-output', authenticateToken, validateTransaction, addTransaction);
transactions.get('/transactions', authenticateToken, listTransactions);
transactions.put('/transactions/:id', authenticateToken, validateObjectId, validateTransaction, updateTransaction);

export default transactions;