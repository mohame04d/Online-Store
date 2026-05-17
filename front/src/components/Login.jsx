import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("login");
  const {url,setToken} = useContext(ShopContext)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data)=>({...data, [name] :value}))
  }

 const onLogin = async (e) => {
  e.preventDefault();
  let newUrl = url;
  let dataToSend;

  if (state === "login") {
    newUrl += "/api/user/login";
    dataToSend = { email: formData.email, password: formData.password };
  } else {
    newUrl += "/api/user/register";
    dataToSend = formData;
  }

  try {
    const res = await axios.post(newUrl, dataToSend);
    console.log("Response:", res.data); // 👈 أضف السطر ده

   if (res.data.token) {
  setToken(res.data.token);
  localStorage.setItem("token", res.data.token);
  navigate("/");
} else {
  alert(res.data.message);
}

  } catch (err) {
    console.log(err.response?.data);
    alert("Error");
  }
};


  return (
    <section className="relative w-full min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900
     text-white py-24 px-6 sm:px-10 flex items-center justify-center">

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm p-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-md bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
        
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center">
          تسجيل الدخول
        </h2>

        <form onSubmit={onLogin} className="flex flex-col gap-6">
          <input type="email" placeholder="البريد الالكتروني" name="email" value={formData.email} onChange={onChangeHandler} required
            className="w-full bg-white/15 px-4 py-3 rounded-xl text-white placeholder-gray-300 
           outline-none focus:ring-2 focus:ring-cyan-400"/> 

           <input type="password" placeholder="كلمة المرور" name="password" value={formData.password} onChange={onChangeHandler}  required
           className="w-full bg-white/15 px-4 py-3 rounded-xl text-white placeholder-gray-300 
         outline-none focus:ring-2 focus:ring-cyan-400"/> 

         <button type="submit" className="bg-linear-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-2xl font-semibold 
         text-white hover:opacity-90 transition-all shadow-lg">تسجيل الدخول  
          </button> 
        </form>

       <p className="mt-6 text-center text-gray-300">
     ليس لديك حساب؟{" "}
      <span onClick={()=> navigate('/signup')} className="text-cyan-400 font-semibold cursor-pointer hover:underline">
       انشاء حساب جديد
      </span>
     </p>

      </div>

    </section>
  );
};

export default Login;