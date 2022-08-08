import mongoose from "mongoose";
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import { imageUpload } from "../utils/imageUploader.js";
import MongoError from "../utils/MongoError.js";
import Result from "../utils/Result.js";

const addPost = async (req, res, next) => {
  const userId = req.params.id;
  const fileRes = await imageUpload(req.files.photo.tempFilePath);
  const postData = {
    caption: req.body.caption,
    postedBy: userId,
    photo: fileRes.url,
  };
  try {
    const post = await new PostModel(postData).save();
    const user = await UserModel.findById(String(userId));
    user.posts.push(post._id);
    await user.save();
    Result.success(res, "save");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getPostsByUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const postsOfuser = await PostModel.find({ postedBy: String(userId) }).populate("postedBy");
    // res.json(postsOfuser)
    Result.success(
      res,
      `${userId} id'li kullanıcının gönderileri`,
      postsOfuser
    );
  } catch (error) {
    Result.error(res, `${error}`, 404);
  }
};

const newCommentAtPost = async (req, res, next) => {
  const postId = req.params.id;
  const commentData = {
    comment: req.body.comment,
    user: req.body.user,
    date: new Date(),
  };
  try {
    const post = await PostModel.findById(String(postId));
    post.comments.push(commentData);
    await post.save();
    Result.success(res, "comment.save");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getPostComments = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await PostModel.findById(String(postId)).populate(
      "comments.user"
    );
    if (!post) {
      Result.error(res, "post.notFound");
    } else {
      Result.success(res, "comment.get", post.comments);
    }
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  const postId = req.params.id
  try {
    const post = await PostModel.findById(String(postId))
    Result.success(res, `Post wiht id ${postId}`, post)
  } catch (error) {
    Result.error(res, `No post by given id ${postId}`, 404)
  }

}

const handleLikeEvent = async (req, res, next) => {
  const postId = req.params.id
  const userId = req.params.userId
  try {
    const post = await PostModel.findById(String(postId))
    let msg = "Beğenildi";
    if (post.likes?.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      msg = "Beğeni geri çekildi"
    } else {
      await post.updateOne({ $push: { likes: userId } });
    }
    const updatedPost = await PostModel.findById(String(post._id)).populate("postedBy");
    Result.success(res, msg, updatedPost)
  } catch (err) {
    next(err)
  }

}

const getAllPosts = async (req, res, next) => {
  const skip = req.query.skip ? Number(req.query.skip) : 0;

  const DEFAULT_LIMIT = 10;

  try {
    const posts = await PostModel.find({}).sort("-date").skip(skip).limit(DEFAULT_LIMIT).populate("postedBy");
    const t = await PostModel.countDocuments()
    res.json({ data: posts, total: t, message: "Success getting posts", success: true});
  } catch (error) {
    Result.error(res, "Error getting posts", error.message)
  }


}

export {
  addPost,
  getPostsByUser,
  newCommentAtPost,
  getPostById,
  handleLikeEvent,
  getAllPosts,
  getPostComments
}

