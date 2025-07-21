import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const categories = [
  'All',
  'T-Shirts',
  'Jeans',
  'Dresses',
  'Jackets',
  'Hoodies',
  'Pants',
  'Skirts',
  'Shoes',
];

const HERO_IMAGE = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80';

const getNewArrivals = (products) => products.slice(0, 4);
const getTopSelling = (products) => [...products].sort((a, b) => b.price - a.price).slice(0, 8);

const CategoryCard = ({ image, title }) => (
  <div className="relative group overflow-hidden rounded-lg cursor-pointer">
    <img src={image} alt={title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300" />
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <h3 className="text-white text-2xl font-bold tracking-wider">{title}</h3>
    </div>
  </div>
);

const summerSlides = [
  {
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    title: 'The Summer Edit',
    desc: 'Discover our latest collection for the sunny days ahead.'
  },
  {
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
    title: 'Breezy Styles',
    desc: 'Lightweight fabrics and fresh colors for summer.'
  },
  {
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    title: 'Vacation Ready',
    desc: 'Pack your bags with our top picks for travel.'
  },
];

function SummerCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % summerSlides.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="relative h-96 bg-gray-200 my-16 rounded-2xl overflow-hidden shadow-lg">
      {summerSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
            <p className="text-lg mb-6 drop-shadow">{slide.desc}</p>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full transition hover:bg-gray-200">Shop Collection</button>
          </div>
        </div>
      ))}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
        onClick={() => setCurrent((current - 1 + summerSlides.length) % summerSlides.length)}
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
        onClick={() => setCurrent((current + 1) % summerSlides.length)}
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {summerSlides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-white' : 'bg-white/50'} border border-gray-300`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const scrollRef = React.useRef(null);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    if (!user) return alert('Please login to add items to cart');
    addToCart(product._id);
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product._id}`);
  };

  // Filter and sort products
  let filtered = products;
  if (selectedCategory !== 'All') {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }
  if (sort === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const getNewArrivals = (products) => products.slice(0, 4);
  const getTopSelling = (products) => [...products].sort((a, b) => b.price - a.price).slice(0, 8);
  const getPopularMen = (products) => products.filter(p => ['T-Shirts', 'Jeans', 'Jackets', 'Hoodies', 'Pants'].includes(p.category)).slice(0, 6);
  const getPopularWomen = (products) => products.filter(p => ['Dresses', 'Skirts', 'T-Shirts'].includes(p.category)).slice(0, 6);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    <div>
      {/* Premium Hero Section */}
      <div className="relative h-[340px] md:h-[480px] flex items-center justify-center mb-12 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Fashion Hero"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 brightness-90"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">New Season, New Style</h1>
          <p className="text-lg md:text-2xl font-medium mb-6 drop-shadow">Discover the latest arrivals in fashion, shoes, and more.</p>
          <button className="px-8 py-3 text-lg bg-white/90 hover:bg-white text-black font-bold rounded-full shadow transition">Shop Now</button>
        </div>
      </div>

      {/* H&M-Style Sale Banner (now below hero, above New Collection) */}
      <div className="w-full bg-white py-12 flex flex-col items-center border-b border-gray-100">
        <h1 className="text-5xl md:text-7xl font-extrabold uppercase text-red-600 mb-6 text-center" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
          SALE<br />UP TO 70% OFF
        </h1>
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-red-600 text-center" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
          LAST FEW HOURS
        </h2>
      </div>

      {/* New: Shop by Category Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/collections#Men">
            <CategoryCard image="https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800" title="Men" />
          </Link>
          <Link to="/collections#Women">
            <CategoryCard image="https://images.pexels.com/photos/1154861/pexels-photo-1154861.jpeg?auto=compress&cs=tinysrgb&w=800" title="Women" />
          </Link>
        </div>
      </div>
      
      {/* New Arrivals Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {getNewArrivals(products).map(product => (
            <ProductCard key={product._id} product={product} onViewDetails={handleViewDetails} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
      
      {/* Featured Collection Banner */}
      <SummerCarousel />

      {/* New: Top Selling Interactive Carousel */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Top Selling</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll('left')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => scroll('right')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex overflow-x-auto gap-8 pb-4 scroll-smooth" style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
          {getTopSelling(products).map(product => (
            <div key={product._id} className="flex-shrink-0 w-72">
              <ProductCard product={product} onViewDetails={handleViewDetails} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-black text-white font-bold rounded-full transition hover:bg-gray-800">View All</button>
        </div>
      </div>

      {/* New: Follow Us on Instagram Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-2">Follow Us on Instagram</h2>
        <p className="text-gray-500 mb-10">@LuxeOfficial</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <a href="#" className="group block overflow-hidden"><img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Insta 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></a>
          <a href="#" className="group block overflow-hidden"><img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Insta 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></a>
          <a href="#" className="group block overflow-hidden"><img src="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Insta 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></a>
          <a href="#" className="group block overflow-hidden"><img src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Insta 4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></a>
          <a href="#" className="group block overflow-hidden"><img src="https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Insta 5" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></a>
          <a href="#" className="group block overflow-hidden"><img src="https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Insta 6" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></a>
        </div>
      </div>

      {/* New: Brand/Value Propositions Section */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10M16 16l4-4m0 0l-4-4m4 4H12" /></svg>
            <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-500">Enjoy free shipping on all orders over ₹1000.</p>
          </div>
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 10a10.95 10.95 0 013.53-8.08l-1.48-1.48A13.93 13.93 0 002 10h2zm16 4a10.95 10.95 0 01-3.53 8.08l1.48 1.48A13.93 13.93 0 0022 14h-2z" /></svg>
            <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
            <p className="text-gray-500">Not satisfied? Return it within 30 days for a full refund.</p>
          </div>
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V6m0 12v-2" /></svg>
            <h3 className="font-bold text-lg mb-2">Sustainable Fashion</h3>
            <p className="text-gray-500">We are committed to using eco-friendly materials.</p>
          </div>
        </div>
      </div>

      {/* New: Journal/Blog Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">From The Journal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg">
              <img src="https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Blog Post 1" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="font-bold text-xl mt-4 mb-2">Style Guide: 5 Ways to Wear Denim</h3>
            <p className="text-gray-500">Discover new ways to style your favorite denim pieces for any season.</p>
          </div>
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg">
              <img src="https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Blog Post 2" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="font-bold text-xl mt-4 mb-2">Our Commitment to Sustainability</h3>
            <p className="text-gray-500">Learn how we're making a difference with eco-friendly materials.</p>
          </div>
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg">
              <img src="https://images.pexels.com/photos/5257325/pexels-photo-5257325.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Blog Post 3" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="font-bold text-xl mt-4 mb-2">The Ultimate Guide to Chinos</h3>
            <p className="text-gray-500">From casual weekends to smart-casual workdays, master the chino.</p>
          </div>
        </div>
      </div>
      
      {/* 
        The newsletter section has been permanently removed from the homepage 
        and is now integrated directly into the site's main footer.
      */}
    </div>
  );
};

export default Home; 