import UserModel from "../models/user.model.js";
import Result from "../utils/Result.js";
import asyncHandler from "express-async-handler";
import { createToken } from "./auth.controller.js";

const addUser = async (req, res, next) => {
  const user = req.body;
  try {
    await new UserModel(user).save();
    Result.success(res, "Kaydedildi");
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    Result.success(res, "user.listed", users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(String(userId));
    Result.success(res, `User with the ID ${userId}`, user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.photo = req.body.photo || user.photo;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      token: createToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { addUser, getUsers, getUserById, updateUserProfile };
