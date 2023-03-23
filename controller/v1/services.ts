import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express"
import { IServicesDB, IServicesInput, IServicesUpdate } from "../../interface/Services"

const getServices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        const services: IServicesDB[] = await client.services.findMany({
            orderBy: {
                id: "asc"
            },
            where: {
                isDeleted: false
            }
        })
        res.status(200).json({ data: services })
        return;
    } catch (error) {
        next(error)
    }
}

const addService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        const description: string = req.body.description;
        const name: string = req.body.name;
        const fee: number = req.body.fee;
        if (!name || !fee || !description) {
            res.status(400).json({ msg: "Data missing" })
            return;
        }
        const data: IServicesInput = {
            description: description || "",
            name: name || "",
            fee: fee || 0
        };
        const services = await client.services.create({
            data: data
        })
        res.status(201).json({ data: services.id })
        return;
    } catch (error) {
        next(error)
    }
}

const updateService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        if (!req.params.id) {
            res.status(400).json({ msg: "User Id missing" });
            return;
        }
        const id: number = parseInt(req.params.id);
        const description: string = req.body.description;
        const fee: number = req.body.fee;
        const name: string = req.body.name;
        const data: IServicesUpdate = {};
        if (description) {
            data.description = description
        }
        if (name) {
            data.name = name
        }
        if (fee) {
            data.fee = fee
        }
        const services = await client.services.update({
            data: data,
            where: {
                id: id
            }
        })
        res.status(201).json({ data: services.id })
        return;
    } catch (error) {
        next(error)
    }
}

const deleteService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        if (!req.params.id) {
            res.status(400).json({ msg: "User Id missing" });
            return;
        }
        const id: number = parseInt(req.params.id);
        const services = await client.services.update({
            where: {
                id: id
            },
            data: {
                isDeleted: true
            }
        })
        res.status(200).json({ data: services.id })
        return;
    } catch (error) {
        next(error)
    }
}

export default { getServices, addService, updateService, deleteService }