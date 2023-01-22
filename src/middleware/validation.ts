import { Request, Response, NextFunction } from 'express';
import {
  errorResponse,
  handleError,
  validationErrors,
} from '../utils/response';
import validation from '../validation';

export function signupValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const payload = req.body;
  try {
    const validate = validation.signUpValidation(payload);
    if (validate.error)
      return validationErrors(res, 406, validate.error.details[0].message);
    next();
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Something Happened');
  }
}
