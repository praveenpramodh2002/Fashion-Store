import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiShoppingBag } from 'react-icons/fi';

const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold">
            PEPPER<span className="text-gray-400">STREET</span>
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium fashion for the conscious consumer. Ethically made, sustainably packaged.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FiInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FiTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FiFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FiShoppingBag className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Shop</h4>
          <ul className="space-y-3">
            <li><Link to="/shop/new" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">New Arrivals</Link></li>
            <li><Link to="/shop/bestsellers" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Bestsellers</Link></li>
            <li><Link to="/shop/sale" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Sale</Link></li>
            <li><Link to="/collections" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Collections</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Help</h4>
          <ul className="space-y-3">
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Contact Us</Link></li>
            <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Shipping Policy</Link></li>
            <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Returns & Exchanges</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe for 10% off your first order and exclusive updates.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-gray-800 text-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-gray-900 px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-800 my-12"></div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-500 text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Pepper Street. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
            Terms of Service
          </Link>
          <Link to="/cookies" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;