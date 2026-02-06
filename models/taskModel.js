const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    nameUser: {
      type: String,
      trim: true,
      required: [true, "user name required"],
    },
    title: {
      type: String
    },
    status: {
      type: String,
    },
    sum:{
      type:Number
    }
  },
  { timestamps: true }
);


const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
