import connDb from "@/lib/conndb";
import user_model from "@/dataModels/user_model";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/utils/send_verification_email";


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

            const verify_code = Math.floor(100000 + Math.random() * 900000).toString()

            const new_user = new user_model({
                first_name,
                last_name,
                username,
                email,
                password: hashed_password,
                created_at,
                verify_code,
                verify_code_expiry: new_date
            })

            await new_user.save()
            const send_verify_email = await sendVerificationEmail(email, "Verification email - Mate", username, verify_code)

            if(!send_verify_email.success){
                return Response.json({
                    success: false,
                    message: send_verify_email.message
                }, {status: 500})
            }

            return Response.json({message: "User registered successfully", success: true}, {status: 201})


        }
    } catch (error) {
        return Response.json({error: "Error in signup", success: false}, {status: 503})
    }
}