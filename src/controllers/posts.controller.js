import PostModel from "../models/post.model.js"
import UserModel from "../models/user.model.js"
import { imageUpload } from "../utils/imageUploader.js"
import MongoError from "../utils/MongoError.js"
import Result from "../utils/Result.js"


const addPost = async (req, res, next) => {
    const userId = req.params.id
    const fileRes = await imageUpload(req.files.photo.tempFilePath);
    const postData = {
        caption: req.body.caption,
        postedBy: userId,
        photo: fileRes.url
    }
    try {
        const post = await new PostModel(postData).save()
        const user = await UserModel.findById(String(userId))
        user.posts.push(post._id)
        await user.save()
        Result.success(res, "save")
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const getPostsByUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        const postsOfuser = await PostModel.find({ postedBy: String(userId) })
        // res.json(postsOfuser)
        Result.success(res, `${userId} id'li kullanıcının gönderileri`, postsOfuser)

    } catch (error) {
        Result.error(res, `${error}`, 404)
    }

}

export {
    addPost,
    getPostsByUser
}
