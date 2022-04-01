import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    userId:{
        type: String,
        require : true
    },
    
    dir:{
        type: String,
        require : true
    },

    photoType:{
        type: String,
        require : true
    }
})

const photoModel = mongoose.model("photos", photoSchema)


export default photoModel