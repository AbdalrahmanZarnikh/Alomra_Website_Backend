const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const { RemoveMultipleImagesCloudinary } = require("../utils/Cloudinary");

//get users
const getUsers = asyncHandler(async (req, res) => {
  const countDocuments = await User.countDocuments();

  const features = new ApiFeatures(User.find({}), req.query);

  features
    .Filter()
    .Search("UserModel")
    .Paginate(countDocuments)
    .LimitFields()
    .Sort();

  const { mongooseQuery, pagination } = features;

  const users = await mongooseQuery;

  if (!users) {
    return next(new ApiError("users Not Found !!", 404));
  }

  res.status(200).json({ status: "Success", pagination, data: users });
});
//get user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError("User Not Found!!!", 404));
  }
  res.status(200).json({ status: "success", data: user });
});
//create new user
const createUser = asyncHandler(async (req, res) => {
  if (req.images) {
    req.body.images = req.images;
  }

  const user = await User.create(req.body);
  res.status(201).json({ status: "Success", data: user });
});
//update user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.files?.images) {
    await RemoveMultipleImagesCloudinary(User, id);
    req.body.images = req.images;
  }

  const userUpdated = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!userUpdated) {
    return res.status(404).json({ status: "Fail", message: "User Not Found" });
  }
  res.status(200).json({ status: "Success", data: userUpdated });
});
//delete user
const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const findDocument = await User.findById(id);

  if (findDocument?.images) {
    await RemoveMultipleImagesCloudinary(User, id);
  }

  const document = await User.findByIdAndDelete(id);

  if (!document) {
    return res
      .status(404)
      .json({ status: "Fail", message: "Document not found" });
  }

  res
    .status(200)
    .json({ status: "Success", message: "Document deleted successfully" });
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
