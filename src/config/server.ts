import dotenv from 'dotenv';
const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env file.");
}
export default {
  session: {
    key: process.env.SESSION_KEY || 'myadmin'
  }
};
