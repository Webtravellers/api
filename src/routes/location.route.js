import express from "express";
import { addLocation, getLocations, getLocationById, deleteLocation, updateLocation, filterLocation, newCommentAtLocation, getLocationComments, addLocationToFavoriteList } from "../controllers/location.controller.js";

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

//favorite list operations
locationRouter.post("/addFavorite/:id/:userid", addLocationToFavoriteList)

export default locationRouter