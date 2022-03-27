import UserModel from "../models/user.model.js";
import Result from "../utils/Result.js";

const addUser = async (req, res, next) => {
    const user = req.body
    try {
        await new UserModel(user).save()
        Result.success(res, "Kaydedildi")
    } catch(err) {
        res.status(400).json({
            error: err
        })
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find()
        Result.success(res, "Kullanıcılar listelendi", users)
    } catch(err) {
        Result.error(res, "Hata oluştu")
    }
    
}

export {
    addUser,
    getUsers
}