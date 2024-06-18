import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Log out successfully",
            success: true
        })

        response.cookies.set("authToken", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response

    } catch (error) {
        return NextResponse.json({error: "Error logging out user"}, {status: 500})
    }
}