import mongoose from "mongoose";
const { Schema, model } = mongoose;

const entretienSchema = new Schema({
    title: {
        type: String,
    },
    date: {
        type: String,
    },
    description: {
        type: String,
    },
    owned_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true} )

export default model('Entretien',entretienSchema);