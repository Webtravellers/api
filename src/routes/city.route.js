import express from "express";
import { addCity, getCities } from "../controllers/city.controller.js";
import { AuthenticationMiddleware } from "../middleware/authenticationMiddleware.js";

const cityRouter = new express.Router()
// cityRouter.use(AuthenticationMiddleware)

cityRouter.get("/", getCities)
cityRouter.post("/", addCity)


export default cityRouter
