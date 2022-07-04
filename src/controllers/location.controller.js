import LocationModel from "../models/location.model.js";
import Result from "../utils/Result.js"


const addLocation = async (req, res, next) => {
    const loc = req.body
    try {
        await new LocationModel(loc).save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const updateLocation = async (req, res, next) => {
    const loc = req.body
    try {
        const currentLoc = await LocationModel.findOne({ _id: loc._id })
        if (!currentLoc) {
            Result.error(res, "Location not found")
        } else {
            LocationModel.updateOne({ _id: loc._id }, { ...loc }, { upsert: true }, (err) => { })
            Result.success(res, "Updated location")
        }
    } catch (err) {
        next(err)
        console.log(err)
    }
}

const getLocations = async (req, res, next) => {
    const locs = await LocationModel.find().populate("city type")
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
        Result.success(res, "Lokasyon silindi ")
    }
    catch (err) {
        Result.error(res, "Geçersiz Lokasyon id", 404)
    }
}

const filterLocation = async (req, res, next) => {
    const filter = req.body
    try {
        let locations = await LocationModel.find().populate("city type")
        if (filter.city) {
            locations = locations.filter(loc => loc.city._id == filter.city)
        }
        if (filter.type) {
            locations = locations.filter(loc => loc.type.some(x => x._id == filter.type))
        }
        Result.success(res, "Lokasyonlar listelendi", locations)
    }
    catch (err) {
        next(err)
    }
}

export {
    addLocation,
    getLocations,
    getLocationById,
    deleteLocation,
    updateLocation,
    filterLocation
}
