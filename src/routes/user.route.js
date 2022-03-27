import express from "express";
import { addUser, getUsers } from "../controllers/user.controller.js";

const userRouter = new express.Router()

userRouter.get("/", getUsers)
userRouter.post("/asd", addUser)


export default userRouter