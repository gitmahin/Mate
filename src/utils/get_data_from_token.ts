import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

interface TokenPayload {
    username: string
}


export const getDataFromToken = (request: NextRequest) => {
    try {
        const get_token = request.cookies.get("authToken")?.value || ""
        const decoded_token = jwt.verify(get_token, process.env.TOKEN_SECRET!) as TokenPayload
        return decoded_token
    } catch (error) {
        return NextResponse.json({error: "Error retrieving data from token", success: false}, {status: 500})
    }
}