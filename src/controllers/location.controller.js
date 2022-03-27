import LocationModel from "../models/location.model.js";

const addLocation = async (req, res, next) => {
    const loc = req.body
    console.log(loc)
    try {
        await new LocationModel(loc).save()
        res.json("Kaydedildi")
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: err
        })
    }
}

const getLocations = async (req, res, next) => {
    const locs = await LocationModel.find()
    res.json(locs)
}

export {
    addLocation,
    getLocations
}