import mongoose from "mongoose"
import baseModel from "./base.model.js"

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "cities",
        require: true
    },
    type: [
        {
            //type of the location.Historical places, natural beauties, restaurants,museums ...
            type: mongoose.Schema.Types.ObjectId,
            ref: "location-types",
        }
    ],
    location: {//Structure to save location coordinates as geoJSON
        type: {
            type: String,
            enum: ['Point'],//Point schema
            require: true
        },
        coordinates: {
            type: [Number],
            require: true
        }
    },
    photos: {
        type: String
    },
    ...baseModel
})

const LocationModel = mongoose.model("locations", locationSchema)

export default LocationModel
