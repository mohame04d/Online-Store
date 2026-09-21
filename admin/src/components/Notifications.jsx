import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Trash2, CheckCircle } from "lucide-react";

const Notifications = () => {
  const url = "http://localhost:4000";
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${url}/api/notifications/list`);
      setNotifications(res.data.data || []);
    } catch (err) {
      console.error("Notifications fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    await axios.delete(`${url}/api/notifications/delete/${id}`);

    setNotifications((prev) =>
      prev.filter((n) => n._id !== id)
    );
  };

  const clearAll = async () => {
    await axios.delete(`${url}/api/notifications/clear`);
    setNotifications([]);
  };

  const markAsRead = async (id) => {
    await axios.patch(`${url}/api/notifications/read/${id}`);
    setNotifications((prev)=>
    prev.map((n)=>(n._id === id? {...n , isRead:true}:n)));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

 return (
  <section className="relative md:ml-64 min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900
   text-white py-24 px-6 sm:px-10">
    <div className="max-w-5xl mx-auto">

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold flex items-center gap-3">
          <Bell className="w-8 h-8 text-cyan-400" />
          اشعارات الطلبات 
        </h2>

        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
          >
             حذف الكل
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center text-gray-300">
            جاري تحميل الاشعارات...
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-400">
            لا توجد اشعارات حاليا
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
  <div
    key={n._id}
    className={`p-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md 
    flex justify-between items-center transition-all ${
      n.isRead
        ? "opacity-60"
        : "shadow-lg shadow-cyan-500/20"
    }`}
  >
    <div>
      <p className="text-lg font-semibold">{n.message}</p>

      <p className="text-sm text-gray-300">
        {new Date(n.createdAt).toLocaleString()}
      </p>
    </div>

    <div className="flex items-center gap-3">
      {!n.isRead && (
        <button
          onClick={() => markAsRead(n._id)}
          className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-full"
        >
          <CheckCircle className="w-5 h-5" />
        </button>
      )}

      <button
        onClick={() => deleteNotification(n._id)}
        className="bg-red-600 hover:bg-red-700 p-2 rounded-full"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
))}
</div>
      )}
      </div>
      </section>
)};

export default Notifications;