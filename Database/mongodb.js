import mongoose from 'mongoose'
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`${process.env.MONGODB_URI}/EcommerceStore`);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
}
export default connectDB;