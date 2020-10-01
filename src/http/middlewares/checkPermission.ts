import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  //NOTE : Its under construction
  //TODO : change name to access control
  //TODO : check user have permissions to access current requested page

  next();
};
