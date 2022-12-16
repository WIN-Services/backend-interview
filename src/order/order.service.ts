/**
 * Data Model Interfaces
 */

import { BaseOrder } from "./order.interface";
import { query } from "../dbConfig/query";

/**
 * Order Methods
 */

export const findAllServices = async () => {
  const data = await query("select * from orders", []);
  return data;
};

export const find = async (id) => {
  return await query("select * from orders where order_id=$1 ", [id]);
};

export const create = async (newItem: BaseOrder) => {
  try {
    console.log("================================");
    const date = new Date();
    return await query(
      "INSERT INTO orders (services, total_fee, created_at, updated_at) values($1, $2, $3, $4)",
      [newItem.services, newItem.total_fee, date, date]
    );
  } catch (err) {
    return err;
  }
};

export const update = async (
  id: number,
  itemUpdate: BaseOrder
): Promise<any | null> => {
  const item = await find(id);
  console.log(item, "====");
  return await query(
    "UPDATE orders SET services =$1, total_fee = $2 WHERE order_id=$3 ",
    [itemUpdate.services, itemUpdate.total_fee, id]
  );
};

export const remove = async (id: number): Promise<null | void> => {

  console.log("============herer", id)
  return await query("DELETE FROM orders WHERE order_id=$1 ", [id]);
};
