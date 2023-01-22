import { Router } from 'express';

const userRouter = Router();

import { signUp } from '../controllers/user';

userRouter.route('/signup').post(signUp);

export default userRouter;
