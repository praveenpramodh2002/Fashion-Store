import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiStar, FiFilter, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder images - replace with your actual image imports
const a1 = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const a2 = 'https://images.unsplash.com/photo-1566150902887-9679ecc155ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const a3 = 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const a4 = 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const a5 = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const a6 = 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const a7 = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const a8 = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';

const AccessoriesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Video autoplay with error handling
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsVideoLoaded(true))
          .catch(error => {
            console.log("Video autoplay prevented:", error);
            setIsVideoLoaded(false);
          });
      }
    }
  }, []);

  // Categories data
  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Jewelry', value: 'jewelry' },
    { name: 'Bags', value: 'bags' },
    { name: 'Hats', value: 'hats' },
    { name: 'Sunglasses', value: 'sunglasses' },
    { name: 'Scarves', value: 'scarves' },
  ];

  // Accessories data
  const accessories = [
    {
      id: 1,
      name: 'Gold Statement Necklace',
      price: 89.99,
      category: 'jewelry',
      image: a1,
      rating: 4.7,
      isNew: true,
      description: 'Handcrafted gold-plated necklace with intricate detailing.',
      colors: ['Gold', 'Rose Gold', 'Silver'],
      colorImages: {
        'Gold': a1,
        'Rose Gold': a2,
        'Silver': a3
      }
    },
    {
      id: 2,
      name: 'Leather Crossbody Bag',
      price: 129.99,
      category: 'bags',
      image: a2,
      rating: 4.9,
      isBestSeller: true,
      description: 'Premium leather bag with adjustable strap and multiple compartments.'
    },
    {
      id: 3,
      name: 'Wide Brim Sun Hat',
      price: 49.99,
      category: 'hats',
      image: a3,
      rating: 4.5,
      description: 'Stylish UV-protection hat with breathable lining.'
    },
    {
      id: 4,
      name: 'Aviator Sunglasses',
      price: 79.99,
      category: 'sunglasses',
      image: a4,
      rating: 4.8,
      description: 'Classic aviator style with polarized lenses.'
    },
    {
      id: 5,
      name: 'Silk Twilly Scarf',
      price: 59.99,
      category: 'scarves',
      image: a5,
      rating: 4.6,
      isNew: true,
      description: 'Hand-rolled edges with luxurious silk fabric.'
    },
    {
      id: 6,
      name: 'Pearl Drop Earrings',
      price: 65.99,
      category: 'jewelry',
      image: a6,
      rating: 4.7,
      description: 'Cultured freshwater pearls with sterling silver hooks.'
    },
    {
      id: 7,
      name: 'Designer Wallet',
      price: 99.99,
      category: 'bags',
      image: a7,
      rating: 4.4,
      description: 'Compact wallet with RFID protection and multiple card slots.'
    },
    {
      id: 8,
      name: 'Cashmere Wrap',
      price: 149.99,
      category: 'scarves',
      image: a8,
      rating: 4.9,
      isBestSeller: true,
      description: 'Ultra-soft cashmere blend for year-round comfort.'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? accessories 
    : accessories.filter(item => item.category === activeFilter);

  const openPopup = (item) => {
    setSelectedItem(item);
    setSelectedColor(item.colors?.[0] || null);
    setIsPopupOpen(true);
    setQuantity(1);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleWishlist = (itemId) => {
    setWishlist(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  const addToCart = (item) => {
    // In a real app, you would add to cart here
    console.log('Added to cart:', {
      ...item,
      quantity,
      selectedColor
    });
    closePopup();
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  const getCurrentImage = () => {
    if (!selectedItem) return '';
    if (selectedColor && selectedItem.colorImages?.[selectedColor]) {
      return selectedItem.colorImages[selectedColor];
    }
    return selectedItem.image;
  };

  return (
    <div className="bg-white">
      {/* Hero Video Section */}
      <div className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-black">
          {/* Replace with your actual video file */}
          <video 
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            poster="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          >
            <source src="" type="video/mp4" /> {/* Add your video source */}
          </video>
          
          {!isVideoLoaded && (
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Accessories Collection"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              Accessories Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl"
            >
              Complete your look with our curated accessories
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light mb-4 md:mb-0">
            {activeFilter === 'all' ? 'All Accessories' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
          </h2>
          
          <div className="relative w-full md:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">Filter</span>
              <FiFilter />
            </button>

            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-200"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Categories</h3>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX />
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.value}>
                        <button
                          onClick={() => {
                            setActiveFilter(category.value);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1 rounded transition-colors ${
                            activeFilter === category.value 
                              ? 'bg-gray-100 font-medium' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Category Chips */}
        <div className="flex md:hidden space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                activeFilter === category.value 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="group relative"
            >
              <div 
                className="aspect-square overflow-hidden relative bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => openPopup(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {item.isNew && (
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-medium rounded">
                    NEW
                  </div>
                )}
                {item.isBestSeller && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-medium rounded">
                    BESTSELLER
                  </div>
                )}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item.id);
                    }}
                  >
                    <FiHeart className={`w-4 h-4 ${wishlist.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button 
                    className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPopup(item);
                    }}
                  >
                    <FiShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 
                  className="text-lg font-medium text-gray-900 mb-1 cursor-pointer hover:underline"
                  onClick={() => openPopup(item)}
                >
                  {item.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</p>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                    <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Need Help Styling?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our stylists can help you choose the perfect accessories to complement your wardrobe.
          </p>
          <Link 
            to="/services/personal-styling" 
            className="inline-flex items-center justify-center bg-black text-white px-8 py-3 text-lg font-medium hover:bg-gray-800 transition-colors rounded-md"
          >
            Book a Styling Session
          </Link>
        </div>
      </section>

      {/* Product Popup */}
      <AnimatePresence>
        {isPopupOpen && selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closePopup}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button 
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors"
                  onClick={closePopup}
                >
                  <FiX className="w-5 h-5" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={getCurrentImage()}
                        alt={selectedItem.name}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                    {selectedItem.colors && (
                      <div className="flex justify-center mt-4 space-x-2">
                        {selectedItem.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full border-2 ${
                              selectedColor === color 
                                ? 'border-black' 
                                : 'border-transparent'
                            }`}
                            style={{
                              backgroundColor: color === 'Gold' ? '#FFD700' : 
                                            color === 'Rose Gold' ? '#B76E79' :
                                            color === 'Silver' ? '#C0C0C0' : 
                                            'transparent',
                              backgroundImage: color === 'Multicolor' ? 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)' : 'none'
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(selectedItem.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {selectedItem.rating} ({Math.floor(selectedItem.rating * 10)} reviews)
                      </span>
                    </div>
                    
                    <p className="text-2xl font-bold mb-6">${selectedItem.price.toFixed(2)}</p>
                    
                    <p className="text-gray-700 mb-6">{selectedItem.description}</p>
                    
                    {selectedItem.colors && (
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Color: {selectedColor}</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.colors.map(color => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`px-3 py-1 border rounded-md transition-colors ${
                                selectedColor === color 
                                  ? 'bg-black text-white border-black' 
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-8">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                      <div className="flex items-center border border-gray-300 rounded-md w-fit">
                        <button 
                          className="px-3 py-2 text-lg hover:bg-gray-100 transition-colors"
                          onClick={decreaseQuantity}
                        >
                          -
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                        <button 
                          className="px-3 py-2 text-lg hover:bg-gray-100 transition-colors"
                          onClick={increaseQuantity}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        className="flex-1 bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                        onClick={() => addToCart(selectedItem)}
                      >
                        <FiShoppingBag className="mr-2" />
                        Add to Cart
                      </button>
                      <button 
                        className={`flex-1 py-3 px-6 rounded-md font-medium border ${
                          wishlist.includes(selectedItem.id) 
                            ? 'border-red-500 text-red-500' 
                            : 'border-gray-300 hover:border-gray-400'
                        } transition-colors flex items-center justify-center`}
                        onClick={() => toggleWishlist(selectedItem.id)}
                      >
                        <FiHeart className={`mr-2 ${
                          wishlist.includes(selectedItem.id) ? 'fill-red-500 text-red-500' : ''
                        }`} />
                        {wishlist.includes(selectedItem.id) ? 'In Wishlist' : 'Add to Wishlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessoriesPage;