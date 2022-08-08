import TripModel from "../models/trip.model.js";
import Result from "../utils/Result.js";

const getTripsByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const trips = await TripModel.find({ userId: userId }).populate({
            path: 'locations',
            populate: [{ path: 'city' }, { path: 'type' }]
        })
        Result.success(res, "Getirildi", trips);
    } catch (err) {
        next(err);
    }
}

const getTripByTripId = async (req, res, next) => {
    try {
        const tripId = req.params.tripId
        const trip = await TripModel.findById(String(tripId)).populate({
            path: 'locations',
            populate: [{ path: 'city' }, { path: 'type' }]
        })
        Result.success(res, "Getirildi", trip)
    } catch (err) {
        next(err)
    }
}

const newTrip = async (req, res, next) => {
    const userId = req.params.userId;
    const trip = req.body
    try {
        await new TripModel({ ...trip, userId: String(userId) }).save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        next(err)
    }
}

const updateTrip = async (req, res, next) => {
    const tripId = req.params.tripId
    const trip = req.body
    try {
        await TripModel.findByIdAndUpdate(tripId, trip)
        Result.success(res, "Güncellendi")
    } catch (err) {
        next(err)
    }
}

const addLocationToTrip = async (req, res, next) => {
    const tripId = req.params.tripId
    const locationId = req.body.location
    try {
        await TripModel.findByIdAndUpdate(tripId, {
            $push: {
                locations: locationId
            }
        })
        Result.success(res, "Ekledi")
    } catch (err) {
        next(err)
    }
}

const removeLocationFromTrip = async (req, res, next) => {
    const tripId = req.params.tripId
    const locationId = req.params.locationId
    try {
        await TripModel.findByIdAndUpdate(tripId, {
            $pull: {
                locations: locationId
            }
        })
        Result.success(res, "Silindi")
    } catch (err) {
        next(err)
    }
}

// const addLocationsToTrip = async (req, res, next) => {
//     const { tripId, locationIds } = req.body
//     try {
//         const trip = await TripModel.findById(tripId)
//         trip.locations = [...trip.locations, ...locationIds]
//         await trip.save()
//         Result.success(res, "Kaydedildi")
//     } catch (err) {
//         next(err)
//     }
// }

// const removeLocationsFromTrip = async (req, res, next) => {
//     const { tripId, locationIds } = req.body
//     try {
//         const trip = await TripModel.findById(tripId)
//         trip.locations = trip.locations.filter(locationId => !locationIds.includes(locationId))
//         await trip.save()
//         Result.success(res, "Kaydedildi")
//     } catch (err) {
//         next(err)
//     }   
// }

export {
    getTripsByUserId,
    getTripByTripId,
    newTrip,
    addLocationToTrip,
    removeLocationFromTrip,
    updateTrip
}