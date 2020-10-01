import { Request, Response, NextFunction } from "express";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.flash = _flash;

    // put the flash into res.locals
    if (req.session) {
      res.locals.flash = req.session.flashMessages || {};
      req.session.flashMessages = {};
    }

    next();
  }
}

const _flash = (type: string, msg: string, req: Request, res: Response): void => {
  if (type && msg) {
    const messages = (req.session && req.session.flashMessages) ? req.session.flashMessages : {};
    (messages[type] = messages[type] || []).push(msg);
    if(req.session){
      res.locals.flash = messages;
    }
  }
};
