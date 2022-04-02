import express from "express";
import { addUser, getUsers } from "../controllers/user.controller.js";
import { signIn, signUp } from "../controllers/auth.controller.js";

const userRouter = new express.Router()

userRouter.get("/", getUsers)
userRouter.post("/", addUser)
userRouter.post("/signup", signUp)
userRouter.post("/signin", signIn)


export default userRouter