import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/get_data_from_token";

export async function GET(request:NextRequest) {
    try {
        await connDb()

        const user_name = await getDataFromToken(request)
        const user_existed = await user_model.findOne({username: user_name, is_verified: true}).select("-_id -password -verify_code_expiry -verify_code -verify_code")

        if(!user_existed){
            const response = NextResponse.json({error: "Not found", success: false}, {status: 400})

            response.cookies.set("authToken", "", {
                httpOnly: true,
                expires: new Date(0)
            })

            return response
        }else{
            return NextResponse.json({message: "User found successfully", success: true, data: user_existed}, {status: 200})
        }
    } catch (error) {
        return NextResponse.json({error: "Session expired", success: false}, {status: 403})
    }
}