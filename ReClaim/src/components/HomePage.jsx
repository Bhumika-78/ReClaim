import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [items, setItems] = useState([]);

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/items");
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="bg-[#fffaf8] font-sans">
      {/* Header */}
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

        <button className="bg-white text-red-600 rounded-full p-2 shadow-sm hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M5.121 17.804A9 9 0 1118.879 7.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lost Something?</h2>
        <p className="text-gray-600 text-lg mb-6">ReClaim helps you find it faster.</p>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Report or search lost and found items easily across your university.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Link to="/lost"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 4v16m8-8H4" />
            </svg>
            Report Lost Item
          </Link>

          <Link to="/found"
            className="border border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M8 16h8m-4-4v8m0-8V4m0 0l4 4m-4-4l-4 4" />
            </svg>
            Report Found Item
          </Link>
        </div>

        {/* Search Bar (Inactive for now) */}
        <div className="flex justify-center">
          <div className="flex w-full max-w-lg items-center bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
            <input type="text"
              placeholder="Search items e.g. ID card, bottle, wallet"
              className="flex-grow px-4 py-3 outline-none text-gray-700 placeholder-gray-400" />
            <button className="bg-red-600 text-white px-5 py-3 hover:bg-red-700">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
          <Link to="/found?category=Bags" className="bg-red-50 p-4 rounded-xl flex flex-col items-center gap-2 shadow-sm cursor-pointer hover:bg-red-100">
            <div className="bg-red-100 p-3 rounded-full">🎒</div>
            <p className="text-gray-700 text-sm font-medium">Bags</p>
          </Link>

          <Link to="/found?category=Gadgets" className="bg-blue-50 p-4 rounded-xl flex flex-col items-center gap-2 shadow-sm cursor-pointer hover:bg-blue-100">
            <div className="bg-blue-100 p-3 rounded-full">📱</div>
            <p className="text-gray-700 text-sm font-medium">Gadgets</p>
          </Link>

          <Link to="/found?category=ID Cards" className="bg-green-50 p-4 rounded-xl flex flex-col items-center gap-2 shadow-sm cursor-pointer hover:bg-green-100">
            <div className="bg-green-100 p-3 rounded-full">🪪</div>
            <p className="text-gray-700 text-sm font-medium">ID Cards</p>
          </Link>

          <Link to="/found?category=Accessories" className="bg-yellow-50 p-4 rounded-xl flex flex-col items-center gap-2 shadow-sm cursor-pointer hover:bg-yellow-100">
            <div className="bg-yellow-100 p-3 rounded-full">👓</div>
            <p className="text-gray-700 text-sm font-medium">Accessories</p>
          </Link>

          <Link to="/found?category=Clothing" className="bg-orange-50 p-4 rounded-xl flex flex-col items-center gap-2 shadow-sm cursor-pointer hover:bg-orange-100">
            <div className="bg-orange-100 p-3 rounded-full">👕</div>
            <p className="text-gray-700 text-sm font-medium">Clothing</p>
          </Link>
        </div>
      </section>

      {/* Recent Reports from API */}
      <section className="px-6 py-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Reports</h3>

        {items.length === 0 ? (
          <p className="text-gray-500">No recent reports available.</p>
        ) : (
          <div className="space-y-4">
            {items.slice(-3).map(item => (
              <div key={item.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg">📦</div>
                  <div>
                    <p className="text-gray-900 font-medium">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.location}</p>
                  </div>
                </div>
                <span className="text-yellow-600 text-sm font-medium flex items-center gap-1">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full"></span> Pending
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t mt-6">
        © {new Date().getFullYear()} ReClaim. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

