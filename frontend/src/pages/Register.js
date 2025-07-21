import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-white">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-black tracking-tight">Create Account</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full mb-6 px-5 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full mb-6 px-5 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-5 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg"
        />
        <button type="submit" disabled={loading} className="w-full py-4 bg-black hover:bg-gray-900 text-white rounded-full font-bold text-lg transition mb-2 shadow">
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <div className="text-red-500 text-center mt-4 font-semibold">{error}</div>}
      </form>
    </div>
  );
};

export default Register; 