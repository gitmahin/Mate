import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

interface TokenPayload {
    username: string
}

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get("authToken")?.value || ""
        jwt.verify(token, process.env.TOKEN_SECRET!) as TokenPayload
        if (!token) {
            const response = NextResponse.json({
                error: "Session expired",
                success: false
            }, { status: 403 })

            response.cookies.set("authToken", "", {
                httpOnly: true,
                expires: new Date(0)
            })

            return response
        } else {
            return NextResponse.json({ message: "User already logged in", success: true }, { status: 200 })
        }
    } catch (error) {
        const response = NextResponse.json({
            error: "Session expired",
            success: false
        }, { status: 403 })

        response.cookies.set("authToken", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response

    }
}