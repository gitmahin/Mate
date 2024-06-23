import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/get_data_from_token";
import bcrypt from "bcryptjs"


export async function POST(request: NextRequest) {
    await connDb()
    try {
        const { old_password, password } = await request.json()
        const username = getDataFromToken(request)
        const hashed_password = await bcrypt.hash(password, 10)

        const user_existed = await user_model.findOne({ username, is_verified: true }).select("-first_name -last_name -email -created_at -verify_code -verify_code_expiry -messages")

        if (!user_existed) {
            return NextResponse.json({ error: "Session expired", success: false }, { status: 403 })
        } else {
            const duration_reset_pass_request_not_end = new Date(user_existed.duration_of_next_reset_pass_request) > new Date()

            if (duration_reset_pass_request_not_end) {
                return NextResponse.json({ error: "Cannot access now. Try again later", success: false }, { status: 401 })
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

                    const last_password_changed = new Date()

                    const new_date = new Date()
                    new_date.setHours(new_date.getHours() + 360)

                    user_existed.duration_of_next_reset_pass_request = new_date
                    user_existed.last_password_changed = last_password_changed

                    await user_existed.save()

                    return NextResponse.json({ message: "Password updated", success: true }, { status: 200 })

                }
            }

        }


    } catch (error) {
        return NextResponse.json({ message: "Password update failed", success: false }, { status: 500 })
    }

}