import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username : {
            type: String,
            unique: true
        },
        email : {
            type: String,
        },
        password : {
            type: String,
        },
        role : {
            type: String,
        },
        image : {
            type: String,
        },
        isVerified : {
            type: Boolean,
            default: false
        },
        active : {
            type: Boolean,
            default: true
        },
        otp : {
            type: String,
        },
    },

    {
        timestamps: true   
    }
)

export default model('User',userSchema);