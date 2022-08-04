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
    const user = await UserModel.findById(String(userId));
    Result.success(res, `User with the ID ${userId}`, user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  const userId = req.params.id;
  const user = await UserModel.findById(req.user._id);
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
    MongoClient.connect(localUrl, function (err, db) {
      var dbo = db.db("WebTravellers");
      dbo
        .collection("users")
        .updateOne(
          { _id: ObjectId(userId) },
          { $set: updatedData },
          function (err, res) {
            console.log("Document updated");
            db.close();
          }
        );
    });
    Result.success(res, "save");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const handleFavoritesList = async (req, res, next) => {
    const locationId = req.params.locationId
    const userId = req.params.userId

    try {
        const user = await UserModel.findById(String(userId))
        if (user.favoritesList.includes(locationId)) {
            await user.updateOne({ $pull: { favoritesList: locationId } });
            Result.success(res, "Favorilerden çıkartıldı")
        }
        else {
            await user.updateOne({ $push: { favoritesList: locationId } })
            Result.success(res, "Favorilere eklendi")
        }

    } catch (err) {
        next(err)
    }
}

export {
    addUser,
    getUsers,
    getUserById,
    handleFavoritesList,
    updateUserProfile
}
