/**
 * Data Model Interfaces
 */

import { BaseService } from "./service.interface";
import { query } from "../dbConfig/query";

/**
 * Service Methods
 */

export const findAllServices = async () => {
  const data = await query("select * from mst_service ", []);
  return data;
};

export const find = async (id) => {
  return await query("select * from mst_service where id=$1 ", [id]);
};

export const create = async (newItem: BaseService) => {
  try {
    console.log("================================");
    return await query(
      "INSERT INTO mst_service (name, is_active) values($1, $2)",
      [newItem.name, newItem.is_active]
    );
  } catch (err) {
    return err;
  }
};

export const update = async (
  id: number,
  itemUpdate: BaseService
): Promise<any | null> => {
  const item = await find(id);
  console.log(item, "====");
  return await query("UPDATE mst_service SET name =$1 WHERE id=$2 ", [
    itemUpdate.name,
    id,
  ]);
};

export const remove = async (id: number): Promise<null | void> => {
  return await query("DELETE FROM mst_service WHERE id=$1 ", [id]);
};
