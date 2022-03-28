import CityModel from "../models/city.model.js"
import Result from "../utils/Result.js"

const addCity = async (req, res, next) => {
    const city = req.body
    try {
        await new CityModel(city).save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        next(err)
    }
}

const getCities = async (req, res, next) => {
    const cities = await CityModel.find()
    Result.success(res, "Şehirler listelendi", cities)
}

export {
    addCity,
    getCities
}
