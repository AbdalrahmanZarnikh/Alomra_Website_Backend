const express = require("express");

const router = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

const { upload } = require("../utils/MulterConfig");

const UploadMultipleImages = require("../middlewares/UploadMultipleImagesMiddleware");
const UploadFiles=require("../middlewares/UploadFilesMiddleware")

router
  .route("/")
  .get(getUsers)
  .post(
    upload.fields([
      {
        name: "images",
        maxCount: 10,
      },
      {
        name: "filePdf",
        maxCount: 5,
      },
    ]),
    UploadMultipleImages,
    UploadFiles,
    createUser
  );

router
  .route("/:id")
  .put(
    upload.fields([
      {
        name: "images",
        maxCount: 10,
      },
      {
        name: "filePdf",
        maxCount: 5,
      },
    ]),
    UploadMultipleImages,
    UploadFiles,
    updateUser
  )
  .get(getUser)
  .delete(deleteUser);

module.exports = router;
