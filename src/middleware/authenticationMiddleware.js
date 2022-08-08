import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import Result from "../utils/Result.js";

export const AuthenticationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Giriş başarısız" });
  }
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const decodedData = jwt.verify(
        authorization.split(" ")[1],
        process.env.JWT_SECRET_KEY
      );
      req.user = await UserModel.findById(decodedData.id);
    } catch (err) {
      return Result.error(res, "Invalid token", 401);
    }
    next();
  }
};
