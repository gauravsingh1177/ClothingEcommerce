import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-extrabold mb-6 tracking-tight">Your Profile</h1>
        <p className="text-gray-500 text-lg mb-8">You are not logged in.</p>
        <a href="/login" className="inline-block px-8 py-3 bg-black text-white font-bold rounded-full transition hover:bg-gray-900">Log In</a>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <h1 className="text-4xl font-extrabold mb-6 tracking-tight">Your Profile</h1>
      <div className="bg-white rounded-2xl shadow-xl p-10 mb-8">
        <div className="text-2xl font-bold mb-2">{user.name}</div>
        <div className="text-gray-500 mb-2">{user.email}</div>
        <div className="text-gray-400">Role: {user.role}</div>
      </div>
    </div>
  );
};

export default Profile; 