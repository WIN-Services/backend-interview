import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express"
import { IServicesDB } from "../../interface/Services"


const getOrdersByservice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        if (!req.params.serviceId) {
            res.status(400).json({ msg: "User Id missing" });
            return;
        }
        const id: number = parseInt(req.params.serviceId);
        const services: IServicesDB[] = await client.services.findMany({
            select: {
                orders: {
                    where: {
                        isDeleted: false
                    }
                }
            },
            where: {
                id: id,
            }
        })
        res.status(200).json({ data: services })
        return;
    } catch (error) {
        next(error)
    }
}

export default { getOrdersByservice }