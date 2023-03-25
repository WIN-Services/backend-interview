/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { OrderEntity } from "../entities/order.entity";
import { OrderInterface } from "../interface/order.interface";
export declare class OrderRepository {
    private orderModel;
    constructor(orderModel: Model<OrderInterface>);
    saveOrder(body: OrderEntity): Promise<OrderInterface>;
    findByPagination(skip: number, limit: number, condition: any): Promise<any>;
    updateOrder(body: Partial<OrderEntity>, orderId: string): Promise<any>;
    deleteOrder(orderId: string): Promise<any>;
    findByUserId(userId: string): Promise<OrderInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
