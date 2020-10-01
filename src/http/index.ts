import { Router } from 'express';

import dashboard from './routes/dashboard';
import auth from './routes/auth';
import user from './routes/user';

export default () => {
  const router = Router();
  auth(router);
  dashboard(router);
  user(router);
 return router;
};
