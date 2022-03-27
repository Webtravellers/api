import UserModel from "../models/user.model.js";

const addUser = async (req, res, next) => {
    const user = req.body
    console.log(user)
    try {
        await new UserModel(user).save()
        res.json("Kaydedildi")
    } catch(err) {
        console.log(err)
        res.status(400).json({
            error: err
        })
    }
    
}

const getUsers = async (req, res, next) => {
    const users = await UserModel.find()
    res.json(users)
}

export {
    addUser,
    getUsers
}