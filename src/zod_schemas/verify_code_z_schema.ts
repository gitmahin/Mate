import {z} from "zod"

export const verify_code_z_schema = z.object({
    code: z.string().min(6, "Invalid code")

}) 
