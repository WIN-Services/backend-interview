import { IOrder } from "./IOrder";

export interface IOrders {
  totalPages: number;
  totalRecords: number;
  orders: IOrder[];
}
