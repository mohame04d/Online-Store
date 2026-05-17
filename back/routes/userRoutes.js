import express from "express";
import {registerUser, loginUser , getAllUsers , deleteUser , demoteToUser ,makeAdmin} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get('/list' , getAllUsers);
userRouter.delete('/delete/:id' , deleteUser);
userRouter.put('/make-admin/:id' , makeAdmin);
userRouter.put('/demote/:id' , demoteToUser)

export default userRouter;