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
    const postsOfuser = await PostModel.find({ postedBy: String(userId) });
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


const getPostById = async (req, res, next) => {
    const postId = req.params.postID
    try {
        const post = await PostModel.findById(String(postId))
        Result.success(res, `Post wiht id ${postId}`, post)
    } catch (error) {
        Result.error(res, `No post by given id ${postId}`, 404)
    }

}

const handleLikeEvent = async (req, res, next) => {
    const postId = req.params.postId
    const userId = req.params.userId
    try {
        const post = await PostModel.findById(String(postId))

        if (post.likes.includes(userId)) {
            await post.updateOne({ $pull: { likes: userId } });
            Result.success(res, "Beğeni geri çekildi")
        } else {
            await post.updateOne({ $push: { likes: userId } });
            Result.success(res, "Beğenildi")
        }
    } catch (err) {
        next(err)
    }

}

export {
    addPost,
    getPostsByUser,
    newCommentAtPost,
    getPostById,
    handleLikeEvent
}

