import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiClock, FiTag, FiArrowRight, FiChevronLeft, FiChevronRight, FiShoppingBag, FiHeart, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

// Import your local banner images
import banner1 from '../image/banner4.png';
import banner2 from '../image/banner5.png';
import banner3 from '../image/banner6.png';

const SalePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Banner images array
  const heroBanners = [
    {
      id: 1,
      image: banner1,
      title: "Summer Clearance",
      subtitle: "Up to 60% off selected items",
      cta: "Shop Now",
      theme: "light",
      link: "/sale"
    },
    {
      id: 2,
      image: banner2,
      title: "Limited Time Offers",
      subtitle: "Don't miss these exclusive deals",
      cta: "Discover More",
      theme: "dark",
      link: "/sale"
    },
    {
      id: 3,
      image: banner3,
      title: "Final Reductions",
      subtitle: "Last chance to save big",
      cta: "View Collection",
      theme: "light",
      link: "/sale"
    }
  ];

  // Calculate time remaining until sale ends (3 days from now)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endDate = new Date();
      endDate.setDate(now.getDate() + 3); // Sale ends in 3 days
      endDate.setHours(23, 59, 59, 0); // Set to end of day
      
      const difference = endDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      } else {
        // Sale has ended
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate hero slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroBanners.length]);

  // Sample sale products data
  const saleProducts = [
    {
      id: 1,
      name: 'Summer Linen Dress',
      originalPrice: 129.99,
      salePrice: 79.99,
      discount: '40%',
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      timeLeft: '2 days left',
      isAlmostGone: true,
      link: '/product/1',
      description: 'Lightweight linen dress perfect for summer. Made from 100% organic linen with a relaxed fit. Available in multiple colors.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'White', hex: '#ffffff' },
        { name: 'Beige', hex: '#f5f5dc' },
        { name: 'Light Blue', hex: '#add8e6' }
      ]
    },
    {
      id: 2,
      name: 'Tailored Wool Blazer',
      originalPrice: 249.99,
      salePrice: 149.99,
      discount: '45%',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      timeLeft: '1 week left',
      isAlmostGone: false,
      link: '/product/2',
      description: 'Classic tailored blazer made from premium wool. Perfect for office wear or special occasions.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Navy', hex: '#000080' },
        { name: 'Black', hex: '#000000' },
        { name: 'Gray', hex: '#808080' }
      ]
    },
    {
      id: 3,
      name: 'Casual Cotton Shirt',
      originalPrice: 59.99,
      salePrice: 29.99,
      discount: '50%',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      timeLeft: '3 days left',
      isAlmostGone: true,
      link: '/product/3',
      description: 'Comfortable cotton shirt with button-down collar. Great for casual outings or layering.',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [
        { name: 'Blue', hex: '#0000ff' },
        { name: 'White', hex: '#ffffff' },
        { name: 'Pink', hex: '#ffc0cb' }
      ]
    },
    {
      id: 4,
      name: 'Slim Fit Jeans',
      originalPrice: 89.99,
      salePrice: 49.99,
      discount: '45%',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      timeLeft: '5 days left',
      isAlmostGone: false,
      link: '/product/4',
      description: 'Slim fit jeans made from stretch denim for comfort and style.',
      sizes: ['28', '30', '32', '34', '36'],
      colors: [
        { name: 'Dark Blue', hex: '#00008b' },
        { name: 'Black', hex: '#000000' },
        { name: 'Light Wash', hex: '#87cefa' }
      ]
    },
    {
      id: 5,
      name: 'Silk Evening Gown',
      originalPrice: 199.99,
      salePrice: 119.99,
      discount: '40%',
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      timeLeft: '1 day left',
      isAlmostGone: true,
      link: '/product/5',
      description: 'Elegant silk evening gown with delicate embroidery. Perfect for special occasions.',
      sizes: ['S', 'M', 'L'],
      colors: [
        { name: 'Red', hex: '#ff0000' },
        { name: 'Black', hex: '#000000' },
        { name: 'Gold', hex: '#ffd700' }
      ]
    },
    {
      id: 6,
      name: 'Leather Crossbody Bag',
      originalPrice: 159.99,
      salePrice: 99.99,
      discount: '38%',
      image: 'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      timeLeft: '4 days left',
      isAlmostGone: false,
      link: '/product/6',
      description: 'Genuine leather crossbody bag with multiple compartments and adjustable strap.',
      colors: [
        { name: 'Brown', hex: '#a52a2a' },
        { name: 'Black', hex: '#000000' },
        { name: 'Tan', hex: '#d2b48c' }
      ]
    }
  ];

  // Sale categories
  const saleCategories = [
    {
      name: 'Women',
      discount: 'Up to 60% off',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      link: '/sale/women'
    },
    {
      name: 'Men',
      discount: 'Up to 50% off',
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      link: '/sale/men'
    },
    {
      name: 'Accessories',
      discount: 'Up to 45% off',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      link: '/sale/accessories'
    }
  ];

  const currentBanner = heroBanners[currentSlide];
  const isDarkTheme = currentBanner.theme === 'dark';

  // Quick view modal handler
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
    
    // Initialize selected size and color for this product
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSizes(prev => ({
        ...prev,
        [product.id]: product.sizes[0]
      }));
    }
    if (product.colors && product.colors.length > 0) {
      setSelectedColors(prev => ({
        ...prev,
        [product.id]: product.colors[0].name
      }));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleToggleWishlist = (productId) => {
    toggleWishlist(productId);
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleColorSelect = (productId, colorName) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: colorName
    }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const color = selectedColors[product.id] || product.colors[0];
    
    addToCart(product, color, size, 1);
    closeModal();
  };

  const handleViewDetails = (product) => {
    closeModal(); // Close the modal if it's open
    navigate(product.link); // Navigate to the product details page
  };

  return (
    <div className="bg-white">
      {/* Hero Banner Carousel */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Banner Images */}
        {heroBanners.map((banner, index) => (
          <div 
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gradient-to-r from-black/80 via-black/50 to-transparent' : 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'}`}></div>
          </div>
        ))}
        
        {/* Banner Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className={`max-w-2xl ${isDarkTheme ? 'text-white' : 'text-white'}`}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{currentBanner.title}</h1>
              <p className="text-xl md:text-2xl mb-8">{currentBanner.subtitle}</p>
              <Link 
                to={currentBanner.link}
                className="inline-flex items-center justify-center bg-white text-black px-8 py-3 text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                {currentBanner.cta} <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              {/* Left Arrow */}
              <button 
                onClick={() => {
                  setCurrentSlide(prev => (prev - 1 + heroBanners.length) % heroBanners.length);
                  setIsAutoPlaying(false);
                }}
                className="text-white hover:text-gray-200 transition-colors p-2"
                aria-label="Previous slide"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              {/* Slide Indicators */}
              <div className="flex space-x-2">
                {heroBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button 
                onClick={() => {
                  setCurrentSlide(prev => (prev + 1) % heroBanners.length);
                  setIsAutoPlaying(false);
                }}
                className="text-white hover:text-gray-200 transition-colors p-2"
                aria-label="Next slide"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sale Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {saleCategories.map((category, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-medium text-white mb-1">{category.name}</h3>
                <p className="text-red-300 font-medium mb-4">{category.discount}</p>
                <Link 
                  to={category.link}
                  className="text-white hover:underline underline-offset-4 flex items-center"
                >
                  Shop Now <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Sale Items */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-light">Featured Sale Items</h2>
              <p className="text-gray-600">Limited quantities available</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/sale/all" className="flex items-center text-red-600 hover:text-red-800 underline underline-offset-4">
                View All Sale Items <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {saleProducts.map((product) => (
              <div key={product.id} className="group relative bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 text-sm font-bold">
                  {product.discount} OFF
                </div>
                
                {/* Time Left Badge */}
                <div className={`absolute top-4 right-4 z-10 px-3 py-1 text-sm font-medium ${
                  product.isAlmostGone ? 'bg-yellow-500 text-black' : 'bg-black text-white'
                }`}>
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>{product.timeLeft}</span>
                  </div>
                </div>
                
                {/* Wishlist Button */}
                <button 
                  onClick={() => handleToggleWishlist(product.id)}
                  className={`absolute top-16 right-4 z-10 p-2 rounded-full ${
                    isInWishlist(product.id) 
                      ? 'text-red-500 bg-white/80' 
                      : 'text-white bg-black/30'
                  }`}
                  aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <FiHeart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
                
                {/* Product Image */}
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                  {/* Quick actions */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => handleQuickView(product)}
                      className="bg-white p-3 rounded-full hover:bg-gray-100 transition transform hover:scale-110"
                      aria-label="Quick view"
                    >
                      <FiShoppingBag className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleViewDetails(product)}
                      className="bg-white p-3 rounded-full hover:bg-gray-100 transition transform hover:scale-110"
                      aria-label="View details"
                    >
                      <FiArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    <button 
                      onClick={() => handleViewDetails(product)}
                      className="hover:underline text-left"
                    >
                      {product.name}
                    </button>
                  </h3>
                  
                  <div className="flex items-center">
                    <p className="text-lg font-bold text-red-600">${product.salePrice.toFixed(2)}</p>
                    <p className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={() => handleQuickView(product)}
                      className="flex-1 bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="flex-1 bg-white border border-black text-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {showModal && quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {quickViewProduct.name}
                      </h3>
                      <button 
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-500"
                        aria-label="Close modal"
                      >
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={quickViewProduct.image}
                          alt={quickViewProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-4">
                          <p className="text-xl font-bold text-red-600">${quickViewProduct.salePrice.toFixed(2)}</p>
                          <p className="ml-2 text-sm text-gray-500 line-through">${quickViewProduct.originalPrice.toFixed(2)}</p>
                          <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                            {quickViewProduct.discount} OFF
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{quickViewProduct.description}</p>
                        
                        {quickViewProduct.sizes && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Size: {selectedSizes[quickViewProduct.id] || 'Select size'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {quickViewProduct.sizes.map((size) => (
                                <button 
                                  key={size}
                                  onClick={() => handleSizeSelect(quickViewProduct.id, size)}
                                  className={`border px-3 py-1 text-sm ${
                                    selectedSizes[quickViewProduct.id] === size
                                      ? 'bg-black text-white border-black'
                                      : 'border-gray-300 hover:bg-gray-100'
                                  }`}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {quickViewProduct.colors && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Color: {selectedColors[quickViewProduct.id] || 'Select color'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {quickViewProduct.colors.map((color) => (
                                <button 
                                  key={color.name}
                                  onClick={() => handleColorSelect(quickViewProduct.id, color.name)}
                                  className={`w-8 h-8 rounded-full border-2 ${
                                    selectedColors[quickViewProduct.id] === color.name
                                      ? 'border-black'
                                      : 'border-gray-300'
                                  }`}
                                  style={{ backgroundColor: color.hex }}
                                  aria-label={color.name}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-yellow-600 mb-4">
                          <FiClock className="mr-1" />
                          <span>{quickViewProduct.timeLeft}</span>
                        </div>
                        
                        <div className="flex gap-4 mt-6">
                          <button 
                            onClick={() => handleAddToCart(quickViewProduct)}
                            className="flex-1 bg-black text-white px-4 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
                          >
                            Add to Bag
                          </button>
                          <button
                            onClick={() => {
                              closeModal();
                              navigate(quickViewProduct.link);
                            }}
                            className="flex-1 bg-white border border-black text-black px-4 py-3 text-sm font-medium hover:bg-gray-100 transition-colors"
                          >
                            View Full Details
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => handleToggleWishlist(quickViewProduct.id)}
                          className="mt-4 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          <FiHeart className={`mr-2 ${wishlist.includes(quickViewProduct.id) ? 'text-red-500 fill-current' : ''}`} />
                          {wishlist.includes(quickViewProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Countdown Banner */}
      <section className="relative py-16 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Sale ends soon background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <FiTag className="mx-auto w-10 h-10 text-red-400 mb-4" />
            <h2 className="text-2xl md:text-3xl font-light mb-4">Sale Ends Soon!</h2>
            <p className="text-gray-300 mb-6">Don't miss out on these incredible deals</p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <div className="bg-gray-900/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold">{timeLeft.days}</div>
              <div className="text-xs text-gray-400 mt-1">DAYS</div>
            </div>
            <div className="bg-gray-900/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs text-gray-400 mt-1">HOURS</div>
            </div>
            <div className="bg-gray-900/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs text-gray-400 mt-1">MINUTES</div>
            </div>
            <div className="bg-gray-900/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs text-gray-400 mt-1">SECONDS</div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              to="/sale" 
              className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-3 text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Shop The Sale <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Last Chance Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-light">Last Chance</h2>
            <p className="text-gray-600">Items selling out fast</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/sale/last-chance" className="flex items-center text-red-600 hover:text-red-800 underline underline-offset-4">
              View All <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts
            .filter(product => product.isAlmostGone)
            .map((product) => (
              <div key={product.id} className="relative group">
                <div className="aspect-square overflow-hidden relative bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => handleQuickView(product)}
                      className="bg-white text-black px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    <button 
                      onClick={() => handleViewDetails(product)}
                      className="hover:underline text-left"
                    >
                      {product.name}
                    </button>
                  </h3>
                  
                  <div className="flex items-center mt-2">
                    <p className="text-lg font-bold text-red-600">${product.salePrice.toFixed(2)}</p>
                    <p className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                  </div>
                  
                  <div className="mt-3 flex items-center text-sm text-yellow-600">
                    <FiClock className="mr-1" />
                    <span>{product.timeLeft}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default SalePage;