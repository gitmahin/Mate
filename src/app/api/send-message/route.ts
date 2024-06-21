import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import { Messages } from "@/dataModels/user_model";

export async function POST(request: Request) {
    await connDb()
    try {
        
        const {username, content} = await request.json()
        const user = await user_model.findOne({username})

        if(!user){
            return Response.json({error: "User not found", success: false}, {status: 404})
        }else{
            const new_message = {content, sent_at: new Date()}
            user.messages.push(new_message as Messages)
            await user.save()
        }

        return Response.json({message: "Sent successfully", success: true}, {status: 200})

    } catch(error) {
        return Response.json({error: "Server is under maintenance", success: false}, {status: 503})
    }
}