import LocationModel from "../models/location.model.js";

const addLocation = async (req, res, next) => {
    const loc = req.body
    try {
        await new LocationModel(loc).save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        next(err)
    }
}

const getLocations = async (req, res, next) => {
    const locs = await LocationModel.find()
    Result.success(res, "Lokasyonlar listelendi", locs)
}

export {
    addLocation,
    getLocations
}
