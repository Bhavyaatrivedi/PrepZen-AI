import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

const PORT = process.env.PORT || config.port;

async function startServer() {
  await mongoose.connect(config.mongoUri);
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`PrepZen backend listening on port ${PORT}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
