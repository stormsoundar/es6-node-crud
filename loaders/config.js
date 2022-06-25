import dotenv from 'dotenv';

// Load env variables
dotenv.config({ path: './config/env/config.env' });

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET || '';
export const AUTH_TOKEN_EXPIRE = process.env.AUTH_TOKEN_EXPIRE || '1d';
export const MONGO_DB_CONNECTION_URI =
  process.env.MONGO_DB_CONNECTION_URI || '';
