import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { NextRequest, NextResponse } from "next/server";
import ratelimit_reset_pass from "@/utils/rate_limit_reset_pass";

export async function POST(request: NextRequest) {
    const ip = request.ip ?? "127.0.0.1" // `??` (Nullish Coalescing Operator): This operator returns the right-hand side operand when the left-hand side operand is `null` or `undefined`. It is similar to the logical OR operator (`||`)
    const result = await ratelimit_reset_pass.limit(ip)

    if (!result.success) {
        return NextResponse.json({ error: "Too many requests", success: false }, { status: 429 })
    } else {
        await connDb()
        try {
            const { email, reset_code } = await request.json()

                const user_existed = await user_model.findOne({ email, is_verified: true }).select("-first_name -last_name -created_at -messages -username")
                if (!user_existed) {
                    return NextResponse.json({ error: "Invalid user", success: false }, { status: 400 })
                } else {

                    const verifyCode_not_expired = new Date(user_existed.verify_code_expiry) > new Date()
                    const duration_reset_pass_request_not_end = new Date(user_existed.duration_of_next_reset_pass_request) > new Date()

                    if (duration_reset_pass_request_not_end) {
                        return NextResponse.json({ error: "Cannot reset password. Too many request", success: false }, { status: 401 })
                    } else {

                        if (!verifyCode_not_expired) {
                            return NextResponse.json({ error: "Invalid request", success: false }, { status: 403 })
                        } else {
                            const is_valid_code = user_existed.verify_code === reset_code
                            if (!is_valid_code) {
                                return NextResponse.json({ error: "Invalid code", success: true }, { status: 400 })
                            } else {
                                const new_date = new Date()
                                new_date.setMinutes(new_date.getMinutes() + 10)

                                user_existed.verified_user_to_reset_pass = true
                                user_existed.verify_code = "blank"
                                user_existed.verify_code_expiry = new_date
                                await user_existed.save()
                                return NextResponse.json({ message: "User verified to reset password", success: true }, { status: 200 })
                            }
                        }

                    }
                }
        } catch (error) {
            return NextResponse.json({ error: "Server is under maintenance", success: false }, { status: 503 })
        }
    }

}