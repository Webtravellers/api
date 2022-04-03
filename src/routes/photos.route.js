import express from "express";
import { addPhoto, getPhoto } from "../controllers/photos.controller.js";

const photoRouter = new express.Router()

photoRouter.get("/", getPhoto)
photoRouter.post("/", addPhoto)


export default photoRouter