import { z } from "zod"

export const forget_pass_z_schema = z.object({
    password: z.string().min(6, "Use strong password"),
    confirm_password: z.string().min(1, "Confirm password is required")


}).refine((data) => data.password === data.confirm_password,

    {
        message: "Password doesn't matching",
        path: ["confirm_password"]
    }

)