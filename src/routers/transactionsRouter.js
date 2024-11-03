import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { addTransaction } from '../controllers/transactionController.js';
import { validateTransaction } from '../middlewares/transactionsMiddleware.js';

const transactions = Router();

transactions.post('/input-output', authenticateToken, validateTransaction, addTransaction);

export default transactions;