import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("application/pdf")) {
    cb(new Error("Supported only pdf files!"), false);
  } else {
    cb(null, true);
  }
};

const uploader = multer({ storage: storage, fileFilter: fileFilter });

export default uploader;
