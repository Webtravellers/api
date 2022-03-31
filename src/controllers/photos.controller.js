import photoModel from "../models/photos.model.js"
import Result from "../utils/Result.js"

const addPhoto = async (req, res, next) => {
    const photo = req.body
    try {
        await new photoModel(photo).save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        next(err)
    }
}

const getPhoto = async (req, res, next) => {
    const photos = await photoModel.find()
    Result.success(res, "Fotograflar listelendi", photos)
}

export {
    addPhoto,
    getPhoto
}