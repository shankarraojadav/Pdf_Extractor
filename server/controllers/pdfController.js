import cloudinary from "../cloud/index.js";
import PdfModel from "../models/pdfModel.js";
import SignIn from "../models/userModel.js";
import axios from "axios";
import fs from "fs";
import { PDFDocument } from "pdf-lib";

export const uploadPdf = async (req, res) => {
  try {
    const { file } = req;
    const { _id } = req.user;

    if (!file) return res.status(400).json("pdf file is missing");

    try {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { resource_type: "auto" }
      );

      const pdf = new PdfModel({
        user: _id,
        url: url,
        publicId: public_id,
      });

      await pdf.save();

      res.status(200).json({ url, public_id });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error while uploading PDF file", error });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error while uploading PDF file", error });
  }
};

export const getPdfHistory = async (req, res) => {
  const { _id, email } = req.user;
  const user = _id;
  try {
    const pdfHistoryData = await PdfModel.find({ user });
    res.status(200).json(pdfHistoryData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const pdfExtract = async (req, res) => {
  try {
    const { pdfUrl, selectedPages } = req.body;

    const { data } = await axios.get(pdfUrl, {
      responseType: "arraybuffer",
    });

    const pdfDoc = await PDFDocument.load(data);

    const extractedDoc = await PDFDocument.create();

    for (const pageNumber of selectedPages) {
      const [page] = await extractedDoc.copyPages(pdfDoc, [pageNumber - 1]);
      extractedDoc.addPage(page);
    }

    const extractedBytes = await extractedDoc.save();
    
    fs.writeFileSync('extracted.pdf', Buffer.from(extractedBytes));

    const cloudinaryUpload = await cloudinary.uploader.upload('extracted.pdf')

     res.status(200).json({ cloudinaryUrl: cloudinaryUpload.secure_url });
  } catch (error) {
    res.status(400).json({error: "error occured while extracting"});
  }
};
