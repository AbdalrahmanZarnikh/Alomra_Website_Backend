const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const omraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "omra name  required"],
    }
  },
  { timestamps: true }
);

const OmraModel = mongoose.model("Omra", omraSchema);

module.exports = OmraModel;
