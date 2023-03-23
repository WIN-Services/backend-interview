import {IOrdersDB} from './Orders'

export interface IServicesDB{
    id?: number,
    name?: string,
    description?: string,
    fee?: number,
    orders?: IOrdersDB[],
    isDeleted?: Boolean,
    createdOn?: any,
    updatedOn?: any
}

export interface IServicesInput {
    name: string,
    description: string,
    fee: number
}

export interface IServicesUpdate {
    name?: string,
    description?: string,
    fee?: number
}