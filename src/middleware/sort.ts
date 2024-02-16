import { NextFunction, Request, Response } from "express";
import ApiError from "../helper/classes/api-error";

export type Sort = object[];

declare module "express-serve-static-core" {
  interface Request {
    sort: Sort;
  }
}
export const sort = (req: Request, res: Response, next: NextFunction) => {
  const { sort_by, order_by } = req.query;

  let orderBy: object[] = [{ datetime: "desc" }];
  if (sort_by && order_by) {
    if (!isNaN(+sort_by) || !isNaN(+order_by))
      throw new ApiError("sort values, sort_by and order_by must be strings");

    if (typeof order_by !== "string")
      throw new ApiError("order_by must be string");

    if (!["desc", "asc"].includes(order_by))
      throw new ApiError("order_by should be either 'desc' or 'asc'");

    if (order_by.toLowerCase() !== "asc" && order_by.toLowerCase() !== "desc")
      throw new ApiError("invalid order key");

    const data = `[{"${sort_by}":"${order_by}" }]`;
    orderBy = JSON.parse(data);
  }

  req.sort = orderBy;
  next();
};
