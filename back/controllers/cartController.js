import userModel from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

export const addToCart = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { id: itemId } = req.body;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  let cartData = user.cartData || {};

  if (cartData[itemId]) {
    cartData[itemId] += 1;
  } else {
    cartData[itemId] = 1;
  }

  await userModel.findByIdAndUpdate(userId, {
    cartData
  });

  res.status(200).json({
    success: true,
    message: "Product added to cart"
  });
});

export const removeFromCart = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { id: itemId } = req.body;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  let cartData = user.cartData || {};

  if (itemId) {
    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }
  } else {
    cartData = {};
  }

  await userModel.findByIdAndUpdate(userId, {
    cartData
  });

  res.status(200).json({
    success: true,
    message: itemId ? "Product removed" : "Cart cleared",
    cartData
  });
});

export const getCart = catchAsync(async (req, res) => {
  const userId = req.userId;
  const user = await userModel.findById(userId);
    if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
    res.status(200).json({ success: true, cartData: user.cartData || {} });
});

export const clearCart = catchAsync(async (req, res) => {
  const userId = req.userId;
  const user = await userModel.findById(userId);
    if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
    user.cartData = {};
    await user.save();
    res.status(200).json({ success: true, message: "Cart cleared" });
});