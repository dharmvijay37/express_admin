import User from '../db/models/user';
import config from '../config';
import { CustomError } from './ErrorService';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcryptjs';
import { mailer } from '../helpers/mailer';
import bcryptjs from 'bcryptjs';

export default class AuthService {
  constructor() {}

  async getAdminByEmailPassword(email: string, password: string): Promise<User> {
    return User.findOne({ where: { email: email, role_id: config.common.role.admin } })
      .then(user => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
          throw new CustomError('Email and password seems invalid!');
        }
        return user;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  forgotPassword(email: string): Promise<boolean> {
    return Promise.resolve()
      .then(() => {
        return User.findOne({ where: { email: email } });
      })
      .then(UserObject => {
        if (!UserObject) {
          throw new CustomError('Invalid email address!');
        }

        UserObject.forgot_password_token = uuidv4();
        return UserObject.save().then(result => {
          const mailOption = {
            to: email,
            subject: config.common.email.mailSubject,
            data: {
              appUrl: config.baseUrl + config.resetPasswordUri + UserObject.forgot_password_token,
              userName: UserObject.first_name + ' ' + UserObject.last_name
            }
          };
          return mailer
            .sendMail(mailOption, 'forgot_password_email.ejs')
            .then(() => {
              return true;
            })
            .catch(error => {
              return false;
            });
        });
      })
      .catch(err => {
        throw err;
      });
  }

  validateToken(token: string): Promise<User> {
    return User.findOne({ where: { forgot_password_token: token } });
  }

  resetPassword(token: string, password: string): Promise<boolean> {
    return User.update(
      { password: bcryptjs.hashSync(password, config.bcryptSalt), forgot_password_token: null },
      {where: { forgot_password_token: token }}
    )
      .then(updateStatus => {
        if (updateStatus && updateStatus[0] > 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        throw new CustomError('Reset password token is invalid or has expired.');
      });
  }
}
