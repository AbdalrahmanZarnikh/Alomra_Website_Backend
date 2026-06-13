const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "user name required"],
    },
    gender:{
      type:String
    },
    age:{
      type:String
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
    visa: {
      type: Boolean,
      default: false,
    },
    sitNumber: {
      type: String,
    },
    // 🖼️ الصور
    images: [
      {
        public_id: { type: String },
        url: { type: String },
      },
    ],

    // 📄 ملفات PDF
    filePdf: [
      {
        public_id: { type: String },
        url: { type: String },
        format: { type: String }, // مثل "pdf"
      },
    ],

    details: { type: String },
    room: { type: String },
    safar: { type: String },

    roomType: { type: String },

    omra: {
      type: mongoose.Schema.ObjectId,
      ref: "Omra",
    },
  },
  { timestamps: true }
);

// ربط تلقائي مع بيانات العمرة
userSchema.pre(/^find/, function (next) {
  this.populate({ path: "omra", select: "name" });
  next();
});

const UserModel = mongoose.model("User2", userSchema);

module.exports = UserModel;
