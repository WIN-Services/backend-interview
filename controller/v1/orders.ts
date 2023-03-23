import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express"
import moment from "moment";
import { idText } from "typescript";
import { IOrdersDB, IServiceId, IOrdersInput, IOrdersUpdate } from "../../interface/Orders"

const getallOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        const orders: IOrdersDB[] = await client.orders.findMany({
            include: {
                services: {
                    select: {
                        id: true,
                        name: true,
                        fee: true
                    }
                }
            },
            orderBy: {
                id: "asc"
            }
        })
        res.status(200).json({ data: orders })
        return;
    } catch (error) {
        next(error)
    }
}

const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        if (!req.params.id) {
            res.status(400).json({ msg: "User ID missing" });
            return;
        }
        const id: number = parseInt(req.params.id)
        const orders: IOrdersDB[] = await client.orders.findMany({
            include: {
                services: {
                    select: {
                        id: true,
                        name: true,
                        fee: true
                    }
                }
            },
            orderBy: {
                id: "asc"
            },
            where: {
                userId: id,
                isDeleted: false
            }
        })
        res.status(200).json({ data: orders })
        return;
    } catch (error) {
        next(error)
    }
}

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        if (!req.params.id) {
            res.status(400).json({ msg: "User ID missing" });
            return;
        }
        const id: number = parseInt(req.params.id)

        const order: IOrdersDB | null = await client.orders.findFirst({
            select: {
                id: true,
                updatedOn: true
            },
            where: {
                userId: id
            },
            orderBy: {
                updatedOn: 'desc'
            }
        })
        if (order) {
            const diff = moment().diff(moment(order?.updatedOn, 'YYYY-MM-DD HH:mm:ss.SSS'), 'hours')
            if (diff < 3) {
                res.status(405).json({ msg: "Can not add more Orders before 3Hrs passed" })
                return;
            }
        }

        const services: number[] = req.body.services;
        const totalFee: number = req.body.totalFee;
        if (!services || !totalFee) {
            res.status(400).json({ msg: "Data missing" })
            return;
        }
        const serviceId: IServiceId[] = []
        for (let elem of services) {
            serviceId.push({ id: elem })
        }
        const data: IOrdersInput = {
            totalFee: totalFee,
            services: {
                connect: serviceId
            },
            userId: id
        };
        const orders = await client.orders.create({
            data: data
        })
        res.status(201).json({ data: orders.id })
        return;
    } catch (error) {
        next(error)
    }
}

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        if (!req.params.orderId) {
            res.status(400).json({ msg: "Order Id missing" });
            return;
        }
        const orderId: number = parseInt(req.params.orderId)

        const order: IOrdersDB | null = await client.orders.findFirst({
            select: {
                id: true,
                updatedOn: true
            },
            where: {
                id: orderId
            }
        })
        if (order) {
            const diff = moment().diff(moment(order?.updatedOn, 'YYYY-MM-DD HH:mm:ss.SSS'), 'hours')

            if (diff < 3) {
                res.status(405).json({ msg: "Can not be edited before 3Hrs passed" })
                return;
            }
        }


        const services: number[] = req.body.services;
        const totalFee: number = req.body.totalFee;
        const data: IOrdersUpdate = {};
        if (services) {
            const serviceId: IServiceId[] = []
            for (let elem of services) {
                serviceId.push({ id: elem })
            }
            data.services = { connect: serviceId }
        }
        if (totalFee) {
            data.totalFee = totalFee
        }
        const orders = await client.orders.update({
            data: data,
            where: {
                id: orderId
            }
        })
        res.status(201).json({ data: orders.id })
        return;
    } catch (error) {
        next(error)
    }
}

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        if (!req.params.orderId) {
            res.status(400).json({ msg: "Order Id missing" });
            return;
        }
        const orderId: number = parseInt(req.params.orderId);
        const orders = await client.orders.update({
            data: {
                isDeleted: true
            },
            where: {
                id: orderId
            }
        })
        res.status(200).json({ data: orders.id })
        return;
    } catch (error) {
        next(error)
    }
}

export default { getUserOrders, getallOrders, updateOrder, addOrder, deleteOrder }