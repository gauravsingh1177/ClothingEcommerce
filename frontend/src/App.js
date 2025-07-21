import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import { useAuth } from './context/AuthContext';
import Search from './pages/Search';
import Profile from './pages/Profile';
import { useRef, useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 relative">
        {/* Left: Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text select-none">LUXE</Link>
        {/* Center: Nav Links */}
        <div className="flex-1 flex justify-center gap-10">
          <Link to="/" className="text-base font-medium text-gray-800 hover:text-purple-600 transition">Home</Link>
          <Link to="/collections" className="text-base font-medium text-gray-800 hover:text-purple-600 transition">Collections</Link>
          <Link to="/about" className="text-base font-medium text-gray-800 hover:text-purple-600 transition">About</Link>
          <Link to="/contact" className="text-base font-medium text-gray-800 hover:text-purple-600 transition">Contact</Link>
        </div>
        {/* Right: Icons */}
        <div className="flex items-center gap-8 relative">
          {/* Search Wrapper */}
          <div className="relative" onMouseEnter={() => setShowSearch(true)} onMouseLeave={() => setShowSearch(false)}>
            <button className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <div className={`absolute right-0 top-full mt-2 w-80 p-2 transition-all duration-300 ease-in-out ${showSearch ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-2 flex items-center">
                <input type="text" placeholder="Search for products..." className="flex-1 px-3 py-1 border-none focus:outline-none focus:ring-0" />
                <button className="p-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                </button>
              </div>
            </div>
          </div>
          {/* Profile Wrapper */}
          <div className="relative" onMouseEnter={() => setShowProfile(true)} onMouseLeave={() => setShowProfile(false)}>
            <button className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" /><path d="M2 20c0-4 8-6 10-6s10 2 10 6" />
              </svg>
            </button>
            <div className={`absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-64 py-4 px-4 transition-all duration-300 ease-in-out ${showProfile ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              {user ? (
                <>
                  <div className="font-bold text-lg mb-1 px-2">{user.name}</div>
                  <div className="text-gray-500 mb-4 px-2">{user.email}</div>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block w-full text-left px-4 py-2 mb-1 rounded-lg font-semibold hover:bg-gray-100 transition">Admin</Link>
                  )}
                  <button onClick={() => { logout(); setShowProfile(false); navigate('/'); }} className="w-full text-left px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block w-full text-left px-4 py-2 mb-1 rounded-lg font-semibold hover:bg-gray-100 transition">Log In</Link>
                  <Link to="/register" className="block w-full text-left px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">Register</Link>
                </>
              )}
            </div>
          </div>
          {/* Bag/Cart Icon */}
          <Link to="/cart" className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2l1.5 2h9L18 2" />
              <rect x="3" y="6" width="18" height="13" rx="2" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="15" cy="20" r="1" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-800 text-white mt-20 py-16 text-center">
    <div className="max-w-7xl mx-auto px-4">
      {/* Integrated Newsletter Signup */}
      <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
      <p className="text-gray-300 mb-8 max-w-xl mx-auto">
        Get exclusive offers, new arrivals, and style tips delivered straight to your inbox.
      </p>
      <form className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-4 mb-12">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="flex-1 px-6 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white" 
        />
        <button 
          type="submit" 
          className="px-8 py-3 bg-white text-black font-bold rounded-full transition hover:bg-gray-200"
        >
          Subscribe
        </button>
      </form>

      {/* Footer Links and Copyright (now inside the same section) */}
      <div className="border-t border-gray-700 pt-8">
        <div className="flex justify-center gap-6 mb-6">
          <a href="#about" className="text-white/70 hover:text-white font-semibold transition">About</a>
          <a href="#contact" className="text-white/70 hover:text-white font-semibold transition">Contact</a>
        </div>
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">
            <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">
            <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.64a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.64A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 24 4.59z"/></svg>
          </a>
        </div>
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} LUXE. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
