const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

const editSum = (title) => {
  const n = title.split("\n").map((e) => {
    return e.replace("\r", "");
  });

  const res1 = n.reduce((acc, ele) => {
    return +acc + +ele;
  });

  return res1;
};

// 📥 Get all tasks
const getTasks = asyncHandler(async (req, res) => {
  const countDocuments = await Task.countDocuments();

  const features = new ApiFeatures(Task.find({}), req.query)
    .Filter()
    .Search("TaskModel")
    .Paginate(countDocuments)
    .LimitFields()
    .Sort();

  const { mongooseQuery, pagination } = features;
  const tasks = await mongooseQuery;

  if (!tasks) {
    return next(new ApiError("tasks not found!", 404));
  }

  res.status(200).json({ status: "Success", pagination, data: tasks });
});

// 📥 Get single task
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(new ApiError("task not found!", 404));
  }
  res.status(200).json({ status: "Success", data: task });
});

// ➕ Create new task
const createTask = asyncHandler(async (req, res) => {
  if (req.body.title) {
    // تقسيم النص إلى أسطر، ثم تصفية الأسعار الفارغة
    const numbers = req.body.title
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map((line) => parseInt(line, 10));

    // التحقق أن جميع القيم أرقام صحيحة صالحة
    const allValidNumbers = numbers.every((num) => !isNaN(num));

    if (allValidNumbers && numbers.length > 0) {
      req.body.sum = editSum(req.body.title);
    }
  }

  const task = await Task.create(req.body);
  res.status(201).json({ status: "Success", data: task });
});

// ✏️ Update task
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (req.body.title) {
    // تقسيم النص إلى أسطر، ثم تصفية الأسعار الفارغة
    const numbers = req.body.title
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map((line) => parseInt(line, 10));

    // التحقق أن جميع القيم أرقام صحيحة صالحة
    const allValidNumbers = numbers.every((num) => !isNaN(num));

    if (allValidNumbers && numbers.length > 0) {
      console.log("hello");
      req.body.sum = editSum(req.body.title);
    }
  }
  const taskUpdated = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!taskUpdated) {
    return res.status(404).json({ status: "Fail", message: "User not found" });
  }

  res.status(200).json({ status: "Success", data: taskUpdated });
});

// ❌ Delete task
const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await Task.findByIdAndDelete(id);

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
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
};
