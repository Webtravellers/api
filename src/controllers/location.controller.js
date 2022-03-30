import LocationModel from "../models/location.model.js";
import Result from "../utils/Result.js"


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

const getLocationById = async (req, res, next) => {
    const id = req.params.id
    try {
        const location = await LocationModel.findById(String(id))
        Result.success(res, `${id} id'li lokasyon`, location)
    }
    catch (err) {
        Result.error(res, "Geçersiz lokasyon id", 404)
    }

}

const deleteLocation = async (req, res, next) => {
    const id = req.params.id
    const filter = { _id: String(id) }
    const update = { status: false }
    try {
        await LocationModel.findOneAndUpdate(filter, update)
        Result.success(res, "Lokasyon silindi (Şaka  şaka status false'a değişti (: )")
    }
    catch (err) {
        Result.error(res, "Geçersiz Lokasyon id", 404)
    }

}

export {
    addLocation,
    getLocations,
    getLocationById,
    deleteLocation
}
