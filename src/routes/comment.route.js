import express from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";

const commentRouter = new express.Router()

commentRouter.get("/", getComments)
commentRouter.post("/", addComment)


export default commentRouter
