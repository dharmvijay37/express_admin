import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file️.");
}

export default {
  role: {
    admin: 1
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || '1000',
      secure: false, // true for 465, false for other ports
      service: '',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    },
    mailSubject:'Reset password request',
    mailFromName: 'Tatvasoft',
    mailFromEmail: 'harsh.malvi@internal.mail'
  }
};
