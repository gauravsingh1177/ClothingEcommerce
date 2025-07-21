import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', category: '', sizes: '', colors: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
    // eslint-disable-next-line
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, orderRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/orders/all', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setProducts(prodRes.data);
      setOrders(orderRes.data);
    } catch {
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleInput = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddProduct = async e => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const newProduct = {
        ...form,
        sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()).filter(Boolean) : [],
        colors: form.colors ? form.colors.split(',').map(c => c.trim()).filter(Boolean) : [],
      };
      await axios.post('/api/products', newProduct, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess('Product added!');
      setForm({ name: '', description: '', price: '', image: '', category: '', sizes: '', colors: '' });
      fetchData();
    } catch {
      setError('Failed to add product');
    }
  };

  const handleDeleteProduct = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch {
      setError('Failed to delete product');
    }
  };

  if (!user || user.role !== 'admin') return <div className="text-center mt-20 text-xl text-red-500 font-semibold">Admin access only.</div>;
  if (loading) return <div className="text-center mt-20 text-black font-semibold">Loading admin dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-extrabold mb-10 text-black tracking-tight">Admin Dashboard</h2>
      <h3 className="text-xl font-bold mb-6">Add Product</h3>
      <form onSubmit={handleAddProduct} className="flex flex-wrap gap-4 mb-10 items-end">
        <input name="name" placeholder="Name" value={form.name} onChange={handleInput} required className="flex-1 min-w-[120px] px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg" />
        <input name="description" placeholder="Description" value={form.description} onChange={handleInput} required className="flex-2 min-w-[120px] px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleInput} required className="w-32 px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleInput} required className="flex-2 min-w-[120px] px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg" />
        <input name="sizes" placeholder="Sizes (e.g. S,M,L)" value={form.sizes} onChange={handleInput} className="flex-1 min-w-[120px] px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg" />
        <input name="colors" placeholder="Colors (e.g. Red,Blue)" value={form.colors} onChange={handleInput} className="flex-1 min-w-[120px] px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg" />
        <select name="category" value={form.category} onChange={handleInput} required className="flex-1 min-w-[120px] px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg">
          <option value="">Select Category</option>
          <option value="T-Shirts">T-Shirts</option>
          <option value="Jeans">Jeans</option>
          <option value="Jackets">Jackets</option>
          <option value="Hoodies">Hoodies</option>
          <option value="Pants">Pants</option>
          <option value="Dresses">Dresses</option>
          <option value="Skirts">Skirts</option>
          <option value="Shoes">Shoes</option>
          <option value="Hats">Hats</option>
          <option value="Bags">Bags</option>
          <option value="Sunglasses">Sunglasses</option>
          <option value="Accessories">Accessories</option>
        </select>
        <button type="submit" className="px-8 py-3 bg-black hover:bg-gray-900 text-white rounded-full font-bold text-lg transition">Add</button>
      </form>
      {error && <div className="text-red-500 mb-4 font-semibold">{error}</div>}
      {success && <div className="text-green-600 mb-4 font-semibold">{success}</div>}
      <h3 className="text-xl font-bold mb-6">All Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-16">
        {products.map(prod => (
          <div key={prod._id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border border-gray-100">
            <img src={prod.image} alt={prod.name} className="w-32 h-36 object-cover rounded-xl mb-2" />
            <div className="font-bold mb-1 text-center">{prod.name}</div>
            <div className="text-black font-semibold mb-1">₹{prod.price}</div>
            <div className="text-gray-400 mb-2">{prod.category}</div>
            <button onClick={() => handleDeleteProduct(prod._id)} className="bg-black hover:bg-gray-900 text-white rounded-full px-6 py-2 font-semibold transition">Delete</button>
          </div>
        ))}
      </div>
      <h3 className="text-xl font-bold mb-6">All Orders</h3>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left font-bold">User</th>
              <th className="p-4 text-left font-bold">Items</th>
              <th className="p-4 text-left font-bold">Total</th>
              <th className="p-4 text-left font-bold">Status</th>
              <th className="p-4 text-left font-bold">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-t border-gray-100">
                <td className="p-4">{order.user?.name || 'N/A'}</td>
                <td className="p-4">
                  {order.items.map(item => (
                    <div key={item.product?._id} className="text-sm">
                      {item.product?.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-4">₹{order.total}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin; 