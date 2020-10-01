import nodemailer from 'nodemailer';
import ejs from 'ejs';
import config from '../config';

const mailTransporter = nodemailer.createTransport({
  host: config.common.email.smtp.host,
  port: parseInt(config.common.email.smtp.port || '1000'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.common.email.smtp.auth.user,
    pass: config.common.email.smtp.auth.pass
  }
});

export interface MailOptions {
  to: string;
  subject: string;
  data?: GlobalDataObject;
}

export const mailer = {
  sendMail: (mail: MailOptions, templateName: string) => {
    return new Promise((resolve, reject) => {
      return ejs.renderFile(
        `${__dirname}/../../public/views/emailTemplates/${templateName}`,
        {
          userName: mail.data ? mail.data.userName : '',
          appUrl: mail.data ? mail.data.appUrl : ''
        },
        (err, data) => {
          if (err) {
            reject(false);
          } else {
            const mailOptions = {
              from: config.common.email.mailFromEmail,
              to: mail.to,
              subject: mail.subject,
              html: data
            };

            return mailTransporter
              .sendMail(mailOptions)
              .then(() => {
                resolve(true);
              })
              .catch(() => {
                reject(false);
              });
          }
        }
      );
    });
  }
};
