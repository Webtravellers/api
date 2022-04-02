import UserModel from "../models/user.model.js";
import MongoError from "../utils/MongoError.js"
import Result from "../utils/Result.js";
import jwt from "jsonwebtoken"



const createToken = (id) => {
    return jwt.sign({ id }, 'SuperPassword', {
        expiresIn: '3h'
    })
}


const signIn = async (req, res, next) => {
    const data = req.body

    try {
        const user = await UserModel.login(data.email, data.password)
        const token = createToken(user._id)
        const authResponse = {
            user: user,
            token: token
        }

        Result.success(res, "Giriş başarılı", authResponse)
    }
    catch (err) {
        console.log(err);
        Result.error(res, err.message)
    }
}

const signUp = async (req, res, next) => {
    const data = req.body

    const user = new UserModel(data)
    user.save()
        .then(() => {
            Result.success(res, 'Kayıt başarılı')
        })
        .catch(err => {
            let errMsg = "Bilinmeyen bir hata oluştu"

            if (MongoError.unique(err, "email")) {
                errMsg = "Eposta adresi zaten kullanımda"
            }
            Result.error(res, errMsg)
        })

}

export {
    signIn,
    signUp
}