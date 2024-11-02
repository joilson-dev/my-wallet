import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import { validateUser, validateUserAuth } from '../middlewares/validateUserMiddleware.js';

const auth = Router();

auth.post('/sign-up', validateUser, signUp);
auth.post('/sign-in', validateUserAuth, signIn);

export default auth;