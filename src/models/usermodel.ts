import mongoose from 'mongoose';
import { Iuser } from '../utils/interface';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save',async function(next){
   this.password = await bcrypt.hash(this.password,10);
  next();
})

export default mongoose.model<Iuser>('User', userSchema);
