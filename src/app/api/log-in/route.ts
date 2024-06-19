import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendVerificationEmail } from "@/utils/send_verification_email";

export async function POST(request: NextRequest) {
    await connDb()
    try {
        const { email, password } = await request.json()
        const user_existed = await user_model.findOne({ email })

        const verified_user = user_existed?.is_verified === true

        if (!user_existed) {
            return NextResponse.json({ error: "Invalid credentials", success: false }, { status: 400 })
        } else {

            if (!verified_user) {

                const verify_code = Math.floor(100000 + Math.random() * 900000).toString()

                const new_date = new Date()
                new_date.setMinutes(new_date.getMinutes() + 5)

                user_existed.verify_code = verify_code
                user_existed.verify_code_expiry = new_date
                await user_existed.save()

                const send_verify_email = await sendVerificationEmail(email, "Verify your email before login - Mate", user_existed.username, verify_code)

                if (!send_verify_email.success) {
                    return Response.json({
                        success: false,
                        message: send_verify_email.message
                    }, { status: 500 })
                }

                return NextResponse.json({ error: "Unverified user", success: false, username: user_existed.username, email: user_existed.email }, { status: 403 })
                

            } else {

                const passwordMatched = await bcrypt.compare(password, user_existed.password)

                if (!passwordMatched) {
                    return NextResponse.json({ error: "Invalid credentials", success: false }, { status: 400 })
                } else {
                    const tokenData = {
                        username: user_existed.username,
                    }


                    const additional_information = {
                        usernames: user_existed.username
                    }
                    

                    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })
                    const publicToken = await jwt.sign(additional_information, process.env.TOKEN_SECRET!)

                    const response = NextResponse.json({ message: "User logged in successfully", success: true }, { status: 200 })

                    response.cookies.set("authToken", token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict"
                        
                    })

                    response.cookies.set("publicToken", publicToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict"
                    })

                    return response
                }
            }
        }
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong with login user", success: false }, { status: 503 })
    }
}