import userSchema from "../schemas/userRegistrationSchema.js";

export function validateUser(req, res, next) {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    next();
}
