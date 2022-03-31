import express from "express";
import { addLocation, getLocations, getLocationById, deleteLocation } from "../controllers/location.controller.js";

const locationRouter = new express.Router()

locationRouter.get("/", getLocations)
locationRouter.post("/", addLocation)
locationRouter.get("/:id", getLocationById)
locationRouter.delete("/:id", deleteLocation)

export default locationRouter
