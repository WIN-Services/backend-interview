import { orderSchema, paramSchema } from "../../modals/order.types";
import {
  create,
  get,
  getOrderByIdService,
  remove,
  update,
} from "../../service/order/orderService";

export const createOrder = async (ctx: any): Promise<any> => {
  try {
    const user = ctx.state.user
    const reqData = orderSchema.parse(ctx.request.body);

    const res = await create(reqData.services,user);
    {
      (ctx.status = 201), (ctx.body = { message: "order created" });
    }
  } catch (err: any) {
    {
      (ctx.status = 400),
        (ctx.body = {
          message: "invalid order",
        });
    }
  }
};

export const updateOrder = async (ctx: any): Promise<any> => {
  try {
    const id = paramSchema.parse(ctx.params.id);
    const reqData = orderSchema.parse(ctx.request.body);
    await update(id, reqData.services);
    {
      (ctx.status = 200),
        (ctx.body = {
          message: `order with id = ${id} updated successfully`,
        });
    }
  } catch (err: any) {
    {
      (ctx.status = 400),
        (ctx.body = {
          message: "invalid order",
        });
    }
  }
};

export const deleteOrder = async (ctx: any): Promise<any> => {
  try {
    const id = paramSchema.parse(ctx.params.id);
    await remove(id);
    {
      (ctx.status = 200),
        (ctx.body = {
          message: `order with id = ${id} deleted successfully`,
        });
    }
  } catch (err: any) {
    {
      (ctx.status = 400),
        (ctx.body = {
          message: "invalid order",
        });
    }
  }
};

export const getOrder = async (ctx: any): Promise<any> => {
  try {
    const res = await get();
    ctx.body = { data: res };
  } catch (err: any) {
    {
      (ctx.status = 400),
        (ctx.body = {
          message: "invalid order",
        });
    }
  }
};

export const getOrderById = async (ctx: any): Promise<any> => {
  try {
    const orderId = paramSchema.parse(ctx.params.id);
    const res = await getOrderByIdService(orderId);
    ctx.body = { data: res };
  } catch (err: any) {
    {
      (ctx.status = 400),
        (ctx.body = {
          message: "invalid order",
        });
    }
  }
};
