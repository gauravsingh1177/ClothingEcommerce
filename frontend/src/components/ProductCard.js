import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const navigate = useNavigate();
  const handleCardClick = (e) => {
    // Prevent click if Add to Cart or View Details button is clicked
    if (e.target.tagName === 'BUTTON') return;
    navigate(`/product/${product._id}`);
  };
  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center p-6 border border-gray-100 group relative cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-48 h-60 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-200"
      />
      {product.price < 1000 && (
        <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide">New</span>
      )}
      <h3 className="text-lg font-bold mb-1 text-center tracking-tight">{product.name}</h3>
      <div className="text-xs uppercase text-gray-400 mb-2 tracking-widest">{product.category}</div>
      <div className="font-bold text-xl text-black mb-4">₹{product.price}</div>
      <div className="flex gap-2 w-full">
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="flex-1 py-2 bg-black hover:bg-gray-900 text-white rounded-full font-semibold transition"
        >
          Add to Cart
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
          className="flex-1 py-2 bg-white border border-black text-black hover:bg-gray-100 rounded-full font-semibold transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 