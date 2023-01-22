import mongoose from 'mongoose';
import { Iuser } from '../utils/interface';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  googleId: { type: String },
  githubId: { type: String },
  facebookId: { type: String },
});


export default mongoose.model<Iuser>('User', userSchema);
