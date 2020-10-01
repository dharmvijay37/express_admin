import { Request, Response } from "express";
import { DataTypeAbstract } from 'sequelize';

declare global {
  export interface GlobalDataObject {
    [key: string]: number | string | {};
  }
}

export type SmtpConfigurationsType = {
  host: string,
  port: string,
  secure: boolean,
  service: string,
  auth: {
    user: string,
    pass: string
  }
}

type SequelizeAttribute = string | DataTypeAbstract;

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute
};


declare module 'express-serve-static-core' {
  export interface Request {
    flash(type: string, message: string, req:Request, res:Response): void;
  }
}
