const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "user name required"],
    },
    phone: {
      type: String,
      trim: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    taslim: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    details: {
      type: String,
    },
    room: {
      type: String,
    },
    safar: {
      type: String,
    },
    omra: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Omra",
    },
  },
  { timestamps: true }
);

userSchema.pre(/^find/, function (next) {
  this.populate({ path: "omra", select: "name" });
  next();
});

const UserModel = mongoose.model("User2", userSchema);

module.exports = UserModel;
