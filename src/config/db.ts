import { MongoClient, ServerApiVersion, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI is missing in .env");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db;

export const connectDB = async (): Promise<void> => {
  try {
    await client.connect();

    db = client.db("microLearn"); // তোমার Database Name

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export const getDB = (): Db => {
  if (!db) {
    throw new Error("Database is not connected");
  }

  return db;
};