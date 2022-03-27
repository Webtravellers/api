import express from "express";
import { addLocation, getLocations } from "../controllers/location.controller.js";

const locRouter = new express.Router()

locRouter.get("/", getLocations)
locRouter.post("/", addLocation)


export default locRouter