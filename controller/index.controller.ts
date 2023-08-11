import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await prisma.orders.findMany({
      select: {
        id: true,
        datetime: true,
        totalfee: true,
        services: {
          select: {
            id: true,
          },
        },
      },
    });
    return res.status(200).json({ Orders: allOrders });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const orderData = await prisma.orders.findFirst({
      where: {
        id: orderId,
      },
      select: {
        id: true,
        datetime: true,
        totalfee: true,
        services: {
          select: {
            id: true,
          },
        },
      },
    });
    if (orderData === null) {
      return res.status(400).json({ message: "order not found" });
    }
    return res.status(200).json({ order: orderData });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { totalfee, services } = req.body;
    const createOrder = await prisma.orders.create({
      data: {
        totalfee,
        services: {
          connect: [{ id: services[0].id }],
        },
      },
    });
    if (createOrder === null) {
      return res.status(400).json({ message: "Order invalid" });
    }
    return res.status(201).json({ message: "Order Placed" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const { totalfee, services } = req.body;
    const orderToUpdate = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        services: true,
      },
    });

    if (orderToUpdate  === null) {
      return res.status(404).json({ message: "Order Not found" });
    }    

    await prisma.orders.update({
      where: { id: orderId },
      data: {
        totalfee: totalfee,
        datetime: new Date().toISOString(),
        services: {
          connect: { id: services[0].id },
          disconnect: { id: orderToUpdate.services[0].id },
        },
      },
    });

    return res.status(201).json({ message: "Order updated" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const deleteOrder = await prisma.orders.delete({
      where: {
        id: orderId,
      },
    });
    if (deleteOrder) {
      return res.status(202).json({ message: "Order deleted" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
