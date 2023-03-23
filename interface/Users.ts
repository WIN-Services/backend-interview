import {IOrdersDB} from "./Orders"

export interface IUserDB {
    id?: number,
    email?: string,
    name?: string | null,
    orders?: IOrdersDB[],
    isDeleted?: boolean,
    createdOn?: any,
    updatedOn?: any
}

export interface IUserInput {
    email: string,
    name?: string | null
}

export interface IUserUpdate {
    email?: string,
    name?: string | null
}