import express from "express";
import { addPhotoType, getPhotoTypes } from "../controllers/photo-types.controller.js";

const photoTypeRouter = new express.Router()

photoTypeRouter.get("/", getPhotoTypes)
photoTypeRouter.post("/", addPhotoType)


export default photoTypeRouter
