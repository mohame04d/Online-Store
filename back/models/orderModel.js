import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   // ✅ صح
items: [
    {
        _id: { type: String },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        image: { type: String },
        description: { type: String },
    }
]
,
    totalAmount: {
        type: String,
        required: true
    },
  address: {
  name: String,
  address: String,
  city: String,
  phone: String
},
    payment: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'on the way'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
