import express from "express"
import { addPost, getPostsByUser, newCommentAtPost } from "../controllers/posts.controller.js"

const postRouter = new express.Router()

postRouter.post("/", addPost)
postRouter.get('/getbyuser/:id', getPostsByUser)

postRouter.post("/:id/comments", newCommentAtPost)

export default postRouter