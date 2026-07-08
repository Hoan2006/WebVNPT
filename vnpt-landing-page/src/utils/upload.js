import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "vnpt_uploads", // tên thư mục trên Cloudinary, ông muốn đổi gì cũng được
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    // Cloudinary tự tạo tên file unique, không cần tự đặt tên như trước
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ được upload ảnh"));
  }
};

export const upload = multer({ storage, fileFilter });