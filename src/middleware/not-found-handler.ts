import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(404).send({ status: 404, error: "Resource not found" });
};
