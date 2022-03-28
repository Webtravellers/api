import mongoose from "mongoose"

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
    }
})

const CommentModel = mongoose.model("comments", commentSchema)

export default CommentModel