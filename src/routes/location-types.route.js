import express from "express";
import { addLocationType, getLocationTypes } from "../controllers/location-types.controller.js";

const locationTypeRouter = new express.Router()

locationTypeRouter.get("/", getLocationTypes)
locationTypeRouter.post("/", addLocationType)

export default locationTypeRouter
