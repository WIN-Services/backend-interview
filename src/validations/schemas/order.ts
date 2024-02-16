import { z } from "zod";

export const getOrderSchema = z.object({
  params: z.object({
    order_id: z.coerce.number(),
  }),
});

export const createOrderSchema = z.object({
  body: z.object({
    totalfee: z.coerce.number(),
    datetime: z.string().datetime(),
    services: z.number().array(),
  }),
});

export const updateOrderSchema = z.object({
  params: z.object({
    order_id: z.coerce.number(),
  }),
  body: z.object({
    totalfee: z.coerce.number().optional(),
    datetime: z.string().datetime().optional(),
  }),
});

export const deleteOrderSchema = z.object({
  params: z.object({
    order_id: z.coerce.number(),
  }),
});

// ---------------------------------------------TYPES-----------------------------------------------------------
export type CreateOrder = z.infer<typeof createOrderSchema>;
export type GetOrder = z.infer<typeof getOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
export type DeleteOrder = z.infer<typeof deleteOrderSchema>;
