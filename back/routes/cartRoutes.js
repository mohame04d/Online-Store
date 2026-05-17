import express from 'express';
import { addToCart, getCart, removeFromCart , clearCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.route('/add').post(authMiddleware, addToCart);
cartRouter.route('/clear').post(authMiddleware, clearCart);
cartRouter.route('/get').post(authMiddleware, getCart);
cartRouter.route('/remove').post(authMiddleware, removeFromCart);

export default cartRouter;