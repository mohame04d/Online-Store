import React from 'react'
import { ShoppingCart } from 'lucide-react'
import heroImage from '../assets/bg.png'

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900
     text-white flex items-center">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col-reverse md:flex-row items-center gap-16">
        
        {/* Text */}
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
            مع أفضل التخفيضات <br />
            اكتشف أحدث المنتجات
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-xl">
            تسوق الآن واستمتع بعروض لا تفوت على الإلكترونيات، الأزياء، والمنتجات المميزة.
            احصل على خصومات تصل إلى 50% لفترة محدودة.
          </p>

          {/* Button */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
            <button
              onClick={() => (window.location.href = "/shop")}
              className="flex items-center gap-3 bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-8 py-4
               rounded-2xl text-lg shadow-2xl transition-transform transform hover:scale-105">
                <ShoppingCart className='w-6 h-6'/>تسوق الان
            </button>

             <button
              onClick={() => (window.location.href = "/categories")}
              className="flex items-center gap-3 bg-cyan-400 hover:bg-cyan-500 text-indigo-900 font-bold px-8 py-4
               rounded-2xl text-lg shadow-2xl transition-transform transform hover:scale-105">
                تصفح الفئات
            </button>
          </div>
        </div>

        <div className='flex-1 relative w-full max-w-lg'>
          <img src={heroImage} className='w-full h-full object-cover rounded-3xl shadow-2xl'/>

          <div className='absolute top-6 left-6 bg-red-500 text-white px-5 py-5 rounded-full font-bold shadow-lg animate-pulse
          text-lg'>
            خصم حتي 50%
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
  <svg
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
    className="block w-full h-32"
  >
    <path
      d="M0,0V46.29c47.19,22,103.23,29,158.5,17.33C251,48.21,317.2,0,384,1.13
      c60.86-6.46,118.91,12.08,176,31.49
      c59.45,20.15,118.85,39.69,179,25.36
      c62.47-14.92,123-50.71,185-65.92
      C997,16,1061,23,1120,38.09
      c61.63,15.83,119.72,37.38,180,51.4V0Z"
      className="fill-white"
    />
  </svg>
</div>
    </section>
  );
};

export default Hero;