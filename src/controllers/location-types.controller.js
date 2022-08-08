import LocationTypeModel from "../models/location-types.model.js"
import Result from "../utils/Result.js"

const addLocationType = async (req, res, next) => {
    const locationType = req.body
    try {
        await new LocationTypeModel(locationType).save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        next(err)
    }
}

const getLocationTypes = async (req, res, next) => {
    const locationTypes = await LocationTypeModel.find()
    Result.success(res, "Lokasyon tipleri listelendi", locationTypes)
}

export {
    addLocationType,
    getLocationTypes
}
