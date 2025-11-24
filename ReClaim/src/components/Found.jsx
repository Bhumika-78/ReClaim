import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Found = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [filteredItems, setFilteredItems] = useState([]);

  const items = [
    {
      id: 1,
      title: 'Black Leather Wallet',
      date: 'Found on 3/15/2024',
      category: 'Accessories',
      location: 'Student Union',
      description: 'Black leather wallet found on study desk. Contains cards but no cash.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'iPhone 14 Pro',
      date: 'Found on 3/14/2024',
      category: 'Electronics',
      location: 'Student Union',
      description: 'Cracked screen iPhone with blue case. Found near food court.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Set of House Keys',
      date: 'Found on 3/13/2024',
      category: 'Misc',
      location: 'Parking Lot B',
      description: 'Keys with colorful keychain and car key fob.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      title: 'Calculus Textbook',
      date: 'Found on 3/12/2024',
      category: 'Books',
      location: 'Central Library',
      description: 'Calculus textbook with highlighted pages and student notes.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    },
    

  ];

useEffect(() => {
  const q = searchQuery.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const title = (item.title || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();
    const loc = (item.location || '').toLowerCase();

    const matchesSearch =
      q === '' || title.includes(q) || desc.includes(q);

    const matchesCategory =
      categoryFilter === 'All' || cat === categoryFilter.toLowerCase();

    const matchesLocation =
      locationFilter === 'All' || loc === locationFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesLocation;
  });

  setFilteredItems(filtered);
}, [searchQuery, categoryFilter, locationFilter]);
  const handleReset = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setLocationFilter('All');
  };

  const handleClaim = (itemId) => {
    if (window.confirm('Do you want to request this item? A staff member will contact you.')) {
      alert('Item claim request submitted successfully!');
    }
  };

  return (
    <div className="bg-[#fffaf8] font-sans min-h-screen">
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
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters Bar */}
        <div className="bg-red-50 rounded-xl shadow p-6 mb-8 border border-red-200">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white text-gray-700"
                >
                  <option value="All">All</option>
                  <option value="Electronics">Electronics</option>
                  <option value="ID Cards">ID Cards</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Books">Books</option>
                  <option value="Bags">Bags</option>
                  <option value="Misc">Misc</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2 text-gray-700">Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white text-gray-700"
                >
                  <option value="All">All</option>
                  <option value="Central Library">Central Library</option>
                  <option value="Student Union">Student Union</option>
                  <option value="Parking Lot B">Parking Lot B</option>
                  <option value="Engineering Building">Engineering Building</option>
                  <option value="Campus Quad">Campus Quad</option>
                  <option value="Science Building">Science Building</option>
                </select>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div className="text-sm text-gray-600">
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search found items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white text-gray-700"
            />
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-64 h-64 mb-6 bg-red-100 rounded-lg flex items-center justify-center">
              <svg
                className="h-16 w-16 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">No items found</h3>
            <p className="mb-6 max-w-md mx-auto text-gray-500">
              We couldn't find any items matching your search criteria. Try adjusting your filters
              or search terms.
            </p>
            
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-red-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="aspect-video overflow-hidden rounded-t-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
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
        )}
      </main>

      <footer className="bg-red-50 border-t mt-16 border-red-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm mb-2 text-gray-600">
              All claims are verified before items are released. Please bring valid ID when
              collecting your item.
            </p>
            <a href="#" className="text-sm underline-offset-4 hover:underline text-red-600">
              Contact us for support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Found;



