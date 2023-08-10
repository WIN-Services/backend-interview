import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllService = async (req: Request, res: Response) => {
  try {
    const allData = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return res.status(200).json({ services: allData });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
