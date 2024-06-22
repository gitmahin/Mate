import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/get_data_from_token";
import bcrypt from "bcryptjs"
import ratelimit from "@/utils/rate_limit_verify_code";


export async function POST(request: NextRequest) {

    const ip = request.ip ?? "127.0.0.1" // `??` (Nullish Coalescing Operator): This operator returns the right-hand side operand when the left-hand side operand is `null` or `undefined`. It is similar to the logical OR operator (`||`)
    const result = await ratelimit.limit(ip)
    if (!result.success) {
        return NextResponse.json({ error: "Too many requests", success: false }, { status: 429 })
    } else {

        await connDb()
        try {
            const { old_password, password } = await request.json()
            const username = getDataFromToken(request)
            const hashed_password = await bcrypt.hash(password, 10)

            const user_existed = await user_model.findOne({ username, is_verified: true }).select("-first_name -last_name -email -created_at -verify_code -verify_code_expiry -messages")

            if (!user_existed) {
                return NextResponse.json({ error: "Session expired", success: false }, { status: 403 })
            } else {

                const pass_matched = await bcrypt.compare(old_password, user_existed.password)

                if (!pass_matched) {
                    return NextResponse.json({ error: "Invalid password", success: false }, { status: 400 })

                } else {
                    await user_model.updateOne({ username }, {
                        $set: {
                            password: hashed_password
                        }
                    })

                    return NextResponse.json({ message: "Password updated", success: true }, { status: 200 })

                }

            }


        } catch (error) {
            return NextResponse.json({ message: "Password update failed", success: false }, { status: 500 })
        }

    }
}