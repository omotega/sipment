import mongoose from 'mongoose';
import { Icomment } from '../utils/interface';

const commentSchema = new mongoose.Schema(
  {
    text: { type:String,required:true},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    inventory_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
    comment: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Icomment>('Comment', commentSchema);
