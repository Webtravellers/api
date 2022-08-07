import LocationModel from "../models/location.model.js";
import UserModel from "../models/user.model.js";
import Result from "../utils/Result.js";

const addLocation = async (req, res, next) => {
  const loc = req.body;
  try {
    await new LocationModel(loc).save();
    Result.success(res, "Kaydedildi");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateLocation = async (req, res, next) => {
  const loc = req.body;
  try {
    const currentLoc = await LocationModel.findOne({ _id: loc._id });
    if (!currentLoc) {
      Result.error(res, "Location not found");
    } else {
      LocationModel.updateOne(
        { _id: loc._id },
        { ...loc },
        { upsert: true },
        (err) => {}
      );
      Result.success(res, "Updated location");
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const getLocations = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  const cities = req.query.city?.split(",")??[]
  const types = req.query.types?.split(",")??[]
  

  try {
    let locations = await LocationModel.find().populate("city type");
    if (cities.length != 0 && cities[0]) {
      locations = locations.filter((loc) => cities.includes(String(loc.city._id)));
    }
    if (types.length != 0 && types[0]) {
      locations = locations.filter((loc) =>
        loc.type.some((x) => types.includes(String(x._id)))
      );
    }
    const total = locations.length
    locations = locations.filter((x,i) => (page - 1) * size <= i && i < (page) * size ) 

    res.status(200).json({
        success: true,
        message: "filter",
        data: locations,
        totalPageSize: total
    })
  } catch (err) {
    next(err);
  }
};

const getLocationById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const location = await LocationModel.findById(String(id));
    Result.success(res, `${id} id'li lokasyon`, location);
  } catch (err) {
    Result.error(res, "Geçersiz lokasyon id", 404);
  }
};

const deleteLocation = async (req, res, next) => {
  const id = req.params.id;
  const filter = { _id: String(id) };
  const update = { status: false };
  try {
    await LocationModel.findOneAndUpdate(filter, update);
    Result.success(res, "Lokasyon silindi ");
  } catch (err) {
    Result.error(res, "Geçersiz Lokasyon id", 404);
  }
};

const filterLocation = async (req, res, next) => {
  const filter = req.body;
  try {
    let locations = await LocationModel.find().populate("city type");
    if (filter.city) {
      locations = locations.filter((loc) => loc.city._id == filter.city);
    }
    if (filter.type) {
      locations = locations.filter((loc) =>
        loc.type.some((x) => x._id == filter.type)
      );
    }
    Result.success(res, "Lokasyonlar listelendi", locations);
  } catch (err) {
    next(err);
  }
};

const newCommentAtLocation = async (req, res, next) => {
  const locationId = req.params.id;
  const commentData = {
    comment: req.body.comment,
    user: req.body.user,
    score: parseInt(req.body.score ?? 0),
    date: new Date(),
  };
  try {
    const location = await LocationModel.findById(String(locationId));
    if (!location) {
      Result.error(res, "location.notFound");
    } else {
      location.comments.push(commentData);
      await location.save();
      Result.success(res, "comment.save");
    }
  } catch (err) {
    next(err);
  }
};

const getLocationComments = async (req, res, next) => {
  const locationId = req.params.id;
  try {
    const location = await LocationModel.findById(String(locationId)).populate(
      "comments.user"
    );
    if (!location) {
      Result.error(res, "location.notFound");
    } else {
      Result.success(res, "comment.get", location.comments);
    }
  } catch (err) {
    next(err);
  }
};

const addLocationToFavoriteList = async (req, res, next) => {
  const locationId = req.params.id;
  const userId = req.params.userid;
  try {
    const user = await UserModel.findById(String(userId));
    user.favoritesList.push(locationId);
    await user.save();
    Result.success(res, "added to favorite");
  } catch (err) {
    next(err);
  }
};

export {
  addLocation,
  getLocations,
  getLocationById,
  deleteLocation,
  updateLocation,
  filterLocation,
  newCommentAtLocation,
  getLocationComments,
  addLocationToFavoriteList,
};
