import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import baseModel from "./base.model.js";

const userSchema = new mongoose.Schema({
    fistname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    following: [{ time: Date, user: mongoose.Schema.Types.ObjectId }],
    followers: [{ time: Date, user: mongoose.Schema.Types.ObjectId }],
    ...baseModel
})

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10, "a")
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const UserModel = mongoose.model("users", userSchema)

export default UserModel