import express from "express";
import { userController, verifyToken } from "../controllers/userController.js";
import { PdfUploader, getPdfHistory, pdfExtract } from "../controllers/pdfuploader.js";
import uploader from "../middlewares/uploader.js";
import { Auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signin", userController);
router.post("/verifyToken", verifyToken);
router.post("/upload",Auth,uploader.single("pdf"), PdfUploader);
router.get("/history", Auth, getPdfHistory);
router.post("/extract", Auth, pdfExtract)

export default router;
