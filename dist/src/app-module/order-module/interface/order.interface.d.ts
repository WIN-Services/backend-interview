import { Document } from "mongoose";
import { Services } from "../entities/order.entity";
export interface OrderInterface extends Document {
    readonly services: Services[];
    readonly userId: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}
