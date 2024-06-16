import mongoose, {Schema, Document} from "mongoose";


export interface User extends Document{
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    created_at: string,
    is_verified: boolean,
    verify_code: string,
    verify_code_expiry: Date

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
    is_verified:{
        type: Boolean,
        default: false,
        required: [true, "Verify code is required"]
    },
    verify_code_expiry:{
        type: Date,
        required: [true, "Verify code expiry is required"]
    }
})

const user_model = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", user_schema)

export default user_model