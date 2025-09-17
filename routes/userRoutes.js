const express = require("express");

const router = express.Router();
const {
   createUser,
   updateUser,
   deleteUser,
   getUser,
   getUsers
} = require("../controllers/userController");




const {upload} =require("../utils/MulterConfig")


const UploadMultipleImages = require("../middlewares/UploadMultipleImagesMiddleware");

router
  .route("/")
  .get(getUsers)
  .post(
    upload.fields([
      {
        name: "images",
        maxCount: 10,
      },
    ]),
    UploadMultipleImages,
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
    ]),
    UploadMultipleImages,
    updateUser
  )
  .get(getUser)
  .delete(deleteUser);

module.exports = router;
