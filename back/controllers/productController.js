import productModel from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";
import fs from "fs";

export const addProduct = catchAsync(async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const { name, description, price } = req.body;
  const newProduct = new productModel({
    name, 
    description,
    price,
    image: image_filename,
  });
  await newProduct.save();
  res
    .status(201)
    .json({ success: true, message: "Product added successfully" });
});

export const listProducts = catchAsync(async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({ success: true, data: products });
});

export const removeProduct = catchAsync(async (req, res) => {
  const { id } = req.body;
  const product = await productModel.findById(id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  fs.unlinkSync(`uploads/${product.image}`,()=>{});
  await productModel.findByIdAndDelete(id);
  res
    .status(200)
    .json({ success: true, message: "Product removed successfully" });
});