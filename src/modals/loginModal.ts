import z from "zod";

//login schema
export const loginCred = z.object({
  userName: z.string({ invalid_type_error: "userName must be a string" }),
  password: z.string({ invalid_type_error: "password must be a string" }),
  userType: z.enum(["Admin", "User"]),
});

export type userCred = z.infer<typeof loginCred>