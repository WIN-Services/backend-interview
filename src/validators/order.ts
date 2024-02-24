import { z } from "zod";

export const CreateOrderSchema = z.object({
  totalFee: z.number(),
  services: z.array(z.number()).min(1),
});

export const UpdateOrderSchema = z.object({
  totalFee: z.number().optional(),
  services: z.array(z.number()).optional(),
});
