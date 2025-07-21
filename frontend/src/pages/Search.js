import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="max-w-2xl mx-auto px-4 py-32 text-center">
      <h1 className="text-4xl font-extrabold mb-6 tracking-tight">Search Products</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for clothing, brands, etc."
        className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-lg mb-8"
      />
      <p className="text-gray-400">Start typing to search for products.</p>
    </div>
  );
};

export default Search; 