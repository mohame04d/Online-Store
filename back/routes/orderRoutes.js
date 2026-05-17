import express from 'express';
import { placeOrder , verifyOrder , userOrders , listOrders , updateOrderStatus } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/auth.js';

const orderRoutes = express.Router();

orderRoutes.post('/place', authMiddleware, placeOrder); 
orderRoutes.post('/verify',  verifyOrder);
orderRoutes.get('/myorders', authMiddleware, userOrders);
orderRoutes.get('/list',  listOrders);
orderRoutes.put('/status',  updateOrderStatus);

export default orderRoutes;