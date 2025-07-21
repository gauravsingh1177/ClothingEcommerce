import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Cart = () => {
  const { cart, loading, removeFromCart, clearCart, fetchCart } = useCart();
  const { token } = useAuth();
  const [orderMsg, setOrderMsg] = React.useState('');
  const [orderLoading, setOrderLoading] = React.useState(false);
  const [itemBuyMsg, setItemBuyMsg] = React.useState('');

  const handleBuy = async () => {
    setOrderLoading(true);
    setOrderMsg('');
    try {
      await axios.post('/api/orders/place', {}, { headers: { Authorization: `Bearer ${token}` } });
      setOrderMsg('🎉 Order placed successfully! Thank you for shopping with us.');
      clearCart();
      fetchCart();
    } catch (err) {
      setOrderMsg('Order failed. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  const handleBuyItem = async (item) => {
    setItemBuyMsg('');
    try {
      // Simulate buying just this item: remove it from cart and show confirmation
      removeFromCart(item._id);
      setItemBuyMsg(`🎉 Bought ${item.product.name} successfully!`);
      fetchCart();
    } catch (err) {
      setItemBuyMsg('Order failed. Please try again.');
    }
  };

  if (loading) return <div className="text-center mt-20 text-black font-semibold">Loading cart...</div>;
  if (!cart || !cart.items || cart.items.length === 0) return <div className="text-center mt-20 text-gray-400 text-lg">Your cart is empty.</div>;

  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-extrabold text-center mb-10 tracking-tight">Your Cart</h2>
      {cart.items.map(item => (
        <div key={item._id} className="flex flex-col sm:flex-row items-center mb-8 border-b border-gray-100 pb-6 gap-6">
          <img src={item.product.image} alt={item.product.name} className="w-24 h-32 object-cover rounded-xl shadow" />
          <div className="flex-1 min-w-[120px]">
            <div className="font-bold text-lg mb-1">{item.product.name}</div>
            <div className="text-gray-500 mb-1">
              {item.size && <span>Size: {item.size}</span>}
              {item.size && item.color && <span> | </span>}
              {item.color && <span>Color: {item.color}</span>}
            </div>
            <div className="text-gray-400 mb-1">Qty: {item.quantity}</div>
            <div className="text-black font-bold text-lg">₹{item.product.price}</div>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => removeFromCart(item._id)} className="bg-black hover:bg-gray-900 text-white rounded-full px-6 py-2 font-semibold transition mt-2 sm:mt-0">Remove</button>
            <button onClick={() => handleBuyItem(item)} className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 font-semibold transition">Buy Now</button>
          </div>
        </div>
      ))}
      <div className="font-bold text-2xl text-right mt-6 mb-10">Total: ₹{total}</div>
      <button onClick={handleBuy} disabled={orderLoading} className="w-full py-4 bg-black hover:bg-gray-900 text-white rounded-full font-bold text-xl transition mb-4 shadow">
        {orderLoading ? 'Placing Order...' : 'Buy Now'}
      </button>
      {orderMsg && <div className={`text-center font-semibold mt-6 ${orderMsg.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>{orderMsg}</div>}
      {itemBuyMsg && <div className="text-center font-semibold mt-4 text-green-600">{itemBuyMsg}</div>}
    </div>
  );
};

export default Cart; 