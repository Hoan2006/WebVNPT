import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import path from "path";
import { upload } from "./src/utils/upload.js";
import { sendContactMail } from "./src/utils/mailService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  verifyAdmin
} from "./src/middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err.message));

/* START SCHEMA */
/* =========================
   Admin account
========================= */
const AdminSchema =
new mongoose.Schema({

  username:{
    type:String,
    unique:true
  },

  password:String,

  role:{
    type:String,
    default:"admin"
  }

});

const Admin =
mongoose.model(
  "Admin",
  AdminSchema,
  "admins"
);

/* =========================
   CONTACT
========================= */

const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  taxCode: String,
  address: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model(
  "Contact",
  ContactSchema
);

/* =========================
   SERVICES
========================= */

const ServiceSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  price: String,
  image: String,

  cityPrice: String,
  suburbPrice: String,

  promotionPeriod: String,

  promotion: [String],

  advantages: [String],

  coverage: {
    urban: [String],
    suburban: [String]
  }
});

const Service = mongoose.model(
  "Service",
  ServiceSchema,
  "products"
);

const HomeServiceSchema =
new mongoose.Schema({

  title:String,

  description:String,

  image:String,

  features:[String],

  createdAt:{
    type:Date,
    default:Date.now
  }

});

const HomeService =
  mongoose.model(
    "HomeService",
    HomeServiceSchema,
    "services"
  );

const EContractSchema =
  new mongoose.Schema({

    name: String,

    price: String,

    description: String,

    buttonText: String,

    popular: Boolean,

    features: [String]

  });

const EContract =
  mongoose.model(
    "EContract",
    EContractSchema,
    "econtracts"
  );

const HKDSchema = new mongoose.Schema({
  title: String,
  price: String,
  featured: Boolean
});

const HKD = mongoose.model(
  "HKD",
  HKDSchema,
  "hkds"
);


/* =========================
   NEWS
========================= */

const NewsSchema = new mongoose.Schema({
  title: String,
  date: String,
  author: String,
  image: String,
  category: String,
  excerpt: String,
  content: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const News = mongoose.model(
  "News",
  NewsSchema,
  "news"
);
/* END SCHEMA */

/* LOGIN */
app.post(
  "/api/admin/login",
  async(req,res)=>{

    try{

      const {
        username,
        password
      } = req.body;

      const admin =
      await Admin.findOne({
        username
      });

      if(!admin){

        return res.status(401)
        .json({
          success:false,
          message:"Sai tài khoản"
        });

      }

      const valid =
      await bcrypt.compare(
        password,
        admin.password
      );

      if(!valid){

        return res.status(401)
        .json({
          success:false,
          message:"Sai mật khẩu"
        });

      }

      const token = jwt.sign(

      {

      id: admin._id,

      role: admin.role

      },

      process.env.JWT_SECRET,

      { expiresIn: "1d" }

      );

      res.json({

        success:true,

        token,

        admin:{
          id:admin._id,
          username:
          admin.username,
          role:
          admin.role
        }

      });

    }catch(error){

      res.status(500).json(error);

    }

  }
);

/* ảnh */
app.post(
  "/api/upload",
  upload.single("image"),
  (req, res) => {
    try {
      res.json({
        success: true,
        imageUrl: req.file.path,
      });
    } catch (error) {
      console.error("UPLOAD ERROR:", error);   // ← thêm dòng này
      res.status(500).json({
        success: false,
      });
    }
  }
);

/* =========================
   PRODUCTS ADMIN API
========================= */

app.get(
  "/api/products",
  async (req, res) => {
    try {
      const products =
        await Service.find();

      res.json(products);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.post(
  "/api/products",
  verifyAdmin,
  async (req, res) => {
    try {
      const product =
        new Service(req.body);

      await product.save();

      res.json(product);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.put(
  "/api/products/:id",
  verifyAdmin,
  async (req, res) => {
    try {
      const product =
        await Service.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(product);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.delete(
  "/api/products/:id",
  verifyAdmin,
  async (req, res) => {
    try {
      await Service.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* =========================
   CONTACT API
========================= */

app.post(
  "/contact",
  async (req, res) => {
    try {

      console.log("BODY:", req.body);

      const contact =
        new Contact(req.body);

      await contact.save();

      console.log("SAVE OK");

      await sendContactMail({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        content: req.body.content,
      });

      console.log("MAIL OK");

      res.json({
        success: true,
      });

    } catch (err) {

      console.error(
        "CONTACT ERROR:"
      );

      console.error(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });

    }
  }
);
/* =========================
   SERVICE API
========================= */

app.get(
  "/services/:category",
  async (req, res) => {

    try {

      const services =
        await Service.find({
          category:
            req.params.category
        });

      res.json(services);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false
      });

    }

  }
);

app.get(
  "/product/:id",
  async (req, res) => {

    try {

      const product =
        await Service.findById(
          req.params.id
        );

      res.json(product);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success:false
      });

    }

  }
);
/* =========================
   SERVICES ADMIN API
========================= */

app.get(
  "/api/services",
  async (req, res) => {
    try {
      const services =
        await HomeService.find();

      res.json(services);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.post(
  "/api/services",
  verifyAdmin,
  async (req, res) => {
    try {
      const service =
        new HomeService(req.body);

      await service.save();

      res.json(service);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.put(
  "/api/services/:id",
  verifyAdmin,
  async (req, res) => {
    try {
      const service =
        await HomeService.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(service);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.delete(
  "/api/services/:id",
  verifyAdmin,
  async (req, res) => {
    try {
      await HomeService.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* lấy dịch vụ trang chủ */

app.get(
  "/services",
  async (req, res) => {

    try {

      const services =
        await HomeService.find();

      res.json(services);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false
      });

    }

  }
);

/* =========================
   ECONTRACT API (cái đầu là user, mấy cái sau là admin)
========================= */
app.get(
  "/econtracts",
  async (req, res) => {

    try {

      const packages =
        await EContract.find();

      res.json(packages);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success:false
      });

    }

  }
);

app.get(
  "/api/econtracts",
  async (req, res) => {
    try {
      const packages =
        await EContract.find();

      res.json(packages);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.post(
  "/api/econtracts",
  verifyAdmin,
  async (req, res) => {
    try {
      const packageData =
        new EContract(req.body);

      await packageData.save();

      res.json(packageData);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.put(
  "/api/econtracts/:id",
  verifyAdmin,
  async (req, res) => {
    try {
      const packageData =
        await EContract.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(packageData);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.delete(
  "/api/econtracts/:id",
  verifyAdmin,
  async (req, res) => {
    try {
      await EContract.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* =========================
   HKD ADMIN API
========================= */
app.get(
  "/hkds",
  async (req, res) => {

    try {

      const packages =
        await HKD.find();

      res.json(packages);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false
      });

    }

  }
);

app.get(
  "/api/hkds",
  async (req, res) => {
    try {
      const packages =
        await HKD.find();

      res.json(packages);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.post(
  "/api/hkds",
  verifyAdmin,
  async (req, res) => {
    try {
      const packageData =
        new HKD(req.body);

      await packageData.save();

      res.json(packageData);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.put(
  "/api/hkds/:id",
  verifyAdmin,
  async (req, res) => {
    try {
      const packageData =
        await HKD.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(packageData);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

app.delete(
  "/api/hkds/:id",
  verifyAdmin,
  async (req, res) => {
    try {
      await HKD.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* =========================
   NEWS ADMIN API
========================= */

app.get(
  "/news",
  async (req, res) => {
    try {

      const news =
        await News.find()
        .sort({ createdAt: -1 });

      res.json(news);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false
      });

    }
  }
);

app.get(
  "/news/:id",
  async (req, res) => {

    try {

      const article =
        await News.findById(
          req.params.id
        );

      res.json(article);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success:false
      });

    }

  }
);

app.get(
  "/api/news",
  async (req, res) => {
    const news = await News.find();
    res.json(news);
  }
);

app.post(
  "/api/news",
  verifyAdmin,
  async (req, res) => {

    const article =
      new News(req.body);

    await article.save();

    res.json(article);
  }
);

app.put(
  "/api/news/:id",
  verifyAdmin,
  async (req, res) => {

    const article =
      await News.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(article);
  }
);

app.delete(
  "/api/news/:id",
  verifyAdmin,
  async (req, res) => {

    await News.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success:true
    });

  }
);

const PORT = process.env.PORT || 5000;

// Bắt mọi lỗi middleware (kể cả lỗi từ multer/cloudinary) chưa được xử lý ở trên
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
