import mongoose from "mongoose";
import bcrypt from "bcrypt";
import baseModel from "./base.model.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
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
    photo: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    wallpaper: {
        type: String,
    },
    bio: {
        type: String,
    },
    favoritesList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "locations"
        }

    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }

    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
        }
    ],
    resetToken: {
        data: String,
        default: ''
    },
    ...baseModel
})


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw Error("Hatalı eposta adresi");

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) throw Error("Şifre hatalı");

    user.password = null;
    return user;
};

// userSchema.pre("save", async function (next) {
//     const salt = await bcrypt.genSalt(10, "a")
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
