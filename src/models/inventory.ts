import mongoose from 'mongoose';
import { Inventory } from '../utils/interface';

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: String, required: true },
  stockNumber: { type: Number, required: true },
  stockPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
},{
  timestamps:true,
});

export default mongoose.model<Inventory>('Inventory', inventorySchema);
