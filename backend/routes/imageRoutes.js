import express from "express";
import {
  uploadImage,
  getAllImages,
  upload,
} from "../controller/imageController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getAllImages);

export default router;
