const fs = require("fs");
const path = require("path");
const multer = require("multer");
const uploadToCloudinary = require("../Connections/ImageUpload/imageUpload");

// Set up storage outside the function (so it doesn't reinitialize every time)
const imageFolder = path.join(process.cwd(), "./images"); // Adjust path if needed
console.log("Image folder pathsi ", imageFolder);
if (!fs.existsSync(imageFolder)) {
  fs.mkdirSync(imageFolder);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageFolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage }).single("image");

// Actual controller function
exports.uploadImage = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.error("❌ Upload error:", err.message);
        return res.status(500).json({ error: "Failed to upload image" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      console.log("✅ Uploaded file:", req.file.filename);
      const resFromCoudinary = await uploadToCloudinary(
        `${imageFolder}/${req.file.filename}`
      );
      res.status(200).json({
        message: "Image uploaded successfully",
        url: resFromCoudinary.url,
      });
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Unexpected error" });
  }
};
