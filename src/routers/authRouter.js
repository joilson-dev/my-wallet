import { Router } from 'express';
import { signUp } from '../controllers/authController.js';
import { validateUser } from '../middlewares/validateUser.js';

const auth = Router();

auth.post('/sign-up', validateUser, signUp);
// auth.post('/sign-in', signIn);

export default auth;