import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// config/upload.js
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("Processing file:", file.originalname); // Debug log
    return {
      folder: "aadishakti_courses",
      allowed_formats: ["jpg", "jpeg", "png"],
      transformation: [{ width: 800, crop: "scale" }],
    };
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
