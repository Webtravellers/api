import express from "express";
import { addCity, getCities } from "../controllers/city.controller.js";

const cityRouter = new express.Router()

cityRouter.get("/", getCities)
cityRouter.post("/", addCity)


export default cityRouter
