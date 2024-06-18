import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { NextRequest, NextResponse } from "next/server";
import ratelimit from "@/utils/rate_limit_verify_code";


export async function POST(request:NextRequest) {
    try {
        const ip = request.ip ?? "127.0.0.1" // `??` (Nullish Coalescing Operator): This operator returns the right-hand side operand when the left-hand side operand is `null` or `undefined`. It is similar to the logical OR operator (`||`)
        const result = await ratelimit.limit(ip)

        if(!result.success){
            return NextResponse.json({error: "Too many requests", success: false}, {status: 429})
        }else{
            await connDb()

            try {
                const {username, code} = await request.json()
                const user = await user_model.findOne({username, is_verified: false})

                if(!user){
                    return NextResponse.json({error: "User is not registered", success: false}, {status: 401})
                }else{
                    const is_valid_code = user.verify_code === code
                    const verifyCode_not_expired = new Date(user.verify_code_expiry) > new Date()

                    if(!verifyCode_not_expired){
                        return NextResponse.json({error: "Invalid code", success: false}, {status: 410})
                    }else{
                        if(!is_valid_code){
                            return NextResponse.json({error: "Invalid code", success: true}, {status: 400})
                        }else{
                            user.is_verified = true
                            user.verify_code = "blank"
                            await user.save()
                            return NextResponse.json({message: "User verified successfully", success: true, data: user.last_name, useremail: user.email }, {status: 200})
                        }
                    }
                }
            } catch (error) {
                return NextResponse.json({error: "Server is under maintenance"}, {status: 500})
            }
        }
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"})
    }
}