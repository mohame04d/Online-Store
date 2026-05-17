import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url, clearCart, token } = useContext(ShopContext);

  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) return;

    const verifyPayment = async () => {
      try {
        const res = await axios.post(
          `${url}/api/order/verify`,
          { success, orderId },
          { headers: { Authorization: `Bearer ${token}` } } // ✅ أضفنا الـ header
        );

        if (res.data.success) {
          await clearCart();
          setStatus("success");
          setTimeout(() => {
            navigate("/myOrders");
          }, 2000);
        } else {
          setStatus("error");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("error");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    verifyPayment();
  }, [success, orderId, url, token, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white px-6">
      <div className="text-center flex flex-col items-center">

        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-20 h-20 animate-spin text-cyan-400 mb-6" />
            <h2 className="text-2xl font-bold">جاري التحقق من عملية الدفع...</h2>
            <p className="text-gray-300 mt-2">يرجى الانتظار قليلاً</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-bounce">
            <CheckCircle className="w-20 h-20 text-green-400 mb-6" />
            <h2 className="text-2xl font-bold">تم الدفع بنجاح!</h2>
            <p className="text-gray-300 mt-2">سيتم نقلك إلى طلباتك الآن</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center animate-bounce">
            <XCircle className="w-20 h-20 text-red-400 mb-6" /> {/* ✅ أيقونة خطأ مناسبة */}
            <h2 className="text-2xl font-bold">حدث خطأ أثناء التحقق</h2>
            <p className="text-gray-300 mt-2">يرجى المحاولة لاحقاً</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Verify;
