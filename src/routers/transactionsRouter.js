import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { addTransaction, deleteTransaction, listTransactions, updateTransaction } from '../controllers/transactionController.js';
import { validateTransaction } from '../middlewares/transactionsMiddleware.js';
import { validateObjectId } from '../middlewares/validateObjectIdMiddlewares.js';

const transactions = Router();

transactions.post('/input-output', authenticateToken, validateTransaction, addTransaction);
transactions.get('/', authenticateToken, listTransactions);
transactions.put('/:id', authenticateToken, validateObjectId, validateTransaction, updateTransaction);
transactions.delete('/:id', authenticateToken, validateObjectId, deleteTransaction);

export default transactions;