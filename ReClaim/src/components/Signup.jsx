import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the terms to continue.');
      return;
    }

    try {
      // Fake API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 font-sans min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <header className="bg-red-600 text-white px-5 py-4 flex items-center justify-between mb-6 -m-8 -mt-8 rounded-t-xl">
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

        <div className="text-center mb-8">
          <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Sign up to manage your lost & found items</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 bg-white"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="University Email"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 bg-white"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 bg-white"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 bg-white"
              required
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-1 accent-red-600"
            />
            <span>
              I agree to the{' '}
              <button type="button" className="text-red-600 hover:underline">
                terms & conditions
              </button>
              .
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium"
          >
            Sign Up
          </button>

          <div className="text-center">
            <p className="text-gray-700">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-red-600 hover:text-red-700">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;



