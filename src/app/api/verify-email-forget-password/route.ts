import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { NextRequest, NextResponse } from "next/server";
import ratelimit from "@/utils/rate_limit_verify_code";
import { getDataFromToken } from "@/utils/get_data_from_token";
import { sendVerificationEmailForgetPassword } from "@/utils/send_forgetpass_verification_email";


export async function POST(request: NextRequest) {

    const ip = request.ip ?? "127.0.0.1" // `??` (Nullish Coalescing Operator): This operator returns the right-hand side operand when the left-hand side operand is `null` or `undefined`. It is similar to the logical OR operator (`||`)
    const result = await ratelimit.limit(ip)

    if (!result.success) {
        return NextResponse.json({ error: "Too many requests", success: false }, { status: 429 })
    } else {
        await connDb()
        try {
            const user_name = await getDataFromToken(request)
            let user_existed

            if (!user_name) {
                const { email } = await request.json()
                user_existed = await user_model.findOne({ email }).select("-first_name -last_name -created_at -messages")
                if (!user_existed) {
                    return NextResponse.json({ error: "Invalid user", success: false }, { status: 400 })
                }
            } else {
                user_existed = await user_model.findOne({ username: user_name }).select("-first_name -last_name -created_at -messages")
                if (!user_existed) {
                    return NextResponse.json({ error: "Invalid user", success: false }, { status: 400 })
                }
            }

            const verify_code = Math.floor(100000 + Math.random() * 900000).toString()

            const new_date = new Date()
            new_date.setMinutes(new_date.getMinutes() + 5)


            user_existed.verify_code = verify_code
            user_existed.verify_code_expiry = new_date
            await user_existed.save()

            const send_verify_email = await sendVerificationEmailForgetPassword(user_existed.email, "Reset your password", verify_code)

            if (!send_verify_email.success) {
                return NextResponse.json({
                    success: false,
                    message: send_verify_email.message
                }, { status: 500 })
            }

            return NextResponse.json({ message: "Verification email sent successfully", success: true }, { status: 200 })


        } catch (error) {
            console.log(error)
            return NextResponse.json({ error: "Server is under mantenance", success: false }, { status: 503 })
        }
    }
}