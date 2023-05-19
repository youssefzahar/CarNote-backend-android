import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    description: { type: String },
    date: {
      type: Date,
      default: Date.now
    },
    idUser : {
      type : mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    userimage :{
      type: String,
    },
    username :{
      type: String,
    },
    idProduct : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Product"
    },

  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
export default model('Comment',CommentSchema);
