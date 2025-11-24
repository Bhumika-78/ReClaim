import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", location: "", category: "" });
  const dummyItems = [
    {
      id: 'd1',
      title: 'Blue Water Bottle',
      date: 'Found on 11/10/2025',
      category: 'Accessories',
      location: 'Library - Ground Floor',
      description: 'Lightweight blue bottle with university logo. Found near study tables.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    {
      id: 'd2',
      title: 'Student ID Card',
      date: 'Found on 11/09/2025',
      category: 'ID Cards',
      location: 'Cafeteria',
      description: 'Red ID card in a clear sleeve with a lanyard. Photo present.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
    },
    {
      id: 'd3',
      title: 'Black Backpack',
      date: 'Found on 11/07/2025',
      category: 'Bags',
      location: 'Engineering Block',
      description: 'Medium-sized black backpack with a laptop sleeve and keychain.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    }
  ];

  const handleClaim = (itemId) => {
    if (window.confirm('Do you want to request this item? A staff member will contact you.')) {
      alert('Item claim request submitted successfully!');
    }
  };

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

  // Search handler: filters items client-side
  const handleSearch = () => {
    const q = (searchText || "").trim().toLowerCase();
    if (!q) {
      setSearchResults(null);
      return;
    }
    const results = items.filter(it => {
      return (
        (it.title && it.title.toLowerCase().includes(q)) ||
        (it.location && it.location.toLowerCase().includes(q)) ||
        (it.category && it.category.toLowerCase().includes(q)) ||
        (it.description && it.description.toLowerCase().includes(q))
      );
    });
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchText("");
    setSearchResults(null);
  };

  // Submit a new item to the API and update local state
  const submitNewItem = async () => {
    if (!newItem.title) return;
    try {
      const res = await axios.post("http://localhost:5000/items", newItem);
      // if API returns created item, append; otherwise push newItem with a temporary id
      const created = res?.data || { ...newItem, id: Date.now() };
      setItems(prev => [...prev, created]);
      setNewItem({ title: "", location: "", category: "" });
      setShowAddForm(false);
      // If a search is active, refresh results
      if (searchResults !== null) handleSearch();
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

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

        {/* Search Bar */}
        <div className="flex justify-center">
          <div className="flex w-full max-w-lg items-center bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              placeholder="Search items e.g. ID card, bottle, wallet"
              className="flex-grow px-4 py-3 outline-none text-gray-700 placeholder-gray-400"
            />
            <button onClick={handleSearch} className="bg-red-600 text-white px-5 py-3 hover:bg-red-700">
              Search
            </button>
            <button onClick={clearSearch} className="ml-2 bg-gray-100 text-gray-700 px-4 py-3 hover:bg-gray-200">
              Clear
            </button>
            <button onClick={() => setShowAddForm(v => !v)} className="ml-2 bg-white text-red-600 px-4 py-3 hover:bg-red-50 border-l">
              {showAddForm ? 'Cancel' : 'Add Item'}
            </button>
          </div>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <div className="max-w-lg mx-auto mt-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-medium mb-2">Add New Item</h4>
            <div className="flex flex-col gap-2">
              <input value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} placeholder="Title" className="px-3 py-2 border rounded" />
              <input value={newItem.location} onChange={e => setNewItem({...newItem, location: e.target.value})} placeholder="Location" className="px-3 py-2 border rounded" />
              <input value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} placeholder="Category" className="px-3 py-2 border rounded" />
              <div className="flex justify-end">
                <button onClick={submitNewItem} className="bg-red-600 text-white px-4 py-2 rounded">Submit</button>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults && (
          <div className="max-w-3xl mx-auto mt-6 text-left">
            <h4 className="font-semibold mb-3">Search Results ({searchResults.length})</h4>
            {searchResults.length === 0 ? (
              <p className="text-gray-500">No items matched your search.</p>
            ) : (
              <div className="space-y-3">
                {searchResults.map(item => (
                  <div key={item.id} className="bg-white rounded-xl border p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.location} • {item.category}</p>
                    </div>
                    <Link to={`/found/${item.id}`} className="text-red-600">View</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {(items.length === 0 ? dummyItems : items.slice(-3)).map((item) => (
              <div
                key={item.id}
                className="bg-white border border-red-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                {item.image && (
                  <div className="aspect-video overflow-hidden rounded-t-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 transition-colors">{item.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center text-sm mb-2 text-gray-600">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.172L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm mb-3 text-gray-600">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {item.date}
                  </div>
                  <p className="text-sm mb-4 line-clamp-2 text-gray-600">{item.description}</p>
                  <button
                    onClick={() => handleClaim(item.id)}
                    className="w-full px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity bg-red-600"
                  >
                    Claim Item
                  </button>
                </div>
              </div>
            ))}
          </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t mt-6">
        © {new Date().getFullYear()} ReClaim. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

