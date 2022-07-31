import express from "express";
import { addLocationToTrip, getTripsByUserId, newTrip, removeLocationFromTrip, updateTrip } from "../controllers/trip.controller.js";

const tripRouter = new express.Router()

// cityRouter.get("/", )
tripRouter.get("/:userId", getTripsByUserId)
tripRouter.post("/:userId", newTrip)
tripRouter.put("/:userId/:tripId", updateTrip)
tripRouter.post("/:userId/:tripId/locations", addLocationToTrip)
tripRouter.delete("/:userId/:tripId/locations", removeLocationFromTrip)



export default tripRouter