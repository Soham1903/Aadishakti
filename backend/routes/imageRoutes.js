import express from "express";
import {
  uploadImage,
  getAllImages,
  upload,
  deleteImage,
} from "../controller/imageController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getAllImages);
router.delete("/:id", deleteImage);

export default router;
