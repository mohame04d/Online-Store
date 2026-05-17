import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
      validate: [validator.isEmail, "not valid email or password"],
      lowercase: [true, "Email must be lowercase"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    cartData:{type:Object, default:{}},
    role: {type:String ,enum:['user' , 'admin'] , default:'user' }
  },
  {minimize:false , timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
