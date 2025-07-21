import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const trending = [
  { name: 'Oversized Hoodie', image: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Denim Jacket', image: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Summer Dress', image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Classic White Tee', image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Wide-Leg Pants', image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Statement Bag', image: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const seasonal = [
  { name: 'Lightweight Trench', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Floral Midi Dress', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Canvas Sneakers', image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const editorsChoice = [
  { name: 'Minimalist Blazer', image: 'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Cropped Top', image: 'https://images.pexels.com/photos/5257325/pexels-photo-5257325.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [scrollDir, setScrollDir] = useState('right');
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Auto-scroll logic for Trending Now
  useEffect(() => {
    if (paused) return;
    const el = scrollRef.current;
    if (!el) return;
    let interval = setInterval(() => {
      if (scrollDir === 'right') {
        el.scrollLeft += 2;
        if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 2) {
          setScrollDir('left');
        }
      } else {
        el.scrollLeft -= 2;
        if (el.scrollLeft <= 2) {
          setScrollDir('right');
        }
      }
    }, 16);
    return () => clearInterval(interval);
  }, [scrollDir, paused]);

  const menCategories = ['T-Shirts', 'Jeans', 'Jackets', 'Hoodies', 'Pants'];
  const womenCategories = ['Dresses', 'Skirts'];
  const accessoryCategories = ['Shoes', 'Hats', 'Bags', 'Sunglasses', 'Accessories'];

  const dynamicCollections = [
    {
      title: 'Men',
      products: products.filter(p => menCategories.includes(p.category))
    },
    {
      title: 'Women',
      products: products.filter(p => womenCategories.includes(p.category))
    },
    {
      title: 'Accessories',
      products: products.filter(p => accessoryCategories.includes(p.category))
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-12">Our Collections</h1>

      {/* Trending Now Carousel */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Trending Now</h2>
        </div>
        <div ref={scrollRef} className="flex overflow-x-auto gap-8 pb-4 scroll-smooth" style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
          {trending.map((item) => (
            <div
              key={item.name}
              className="flex-shrink-0 w-64 bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-6 border border-gray-100 animate-fadeInUp"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <img src={item.image} alt={item.name} className="w-48 h-60 object-cover rounded-xl mb-4" />
              <div className="font-bold text-lg text-center">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Picks Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Seasonal Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {seasonal.map((item) => (
            <div key={item.name} className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-6 border border-gray-100 animate-fadeInUp">
              <img src={item.image} alt={item.name} className="w-48 h-60 object-cover rounded-xl mb-4" />
              <div className="font-bold text-lg text-center">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor's Choice Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Editor's Choice</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {editorsChoice.map((item) => (
            <div key={item.name} className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-8 border border-gray-100 animate-fadeInUp">
              <img src={item.image} alt={item.name} className="w-48 h-60 object-cover rounded-xl mb-4" />
              <div className="font-bold text-lg text-center">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Men, Women, Accessories Sections */}
      {loading ? (
        <div className="text-center text-gray-500">Loading collections...</div>
      ) : (
        dynamicCollections.map((section) => (
          <div key={section.title} id={section.title} className="mb-16 pt-20 -mt-20">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {section.products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={() => addToCart(product._id)}
                  onViewDetails={() => navigate(`/product/${product._id}`)}
                />
              ))}
            </div>
            {section.products.length === 0 && (
              <div className="text-center text-gray-400 py-8">No products in this collection yet.</div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Collections; 