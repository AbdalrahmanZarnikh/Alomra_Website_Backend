const OmraModel = require("../models/omraModel");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");



exports.GetAllOmras = asyncHandler(async (req, res, next) => {
  const countDocuments = await OmraModel.countDocuments();

  const features = new ApiFeatures(OmraModel.find({}), req.query);

  features
    .Paginate(countDocuments)
    .Filter()
    .Search("OmraModel")
    .LimitFields()
    .Sort();

  const { mongooseQuery, pagination } = features;

  const omras = await mongooseQuery;

  if (!omras) {
    return next(new ApiError("Omras Not Found !!", 404));
  }

  res.status(200).json({ status: "Success", pagination, data: omras });
});

exports.GetOneOmra = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const omra = await OmraModel.findById(id);

  if (!omra) {
    return res
      .status(404)
      .json({ status: "Fail", message: "Omra Not Found" });
  }

  res.status(200).json({ status: "Success", data: omra });
});

exports.CreateOmra = asyncHandler(async (req, res, next) => {
  const omra = await OmraModel.create(req.body);
  res.status(201).json({ status: "Success", data: omra });
});

exports.UpdateOmra = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const omraUpdated = await OmraModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!omraUpdated) {
    return res
      .status(404)
      .json({ status: "Fail", message: "Omra Not Found" });
  }
  res.status(200).json({ status: "Success", data: omraUpdated });
});

exports.DeleteOmra = asyncHandler(async (req, res) => {
  const { id } = req.params;
 
  const document = await OmraModel.findByIdAndDelete(id);



  // delete all documents in UserModel that reference this document
  await OmraModel.deleteMany({ omra: id });


 

  if (!document) {
    return res
      .status(404)
      .json({ status: "Fail", message: "Document not found" });
  }

  res
    .status(200)
    .json({ status: "Success", message: "Document deleted successfully" });
});
