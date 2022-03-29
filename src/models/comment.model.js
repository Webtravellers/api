import mongoose from "mongoose"
import baseModel from "./base.model.js"
const commentSchema = new mongoose.Schema({
    userId: {
        type: Number,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    locationId: {
        type: Number,
        require: true
    },
    ...baseModel
})

const CommentModel = mongoose.model("comments", commentSchema)

export default CommentModel