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
            default: 'userimage.png'
        },
        isVerified : {
            type: Boolean,
            default: true
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