import { Request, Response, NextFunction } from 'express';
import Helper from '../utils/helper';
import model from '../models';
import { errorResponse, handleError } from '../utils/response';

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded:any = await Helper.decodeToken(token);
      const user = await model.User.findById(decoded._id);
      if (!user) return errorResponse(res, 404, 'User not found');
      req.User = decoded;
      console.log(req.User);
      return next();
    } else {
      errorResponse(res, 403, 'incorrect validation');
    }
  } catch (error: any) {
    handleError(req, error);
    return errorResponse(res, 500, error.message);
  }
}
