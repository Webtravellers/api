import mongoose from "mongoose"

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    desc: {
        //Description about the location
        type: String,
        require: true
    },
    city: {
        //the city that location is in
<<<<<<< Updated upstream
        type: String,
=======
        type: mongoose.Schema.Types.ObjectId,
        ref: "cities",
>>>>>>> Stashed changes
        require: true
    },
    type: {
        //type of the location.Historical places, natural beauties, restaurants,museums ...
        type: String,
        require: true
    },
    location: {//Structure to save location coordinates as geoJSON
        type: Object,
        type: {
            type: String,
            enum: ['Point'],//Point schema
            require: true
        },
        coordinates: {
            type: [Number],
            require: true
        }
    }
})

const LocationModel = mongoose.model("locations", locationSchema)

export default LocationModel