import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import catchAsync from '../utils/catchAsync.js';
import 'dotenv/config';
import notificationsModel from '../models/notificationsModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = catchAsync(async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL || 'http://localhost:5173';
    
    const items = JSON.parse(req.body.items); // ✅ parse الـ JSON string
    
    const newOrder = new orderModel({
        userId: req.userId,  
        items: items, 
        totalAmount: req.body.totalAmount,
        address: req.body.address, 
    });
    console.log("ADDRESS FROM FRONTEND:", req.body.address);
    await newOrder.save();  
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = items.map(item => ({ // ✅ استخدم items المـ parsed
        price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));
 
    line_items.push({
        price_data: {
            currency: 'usd',
            product_data: { name: 'Delivery Charges' },
            unit_amount: 2 * 100,
        },
        quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({ // ✅ session مش stripe
        line_items,
        mode: 'payment',
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(201).json({ success: true, session_url: session.url }); // ✅
});


const verifyOrder = catchAsync(async (req, res) => {
    const { orderId , success } = req.body;
    if (success) {
        await orderModel.findByIdAndUpdate(orderId , {payment:true});
        const order = await orderModel.findById(orderId).populate('userId','name email');
        await notificationsModel.create({
            message:`تم دفع الطلب رقم ${orderId} بنجاح من المستخدم ${order?.userId?.name || 'غير معروف'}`,
            orderId:order._id,
            user:order?.userId?.name || 'غير معروف'
        })
        res.json({ success: true, message: 'paid' });
    }else{
    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: false, message: 'not paid' });

    }
});

const userOrders = catchAsync(async (req, res) => {
    const orders = await orderModel.find({ userId: req.userId });
    res.status(200).json({ success: true, orders });
});

const listOrders = catchAsync(async (req, res) => {
    const orders = await orderModel.find().populate('userId', 'name email');
    res.status(200).json({ success: true, orders });
});

const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: 'Order status updated', order });
};
export { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus };