import express from "express";
import {
  addUser,
  getUserById,
  getUsers, handleFavoritesList, handleFollowAction, updateUserProfile
} from "../controllers/user.controller.js";
import { AuthenticationMiddleware } from "../middleware/authenticationMiddleware.js";

const userRouter = new express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", addUser);
userRouter.get("/:id", getUserById);
userRouter
  .route("/:id/update")
  .post(AuthenticationMiddleware, updateUserProfile);
userRouter.post("/:id/follows/", handleFollowAction)
userRouter.post('/:id/favorites/:locationId', handleFavoritesList)


export default userRouter;
