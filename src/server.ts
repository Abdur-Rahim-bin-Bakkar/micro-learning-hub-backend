import dotenv from "dotenv";
import dns from "node:dns/promises";

import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();

// DNS Configuration
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Start Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();