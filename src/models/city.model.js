import mongoose from "mongoose"
import baseModel from "./base.model.js"

const citySchema = new mongoose.Schema({
    cityName: {
        type: String,
        require: true
    },
    ...baseModel
}
)

const CityModel = mongoose.model("cities", citySchema)

export default CityModel