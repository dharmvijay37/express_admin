import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';

import { authRedirect } from '../middlewares';
import AuthService from '../../services/AuthService';
import Logger from '../../loaders/logger';

export default (app: Router) => {
  app.get(['/', '/login'], authRedirect(false), (req: Request, res: Response) => {
    res.render('auth/login.ejs', { title: ' Login Page' });
  });

  app.post(
    '/login',
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .email()
          .required()
          .error(new Error('EMAIL is invalid.')),
        password: Joi.any()
          .required()
          .error(new Error('PASSWORD is invalid.'))
      })
    }),
    (req: Request, res: Response, next: NextFunction) => {
      const email: string = req.body.email,
        password: string = req.body.password;

      const authService = new AuthService();
      authService
        .getAdminByEmailPassword(email, password)
        .then(user => {
          if (req.session) req.session.user = user;
          return res.redirect('/admin/dashboard');
        })
        .catch(error => {
          return next(error);
        });
    }
  );

  app.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
      req.session.destroy((error: Error) => {
        if (error) {
          Logger.error(error.message);
        }
      });
    }
    res.redirect('/admin/login');
  });

  app.get('/forgot-password', (req: Request, res: Response) => {
    res.render('auth/forgot-password.ejs', { title: 'Forgot password' });
  });

  app.post(
    '/forgot-password',
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .email()
          .required()
          .error(new Error('EMAIL is invalid.'))
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const authService = new AuthService();

      authService
        .forgotPassword(req.body.email)
        .then(responseData => {
          if (responseData) {
            req.flash('info', 'Kindly check your email for further instructions.', req, res);
          } else {
            req.flash('error', 'Something went wrong, Please try again.', req, res);
          }
          return res.redirect('forgot-password');
        })
        .catch(error => {
          return next(error);
        });
    }
  );

  app.get('/reset-password/:token', async (req: Request, res: Response, next: NextFunction) => {
    const authService = new AuthService();
    authService.validateToken(req.param('token')).then((responseData) => {
      if (!responseData) {
        req.flash('error', 'Reset password link is expired. Please try again with valid email Id.', req, res);
        return res.redirect('/admin/forgot-password');
      }
      return res.render('auth/reset-password.ejs', { title: 'Reset password', responseData });
    }).catch(error => {
      return next(error);
    });
  });

  app.post('/reset-password',
    celebrate({
      body: Joi.object({
        token: Joi.optional(),
        password: Joi.any().required().error(new Error('PASSWORD is invalid.')),
        confirmPassword: Joi.any().required().error(new Error('RETYPE PASSWORD must match to PASSWORD.'))
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const authService = new AuthService();
      await authService.resetPassword(req.body.token, req.body.password).then(responseData => {
        if (responseData) {
          req.flash('success', 'Password updated successfully.', req, res);
          return res.redirect('/admin/login');
        } else {
          req.flash('error', 'Something went wrong, Please try again.', req, res);
          return res.redirect(`/admin/reset-password/${req.body.token}`);
        }
      }).catch(error => {
        return next(error);
      });
    });
};
