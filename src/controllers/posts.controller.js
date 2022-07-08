import PostModel from "../models/post.model.js"
import UserModel from "../models/user.model.js"
import MongoError from "../utils/MongoError.js"
import Result from "../utils/Result.js"


const addPost = async (req, res, next) => {
    const postData = req.body
    const userId = req.params.id
    try {
        const post = await new PostModel(postData).save()
        const user = await UserModel.findById(String(userId))
        user.posts.push(post._id)
        await user.save()
        Result.success(res, "Kaydedildi")
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const getPostsByUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        const postsOfuser = await PostModel.find({ user: String(userId) })
        Result.success(res, `${userId} id'li kullanıcının gönderileri`, postsOfuser)

    } catch (error) {
        Result.error(res, `${error}`, 404)
    }

}

export {
    addPost,
    getPostsByUser
}
