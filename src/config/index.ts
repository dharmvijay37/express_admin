import dotenv from 'dotenv';
import server from './server';
import common from './common';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file.");
}

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  server: server,
  common: common,
  port: process.env.PORT || '3000',
  bcryptSalt: 10,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  baseUrl:process.env.APP_URL || 'http://localhost/',
  resetPasswordUri:'admin/reset-password/'
};
