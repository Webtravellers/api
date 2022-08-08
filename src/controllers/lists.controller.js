import ListModel from "../models/lists.model.js";
import Result from "../utils/Result.js";


const addToList = async (req, res, next) => {
    const data = req.body;

    try {
        await new ListModel(data).save()
        Result.success(res, "Kaydedildi")
    }
    catch (err) {
        console.log(err);
        next(err)
    }
}

const getFromList = async (req, res, next) => {

    try {
        const lists = await ListModel.find()
        Result.success(res, "Listeler", lists)
    }
    catch (err) {

        next(err)
    }
}


export {
    addToList,
    getFromList
}