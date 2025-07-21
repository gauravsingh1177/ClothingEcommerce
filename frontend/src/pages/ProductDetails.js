import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        console.log('Product data received:', res.data);
        setProduct(res.data);
        if (res.data.sizes && res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        }
        if (res.data.colors && res.data.colors.length > 0) {
          setSelectedColor(res.data.colors[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  const showConfirmation = (message) => {
    setConfirmation(message);
    setTimeout(() => setConfirmation(''), 3000);
  };

  const handleAddToCart = () => {
    addToCart(product._id, 1, selectedSize, selectedColor);
    showConfirmation('Added to cart!');
  };

  const handleBuyNow = () => {
    showConfirmation('Thank you for your purchase!');
  };

  if (loading) return <div className="text-center mt-20 text-black font-semibold">Loading product...</div>;
  if (error || !product) return <div className="text-center mt-20 text-red-500 font-semibold">{error || 'Product not found'}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="mb-8 bg-white/80 hover:bg-gray-100 border border-gray-300 rounded-full px-6 py-2 text-black font-semibold shadow transition">Back</button>
      <div className="flex flex-col md:flex-row gap-16 items-start">
        <img src={product.image} alt={product.name} className="w-full md:w-[420px] h-[480px] object-cover rounded-2xl shadow-lg" />
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">{product.name}</h2>
          <div className="text-black font-bold text-2xl mb-4">₹{product.price}</div>
          <div className="text-xs uppercase text-gray-400 mb-4 tracking-widest">{product.category}</div>
          <div className="mb-8 text-gray-700 text-lg leading-relaxed">{product.description}</div>
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border-2 transition ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold mb-2">Color</h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>
          )}

          <button onClick={handleAddToCart} className="w-full py-4 bg-black text-white font-bold rounded-full transition hover:bg-gray-900 mb-4">Add to Cart</button>
          <button onClick={handleBuyNow} className="w-full py-4 bg-purple-600 text-white font-bold rounded-full transition hover:bg-purple-700">Buy Now</button>
          
          {confirmation && (
            <div className="mt-4 text-center font-semibold text-green-600 bg-green-100 p-3 rounded-full">
              {confirmation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 