import { Request, Response, NextFunction } from "express";
import { InternalException } from "../exceptions/internal.exception";
import { HttpException, ApiErrorCode } from "../exceptions/http.exception";

export const errorHandler = (method: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await method(req, res, next);
  } catch (error) {
    let exception: HttpException
    if (HttpException.prototype.isPrototypeOf(error)) {
      exception = error;
    } else {
      exception = new InternalException("Something went wrong...", ApiErrorCode.UNKNOWN, error);
    }
    console.error(error);
    res.status(exception.statusCode).json({
      message: exception.message,
      code: exception.errorCode,
      meta: exception.meta,
      errors: exception.errors
    });
  }
}