import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Order = () => {
  const { cartItems, all_products, getTotalCartAmount, url, token } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const total = getTotalCartAmount();

  const cartProducts = Object.keys(cartItems)
    .map((id) => {
      const product = all_products.find((p) => p._id === id);
      return product ? { ...product, quantity: cartItems[id] } : null;
    })
    .filter(Boolean);

  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!shipping.name || !shipping.address || !shipping.city || !shipping.phone) {
      alert("من فضلك املأ كل بيانات الشحن");
      return;
    }

    let orderItems = [];
    all_products.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    let orderData = {
address: {
  name: shipping.name,
  address: shipping.address,
  city: shipping.city,
  phone: shipping.phone,
},      items: JSON.stringify(orderItems),      // ✅ String (JSON)
      totalAmount: String(getTotalCartAmount() + 2), // ✅ totalAmount مش amount
    };

    try {
      let res = await axios.post(url + '/api/order/place', orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
      });

      if (res.data.success) {
        const { session_url } = res.data;
        window.location.replace(session_url);
      } else {
        alert('حدث خطأ، حاول مجدداً');
      }
    } catch (err) {
      console.log(err);
      alert('حدث خطأ في الاتصال بالسيرفر');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
      return;
    }
    if (all_products.length > 0 && getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, all_products]);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center">
          إتمام الطلب
        </h2>

        {cartProducts.length === 0 ? (
          <div className="text-center text-gray-300 mt-20 space-y-6">
            <p className="text-xl">السلة فارغة</p>
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-2xl font-semibold text-white hover:opacity-90 transition-all"
            >
              العودة للتسوق
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {cartProducts.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl shadow-lg border border-white/20"
                >
                  <img
                    src={`${url}/images/${item.image}`}
                    className="w-20 h-20 rounded-xl object-contain"
                    alt={item.name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-300">الكميه: {item.quantity}</p>
                    <p className="text-cyan-400 font-bold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <div className="text-xl font-bold mt-6">
                المجموع الكلي
                <span className="text-cyan-400 ml-2">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl">
              <h3 className="text-2xl font-semibold mb-6 text-center">بيانات الشحن</h3>

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم الكامل"
                  value={shipping.name}
                  onChange={handleChange}
                  className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="العنوان الكامل"
                  value={shipping.address}
                  onChange={handleChange}
                  className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="الهاتف"
                  value={shipping.phone}
                  onChange={handleChange}
                  className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="المدينة"
                  value={shipping.city}
                  onChange={handleChange}
                  className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button
                  onClick={placeOrder}
                  className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all mt-4"
                >
                  تأكيد الطلب
                </button>
              </div>
            </div>
          </div>
        )}
      </div> 
    </section>
  );
};

export default Order;
