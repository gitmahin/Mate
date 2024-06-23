import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { getDataFromToken } from "@/utils/get_data_from_token";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {
    await connDb()
    try {
        const token_username = await getDataFromToken(request)
        const all_users = await user_model.find({ username: { $ne: token_username } }).select("-password -verify_code -verify_code_expiry -last_password_changed -duration_of_next_reset_pass_request -verified_user_to_reset_pass")
        return NextResponse.json({message: "Getting all users success", success: true, data: all_users}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Error getting all users", success: false}, {status: 503})
    }
}