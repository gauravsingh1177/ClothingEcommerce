import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!token) return setCart(null);
    setLoading(true);
    try {
      const res = await axios.get('/api/cart', { headers: { Authorization: `Bearer ${token}` } });
      setCart(res.data);
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, [token]);

  const addToCart = async (productId, quantity = 1, size, color) => {
    if (!token) return;
    await axios.post('/api/cart/add', { productId, quantity, size, color }, { headers: { Authorization: `Bearer ${token}` } });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    if (!token) return;
    await axios.post('/api/cart/remove', { productId }, { headers: { Authorization: `Bearer ${token}` } });
    fetchCart();
  };

  const clearCart = async () => {
    if (!token) return;
    await axios.post('/api/cart/clear', {}, { headers: { Authorization: `Bearer ${token}` } });
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}; 