import express from "express"
import { addPost, getAllPosts, getPostById, getPostsByUser, handleLikeEvent, newCommentAtPost } from "../controllers/posts.controller.js"

const postRouter = new express.Router()

postRouter.get("", getAllPosts)
postRouter.post("/:id", addPost) // id in params refers to user id. Add post method used when new post is added to the user with given userID
postRouter.get('/getbyuser/:id', getPostsByUser)
postRouter.get('/:id', getPostById) // gets post by given postID
postRouter.post("/:id/comments", newCommentAtPost)
postRouter.post('/:id/likes/:userId', handleLikeEvent) // Handle the like event

export default postRouter