import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);

  // تحميل الكارت من LocalStorage أول مرة
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

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
