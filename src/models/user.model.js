import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    fistname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    }
})

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10, "a")
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const UserModel = mongoose.model("users", userSchema)

export default UserModel