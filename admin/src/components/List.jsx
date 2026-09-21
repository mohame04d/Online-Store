import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";

const List = () => {
  const [products, setProducts] = useState([]);

  const url = "http://localhost:4000";

  const fetchProducts = async () => {
      const res = await axios.get(`${url}/api/products/list`);
    
      if (res.data.success) {
        setProducts(res.data.data);
      } else {
        console.log("Error fetching products");
      }
    } 

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
      const res = await axios.delete(`${url}/api/product/remove` ,{id:id});
      await fetchProducts()
      if(res.data.success){
        console.log("Product removed successfully");
      } else {        console.log("Failed to remove product");
      }
    } 

  return (
    <section className="relative md:ml-64 min-h-screen bg-linear-to-r
     from-indigo-900 via-purple-800 to-pink-900 text-white py-24 px-6 sm:px-10">

      <div className="relative z-10 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.map((product) => (
            <div key={product._id} className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg 
             border border-white/20 p-6 flex flex-col justify-between">

                <img src={`${url}/images/`+product.image}  className="w-full h-48 object-contain rounded-xl" />

                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-2 truncate">{product.description}</p>
                <p className="text-cyan-400 font-bold mb-2">${product.price.toFixed(2)}</p>
                <p className="text-gray-200 mb-2">{product.category}</p>

                <button onClick={() => handleDelete(product._id)} 
                className=" px-4 py-2 bg-red-500 text-white rounded-xl font-semibold
                 hover:bg-red-600 transition-all">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default List;