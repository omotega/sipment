import mongoose from 'mongoose';
import { Iwarehouse } from '../utils/interface';

const warehouseSchema = new mongoose.Schema(
  {
    location: { type: String },
    inventories: { type: [mongoose.Schema.Types.ObjectId], ref: 'Inventory' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Iwarehouse>('Warehouse', warehouseSchema);
