import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const {url,setToken} = useContext(ShopContext)

  const [state, setState] = useState("register");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data)=>({...data, [name] :value}))
  }

 const onSignUp = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("كلمة المرور غير متطابقة");
    return;
  }

  let newUrl = url;

  if (state === "login") {
    newUrl += "/api/user/login";
  } else {
    newUrl += "/api/user/register";
  }

  try {
    const res = await axios.post(newUrl, formData);

    // ✅ تحقق من token مش success
    if (res.data.token) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message || "تم إنشاء الحساب بنجاح!");
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    console.log(err.response?.data); // 👈 مهم لو في error
    alert("Error");
  }
};

  
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900
     text-white py-24 px-6 sm:px-10 flex items-center justify-center">
      
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm p-10 pointer-events-none">
        
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md p-10 rounded-3xl">

      <h2 className="text-3xl font-extrabold sm:text-4xl mb-6 text-center">      
        انشاء حساب جديد
     </h2>
     <form onSubmit={onSignUp} className="flex flex-col gap-6">
        <input type="text" placeholder="الاسم" name="name" value={formData.name} onChange={onChangeHandler} required
         className="w-full bg-white/15 px-4 py-3 rounded-xl text-white placeholder-gray-300 
         outline-none focus:ring-2 focus:ring-cyan-400"/>  

         <input type="email" name="email" placeholder="البريد الالكتروني" value={formData.email} onChange={onChangeHandler} required
          className="w-full bg-white/15 px-4 py-3 rounded-xl text-white placeholder-gray-300 
         outline-none focus:ring-2 focus:ring-cyan-400"/>  

         <input type="password" placeholder="كلمة المرور" name="password" value={formData.password} onChange={onChangeHandler}  required
           className="w-full bg-white/15 px-4 py-3 rounded-xl text-white placeholder-gray-300 
         outline-none focus:ring-2 focus:ring-cyan-400"/>  

         <input type="password" placeholder="تاكيد كلمة المرور" name="confirmPassword" value={formData.confirmPassword} onChange={onChangeHandler} required
           className="w-full bg-white/15 px-4 py-3 rounded-xl text-white placeholder-gray-300 
         outline-none focus:ring-2 focus:ring-cyan-400"/>      

         <button type="submit" className="bg-linear-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-2xl font-semibold 
         text-white hover:opacity-90 transition-all shadow-lg">انشاء الحساب
          </button>  
     </form>
     <p className="mt-6 text-center text-gray-300">
      لديك حساب؟{" "}
      <span onClick={()=> navigate('/login')} className="text-cyan-400 font-semibold cursor-pointer hover:underline">
        تسجيل الدحول
      </span>
     </p>
     </div>
    </section>
  );
};

export default SignUp;