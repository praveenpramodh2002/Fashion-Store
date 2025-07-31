import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiSearch, FiShoppingBag, FiHeart, FiMenu, FiX, FiUser, FiChevronDown,
  FiInstagram, FiTwitter, FiFacebook
} from 'react-icons/fi';

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Shop', 
    path: '/shop',
    submenu: [
      { name: 'New Arrivals', path: '/shop/new' },
      { name: 'Bestsellers', path: '/shop/bestsellers' },
      { name: 'Sale', path: '/shop/sale' },
      { name: 'Collections', path: '/shop/collections' }
    ]
  },
  { 
    name: 'Categories', 
    path: '/categories',
    submenu: [
      { name: 'Dresses', path: '/categories/dresses' },
      { name: 'Tops', path: '/categories/tops' },
      { name: 'Bottoms', path: '/categories/bottoms' },
      { name: 'Outerwear', path: '/categories/outerwear' },
      { name: 'Accessories', path: '/categories/accessories' }
    ]
  },
  // ✅ These are already correct
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-serif font-bold">
              PEPPER<span className={scrolled ? "text-gray-600" : "text-white/70"}>STREET</span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(link.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link 
                  to={link.path} 
                  className={`${scrolled ? 'text-gray-900 hover:text-black' : 'text-white hover:text-white/80'} font-medium flex items-center transition-all duration-300`}
                >
                  {link.name}
                  {link.submenu && <FiChevronDown className="ml-1 w-4 h-4" />}
                </Link>
                {link.submenu && activeSubmenu === link.name && (
                  <div className="absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-lg shadow-xl rounded-lg py-2 z-50 border border-white/20">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-3 text-gray-800 hover:bg-gray-100/50 transition-colors text-sm"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            <button className={`${scrolled ? 'text-gray-700 hover:text-black' : 'text-white hover:text-white/80'} transition-colors`}>
              <FiSearch className="w-5 h-5" />
            </button>
            <button className={`${scrolled ? 'text-gray-700 hover:text-black' : 'text-white hover:text-white/80'} relative transition-colors`}>
              <FiHeart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <button className={`${scrolled ? 'text-gray-700 hover:text-black' : 'text-white hover:text-white/80'} relative transition-colors`}>
              <FiShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>
            <button className={`${scrolled ? 'text-gray-700 hover:text-black' : 'text-white hover:text-white/80'} transition-colors`}>
              <FiUser className="w-5 h-5" />
            </button>
            <button 
              className={`md:hidden ${scrolled ? 'text-gray-700 hover:text-black' : 'text-white hover:text-white/80'} transition-colors`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-xl border-t border-white/20">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.path}
                  className="block px-3 py-2 text-gray-900 hover:bg-gray-100/50 rounded-lg text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {link.submenu && (
                  <div className="pl-4 space-y-1">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-3 py-2 text-gray-600 hover:bg-gray-50/50 rounded-lg text-sm transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
