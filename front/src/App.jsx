import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Product from "./pages/Products";
import Verify from "./pages/Verify";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Order from "./pages/Order";
import Header from "./components/Header";
import ShopContextProvider from "./context/ShopContext";
import Categories from "./components/Categories";

const App = () => {
  return (
    <ShopContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product/:productId" element={<Product/>} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </ShopContextProvider>
  );
};

export default App;
