const express = require("express");

const router = express.Router();
const {
 CreateOmra,
  GetAllOmras,
  GetOneOmra,
  UpdateOmra,
  DeleteOmra
} = require("../controllers/omraController");





router
  .route("/")
  .get(GetAllOmras)
  .post(
    CreateOmra
  );

router
  .route("/:id")
  .put(
    UpdateOmra
  )
  .get(GetOneOmra)
  .delete(DeleteOmra);

module.exports = router;
