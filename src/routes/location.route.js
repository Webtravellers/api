import express from "express";
import { addLocation, getLocations, getLocationById, deleteLocation, updateLocation, filterLocation, newCommentAtLocation } from "../controllers/location.controller.js";

const locationRouter = new express.Router()

locationRouter.get("/", getLocations)
locationRouter.post("/", addLocation)
locationRouter.post("/filter", filterLocation)


locationRouter.get("/:id", getLocationById)
locationRouter.delete("/:id", deleteLocation)
locationRouter.put("/:id", updateLocation)

locationRouter.post("/:id/comments", newCommentAtLocation)


export default locationRouter
