import UserModel from "../models/user.model.js";
import Result from "../utils/Result.js";
import { createToken } from "./auth.controller.js";
import { imageUpload } from "../utils/imageUploader.js";
import { MongoClient, ObjectId } from "mongodb";

const localUrl = `mongodb+srv://WebTravellers:Webtravellers5@webtravellers.1nmip.mongodb.net/WebTravellers?authSource=admin&replicaSet=atlas-punzrw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

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
    const user = await UserModel.findById(String(userId)).populate(
      "favoritesList"
    );
    Result.success(res, `User with the ID ${userId}`, user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);
  var fileRes = "";
  if (req.files != null) {
    fileRes = await imageUpload(req.files.photo.tempFilePath);
  }

  const updatedData = {
    name:
      req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1) ||
      user.name.charAt(0).toUpperCase() + user.name.slice(1),
    lastname:
      req.body.lastname.charAt(0).toUpperCase() + req.body.lastname.slice(1) ||
      user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1),
    email: req.body.email || user.email,
    photo: fileRes.url || user.photo,
  };
  try {
    UserModel.updateOne(
      { _id: userId },
      { ...updatedData },
      { upsert: true },
      (err) => {}
    );
    // MongoClient.connect(localUrl, function (err, db) {
    //   var dbo = db.db("WebTravellers");
    //   dbo
    //     .collection("users")
    //     .updateOne(
    //       { _id: ObjectId(userId) },
    //       { $set: updatedData },
    //       function (err, res) {
    //         console.log("Document updated");
    //         db.close();
    //       }
    //     );
    // });
    Result.success(res, "save");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const handleFavoritesList = async (req, res, next) => {
  const locationId = req.params.locationId;
  const userId = req.params.id;
  let msg = "Favorilere eklendi";
  try {
    const user = await UserModel.findById(String(userId));
    if (user.favoritesList.includes(locationId)) {
      await user.updateOne({ $pull: { favoritesList: locationId } });
      msg = "Favorilerden çıkarıldı";
    } else {
      await user.updateOne({ $push: { favoritesList: locationId } });
    }
    const updatedUser = await UserModel.findById(String(userId)).populate(
      "favoritesList"
    );
    Result.success(res, msg, updatedUser);
  } catch (err) {
    next(err);
  }
};

const handleFollowAction = async (req, res, next) => {
  try {
    const loggedInUser = await UserModel.findById(req.params.id);
    const userToFollow = await UserModel.findById(req.body.userToFollow);

    if (loggedInUser.following.includes(userToFollow._id)) {
      await userToFollow.updateOne({ $pull: { followers: loggedInUser._id } });
      await loggedInUser.updateOne({ $pull: { following: userToFollow._id } });
      Result.success(res, "Unfollowed", null);
    } else {
      await userToFollow.updateOne({ $push: { followers: loggedInUser._id } });
      await loggedInUser.updateOne({ $push: { following: userToFollow._id } });
      Result.success(res, "Followed", null);
    }
  } catch (error) {
    next(error);
  }
};

export {
  addUser,
  getUsers,
  getUserById,
  handleFavoritesList,
  updateUserProfile,
  handleFollowAction,
};
