import { uploadCloudinaryImage } from "./cloudinary.js"

const cloudinaryInitialOptions = {
    folder: "main"
}

export const imageUpload = async (path, options = cloudinaryInitialOptions) => {
    try {
        const fileRes = await uploadCloudinaryImage(path, options)
        return fileRes
    } catch (err) {
        throw err
    }
}
