import express from "express";
import { addLocation, getLocations, getLocationById, deleteLocation, updateLocation, filterLocation, newCommentAtLocation, getLocationComments, addLocationToFavoriteList, handleRatingEvent } from "../controllers/location.controller.js";

const locationRouter = new express.Router()

locationRouter.get("/", getLocations)
locationRouter.post("/", addLocation)
locationRouter.post("/filter", filterLocation)


locationRouter.get("/:id", getLocationById)
locationRouter.delete("/:id", deleteLocation)
locationRouter.put("/:id", updateLocation)

//comment operations
locationRouter.get("/:id/comments", getLocationComments)
locationRouter.post("/:id/comments", newCommentAtLocation)

//handle ratings
locationRouter.post('/:id/ratings/:userId', handleRatingEvent)

//favorite list operations
locationRouter.post("/addFavorite/:id/:userid", addLocationToFavoriteList)

export default locationRouter