import express from 'express';

import config from './config';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  await require('./loaders').default(app);

  app.listen(parseInt(config.port), (error: Error) => {
    if (error) {
      Logger.error(error);
      process.exit(1);
      return;
    }

    Logger.info(`Server listening on port: ${config.port}`);
  });
}

startServer();
