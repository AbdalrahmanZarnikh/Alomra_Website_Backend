const express = require("express");

const router = express.Router();
const {
 getTask,
 getTasks,
 createTask,
 updateTask,
 deleteTask
} = require("../controllers/taskController");



router
  .route("/")
  .get(getTasks)
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
    createTask
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
    updateTask
  )
  .get(getTask)
  .delete(deleteTask);

module.exports = router;
