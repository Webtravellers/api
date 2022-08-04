import express from "express";
import { addLocationToTrip, getTripByTripId, getTripsByUserId, newTrip, removeLocationFromTrip, updateTrip } from "../controllers/trip.controller.js";

const tripRouter = new express.Router()

tripRouter.get("/:userId", getTripsByUserId)
tripRouter.get("/:userId/:tripId", getTripByTripId)
tripRouter.post("/:userId", newTrip)
tripRouter.put("/:userId/:tripId", updateTrip)
tripRouter.post("/:userId/:tripId/locations", addLocationToTrip)
tripRouter.delete("/:userId/:tripId/locations/:locationId", removeLocationFromTrip)



export default tripRouter