import { transactionSchema } from '../schemas/transactionSchema.js';

export function validateTransaction(req, res, next) {
    const { error } = transactionSchema.validate(req.body);

    if (error) {
        return res.status(422).json({
            message: 'Dados inválidos',
            details: error.details.map((detail) => detail.message),
        });
    }

    next();
}