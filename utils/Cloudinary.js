const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.UploadImageCloudinary = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path);

    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.RemoveImageCloudinary = async (Model, id) => {
  try {
    const doc = await Model.findById(id);
    if (doc.image.public_id) {
      const result = await cloudinary.uploader.destroy(doc.image.public_id);
      return result;
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

exports.RemoveMultipleImagesCloudinary = async (Model, id) => {
  try {
    const doc = await Model.findById(id);
    if (doc.images) {
      doc.images.forEach(async (image) => {
        const result = await cloudinary.uploader.destroy(image.public_id);
        return result;
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.UploadFileCloudinary = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      resource_type: "raw", // ضروري لرفع ملفات PDF أو ZIP أو DOCX
    });

    return result;
  } catch (error) {
    console.log("Cloudinary upload error:", error);
  }
};

exports.RemoveFileCloudinary = async (Model, id) => {
  try {
    const doc = await Model.findById(id);
    if (doc.file?.public_id) {
      const result = await cloudinary.uploader.destroy(doc.file.public_id, {
        resource_type: "raw", // ضروري لحذف ملفات raw
      });
      return result;
    }
    return;
  } catch (error) {
    console.log("Delete error:", error);
  }
};
