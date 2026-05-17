import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { url, token } = useContext(ShopContext);

  const fetchOrders = async () => {
  try {
    const res = await axios.get(
      `${url}/api/order/myorders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data.orders; // ✅ هنا التعديل

    const ordersData = Array.isArray(data) ? data : [];

    setOrders(ordersData);
  } catch (err) {
    console.error("Error fetching orders:", err);
    setOrders([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white px-6">
        <div className="flex flex-col items-center">
          <Loader2 className="w-16 h-16 animate-spin text-cyan-400 mb-4" />
          <h2 className="text-xl">Loading your orders...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400 text-xl">No orders yet</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            const total =
              order.items?.reduce(
                (sum, item) => sum + item.price * (item.quantity || 1),
                0
              ) || 0;

            return (
              <div
                key={order._id}
                className="bg-purple-800/40 rounded-2xl shadow-lg p-6 hover:scale-105 transition"
              >
                <h2 className="text-lg font-semibold mb-2">
                  Order ID: {order._id?.slice(-6).toUpperCase()}
                </h2>

                <p className="mb-4">
                  {order.items?.length || 0} product
                  {order.items?.length > 1 ? "s" : ""}
                </p>

                <div className="space-y-2">
                  {order.items?.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center border-b border-gray-600 pb-2"
                    >
                      <div className="flex items-center gap-2">
                        {item.image && (
                          <img
                            src={`${url}/images/${item.image}`}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <p>
                          {item.name} x {item.quantity || 1}
                        </p>
                      </div>

                      <p>${item.price * (item.quantity || 1)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`flex items-center gap-2 font-semibold ${
                      order.status === "delivered"
                        ? "text-green-400"
                        : order.status === "pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {order.status === "delivered" && <CheckCircle />}
                    {order.status === "pending" && (
                      <Loader2 className="animate-spin" />
                    )}
                    {order.status === "canceled" && <XCircle />}

                    {order.status?.charAt(0).toUpperCase() +
                      order.status?.slice(1)}
                  </span>

                  <span className="font-bold">Total: ${total}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyOrders;