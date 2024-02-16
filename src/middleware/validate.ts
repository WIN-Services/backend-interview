import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

declare module "express-serve-static-core" {
  interface Request {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatted_req: any;
  }
}

export const validate =
  (zod_schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await zod_schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) return res.status(400).send(result.error);

    req["formatted_req"] = result.data;

    return next();
  };
