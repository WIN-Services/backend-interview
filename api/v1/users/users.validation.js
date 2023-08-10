import { z } from "zod"

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    dob: z.string()
})

export {
    createUserSchema
}