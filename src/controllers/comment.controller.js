import CommentModel from "../models/comment.model.js"
import LocationModel from "../models/location.model.js";
import Result from "../utils/Result.js";

const addComment = async (req, res, next) => {
    const com = req.body
    try {
        await new CommentModel(com).save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        next(err)
    }
}

const getComments = async (req, res, next) => {
    const coms = await CommentModel.find().populate("location user")
    Result.success(res, "Yorumlar listelendi", coms)
}

const getLocationComments = async (req, res, next) => {
    try {
        const locationId = req.params["locationId"]
        if(!locationId) {
            Result.error(res, "Lokasyon bilgisi hatalı.")
        }
        if(!LocationModel.findOne({_id: locationId})) {
            Result.error(res, "Lokasyon bilgisi bulunamadı")
        }
        const comments = await CommentModel.find({location: locationId}).populate("location user")
        Result.success(res, "Gezi yerine ait yorumlar getirildi", comments)
    }catch(err) {
        next(err)
    }
}

export {
    addComment,
    getComments,
    getLocationComments
}
