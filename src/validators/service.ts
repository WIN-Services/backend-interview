import { z } from "zod";

export const CreateServiceSchema = z.object({
  name: z.string(),
});

export const UpdateServiceSchema = z.object({
  name: z.string(),
});
