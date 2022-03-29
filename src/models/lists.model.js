import mongoose from "mongoose";
import baseModel from "./base.model.js";

const listSchema = new mongoose.Schema({
    userId: {
        type: Number,
        require: true,
        unique: false
    },
    name: {
        type: String,
        require: true,
        unique: false
    },
    locations: {
        type: [Number],
        require: true
    },
    isFavorite: {
        type: Boolean,
        require: true,
        unique: false
    },
    ...baseModel

})

const ListModel = mongoose.model("lists", listSchema)


export default ListModel;