import express from "express";
import { addUser, getUserById, getUsers, handleFavoritesList } from "../controllers/user.controller.js";

const userRouter = new express.Router()

userRouter.get("/", getUsers)
userRouter.post("/", addUser)
userRouter.get('/:id', getUserById)
userRouter.post('/:userId/:locationId', handleFavoritesList)


export default userRouter