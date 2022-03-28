import mongoose from "mongoose"

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
    }
})

const CommentModel = mongoose.model("comments", commentSchema)

export default CommentModel