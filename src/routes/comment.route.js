import express from "express";
import { addComment, getComments, getLocationComments } from "../controllers/comment.controller.js";

const commentRouter = new express.Router()

commentRouter.get("/", getComments)
commentRouter.get("/locationComments/:locationId", getLocationComments)
commentRouter.post("/", addComment)


export default commentRouter
