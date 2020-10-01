//TODO : Remove ts-ignore and make definitions for `sequelize-datatable` and fix typescript issues
// @ts-ignore:3
import datatable from 'sequelize-datatable';
import { Router, Request, Response } from 'express';
import User from '../../db/models/user';

import { authRedirect } from '../middlewares/index';
import config from '../../config';

export default (app: Router) => {
  app.get('/users', authRedirect(true), (req: Request, res: Response) => {
    res.render('users/index.ejs', {
      title: 'User list',
      userData: req.session && req.session.user ? req.session.user : null
    });
  });

  app.get('/user/data', authRedirect(true), (req: Request, res: Response) => {
    datatable(User, req.query, { where: { role_id: config.common.role.admin } }).then((result: any) => {
      res.json(result);
    });
  });

  app.get('/:id/delete', authRedirect(true), (req: Request, res: Response) => {
  });
};
