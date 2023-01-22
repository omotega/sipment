import { Request, Response } from 'express';
import model from '../models'
import { errorResponse, handleError, successResponse } from '../utils/response';
import Helper from '../utils/helper';

export async function signUp(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const isUser = await model.User.findOne({ email: email });
    if (isUser) return errorResponse(res, 400, 'User already exists');
    const hash = await Helper.hashPassword(password);
    const user = await  model.User.create({ username, email, password: hash });
    return successResponse(res, 201, 'User created successfully',user);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}
