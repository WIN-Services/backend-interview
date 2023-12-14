import { error } from "console";
import { knex } from "../../config/dbconfig";
import { orderDetail } from "../../constant/types";
import { userDetails } from "../../modals/user";

export const createOrder = async (
  orderDetails: string[],
  user: userDetails
): Promise<any> => {
  const dateTime = await knex
    .select("created_at")
    .table("users")
    .where({ user_name: user.userName, email: user.email });
  if (dateTime - 3 * 60 * 60 * 1000 > 0) {
    const prices = await knex
      .select("price")
      .table("orders")
      .whereIn("service_id", orderDetails);
    let totalFee = 0;
    for (let i = 0; i < prices.length; i++) {
      totalFee += prices[i];
    }
    await knex("orders").insert({
      services: orderDetails,
      total_fee: totalFee,
    });
  } else {
    throw error;
  }
};

export const getOrder = async (): Promise<orderDetail[]> => {
  const res = await knex("orders").select();
  return res;
};

export const updateOrder = async (
  id: string,
  orderDetails: string[]
): Promise<any> => {
  const dateTime = await knex("orders")
    .where({
      id: id,
    })
    .select("created_at");
  if (dateTime - 3 * 60 * 60 * 1000 > 0) {
    await knex("orders").where({ id: id }).update({
      services: orderDetails,
    });
  } else {
    throw error;
  }
};

export const deleteOrder = async (id: string): Promise<any> => {
  await knex("orders").where("id", id).del();
};

export const getOrderById = async (orderId: string): Promise<orderDetail> => {
  const res = await knex("orders")
    .where({
      id: orderId,
    })
    .select();
  return res;
};
