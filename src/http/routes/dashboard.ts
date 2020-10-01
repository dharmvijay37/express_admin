import { Router, Request, Response } from 'express';
import { authRedirect } from '../middlewares/index';

export default (app: Router) => {
  app.get('/dashboard', authRedirect(true), (req: Request, res: Response) => {
    res.render('dashboard/index.ejs', {
      title: ' Dashboard',
      userData: req.session && req.session.user ? req.session.user : null
    });
  });
};
