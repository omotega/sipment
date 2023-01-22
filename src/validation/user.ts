import joi from 'joi';
import { Iuser } from '../utils/interface';

export function signUpValidation(user: Iuser) {
  const scheme = joi.object({
    username: joi.string().min(6).max(25).required(),
    email: joi.string().email().required(),
    password:joi.string().min(6).max(25).required(),
  });
  return scheme.validate(user);
}
