import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import ApiError from "../helper/classes/api-error";
import HttpException from "../helper/classes/http-exception";
import logger from "../helper/logger";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message, {
    tags: "http",
    additionalInfo: error ?? {},
  });
  const status = error.statusCode || error.status || 500;

  // check if response has already been sent
  if (response.headersSent) {
    console.error("[Error] Sent already:", error);
    return;
  }

  //check cutom errors
  if (error instanceof ApiError) {
    return response
      .status(error.statusCode())
      .send({ status: error.statusCode(), error: error.msg() });
  }

  // fail safe
  // console.error("[Error] Unhandled:", error);
  response
    .status(status)
    .send({ status, error: "Server failed to process your request" });
};

export const prismaErrorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;

  // for checking prisma errors
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    logger.error(error.message, error);
    return response
      .status(status)
      .send({ status, error: "Server failed to process your request" });
  }

  // transfer to standard error handler
  return next(error);
};
