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
        Result.success(res, "user.listed", users)
    } catch (err) {
        next(err)
    }
}

const getUserById = async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await UserModel.findById(String(userId))
        Result.success(res, `User with the ID ${userId}`, user)
    } catch (error) {
        next(error)
    }
}

export {
    addUser,
    getUsers,
    getUserById
}