import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {

    await connDb()
    try {
        const { email, password } = await request.json()

        const user_existed = await user_model.findOne({ email, is_verified: true, verified_user_to_reset_pass: true }).select("-messages -created_at -username -last_name -first_name")
        if (!user_existed) {
            return NextResponse.json({ error: "Invalid user", success: false }, { status: 400 })
        } else {
            const verifyCode_not_expired = new Date(user_existed.verify_code_expiry) > new Date()
            const duration_reset_pass_request_not_end = new Date(user_existed.duration_of_next_reset_pass_request) > new Date()

            if (duration_reset_pass_request_not_end) {
                return NextResponse.json({ error: "Cannot access now. Try again later", success: false }, { status: 401 })
            } else {

                if (!verifyCode_not_expired) {
                    return NextResponse.json({ error: "Request timeout", success: false }, { status: 403 })
                } else {
                    const hashed_password = await bcrypt.hash(password, 10)

                    const new_date = new Date()
                    new_date.setHours(new_date.getHours() + 360)
                    const last_password_changed = new Date()

                    await user_model.updateOne({ email: user_existed.email }, {
                        $set: {
                            password: hashed_password
                        }
                    })

                    user_existed.duration_of_next_reset_pass_request = new_date
                    user_existed.verified_user_to_reset_pass = false
                    user_existed.last_password_changed = last_password_changed
                    await user_existed.save()

                    return NextResponse.json({ message: "Password reset successfully", success: true }, { status: 200 })
                }
            }
        }

    } catch (error) {
        return NextResponse.json({ error: "Server is under maintenance.", success: false }, { status: 503 })
    }
}