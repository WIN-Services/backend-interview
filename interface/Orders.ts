import {IServicesDB} from "./Services"

export interface IOrdersDB {
    id?: number,
    totalFee?: number,
    services?: IServicesDB[],
    userId?: number,
    isDeleted?: boolean,
    orderedOn?: any,
    updatedOn?: any
}

export interface IServiceId {
    id: number
}

export interface IOrdersInput {
    totalFee: number,
    services: {
        connect: IServiceId[]
    },
    userId: number
}

export interface IOrdersUpdate {
    totalFee?: number,
    services?: {
        connect: IServiceId[]
    },
    userId?: number
}