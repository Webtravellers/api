import UserModel from "../models/user.model.js";
import Result from "../utils/Result.js";

const addUser = async (req, res, next) => {
    const user = req.body
    try {
        await new UserModel(user).save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        next(err)
    }
}



const getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find()
        Result.success(res, "Kullanıcılar listelendi", users)
    } catch (err) {
        next(err)
    }
}

export {
    addUser,
    getUsers
}