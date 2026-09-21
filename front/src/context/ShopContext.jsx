import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : {};
  });
  const url = "http://localhost:4000";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);

  // حفظ الكارت في LocalStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ helper للـ headers
  const authHeaders = (tkn) => ({
    headers: { Authorization: `Bearer ${tkn || token}` },
  });

  // إضافة منتج
  const addToCart = async (id, quantity = 1) => {
    if (!token && !localStorage.getItem("token")) {
      toast.error("يرجى تسجيل الدخول أولاً لإضافة منتجات للسلة!");
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + quantity : quantity,
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { id }, authHeaders());
      } catch (err) {
        console.log(err);
      }
    }
  };

  // حذف منتج
  const removeFromCart = async (id, removeAll = false) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (removeAll || updated[id] === 1) {
        delete updated[id];
      } else {
        updated[id] -= 1;
      }
      return updated;
    });

    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { id }, authHeaders());
      } catch (err) {
        console.log(err);
      }
    }
  };

  // مسح الكارت
  const clearCart = async () => {
    if (!token) return;
    try {
      await axios.post(`${url}/api/cart/clear`, {}, authHeaders());
      setCartItems({});
      localStorage.removeItem("cartItems");
    } catch (err) {
      console.log(err);
    }
  };

  // حساب السعر الكلي
  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p._id === id);
      return total + (product ? product.price * qty : 0);
    }, 0);
  };

  // حساب عدد المنتجات الحقيقية الموجودة في السلة
  const getTotalCartItems = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p._id === id);
      return total + (product ? qty : 0);
    }, 0);
  };

  // تحميل المنتجات من السيرفر
  const fetchProductsList = async () => {
    try {
      const res = await axios.get(`${url}/api/products/list`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
  };

  // تحميل بيانات الكارت من السيرفر
  const loadCartData = async (tkn) => {
    if (!tkn) return;
    try {
      const res = await axios.post(
        `${url}/api/cart/get`,
        {},
        authHeaders(tkn) // ✅ Bearer format
      );
      if (res.data.cartData) {
        setCartItems(res.data.cartData);
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setToken("");
      }
    }
  };

  // تحميل البيانات أول ما التطبيق يفتح
  useEffect(() => {
    async function loadData() {
      await fetchProductsList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const value = {
    all_products: products,
    url,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    getTotalCartItems,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
