import express from "express";
import multer from "multer";
import {
  addProduct,
  listProducts,
  removeProduct,
} from "../controllers/productController.js";

const productRoutes = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

productRoutes.post("/add", upload.single("image"), addProduct);
productRoutes.get("/list", listProducts);
productRoutes.delete("/remove", removeProduct);

export default productRoutes;