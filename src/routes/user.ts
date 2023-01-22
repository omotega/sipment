import { Router } from 'express';

const userRouter = Router();

import { signUp,login } from '../controllers/user';
import { signupValidationMiddleware,loginValidationMiddleware } from '../middleware/validation'

userRouter.route('/signup').post(signupValidationMiddleware,signUp);
userRouter.route('/login').get(loginValidationMiddleware,login);

export default userRouter;
