import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import ratelimit from "@/utils/rate_limit_verify_code";
import { sendVerificationEmail } from "@/utils/send_verification_email";

const usernameValidate = z.object({
    username: z.string()
})

const userEmailValidate = z.object({
    email: z.string().email("Invalid email")
})

export async function POST(request: NextRequest) {

    try {

        const ip = request.ip ?? "127.0.0.1" // `??` (Nullish Coalescing Operator): This operator returns the right-hand side operand when the left-hand side operand is `null` or `undefined`. It is similar to the logical OR operator (`||`)
        const result = await ratelimit.limit(ip)

        if (!result.success) {
            return NextResponse.json({ error: "Too many requests", success: false }, { status: 423 })
        } else {
            await connDb()

            const { searchParams } = new URL(request.url)

            const query_username = {
                username: searchParams.get("username")
            }

            const query_email = {
                email: searchParams.get("email")
            }

            const query_validated_user = usernameValidate.safeParse(query_username)
            const query_validated_email = userEmailValidate.safeParse(query_email)

            if (!query_validated_user.success || !query_validated_email.success) {
                return NextResponse.json({ error: "User not found", success: false }, { status: 400 })
            } else {
                const { username } = query_validated_user.data
                const { email } = query_validated_email.data
                const user_existed = await user_model.findOne({ username, is_verified: false })
                if (!user_existed) {
                    return NextResponse.json({ error: "Not found", success: false }, { status: 401 })
                } else {
                    const verifyCode_expired = new Date(user_existed.verify_code_expiry) < new Date()

                    if (!verifyCode_expired) {
                        return NextResponse.json({ error: "Invalid request", success: false }, { status: 429 })
                    } else {

                        const verify_code = Math.floor(100000 + Math.random() * 900000).toString()
                        const new_date = new Date()
                        new_date.setMinutes(new_date.getMinutes() + 5)

                        user_existed.verify_code = verify_code
                        user_existed.verify_code_expiry = new_date
                        await user_existed.save()

                        const send_verify_email = await sendVerificationEmail(email, "Verification email - Mate", username, verify_code)

                        if (!send_verify_email.success) {
                            return NextResponse.json({
                                success: false,
                                message: send_verify_email.message
                            }, { status: 500 })
                        }

                        return NextResponse.json({ message: "Verification email resent", success: true }, { status: 200 })
                    }

                }

            }
        }


    } catch (error) {
        return NextResponse.json({ error: "Error in sending email", success: false }, { status: 503 })
    }
}