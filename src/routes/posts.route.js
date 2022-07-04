import express from "express"
import { addPost, getPostsByUser } from "../controllers/posts.controller.js"

const postRouter = new express.Router()

postRouter.post('/', addPost)
postRouter.get('/:id', getPostsByUser)


export default postRouter