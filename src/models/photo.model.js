import mongoose from "mongoose"



const photoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require : true
    },
    
    dir:{
        type: String,
        require : true
    },

    photoType:{
        type: String,
        require : true
    },
})

const photoModel = mongoose.model("photos", photoSchema)


export default photoModel