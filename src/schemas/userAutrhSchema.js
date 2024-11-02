import Joi from 'joi';

const userAuthSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'O e-mail deve ser um texto.',
            'string.empty': 'O e-mail não pode ser vazio.',
            'string.email': 'O e-mail deve ser um endereço de e-mail válido.',
            'any.required': 'O e-mail é obrigatório.'
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.base': 'A senha deve ser um texto.',
            'string.empty': 'A senha não pode ser vazia.',
            'string.min': 'A senha deve ter pelo menos {#limit} caracteres.',
            'any.required': 'A senha é obrigatória.'
        }),
});

export default userAuthSchema;