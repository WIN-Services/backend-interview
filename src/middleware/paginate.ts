import { NextFunction, Request, Response } from "express";
import ApiError from "../helper/classes/api-error";

export interface Pagination {
  limit: number;
  offset: number;
  page: number;
  size: number;
}

declare module "express-serve-static-core" {
  interface Request {
    pagination: Pagination;
  }
}

export const paginate = (req: Request, res: Response, next: NextFunction) => {
  const { page, size } = req.query;

  if ((page && isNaN(+page)) || (size && isNaN(+size))) {
    throw new ApiError("pagination values, page and size must be numbers");
  }

  const limit = size ? +size : 10;
  const offset = page ? +page * limit : 0;

  req.pagination = {
    limit,
    offset,
    page: page ? +page : 0,
    size: size ? +size : 10,
  };
  next();
};
