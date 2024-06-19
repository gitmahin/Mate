import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";


export async function GET(request:Request) {
    await connDb()
    try {
        const all_users = await user_model.find().select("-password -verify_code -verify_code_expiry")
        return Response.json({message: "Getting all users success", success: true, data: all_users}, {status: 200})
    } catch (error) {
        return Response.json({error: "Error getting all users", success: false}, {status: 503})
    }
}