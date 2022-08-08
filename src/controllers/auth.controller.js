import UserModel from "../models/user.model.js";
import MongoError from "../utils/MongoError.js";
import Result from "../utils/Result.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/SendMail.js";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3h",
  });
};

const signIn = async (req, res, next) => {
  const data = req.body;
  try {
    const user = await UserModel.login(data.email, data.password);
    const token = createToken(user._id);
    const authResponse = {
      user: user,
      token: token,
    };

    Result.success(res, "Giriş başarılı", authResponse);
  } catch (err) {
    console.log(err);
    Result.error(res, err.message);
  }
};

const signUp = async (req, res, next) => {
  const data = req.body;
  try {
    const user = new UserModel(data);

    const salt = await bcrypt.genSalt(10, "a");
    user.password = await bcrypt.hash(data.password, salt);
    user
      .save()
      .then(() => {
        Result.success(res, "Kayıt başarılı");
      })
      .catch((err) => {
        let errMsg = "Bilinmeyen bir hata oluştu";

        if (MongoError.unique(err, "email")) {
          errMsg = "Eposta adresi zaten kullanımda";
        }
        if (MongoError.unique(err, "username")) {
          errMsg = "Kullanıcı adı zaten kullanımda";
        }
        Result.error(res, errMsg);
      });
  } catch (err) {
    console.log(err);
    Result.error(res, err);
  }
};

const sendResetLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!validator.isEmail(email)) {
      Result.error(res, "Geçersiz e-posta", 400);
    }
    if (!user) {
      Result.error(res, "Kullanıcı bulunamadı", 404);
    }
    const token = uuidv4() + "-" + user._id;
    const link = `${req.protocol}://${req.get(
      "host"
    )}/users/reset_password/${token}`;
    await UserModel.findOneAndUpdate({ email: email }, { resetToken: token });
    await sendMail(
      email,
      "Webtravellers2022@gmail.com",
      "Password Reset",
      `
            <div>Click the link below to reset your password</div>
            <br/>
            <div>${link}</div>
            `
    );

    Result.success(res, "Şifre sıfırlama linki e-postana göderildi");
  } catch (error) {
    return new Error(error);
  }
};

const resetPassword = async (req, res, next) => {
  const user = await UserModel.findOne({ resetToken: req.params.token });
  if (!user) {
    Result.error(res, "Kullanıcı bulunamadı", 404);
    return;
  }

  const { newPassword, newPasswordRepeat } = req.body;
  if (newPassword !== newPasswordRepeat) {
    Result.error(res, "Şifreler uyuşmuyor.", 400);
    return;
  }
  user.password = newPassword;
  user.resetToken = "";
  await user.save();
  Result.success(res, "Şifre başarıyla değiştirildi");
};

export { signIn, signUp, sendResetLink, resetPassword };
