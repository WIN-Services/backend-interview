import { Document } from "mongoose";
export interface UserInterface extends Document {
    readonly email: string;
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}
