import mongoose from "mongoose"

const locationTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
}
)

const LocationTypeModel = mongoose.model("location-types", locationTypeSchema)

export default LocationTypeModel
