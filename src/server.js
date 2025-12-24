// src/server.js

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ===============================
// Fix __dirname for ES Modules
// ===============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================
// Load Environment Variables
// ===============================
dotenv.config({
  path: path.join(__dirname, '../config.env'),
});

// ===============================
import app from './app.js';
import { connectDB } from './config/databaseConx.js';

// ===============================
// Environment
// ===============================
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ===============================
// Start Server
// ===============================
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`⚙️ Environment: ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// ===============================
// Process Error Handling
// ===============================
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});
