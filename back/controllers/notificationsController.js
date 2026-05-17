import notificationsModel from "../models/notificationsModel.js";
import OrderModel from "../models/orderModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllNotifications = catchAsync(async(req,res)=>{
    const notifications = await notificationsModel.find().sort({createdAt:-1})
    res.json({success:true , data:notifications})
})

export const deleteNotification = catchAsync(async(req,res)=>{
    const{id} = req.params;
    await notificationsModel.findByIdAndDelete(id);
    res.json({success:true , message:'تم حذف الاشعار'})
})

export const clearAllNotifications = catchAsync(async(req,res)=>{
    await notificationsModel.deleteMany({});
    res.json({success:true , message:'تم حذف كل الاشعارات'})

})

export const markAsRead = catchAsync(async(req,res)=>{
    const{id} = req.params;
    await notificationsModel.findByIdAndDelete(id , {isRead :true});
    res.json({success:true , message:'تم تحديد الاشعار كمقروء'})
})

export const createNotificationForOrder = catchAsync(async(orderData)=>{
    const{userId , _id}=orderData;
    await notificationsModel.create({
        message:`تم انشاء طلب جديد برقم ${_id}`,
        orderId:_id,
        user:userId || 'مستخدم مجهول' 
    })
})