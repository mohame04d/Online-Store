import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import 'dotenv/config';
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import notificationsRouter from './routes/notificationsRoutes.js'
const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static('uploads'));
app.use("/api/user", userRoutes); 
app.use("/api/order", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user',userRouter);
app.use('/api/notifications' , notificationsRouter)


const PORT = process.env.PORT || 4000;
app.listen(PORT, async() => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});