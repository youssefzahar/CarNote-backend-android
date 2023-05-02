import mongoose from "mongoose";
const { Schema, model } = mongoose;

const carSchema = new Schema({
    modele: {
        type: String,
    },
    marque: {
        type: String,
    },
    puissance: {
        type: Number,
    },
    carburant: {
        type: String,
    },
    description: {
        type: String,
    },
    owned_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    visibility: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    date_circulation: {
        type: String
    }
}, {timestamps: true} )

export default model('Car',carSchema);