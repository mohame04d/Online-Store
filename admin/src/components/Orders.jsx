import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Orders = () => {
  const url = "http://localhost:4000";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ========================
  // FETCH ALL ORDERS
  // ========================
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);

      console.log("API RESPONSE:", res.data); // Debug مهم

      if (res.data.success && Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
        toast.error("Invalid orders data");
      }
    } catch (err) {
      console.log(err);
      setOrders([]);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // UPDATE STATUS
  // ========================
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, status: newStatus }
              : order
          )
        );

        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ========================
  // LOADING UI
  // ========================
  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r
       from-indigo-900 via-purple-900 to-pink-900 text-white px-6">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin w-16 h-16 text-cyan-400 mb-4" />
          <h2 className="text-2xl font-semibold">Loading Orders...</h2>
        </div>
      </section>
    );
  }

  // ========================
  // MAIN UI
  // ========================
  return (
    <section className="relative md:ml-64 min-h-screen bg-gradient-to-r from-indigo-900
     via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10">

      {orders.length === 0 ? (
        <p className="text-center text-gray-300 text-xl">
          No orders yet
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {orders.map((order) => {
            const total =
              order.items?.reduce(
                (sum, item) =>
                  sum + item.price * (item.quantity || 1),
                0
              ) || 0;

            return (
              <div
                key={order._id}
                className="bg-white/10 backdrop-blur-md border border-white/20
                 rounded-2xl p-4 flex flex-col justify-between shadow-lg hover:scale-105
                  transform transition-all duration-300"
              >

                {/* ORDER INFO */}
                <div>
                  <h2 className="font-semibold text-lg text-gray-200 mb-2">
                    Order ID: {order._id?.slice(-6).toUpperCase()}
                  </h2>

                  <p className="text-gray-200 mb-1">
                    <span className="font-semibold">Customer:</span>{" "}
                    {order.userId?.name || "Unknown"}
                  </p>

                  <p className="text-gray-200 mb-2 text-sm">
                    <span className="font-semibold">Address:</span>{" "}
                    {order.address
                      ? `${order.address.name}, ${order.address.address}, ${order.address.city}, ${order.address.phone}`
                      : "Not provided"}
                  </p>

                  <p className="text-gray-300 mb-3 text-sm">
                    {order.items?.length || 0} product
                    {order.items?.length > 1 ? "s" : ""}
                  </p>

                  {/* ITEMS */}
                  <div className="space-y-1">
                    {order.items?.map((item) => (
                      <div
                        key={item._id}
                        className="border-b border-white/20 pb-1 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          {item.image && (
                            <img
                              src={`${url}/images/${item.image}`}
                              className="w-10 h-10 object-cover rounded"
                              alt=""
                            />
                          )}

                          <p className="text-gray-200 text-sm">
                            {item.name} × {item.quantity || 1}
                          </p>
                        </div>

                        <p className="text-gray-100 text-sm font-semibold">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* STATUS + TOTAL */}
                <div className="mt-3 flex justify-between items-center">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border rounded-lg py-1 px-2 text-gray-800 font-semibold cursor-pointer text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="on the way">On the way</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>

                  <span className="font-bold text-gray-100 text-sm">
                    Total: ${total.toFixed(2)}
                  </span>
                </div>

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
};

export default Orders;