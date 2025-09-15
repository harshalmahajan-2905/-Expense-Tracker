import mongoose from "mongoose";

let isConnected = false;

export function isDbConnected() {
  return isConnected;
}

export const MONGODB_URI = process.env.MONGODB_URI ?? "";
export const useMemoryStore = !MONGODB_URI;

export async function connectDB() {
  if (useMemoryStore) {
    console.warn("MONGODB_URI not set. Using in-memory store. Data will not persist.");
    return;
  }
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME || undefined,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
