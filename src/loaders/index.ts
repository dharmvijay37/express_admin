import express from 'express';
import expressLoader from './expressLoader';
import Logger from './logger';

export default async (expressApp: express.Application) => {
  await expressLoader(expressApp);
  Logger.info('Express loaded');
};
