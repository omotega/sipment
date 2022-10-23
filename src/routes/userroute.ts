import  { Router }  from 'express';
import passport from 'passport'

const userRouter = Router();

import { signup } from '../controllers/usercontroller';

userRouter.route('/signup').post(passport.authenticate("signup",{session:false}),signup);

export default userRouter;

