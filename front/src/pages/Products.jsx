import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { addToCart, all_products , url } = useContext(ShopContext);

  const { productId } = useParams();

  // البحث عن المنتج
  const product = all_products.find(
    (p) => p._id === productId
  );

  const [selectedColor, setSelectedColor] = useState("Red");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // لو المنتج مش موجود
  if (!product) {
    return (
      <section
        className="min-h-screen flex items-center justify-center text-white 
        bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900"
      >
        <p className="text-2xl font-bold">المنتج غير موجود</p>
      </section>
    );
  }

  // إضافة للسلة
  const handleAddToCart = () => {
    addToCart(product._id, quantity);

    alert(
      `تمت إضافة ${quantity} قطعة من ${product.name} إلى السلة`
    );
  };

  return (
    <section
      className="relative w-full min-h-screen bg-gradient-to-r 
      from-indigo-900 via-purple-900 to-pink-900 
      text-white py-24 px-6 sm:px-10"
    >
      {/* Card */}
      <div
        className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md 
        rounded-3xl p-10 flex flex-col md:flex-row gap-10 shadow-2xl"
      >
        {/* Image */}
        <div
          className="md:w-1/2 flex items-center justify-center 
          bg-white/5 rounded-3xl p-6"
        >
          <img
            src={url + '/images/' + product.image}
            alt={product.name}
            className="w-64 h-64 object-contain rounded-2xl"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-4xl font-extrabold">
            {product.name}
          </h2>

          <p className="text-gray-300 text-lg">
            {product.description}
          </p>

          <p className="text-cyan-400 text-3xl font-bold">
            ${product.price}
          </p>

          <p className="text-gray-200 text-lg">
            Category: {product.category}
          </p>

          {/* Colors */}
          <div>
            <h4 className="font-semibold mb-2">Color:</h4>

            <div className="flex gap-4">
              {["red", "blue", "green", "black", "white"].map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 border-white transition-all ${
                      selectedColor === color
                        ? "scale-125 border-cyan-500"
                        : ""
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                    }}
                  ></button>
                )
              )}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h4 className="font-semibold mb-2">Size:</h4>

            <div className="flex gap-4">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-xl border-2 border-white transition-all ${
                    selectedSize === size
                      ? "bg-cyan-400 text-black scale-105"
                      : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <h4 className="font-semibold">Quantity:</h4>

            <button
              onClick={() =>
                setQuantity(Math.max(1, quantity - 1))
              }
              className="bg-white/20 px-3 py-1 rounded-xl 
              hover:bg-white/30 transition-all"
            >
              -
            </button>

            <span className="px-3">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-white/20 px-3 py-1 rounded-xl 
              hover:bg-white/30 transition-all"
            >
              +
            </button>
          </div>

          {/* Add To Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-gradient-to-r 
            from-indigo-500 via-purple-500 to-pink-500
            px-6 py-3 rounded-2xl font-semibold
            text-white hover:opacity-90 transition-all shadow-lg"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;