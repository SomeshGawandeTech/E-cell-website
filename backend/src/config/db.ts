import mongoose from 'mongoose';
import dns from 'dns';
import { seedDatabase } from './seed';

export let isMongoConnected = false;

export const connectDB = async (): Promise<void> => {
  // Use public DNS servers for resolving MongoDB Atlas SRV records on Windows
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {}

  const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/coeta_ecell';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 10000,
    });
    isMongoConnected = true;
    console.log(`\n🎉 [Database Success] MongoDB Atlas Connected: ${conn.connection.host}`);
    await seedDatabase();
  } catch (error: any) {
    isMongoConnected = false;
    console.warn(`\n[Database Warning] Could not connect to MongoDB (${error.message}).`);
    console.warn(`[Database Warning] Switching to In-Memory Fallback Store for active session testing.\n`);
  }
};
