
import mongoose from 'mongoose'
import baseModel from './base.model.js'

const tripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
        unique: false
    },
    name: {
        type: String,
        require: true,
        unique: false
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    locations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "locations"
        }
    ],
    ...baseModel
})
    

const TripModel = mongoose.model("trips", tripSchema)

export default TripModel