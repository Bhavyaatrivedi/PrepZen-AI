import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/prepzen',
  jwtSecret: process.env.JWT_SECRET || 'CHANGE_ME',
  openAiKey: process.env.OPENAI_API_KEY || ''
};
