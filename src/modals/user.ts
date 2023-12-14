import z from "zod";
export const user = z.object({
  userName: z.string({ invalid_type_error: "userName must be a string" }),
  userType: z.enum(["Admin", "User"]),
  email: z.string().email({
    message: "invalid userName",
  }),
  password: z.string({ invalid_type_error: "password must be a string" }),
});


export type userDetails = z.infer<typeof user>
