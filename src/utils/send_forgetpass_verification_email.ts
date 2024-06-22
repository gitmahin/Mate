import { resend } from "@/lib/resend";
import { api_response } from "@/response/api_response";
import verificationEmailForgetPassword from "../../emails/verificationEmailForgetPass";


export async function sendVerificationEmailForgetPassword(

    email: string,
    subject: string,
    verify_code: string

): Promise<api_response>{

    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: subject,
            react: verificationEmailForgetPassword({email, verify_code}),
          });
        return {message: "Verification email has been sent successfully", success: true}
    } catch (error) {
        console.log("Error sending verification email", error)
        return {message: "Failed to send verification email", success: false}
    }

}


