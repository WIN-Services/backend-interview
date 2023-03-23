import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express"
import { IUserDB, IUserInput, IUserUpdate } from "../../interface/Users"

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        const users: IUserDB[] = await client.users.findMany({
            orderBy: {
                id: "asc"
            },
            where: {
                isDeleted: false
            }
        })
        res.status(200).json({ data: users })
        return;
    } catch (error) {
        next(error)
    }
}

const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        const email: string = req.body.email;
        const name: string = req.body.name;
        if (!email) {
            res.status(400).json({ msg: "Data missing" })
            return;
        }
        const data: IUserInput = {
            email: email,
            name: name
        };
        const users = await client.users.create({
            data: data
        })
        res.status(201).json({ data: users.id })
        return;
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        if (!req.params.id) {
            res.status(400).json({ msg: "User Id missing" });
            return;
        }
        const id: number = parseInt(req.params.id);
        const email: string = req.body.email;
        const name: string = req.body.name;
        const data: IUserUpdate = {};
        if (email) {
            data.email = email
        }
        if (name) {
            data.name = name
        }
        const users = await client.users.update({
            data: data,
            where: {
                id: id
            }
        })
        res.status(201).json({ data: users.id })
        return;
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new PrismaClient();
        if (!req.params.id) {
            res.status(400).json({ msg: "User Id missing" });
            return;
        }
        const id: number = parseInt(req.params.id);
        const users = await client.users.update({
            where: {
                id: id
            },
            data: {
                isDeleted: true
            }
        })
        res.status(200).json({ data: users.id })
        return;
    } catch (error) {
        next(error)
    }
}

export default { getUsers, addUser, updateUser, deleteUser }