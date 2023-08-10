import { z } from "zod"

const createServiceSchema = z.object({
    name: z.string(),
    fee: z.number()
})

export {
    createServiceSchema
}