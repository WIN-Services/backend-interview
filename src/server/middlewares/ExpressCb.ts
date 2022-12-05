import * as express from 'express';
import { Exception } from '../../common/exceptions/Exception';

export type expressCb = (request: express.Request, response: express.Response, next: express.NextFunction) => void;
export type expressErrorCb = (
  error: Exception,
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => void;
export type expressPromiseCb = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => Promise<void>;
