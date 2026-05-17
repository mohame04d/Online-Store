import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync.js"; 
import jwt from "jsonwebtoken";

export const adminLogin = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const admin = await userModel.findOne({ email , role:'admin'}).select('+password');
    console.log(admin)
    if (!admin) {
        return res.status(403).json({ success: false, message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(403).json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: admin._id , isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ success: true, token , admin: { name: admin.name, email: admin.email } });
});