import express from "express";
import { addPhoto, getPhoto } from "../controllers/photos.controller.js";

const photoRouter = new express.Router()

photoTypeRouter.get("/", getPhoto)
photoTypeRouter.post("/", addPhoto)


export default photoRouter