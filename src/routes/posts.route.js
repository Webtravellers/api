import express from "express"
import { addPost, getPostById, getPostsByUser, handleLikeEvent, newCommentAtPost } from "../controllers/posts.controller.js"

const postRouter = new express.Router()

postRouter.post("/:id", addPost) // id in params refers to user id. Add post method used when new post is added to the user with given userID
postRouter.get('/getbyuser/:id', getPostsByUser)
postRouter.get('/:postID', getPostById) // gets post by given postID
postRouter.post('/:postId/:userId', handleLikeEvent) // Handle the like event
postRouter.post("/:id/comments", newCommentAtPost)

export default postRouter