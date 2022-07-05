import mongoose from "mongoose"
import baseModel from "./base.model.js"

const postSchema = new mongoose.Schema({
    photos: [
        {
            type: String, //Photo url. Sample: https://statics.webtravellers.com/photos/locations/locationA1.jpg,
            required: true,
        }
    ],
    caption: {
        type: String,
        trim: true
    },
    likes_count: {
        type: Number,
        default: 0,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: true,
            },
            comment: {
                type: String,
                required: true,
                trim: true
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    ...baseModel
}
)

const PostModel = mongoose.model("posts", postSchema)

export default PostModel