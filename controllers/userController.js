const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const {
  RemoveMultipleImagesCloudinary,
  RemoveMultipleFilesCloudinary,
} = require("../utils/Cloudinary");

// 📥 Get all users
const getUsers = asyncHandler(async (req, res) => {
  const countDocuments = await User.countDocuments();

  const features = new ApiFeatures(User.find({}), req.query)
    .Filter()
    .Search("UserModel")
    .Paginate(countDocuments)
    .LimitFields()
    .Sort();

  const { mongooseQuery, pagination } = features;
  const users = await mongooseQuery;

  if (!users) {
    return next(new ApiError("Users not found!", 404));
  }

  res.status(200).json({ status: "Success", pagination, data: users });
});

// 📥 Get single user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError("User not found!", 404));
  }
  res.status(200).json({ status: "Success", data: user });
});

// ➕ Create new user
const createUser = asyncHandler(async (req, res) => {
  if (req.images) {
    req.body.images = req.images;
  }
  if (req.uploadedFiles) {
    req.body.filePdf = req.uploadedFiles;
  }

  const user = await User.create(req.body);
  res.status(201).json({ status: "Success", data: user });
});

// ✏️ Update user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.files?.images) {
    await RemoveMultipleImagesCloudinary(User, id);
    req.body.images = req.images;
  }

  if (req.files?.files) {
    await RemoveMultipleFilesCloudinary(User, id); // حذف ملفات PDF القديمة
    req.body.filePdf = req.uploadedFiles;
  }

  const userUpdated = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!userUpdated) {
    return res.status(404).json({ status: "Fail", message: "User not found" });
  }

  res.status(200).json({ status: "Success", data: userUpdated });
});

// ❌ Delete user
const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const findDocument = await User.findById(id);

  if (findDocument?.images) {
    await RemoveMultipleImagesCloudinary(User, id);
  }

  if (findDocument?.filePdf) {
    await RemoveMultipleFilesCloudinary(User, id);
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
