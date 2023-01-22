import mongoose from 'mongoose';
import { Inventory } from '../utils/interface';

const inventorySchema = new mongoose.Schema({
  stock: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    stockNumber: { type: Number, required: true },
  },
});

export default mongoose.model<Inventory>('Inventory', inventorySchema);
