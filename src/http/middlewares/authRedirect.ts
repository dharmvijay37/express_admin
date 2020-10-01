import { Request, Response, NextFunction } from "express";

export default (checkLogin = true) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (checkLogin && (!req.session || !req.session.user)) {
      req.flash('info', 'Sign in is required to access this page.', req, res);
      return res.redirect('/admin/login');
    }

    if (!checkLogin && req.session && req.session.user) {
      return res.redirect('/admin/dashboard');
    }

    next();
  }
};
