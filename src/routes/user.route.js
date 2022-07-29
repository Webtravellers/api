import express from "express";
import {
  addUser,
  getUserById,
  getUsers,
  updateUserProfile,
} from "../controllers/user.controller.js";
import {
  signIn,
  signUp,
  sendResetLink,
  resetPassword,
} from "../controllers/auth.controller.js";
import { AuthenticationMiddleware } from "../middleware/authenticationMiddleware.js";

const userRouter = new express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", addUser);
userRouter.get("/:id", getUserById);
userRouter.route("/update").post(AuthenticationMiddleware, updateUserProfile);

export default userRouter;
