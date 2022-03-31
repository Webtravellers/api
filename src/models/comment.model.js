import mongoose from "mongoose"
import baseModel from "./base.model.js"

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "locations",
        require: true
    },
    ...baseModel
})

const CommentModel = mongoose.model("comments", commentSchema)

export default CommentModel
