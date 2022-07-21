import express from "express";
import { addUser, getUserById, getUsers } from "../controllers/user.controller.js";
import { signIn, signUp, sendResetLink, resetPassword } from "../controllers/auth.controller.js";

const userRouter = new express.Router()

userRouter.get("/", getUsers)
userRouter.post("/", addUser)
userRouter.post("/signup", signUp)
userRouter.post("/signin", signIn)
userRouter.post('/forgot_password', sendResetLink)
userRouter.post('/reset_password/:token', resetPassword)
userRouter.get('/:id', getUserById)


export default userRouter