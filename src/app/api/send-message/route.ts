import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { Messages } from "@/dataModels/user_model";
import { getDataFromToken } from "@/utils/get_data_from_token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connDb()
    try {
        const user_name = getDataFromToken(request)
        const sender_existed = await user_model.findOne({username: user_name})
        const {username, content} = await request.json()
        const user = await user_model.findOne({username})

        const f_name_sender = sender_existed!.first_name
        const l_name_sender = sender_existed!.last_name

        if(!sender_existed){
            return NextResponse.json({error: "Sender does not exist", success: false}, {status: 404})
        }else{
            
            if(!user){
                return NextResponse.json({error: "User not found", success: false}, {status: 404})
            }else{
                const new_message = { f_name_sender, l_name_sender, content, sent_at: new Date()}
                user.messages.push(new_message as Messages)
                await user.save()
            }
            
        }

        return NextResponse.json({message: "Sent successfully", success: true}, {status: 200})
            
    } catch(error) {
        return NextResponse.json({error: "Server is under maintenance", success: false}, {status: 503})
    }
}