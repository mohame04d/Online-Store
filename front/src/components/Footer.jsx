import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`شكرا لتواصلك معنا , ${formData.name}!`);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-900
     text-white py-24 px-6 sm:px-10">
  
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>

  <div className="relative z-10 max-w-7xl mx-auto">
    
    {/* Title */}
    <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center">
    تواصل معنا
    </h2>

    <p className="text-gray-300 mb-12 text-center text-lg sm:text-xl">
      نحن هنا لمساعدتك في اي وقت ارسب لنا رسالة وسنعود اليك قريبا
    </p>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      
      {/* Info */}
      <div className="space-y-8">

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg 
        hover:shadow-cyan-400/30 transition-all">
          <MapPin className="w-8 h-8 text-cyan-400" />
          <div>
            <h4 className="font-semibold text-lg">العنوان</h4>
            <p className="text-gray-300 ">قطور محافظة الغربية</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg
         hover:shadow-cyan-400/30 transition-all">
          <Phone className="w-8 h-8 text-cyan-400" />
          <div>
             <h4 className="font-semibold text-lg">الهاتف</h4>
            <p className="text-gray-300 ">+20 1069 532 055</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg 
        hover:shadow-cyan-400/30 transition-all">
          <Mail className="w-8 h-8 text-cyan-400"/>
          <div>
            <p className="font-semibold">البريد الالكتروني</p>
            <p className="text-gray-300 text-sm">mohakim88tr@gmail.com</p>
          </div>
        </div>

      </div>

      <form onSubmit={handleChange} className=" bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl
      flex flex-col gap-6 ">
        <input type="text" name="name" placeholder="" value={formData.name} onChange={{handleChange}}
        required className="bg-white/10  p-4 text-black rounded-xl shadow-lg placeholder-gray-600 font-semibold 
       focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"/>

       <input type="email" name="email" placeholder="" value={formData.email} onChange={{handleChange}}
        required className="bg-white/10  p-4 text-black rounded-xl shadow-lg placeholder-gray-600 font-semibold 
       focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"/>

       <textarea name="message" placeholder="" value={formData.message} onChange={handleChange} required
       rows={5} className="bg-white/10  p-4 text-black rounded-xl shadow-lg placeholder-gray-600 font-semibold 
       focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all">

       </textarea>

       <button type="submit" className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
       px-6 py-3 rounded-3xl font-semibold text-white hover:opacity-90 transition-all shadow-lg">ارسال الرسالة

       </button>
      </form>

    </div>

    <footer className="mt-24 relative z-10 max-w-7xl mx-auto text-center text-gray-300">
      <p className="mb-4">@ 2026 online-store جميع الحقوق محفوظة</p> 
      <div className="flex justify-center gap-6">
        <a href="#" className="hover:text-white transition-colors">فيسبوك</a>
                <a href="#" className="hover:text-white transition-colors">تويتر</a>
        <a href="#" className="hover:text-white transition-colors">انستغرام</a>
        <a href="#" className="hover:text-white transition-colors">لينكد ان</a>

      </div>
    </footer>
  </div>
</section>
  );
};

export default Footer;