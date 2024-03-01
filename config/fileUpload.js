import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage =new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png","jpeg"],
  params: {
    folder: "ebuy products",
  },
});

const upload = multer({ storage: storage });

export default upload;