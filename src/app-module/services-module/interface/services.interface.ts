import { Document } from "mongoose";
export interface ServicesInterface extends Document {
  readonly name: string;
  readonly description: string;
  readonly fee: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
