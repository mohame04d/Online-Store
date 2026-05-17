import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import catchAsync from "../utils/catchAsync.js";

// Register a new user
export const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, and password" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Please provide a valid email" });
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }
  const hashedPassword =  await bcrypt.hash(password,12)
  const newUser = await userModel.create({ name, email, password:hashedPassword, role });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser, token });
});

// Login user
export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "you don't have account,please signup" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ message: "Login successful", token });
});

export const getAllUsers = catchAsync(async(req,res)=>{
  const users = await userModel.find().select('+password');
  res.json({success:true , data:users});
})

export const deleteUser = catchAsync(async(req,res)=>{
  const {id} = req.params;
  const deletedUser = await userModel.findOneAndDelete(id);
  if(!deletedUser){
    return res.status(404).json({success:false , message:'المستخدم غير موجود'})
  }
  res.json({success:true, message:'تم حذف المستخدم بنجاح'})
})

export const makeAdmin = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(id,{role:'admin'},{new:true});
     if(!updatedUser){
    return res.status(404).json({success:false , message:'المستخدم غير موجود'})
  }
  res.json({success:true , message:'تم ترقية المستخدم الي ادمن' , data:updatedUser})
})
export const demoteToUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  // التحقق من وجود المستخدم
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "المستخدم غير موجود",
    });
  }

  // التأكد إنه أدمن
  if (user.role !== "admin") {
    return res.status(400).json({
      success: false,
      message: "المستخدم ليس أدمن",
    });
  }

  // تحويله لمستخدم عادي
  user.role = "user";

  await user.save(); 

  res.status(200).json({  
    success: true,
    message: "تم إعادة المستخدم إلى مستخدم عادي بنجاح", 
    data: user,
  }); 
});