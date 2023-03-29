import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
    },
    stock: {
        type: Number,
    },
    prix: {
        type: Number,
    },
    description: {
        type: String,
    },
    owned_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    }
}, {timestamps: true} )

export default model('Product',productSchema);