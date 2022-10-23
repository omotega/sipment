import { Request, Response } from 'express';
import passport from 'passport';
import User from '../models/usermodel';
import {
  handleError,
  errorResponse,
  successResponse,
} from '../utils//response';

export const signup = async (req: Request, res: Response) => {
  res.json({
    message: 'signup successful',
    user: req.user,
  });
};


export const login = async(req: Request, res:Response) => {
    
}