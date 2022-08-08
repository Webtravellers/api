import express from "express";
import { signIn, signUp, sendResetLink, resetPassword } from "../controllers/auth.controller.js";

const authRouter = new express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.post('/forgot_password', sendResetLink)
authRouter.post('/reset_password/:token', resetPassword)

export default authRouter