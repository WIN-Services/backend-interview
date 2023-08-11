import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

const checkBody = (value: any, res: Response) => {
  if (value === undefined || value === null) {
    return res.status(400).json({ message: "Invalid data" });
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }
  }
};

const checkPreviousCreation = async () => {
  const existingOrder = await prisma.orders.findFirst({
    where: {
      datetime: {
        gte: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
      },
    },
  });
  if (existingOrder !== null) return true;

  return false;
};

export const validateCreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { totalfee, services } = req.body;

    checkBody(totalfee, res); // checking if body is not empty
    checkBody(services, res);
    // checking for 3hours
    if (await checkPreviousCreation()) {
      return res
        .status(400)
        .json({ message: "An order was created within the last 3 hours." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const validateUpdateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = parseInt(req.params.iorderId);
  const { totalfee, services } = req.body;
  checkBody(orderId, res);
  checkBody(totalfee, res);
  checkBody(services, res);
  if (await checkPreviousCreation()) {
    return res
      .status(400)
      .json({ message: "An order was created within the last 3 hours." });
  }
  next();
};

export const validateDeleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = parseInt(req.params.iorderId);
  checkBody(orderId, res);
  next();
};

export const validateSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = parseInt(req.params.iorderId);
  checkBody(orderId, res);
  next();
};
