import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiMail, FiShoppingBag } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom'; // Import Link for navigation
import fashionBg from '../image/background.jpeg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', form);
    // Add your authentication logic here
    // On successful login, you can redirect programmatically
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fashionBg})` }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/20">
        <div className="flex justify-center mb-4">
          <FiShoppingBag className="text-4xl text-rose-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your fashion account</p>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full py-3 mb-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-sm"
        >
          <FcGoogle className="mr-3 text-xl" />
          <span className="font-medium">Continue with Google</span>
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiMail className="text-gray-500 group-hover:text-rose-500 transition-colors" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all group-hover:border-rose-200"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiLock className="text-gray-500 group-hover:text-rose-500 transition-colors" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all group-hover:border-rose-200"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-rose-500 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="flex justify-end">
            <a href="/forgot-password" className="text-sm text-rose-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <Link to="/"> {/* Changed to Link component */}
            <button
              type="submit"
              className="w-full py-3.5 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-100 transition-all duration-300"
            >
              Sign In
            </button>
          </Link>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/SignUp" className="text-rose-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;