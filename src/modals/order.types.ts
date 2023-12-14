import z from "zod";


export const orderSchema = z.object({
  services: z.array(z.string()),
});

export const paramSchema = z.string();
