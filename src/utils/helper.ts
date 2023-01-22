import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

class Helper {
  static async generateToken(payload: any) {
    const token = await jwt.sign(payload, config.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  }

  static async decodeToken(token: any) {
    const payload = await jwt.verify(token, config.JWT_SECRET_KEY);
    return payload;
  }

  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  static async comparePassword(password: string, hashedPassword: string) {
    const isPassword = await bcrypt.compare(password, hashedPassword);
    return isPassword;
  }
}
export default Helper;
