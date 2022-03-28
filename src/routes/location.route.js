import express from "express";
import { addLocation, getLocations } from "../controllers/location.controller.js";

const locationRouter = new express.Router()

locationRouter.get("/", getLocations)
locationRouter.post("/", addLocation)


export default locationRouter
