import CommentModel from "../models/comment.model.js"
import Result from "../utils/Result.js";

const addComment = async (req, res, next) => {
    const com = req.body
    try {
        await new LocationModel(com).save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        next(err)
    }
}

const getComments = async (req, res, next) => {
    const coms = await CommentModel.find()
    Result.success(res, "Lokasyonlar listelendi", coms)
}

export {
    addComment,
    getComments
}
