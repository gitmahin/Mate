import mongoose from "mongoose";
import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";


export async function POST(request:Request) {
    try {
        const {username, email, first_name, last_name, password} = await request.json()

        const user_existed = await user_model.findOne({email, username})

        if(user_existed){
            return Response.json({error:"User already existed", success: false}, {status: 400})
        }else{
            // TODO: write the rest of code
        }
    } catch (error) {
        return Response.json({error: "Error in signup", success: false}, {status: 500})
    }
}