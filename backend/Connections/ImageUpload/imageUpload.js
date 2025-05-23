const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const fs = require("fs");

const uploadToCloudinary = async (filePath, folder = "images") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });

    // Clean up local temp file
    fs.unlinkSync(filePath);

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = uploadToCloudinary;
