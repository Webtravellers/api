import mongoose from "mongoose"

const photoTypeSchema = new mongoose.Schema({
    // We have 3 photo types which are User, Comment and Location
    // It can be one of them
    photoTypeName: {
        type: String,
        enum: ["User", "Comment", "Location"],
        require: true
    }
}
)

const PhotoTypeModel = mongoose.model("photo-types", photoTypeSchema)

export default PhotoTypeModel