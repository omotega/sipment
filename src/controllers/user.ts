import { Request, Response } from 'express';
import model from '../models';
import { errorResponse, handleError, successResponse } from '../utils/response';
import Helper from '../utils/helper';

export async function signUp(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const isUser = await model.User.findOne({ email: email });
    if (isUser) return errorResponse(res, 400, 'User already exists');
    const hash = await Helper.hashPassword(password);
    const user = await model.User.create({ username, email, password: hash });
    return successResponse(res, 201, 'User created successfully');
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await model.User.findOne({ email: email });
    if (!user) return errorResponse(res, 404, 'user does not exist');
    const isPassword = await Helper.comparePassword(password, user.password);
    if (!isPassword) return errorResponse(res, 400, 'incorrect password');
    const token = await Helper.generateToken({
      _id: user.id,
      username: user.username,
    });
    return successResponse(res, 200, 'User logged in',token);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}
