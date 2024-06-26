import mongoose from "mongoose";
import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { getDataFromToken } from "@/utils/get_data_from_token";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    await connDb()
    try {
        const sender = getDataFromToken(request)
        const {username}= await request.json()
        const user_existed = await user_model.findOne({username})
        const user_id = user_existed?._id as string
        const user_object_id = new mongoose.Types.ObjectId(user_id)
        try {
            const user = await user_model.aggregate([
                {$match: {_id: user_object_id}},
                {$unwind: "$messages"},
                {$match: {"messages.sender": sender}},
                {$sort: {"messages.sent_at": 1}},
                {$group: {_id: "$_id", messages: {$push: "$messages"}}}
            ])

            if(!user || user.length === 0){
                return NextResponse.json({error: "Not found", success: false}, {status: 400})
            }else{
                return NextResponse.json({messages: user[0].messages, success: true}, {status: 200})
            }
        } catch (error) {
            return NextResponse.json({error: "Failed", success: false}, {status: 500})
        }
    } catch (error) {
        return NextResponse.json({error: "Server is under maintenance", success: false}, {status: 503})
    }
    
}