import mongoose from "mongoose";
interface ConnectionError extends Error {
    message: string;
}
const connectDB =async (): Promise<void> => {
    if (mongoose.connections[0].readyState) {
        console.log('Already connected to MongoDB');
        return;
    }
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        const typedError = error as ConnectionError;
        console.error('MongoDB connection error:', typedError.message);
        throw new Error('Database connection failed');;
    }
};

export default connectDB;
