import { z } from "zod"

export const log_in_z_schema = z.object({
    email: z.string(),
    password: z.string(),
})