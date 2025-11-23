import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Lost = () => {

  const [formData, setFormData] = useState({});
  const handleChange = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#fffaf8] font-sans min-h-screen">
      <header className="bg-red-600 text-white px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white text-red-600 font-bold rounded-full h-9 w-9 flex items-center justify-center text-lg">
            R
          </div>
          <div>
            <h1 className="font-semibold text-xl leading-none">ReClaim</h1>
            <p className="text-xs opacity-90">Chitkara University</p>
          </div>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Report a Lost Item</h2>
        <p className="text-gray-600 mb-6">
          Provide as many details as possible. This helps others identify and return your item.
        </p>

        <form
          className="bg-white rounded-xl shadow-lg border border-red-100 p-6 space-y-5"
          onSubmit={handleSubmit}
        >
          {/* Title Input */}
          <input
            type="text"
            placeholder="e.g. Black backpack, ID card, Laptop"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
          />

          {/* Category */}
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
          >
            <option>Accessories</option>
            <option>Electronics</option>
            <option>ID Cards</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Bags</option>
            <option>Misc</option>
          </select>

          {/* Location */}
          <input
            type="text"
            placeholder="e.g. Central Library, Block A - Room 204"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
          />

          {/* Date Lost */}
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
          />

          {/* Description */}
          <textarea
            rows="4"
            placeholder="Include color, brand, unique marks, contents, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-y"
            onChange={handleChange}
          />

          {/* Contact */}
          <input
            type="text"
            placeholder="Phone number or email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full mt-2 px-4 py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Submit Lost Item Report
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500">
          Note: Your contact information will only be shared with staff or verified finders.
        </p>
      </main>
    </div>
  );
};

export default Lost;
