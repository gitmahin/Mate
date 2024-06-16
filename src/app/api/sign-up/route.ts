import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import bcrypt from "bcryptjs"


export async function POST(request:Request) {
    await connDb()
    try {
        const {first_name, last_name, username, email, password} = await request.json()

        const user_existed = await user_model.findOne({email})

        if(user_existed){
            return Response.json({error:"User already existed", success: false}, {status: 400})
        }else{
            // password hashing
            const hashed_password = await bcrypt.hash(password, 10)

            // storing verify code expiry in minutes
            const new_date = new Date()
            new_date.setMinutes(new_date.getMinutes() + 5)

            const created_at = new Date()
            created_at.toLocaleDateString()

            const new_user = new user_model({
                first_name,
                last_name,
                username,
                email,
                password: hashed_password,
                created_at,
                verify_code_expiry: new_date
            })

            await new_user.save()

            return Response.json({message: "User registered successfully", success: true}, {status: 200})

        }
    } catch (error) {
        return Response.json({error: "Error in signup", success: false}, {status: 500})
    }
}