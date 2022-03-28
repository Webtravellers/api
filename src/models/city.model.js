import mongoose from "mongoose"

const citySchema = new mongoose.Schema({
    cityName: {
        type: String,
        require: true
    }
}
)

const CityModel = mongoose.model("cities", citySchema)

export default CityModel