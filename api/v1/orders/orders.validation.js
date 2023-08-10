import { z } from "zod"

const createOrderSchema = z.object({
    user_id: z.number(),
    services: z.array(z.object({ id: z.number() })).min(1)
})

export {
    createOrderSchema
}