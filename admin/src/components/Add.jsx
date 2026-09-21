import axios from "axios";
import  { useState } from "react";
const Add = () => {
    const url = "http://localhost:4000";
    const [image , setImage] = useState(null);
    const [data , setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Men"
    });
    const onChangeHandler = (e) => {
        const { name , value  } = e.target;
        setData((prev) => ({...prev , [name]:value}));
    };
    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", data.price);
        if(image){
            formData.append("image", image);
        }
        try {
        const res = await axios.post(`${url}/api/products/add`, formData);
        if(res.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Men"
            });
            setImage(null);
            alert("Product added successfully");
        }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        }
    };
  return (
    <section className="relative md:ml-64 min-h-screen bg-linear-to-r
     from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10">
      
      <form onSubmit={onSubmitHandler}>
        
        <div className="relative z-10 max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-xl">
          
          <h2 className="text-3xl font-bold mb-6 text-center">
             إضافة منتج جديد
          </h2>

          <div className="space-y-4">
            
            <input
              type="text"
              name="name"
              placeholder="اسم المنتج"
              value={data.name}
              onChange={onChangeHandler}
              className="w-full px-4 py-3 rounded-xl bg-white/15 text-white
               placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

            <input
              type="text"
              name="description"
              placeholder="وصف المنتج"
              value={data.description}
              onChange={onChangeHandler}
              className="w-full px-4 py-3 rounded-xl bg-white/15 text-white
               placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

             <input
              type="number"
              name="price"
              placeholder="سعر المنتج"
              value={data.price}
              onChange={onChangeHandler}
              className="w-full px-4 py-3 rounded-xl bg-white/15 text-white
               placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

            <select name='category' value={data.category} onChange={onChangeHandler}
              className="w-full px-4 py-3 rounded-xl bg-white/15 text-white
               placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none">
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
              <option>Electronics</option>
              <option>Cosmetics</option>
            </select>

            <input type='file' accept='image/*' onChange={onImageChange} 
            className='w-full text-white'/>Add Image

            {image && (
              <img src={URL.createObjectURL(image)}  className="w-full h-64 object-cover rounded-2xl mt-2" />
            )}

            <button type="submit" className="w-full py-3 bg-linear-to-r
             from-indigo-500 via-purple-500 to-pink-500 px-6 
             text-white font-semibold rounded-2xl hover:opacity-90 transition-all shadow-lg mt-4">
              إضافة المنتج
            </button>

          </div>

        </div>

      </form>

    </section>
  );
};

export default Add;

