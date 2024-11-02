import userAuthSchema from "../schemas/userAutrhSchema.js";
import userSchema from "../schemas/userRegistrationSchema.js";

export function validateUser(req, res, next) {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    next();
}


export function validateUserAuth(req, res, next) {
    const { error } = userAuthSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json({
            details: error.details.map(err => err.message),
        });
    }

    next();
}