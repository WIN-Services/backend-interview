
export interface IOrderCreationModel {
    id?: number;
    datetime: Date;
    totalfee: number;
    services: number[];
}

export interface IOrderDetails {
    id: number;
    datetime: Date;
    totalfee: number;
    services: number[];
}