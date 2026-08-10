import mongoose from 'mongoose';

export let isMongoConnected = false;

export const connectDB = async (): Promise<void> => {
  const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/coeta_ecell';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000,
    });
    isMongoConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    isMongoConnected = false;
    console.warn(`[Database Warning] Could not connect to MongoDB (${error.message}).`);
    console.warn(`[Database Warning] Switching to In-Memory Fallback Store for active session testing.`);
  }
};
