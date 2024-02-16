import { NextFunction, Request, Response } from "express";
import logger from "../helper/logger";

/**
 * @param {import("express").Request} req
 */
function requestLogger(req: Request, res: Response, next: NextFunction): void {
  logger.info(`[${req.method}] ${req.originalUrl}`);
  next();
}

export default requestLogger;
