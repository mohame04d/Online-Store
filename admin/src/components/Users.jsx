import { useEffect, useState } from "react";
import { Trash2, Shield, User } from "lucide-react";
import axios from "axios";

const Users = () => {
  const url = "http://localhost:4000";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب المستخدمين
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/api/user/list`);

      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("خطأ في جلب المستخدمين:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // حذف مستخدم
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد من حذف هذا المستخدم؟"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${url}/api/user/delete/${id}`);

      if (res.data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        alert("تم حذف المستخدم بنجاح");
      }
    } catch (error) {
      console.error("خطأ في حذف المستخدم:", error);
      alert("فشل في حذف المستخدم");
    }
  };

  // ترقية مستخدم إلى أدمن
  const promoteToAdmin = async (id) => {
    try {
      const res = await axios.put(`${url}/api/user/make-admin/${id}`);

      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, role: "admin" } : u
          )
        );

        alert("تم ترقية المستخدم إلى أدمن");
      }
    } catch (error) {
      console.error("خطأ في الترقية:", error);
      alert("حدث خطأ أثناء الترقية");
    }
  };

  // تحويل الأدمن إلى مستخدم عادي
  const demoteToUser = async (id) => {
    try {
      const res = await axios.put(`${url}/api/user/demote/${id}`);

      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, role: "user" } : u
          )
        );

        alert("تم تحويل الأدمن إلى مستخدم عادي");
      }
    } catch (error) {
      console.error("خطأ في إعادة الدور:", error);
      alert("حدث خطأ أثناء إعادة الدور");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section
      className="md:ml-64 min-h-screen bg-gradient-to-r
      from-indigo-900 via-purple-900 to-pink-900
      text-white py-24 px-6 sm:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center">
          إدارة المستخدمين
        </h2>

        {loading ? (
          <div className="text-center text-gray-300 text-lg">
            جاري تحميل المستخدمين...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            لا يوجد مستخدمون حالياً
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white/10 border border-white/20
                backdrop-blur-md rounded-3xl p-6
                flex flex-col items-center text-center
                shadow-lg hover:shadow-indigo-500/40
                transition-all"
              >
                {/* الصورة */}
                <div
                  className="w-20 h-20 rounded-full
                  bg-gradient-to-r from-indigo-500
                  via-purple-500 to-pink-500
                  flex items-center justify-center
                  mb-4 overflow-hidden"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>

                {/* الاسم */}
                <h3 className="text-xl font-bold">
                  {user.name}
                </h3>

                {/* الايميل */}
                <p className="text-gray-300 text-sm mb-3">
                  {user.email}
                </p>

                {/* الدور */}
                <div
                  className={`px-3 py-1 rounded-full text-sm
                  font-semibold mb-4 flex items-center gap-1
                  ${
                    user.role === "admin"
                      ? "bg-yellow-400/80 text-black"
                      : "bg-cyan-500/80 text-white"
                  }`}
                >
                  {user.role === "admin" && (
                    <Shield className="w-4 h-4" />
                  )}

                  {user.role === "admin"
                    ? "أدمن"
                    : "مستخدم"}
                </div>

                {/* حذف مستخدم */}
                <button
                  onClick={() => deleteUser(user._id)}
                  disabled={user.role === "admin"}
                  className={`flex items-center gap-2
                  px-4 py-2 rounded-lg font-semibold
                  transition-all w-full justify-center
                  ${
                    user.role === "admin"
                      ? "bg-gray-500/40 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                  حذف المستخدم
                </button>

                {/* ترقية إلى أدمن */}
                <button
                  onClick={() => promoteToAdmin(user._id)}
                  disabled={user.role === "admin"}
                  className={`flex items-center gap-2
                  px-4 py-2 rounded-lg font-semibold
                  transition-all mt-2 w-full justify-center
                  ${
                    user.role === "admin"
                      ? "bg-gray-500/40 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  <Shield className="w-5 h-5" />

                  {user.role === "admin"
                    ? "أدمن بالفعل"
                    : "ترقية إلى أدمن"}
                </button>

                {/* إعادة إلى مستخدم */}
                <button
                  onClick={() => demoteToUser(user._id)}
                  disabled={user.role !== "admin"}
                  className={`flex items-center gap-2
                  px-4 py-2 rounded-lg font-semibold
                  transition-all mt-2 w-full justify-center
                  ${
                    user.role !== "admin"
                      ? "bg-gray-500/40 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                >
                  <User className="w-5 h-5" />
                  إعادة إلى مستخدم
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section> 
  );
};

export default Users;