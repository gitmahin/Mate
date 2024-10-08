import mongoose, {Schema, Document} from "mongoose";

export interface Messages extends Document{
    f_name_sender: string,
    l_name_sender: string,
    sender: string,
    content: string,
    sent_at: Date
}

const message_schema: Schema<Messages> = new Schema({
    f_name_sender: {
        type: String,
        
    },
    l_name_sender: {
        type: String,
        
    },
    sender: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    sent_at: {
        type: Date,
        required: true,
        default: Date.now()

    }
})


export interface User extends Document{
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    created_at: string,
    verify_code: string,
    is_verified: boolean,
    verify_code_expiry: Date,
    messages: Messages[],
    verified_user_to_reset_pass: boolean,
    duration_of_next_reset_pass_request: Date,
    last_password_changed: Date
}


const user_schema: Schema<User> = new Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"]
    },
    last_name:{
        type: String,
        match: [/^[a-zA-Z\-]+$/, "Invalid name"],
        required: [true, "Last name is required"]
    },
    username:{
        type: String,
        unique: true,
        required: [true, "Username is required"]
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"]
    },
    password:{
        type: String,
        min: [6, "Password should be at least 6 characters"],
        required: [true, "Password is required"]
    },
    created_at: {
        type: String,
        required: [true, "Account creation date is required"]
    },
    verify_code:{
        type: String,
        required: [true, "Verify code is required"]
    },
    is_verified:{
        type: Boolean,
        default: false,
        required: [true, "Verify code is required"]
    },
    verify_code_expiry:{
        type: Date,
        required: [true, "Verify code expiry is required"]
    },
    messages: [message_schema],
    verified_user_to_reset_pass: {
        type: Boolean,
        required: true,
        default: false
    },
    duration_of_next_reset_pass_request: {
        type: Date,
    },
    last_password_changed: {
        type: Date
    }

})

const user_model = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", user_schema)

export default user_model