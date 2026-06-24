import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(
  process.cwd(),
  "uploads"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (
  req,
  file,
  cb
) => {
  const fileTypes =
    /jpeg|jpg|png|gif|webp/;

  const extname =
    fileTypes.test(
      path
        .extname(file.originalname)
        .toLowerCase()
    );

  const mimetype =
    fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Chỉ được upload ảnh"
      )
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
});