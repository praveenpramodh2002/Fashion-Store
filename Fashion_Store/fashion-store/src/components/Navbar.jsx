import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiSearch, FiShoppingBag, FiHeart, FiMenu, FiX, FiUser, FiChevronDown,
  FiInstagram, FiTwitter, FiFacebook, FiTrash2, FiArrowRight, FiSettings,
  FiLogOut, FiCreditCard, FiPackage, FiStar, FiMessageSquare, FiTrendingUp, FiCalendar
} from 'react-icons/fi';

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Shop', 
    path: '/shop',
    submenu: [
      { 
        name: 'New Arrivals', 
        path: '/shop/new-arrivals',
        icon: <FiCalendar className="mr-2 w-4 h-4" />
      },
      { 
        name: 'Bestsellers', 
        path: '/shop/bestsellers',
        icon: <FiTrendingUp className="mr-2 w-4 h-4" />
      },
      { name: 'Sale', path: '/shop/sale' },
      { name: 'Collections', path: '/shop/collections' },
      { name: 'Dresses', path: '/shop/dresses' },
      { name: 'Outerwear', path: '/shop/outerwear' },
      { name: 'Accessories', path: '/shop/accessories' }
    ]
  },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = ({ cartItems = [], wishlistItems = [], onRemoveFromCart, onRemoveFromWishlist }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

  // Sample user data
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    membership: 'Gold Member',
    joinDate: 'Joined January 2022',
    orderCount: 12,
    wishlistCount: wishlistItems.length,
    rewardsPoints: 1250
  };

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

  // Close all popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        if (showCart) setShowCart(false);
        if (showWishlist) setShowWishlist(false);
        if (showUserMenu) setShowUserMenu(false);
        if (activeSubmenu) setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCart, showWishlist, showUserMenu, activeSubmenu]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
    navigate('/login');
  };

  const handleRemoveFromCart = (id) => {
    if (onRemoveFromCart) {
      onRemoveFromCart(id);
    }
  };

  const handleRemoveFromWishlist = (id) => {
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(id);
    }
  };

  const toggleSubmenu = (menuName) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  const handleDesktopNavItemClick = (e, link) => {
    if (link.submenu) {
      e.preventDefault();
      toggleSubmenu(link.name);
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' : 'bg-white py-4'}`}
      ref={navRef}
    >
      {/* Search Bar */}
      {showSearch && (
        <div className="bg-white py-3 px-4 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center">
            <FiSearch className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              className="ml-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowSearch(false)}
            >
              <FiX />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-serif font-bold">
              PEPPER<span className={scrolled ? "text-gray-600" : "text-gray-800"}>STREET</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
              >
                <div className="flex items-center">
                  <Link 
                    to={link.path} 
                    className={`${scrolled ? 'text-gray-900 hover:text-black' : 'text-gray-800 hover:text-black'} font-medium flex items-center transition-all duration-300`}
                    onClick={(e) => handleDesktopNavItemClick(e, link)}
                    onMouseEnter={() => setActiveSubmenu(link.name)}
                  >
                    {link.name}
                  </Link>
                  {link.submenu && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(link.name);
                      }}
                      onMouseEnter={() => setActiveSubmenu(link.name)}
                      className={`ml-1 ${scrolled ? 'text-gray-900 hover:text-black' : 'text-gray-800 hover:text-black'}`}
                    >
                      <FiChevronDown className={`w-4 h-4 transition-transform ${activeSubmenu === link.name ? 'transform rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                {link.submenu && activeSubmenu === link.name && (
                  <div 
                    className="absolute left-0 mt-0 w-56 bg-white/95 backdrop-blur-lg shadow-xl rounded-lg py-2 z-50 border border-white/20"
                    onMouseEnter={() => setActiveSubmenu(link.name)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100/50 transition-colors text-sm"
                        onClick={() => {
                          setActiveSubmenu(null);
                        }}
                      >
                        {subItem.icon}
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
            <button 
              className={`${scrolled ? 'text-gray-700 hover:text-black' : 'text-gray-800 hover:text-black'} transition-colors`}
              onClick={() => setShowSearch(!showSearch)}
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Wishlist Button and Popup */}
            <div className="relative">
              <button 
                className={`wishlist-button ${scrolled ? 'text-gray-700 hover:text-black' : 'text-gray-800 hover:text-black'} relative transition-colors`}
                onClick={() => {
                  setShowWishlist(!showWishlist);
                  setShowCart(false);
                  setShowUserMenu(false);
                  setActiveSubmenu(null);
                }}
              >
                <FiHeart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              
              {showWishlist && (
                <div className="wishlist-popup absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-lg shadow-xl rounded-lg z-50 border border-white/20 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-medium text-gray-900">Your Wishlist ({wishlistItems.length})</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {wishlistItems.length > 0 ? (
                      wishlistItems.map((item) => (
                        <div key={item.id} className="p-4 border-b border-gray-100 flex items-center hover:bg-gray-50/50 transition-colors">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                          </div>
                          <button 
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">Your wishlist is empty</p>
                      </div>
                    )}
                  </div>
                  {wishlistItems.length > 0 && (
                    <div className="p-4 border-t border-gray-100">
                      <Link 
                        to="/wishlist" 
                        className="flex items-center justify-center text-sm font-medium text-gray-700 hover:text-black transition-colors"
                        onClick={() => setShowWishlist(false)}
                      >
                        View all wishlist items <FiArrowRight className="ml-1" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Button and Popup */}
            <div className="relative">
              <button 
                className={`cart-button ${scrolled ? 'text-gray-700 hover:text-black' : 'text-gray-800 hover:text-black'} relative transition-colors`}
                onClick={() => {
                  setShowCart(!showCart);
                  setShowWishlist(false);
                  setShowUserMenu(false);
                  setActiveSubmenu(null);
                }}
              >
                <FiShoppingBag className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              
              {showCart && (
                <div className="cart-popup absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-lg shadow-xl rounded-lg z-50 border border-white/20 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-medium text-gray-900">Your Cart ({cartItems.length})</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.id} className="p-4 border-b border-gray-100 flex items-center hover:bg-gray-50/50 transition-colors">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                              <p className="text-xs text-gray-500">{item.color} / {item.size}</p>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-sm text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                                <button 
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                  onClick={() => handleRemoveFromCart(item.id)}
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="p-4 border-t border-gray-100">
                          <div className="flex justify-between mb-4">
                            <span className="text-sm text-gray-600">Subtotal</span>
                            <span className="text-sm font-medium text-gray-900">${calculateTotal()}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Link 
                              to="/cart" 
                              className="flex-1 text-center py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                              onClick={() => setShowCart(false)}
                            >
                              View Cart
                            </Link>
                            <Link 
                              to="/checkout" 
                              className="flex-1 text-center py-2 text-sm font-medium text-white bg-black rounded hover:bg-gray-800 transition-colors"
                              onClick={() => setShowCart(false)}
                            >
                              Checkout
                            </Link>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">Your cart is empty</p>
                        <Link 
                          to="/shop" 
                          className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-black rounded hover:bg-gray-800 transition-colors"
                          onClick={() => setShowCart(false)}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu Button and Popup */}
            <div className="relative">
              {isLoggedIn ? (
                <>
                  <button 
                    className={`user-menu-button ${scrolled ? 'text-gray-700 hover:text-black' : 'text-gray-800 hover:text-black'} transition-colors`}
                    onClick={() => {
                      setShowUserMenu(!showUserMenu);
                      setShowCart(false);
                      setShowWishlist(false);
                      setActiveSubmenu(null);
                    }}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:border-gray-500 transition-colors">
                      <img 
                        src={userData.avatar} 
                        alt="User Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                  
                  {showUserMenu && (
                    <div className="user-menu-popup absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-lg shadow-xl rounded-lg z-50 border border-white/20 overflow-hidden">
                      {/* User Profile Header */}
                      <div className="p-4 border-b border-gray-100 flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src={userData.avatar} 
                            alt="User Avatar" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{userData.name}</p>
                          <p className="text-xs text-gray-500">{userData.email}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              {userData.membership}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* User Stats */}
                      <div className="p-4 border-b border-gray-100 grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{userData.orderCount}</p>
                          <p className="text-xs text-gray-500">Orders</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{userData.wishlistCount}</p>
                          <p className="text-xs text-gray-500">Wishlist</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{userData.rewardsPoints}</p>
                          <p className="text-xs text-gray-500">Points</p>
                        </div>
                      </div>

                      {/* Quick Links */}
                      <div className="py-2">
                        <Link
                          to="/account"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiUser className="mr-3 w-4 h-4" />
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiPackage className="mr-3 w-4 h-4" />
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiHeart className="mr-3 w-4 h-4" />
                          My Wishlist
                        </Link>
                        <Link
                          to="/rewards"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiStar className="mr-3 w-4 h-4" />
                          My Rewards
                        </Link>
                        <Link
                          to="/payment-methods"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiCreditCard className="mr-3 w-4 h-4" />
                          Payment Methods
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiSettings className="mr-3 w-4 h-4" />
                          Account Settings
                        </Link>
                      </div>

                      {/* Footer */}
                      <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                        <button 
                          className="text-sm font-medium text-gray-700 hover:text-black transition-colors flex items-center"
                          onClick={handleLogout}
                        >
                          <FiLogOut className="mr-2 w-4 h-4" />
                          Sign Out
                        </button>
                        <p className="text-xs text-gray-400">{userData.joinDate}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link 
                  to="/login" 
                  className={`${scrolled ? 'text-gray-700 hover:text-black' : 'text-gray-800 hover:text-black'} transition-colors`}
                >
                  <FiUser className="w-5 h-5" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden ${scrolled ? 'text-gray-700 hover:text-black' : 'text-gray-800 hover:text-black'} transition-colors`}
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
              <div key={link.name} className="nav-item">
                {link.submenu ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 text-gray-900 hover:bg-gray-100/50 rounded-lg text-base font-medium transition-colors"
                      onClick={() => toggleSubmenu(link.name)}
                    >
                      <span>{link.name}</span>
                      <FiChevronDown className={`w-4 h-4 transition-transform ${activeSubmenu === link.name ? 'transform rotate-180' : ''}`} />
                    </button>
                    {activeSubmenu === link.name && (
                      <div className="pl-4 space-y-1">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50/50 rounded-lg text-sm transition-colors"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setActiveSubmenu(null);
                            }}
                          >
                            {subItem.icon}
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className="block px-3 py-2 text-gray-900 hover:bg-gray-100/50 rounded-lg text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <FiInstagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <FiTwitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <FiFacebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;