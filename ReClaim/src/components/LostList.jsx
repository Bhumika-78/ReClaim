import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LostList = () => {
  const baseItems = [
    {
      id: 101,
      title: 'Red Umbrella',
      date: 'Lost on 11/20/2025',
      category: 'Accessories',
      location: 'Central Library',
      description: 'Red compact umbrella with wooden handle. Has a small sticker on the strap.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop'
    },
    {
      id: 102,
      title: 'Silver MacBook Air',
      date: 'Lost on 11/18/2025',
      category: 'Electronics',
      location: 'Engineering Building - Lab 3',
      description: '13-inch MacBook Air with a black sticker on lid.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
    },
    {
      id: 103,
      title: 'Grey Scarf',
      date: 'Lost on 11/15/2025',
      category: 'Clothing',
      location: 'Cafeteria',
      description: 'Wool scarf with fringe. Has a small embroidered initial.',
      image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=400&h=300&fit=crop'
    }
  ];
  const [items] = useState(baseItems);

  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(items);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) return setFiltered(items);
    setFiltered(items.filter(item => {
      return (
        (item.title || '').toLowerCase().includes(q) ||
        (item.location || '').toLowerCase().includes(q) ||
        (item.category || '').toLowerCase().includes(q) ||
        (item.description || '').toLowerCase().includes(q)
      );
    }));
  }, [query, items]);

  const handleClaim = (id) => {
    if (window.confirm('Do you want to request this lost item? A staff member will contact you.')) {
      alert('Request submitted for item ' + id);
    }
  };

  const onImgError = (e) => {
    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
  };

  return (
    <div className="bg-[#fffaf8] font-sans min-h-screen">
      <header className="bg-red-600 text-white px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white text-red-600 font-bold rounded-full h-9 w-9 flex items-center justify-center text-lg">R</div>
          <div>
            <h1 className="font-semibold text-xl leading-none">ReClaim</h1>
            <p className="text-xs opacity-90">Chitkara University</p>
          </div>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Reported Lost Items</h2>
          <div className="max-w-md w-full ml-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search lost items..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white text-gray-700" />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-600">No lost items found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div key={item.id} className="bg-white border border-red-200 rounded-xl shadow">
                {item.image && (
                  <div className="aspect-video overflow-hidden rounded-t-xl">
                    <img src={item.image} alt={item.title} onError={onImgError} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">{item.category}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{item.location}</div>
                  <div className="text-sm text-gray-600 mb-4">{item.date}</div>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <button onClick={() => handleClaim(item.id)} className="w-full px-4 py-2 rounded-lg bg-red-600 text-white">Request Item</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LostList;
