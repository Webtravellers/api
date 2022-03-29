import PhotoTypeModel from "../models/photo-types.model.js"
import Result from "../utils/Result.js"

const addPhotoType = async (req, res, next) => {
    const photoType = req.body
    try {
        await new PhotoTypeModel(photoType).save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        next(err)
    }
}

const getPhotoTypes = async (req, res, next) => {
    const photoTypes = await PhotoTypeModel.find()
    Result.success(res, "Foto tipleri listelendi", photoTypes)
}

export {
    addPhotoType,
    getPhotoTypes
}
