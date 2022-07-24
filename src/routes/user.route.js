import express from "express";
import { addUser, getUserById, getUsers } from "../controllers/user.controller.js";
import { signIn, signUp, sendResetLink, resetPassword } from "../controllers/auth.controller.js";

const userRouter = new express.Router()

userRouter.get("/", getUsers)
userRouter.post("/", addUser)
userRouter.get('/:id', getUserById)


export default userRouter