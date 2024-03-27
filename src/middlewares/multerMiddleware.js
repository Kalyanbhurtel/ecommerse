import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const uploadSingle = multer().single('image');
export const uploadMultiple = multer({ storage: storage }).array('images');
