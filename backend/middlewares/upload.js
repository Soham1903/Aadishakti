import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("Processing file:", file.originalname);
    return {
      folder: "aadishakti_courses",
      allowed_formats: ["jpg", "jpeg", "png"],
      transformation: [{ width: 800, crop: "scale" }],
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;
