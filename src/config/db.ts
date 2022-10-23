import mongoose from 'mongoose';

const dbConnect = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string );
        console.log(`db connected at ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default dbConnect;