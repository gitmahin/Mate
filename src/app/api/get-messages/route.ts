import mongoose from "mongoose";
import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { getDataFromToken } from "@/utils/get_data_from_token";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest) {
    await connDb()
    try {
        const user_name = getDataFromToken(request)
        const user_existed = await user_model.findOne({username: user_name})
        const user_id = user_existed?._id as string
        const user_object_id = new mongoose.Types.ObjectId(user_id)
        try {
            const user = await user_model.aggregate([
                {$match: {id: user_object_id}},
                {$unwind: "$messages"},
                {$sort: {"messages.sent_at": -1}},
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