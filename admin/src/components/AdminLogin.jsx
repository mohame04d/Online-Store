import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
      const url = "http://localhost:4000/api/admin/login";
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if(token){
      navigate("/admin/list");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { email, password });
      if(data.success){
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/list");
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error(error.response?.data);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r
     from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      
      {/* Background circles */}
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full
       blur-3xl opacity-20 top-20 left-20 animate-pulse"></div>

      <div className="absolute w-72 h-72 bg-indigo-500 rounded-full
       blur-3xl opacity-20 bottom-20 right-20 animate-pulse"></div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10 bg-white/10 backdrop-blur-xl 
      border border-white/20 shadow-2xl p-8 rounded-2xl text-white
       w-96 flex flex-col items-center transition-all duration-300 hover:scale-[1.02]">

        <h2 className="text-3xl font-bold mb-6 text-center text-white">Admin Login</h2>

        <input type="email" placeholder="Email"  value={email} onChange={(e)=>setEmail(e.target.value)}
         className="w-full bg-white/20 backdrop-blur-xl border
         border-white/20 shadow-2xl p-3 mb-4 text-white placeholder-gray-200 
         focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg" required></input>

        <input type="password" placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)}
         className="w-full bg-white/20 backdrop-blur-xl border
         border-white/20 shadow-2xl p-3 mb-4 text-white placeholder-gray-200 
         focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg" required></input>

        <button type="submit" onClick={handleSubmit} className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
         hover:shadow-pink-500/30 shadow-lgfont-semibold p-3 rounded-lg transition-all duration-300 hover:scale-[1.03]">
          Login
        </button>        
      </form>
    </div>
  );
};

export default AdminLogin;