import mongoose from 'mongoose';
import config from './config';

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log(`db connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnect;
