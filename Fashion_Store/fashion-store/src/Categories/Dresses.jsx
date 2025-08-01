import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiStar, FiFilter, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import dressesVideo from '../video/dresses.mp4';

// Import local dress images from correct path
import d1 from '../image/d1.jpeg';
import d2 from '../image/d2.jpeg';
import d3 from '../image/d3.jpeg';
import d4 from '../image/d4.jpeg';
import d5 from '../image/d5.jpeg';
import d6 from '../image/d6.jpeg';
import d7 from '../image/d7.jpeg';
import d8 from '../image/d8.jpeg';

const DressesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [selectedDress, setSelectedDress] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const videoRef = useRef(null);
  
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Try to autoplay video on mount
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Video autoplay failed:", error);
          setIsVideoLoaded(false);
        });
      }
    }
  }, []);

  // Reset selections when opening a new dress popup
  useEffect(() => {
    if (selectedDress) {
      setSelectedSize(null);
      setSelectedColor(null);
      setQuantity(1);
    }
  }, [selectedDress]);

  // Dress categories
  const dressCategories = [
    { name: 'All', value: 'all' },
    { name: 'Casual', value: 'casual' },
    { name: 'Evening', value: 'evening' },
    { name: 'Wedding', value: 'wedding' },
    { name: 'Summer', value: 'summer' },
    { name: 'Maxi', value: 'maxi' },
  ];

  // Dress collection with local images
  const dresses = [
    {
      id: 1,
      name: 'Floral Summer Dress',
      price: 89.99,
      category: 'summer',
      image: d1,
      rating: 4.8,
      isNew: true,
      description: 'A beautiful floral summer dress made from breathable fabric, perfect for warm days.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Red', 'Blue', 'Yellow'],
      colorImages: {
        'Red': d1,
        'Blue': d2, // Just for demo - in a real app these would be actual different images
        'Yellow': d3
      }
    },
    {
      id: 2,
      name: 'Elegant Evening Gown',
      price: 159.99,
      category: 'evening',
      image: d2,
      rating: 4.9,
      isBestSeller: true,
      description: 'Stunning evening gown with elegant draping and sophisticated silhouette.',
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Navy', 'Burgundy'],
      colorImages: {
        'Black': d2,
        'Navy': d3,
        'Burgundy': d4
      }
    },
    {
      id: 3,
      name: 'Casual Linen Dress',
      price: 69.99,
      category: 'casual',
      image: d3,
      rating: 4.5,
      description: 'Comfortable linen dress perfect for everyday wear with a relaxed fit.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Beige', 'Light Blue'],
      colorImages: {
        'White': d3,
        'Beige': d4,
        'Light Blue': d5
      }
    },
    {
      id: 4,
      name: 'Bridal Wedding Dress',
      price: 299.99,
      category: 'wedding',
      image: d4,
      rating: 5.0,
      description: 'Exquisite wedding dress with delicate lace details and flowing train.',
      sizes: ['S', 'M', 'L'],
      colors: ['White', 'Ivory'],
      colorImages: {
        'White': d4,
        'Ivory': d5
      }
    },
    {
      id: 5,
      name: 'Flowery Maxi Dress',
      price: 99.99,
      category: 'maxi',
      image: d5,
      rating: 4.7,
      isNew: true,
      description: 'Long flowery maxi dress with lightweight fabric and beautiful print.',
      sizes: ['S', 'M', 'L'],
      colors: ['Multicolor', 'Pink', 'Blue'],
      colorImages: {
        'Multicolor': d5,
        'Pink': d6,
        'Blue': d7
      }
    },
    {
      id: 6,
      name: 'Silk Cocktail Dress',
      price: 129.99,
      category: 'evening',
      image: d6,
      rating: 4.6,
      description: 'Luxurious silk cocktail dress perfect for special occasions.',
      sizes: ['XS', 'S', 'M'],
      colors: ['Red', 'Green', 'Gold'],
      colorImages: {
        'Red': d6,
        'Green': d7,
        'Gold': d8
      }
    },
    {
      id: 7,
      name: 'Off-Shoulder Summer Dress',
      price: 79.99,
      category: 'summer',
      image: d7,
      rating: 4.4,
      description: 'Chic off-shoulder summer dress with ruffled details.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Yellow', 'White', 'Pink'],
      colorImages: {
        'Yellow': d7,
        'White': d8,
        'Pink': d1
      }
    },
    {
      id: 8,
      name: 'Chiffon Evening Dress',
      price: 149.99,
      category: 'evening',
      image: d8,
      rating: 4.8,
      isBestSeller: true,
      description: 'Elegant chiffon evening dress with delicate embroidery.',
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Silver', 'Navy'],
      colorImages: {
        'Black': d8,
        'Silver': d1,
        'Navy': d2
      }
    }
  ];

  const filteredDresses = activeFilter === 'all' 
    ? dresses 
    : dresses.filter(dress => dress.category === activeFilter);

  const openPopup = (dress) => {
    setSelectedDress(dress);
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleToggleWishlist = (dressId) => {
    toggleWishlist(dressId);
  };

  const handleAddToCart = (dress) => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }

    addToCart(dress, selectedColor, selectedSize, quantity);
    closePopup();
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const getCurrentImage = () => {
    if (!selectedDress) return '';
    if (selectedColor && selectedDress.colorImages[selectedColor]) {
      return selectedDress.colorImages[selectedColor];
    }
    return selectedDress.image;
  };

  return (
    <div className="bg-white">
      {/* Hero Section with Video Background - Adjusted Size */}
      <div className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        {/* Video with fallback */}
        <div className="absolute inset-0 bg-black">
          <video 
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoLoaded(false)}
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            poster="https://images.pexels.com/photos/4498225/pexels-photo-4498225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          >
            <source src={dressesVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Fallback image */}
          {!isVideoLoaded && (
            <img
              src="https://images.pexels.com/photos/4498225/pexels-photo-4498225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Dress Collection"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              Dress Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl"
            >
              Discover the perfect dress for every occasion
            </motion.p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light mb-4 md:mb-0">
            {activeFilter === 'all' ? 'All Dresses' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Dresses`}
          </h2>
          
          <div className="relative w-full md:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md"
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
                    <button onClick={() => setIsFilterOpen(false)}>
                      <FiX className="text-gray-500" />
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {dressCategories.map((category) => (
                      <li key={category.value}>
                        <button
                          onClick={() => {
                            setActiveFilter(category.value);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1 rounded ${activeFilter === category.value ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
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
          {dressCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${activeFilter === category.value ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Dresses Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredDresses.map((dress) => (
            <motion.div 
              key={dress.id}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div 
                className="aspect-[3/4] overflow-hidden relative bg-gray-100 cursor-pointer"
                onClick={() => openPopup(dress)}
              >
                <img
                  src={dress.image}
                  alt={dress.name}
                  className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105"
                />
                {/* Badges */}
                {dress.isNew && (
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-medium">
                    NEW
                  </div>
                )}
                {dress.isBestSeller && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-medium">
                    BESTSELLER
                  </div>
                )}
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="bg-white p-2 rounded-full hover:bg-gray-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWishlist(dress.id);
                    }}
                  >
                                          <FiHeart className={`w-4 h-4 ${isInWishlist(dress.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button 
                    className="bg-white p-2 rounded-full hover:bg-gray-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDress(dress);
                      setQuantity(1);
                      handleAddToCart(dress);
                    }}
                  >
                    <FiShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 
                  className="text-lg font-medium text-gray-900 mb-1 cursor-pointer hover:underline"
                  onClick={() => openPopup(dress)}
                >
                  {dress.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium text-gray-900">${dress.price.toFixed(2)}</p>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                    <span className="text-sm text-gray-600 ml-1">{dress.rating}</span>
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
          <h2 className="text-3xl md:text-4xl font-light mb-6">Can't Find Your Perfect Dress?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our stylists can help you find or create the perfect dress for your special occasion.
          </p>
          <Link 
            to="/services/personal-styling" 
            className="inline-flex items-center justify-center bg-black text-white px-8 py-3 text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Book a Consultation <FiShoppingBag className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Dress Details Popup */}
      <AnimatePresence>
        {isPopupOpen && selectedDress && (
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
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10"
                  onClick={closePopup}
                >
                  <FiX className="w-5 h-5" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                  <div className="relative">
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={getCurrentImage()}
                        alt={selectedDress.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="flex justify-center mt-4 space-x-2">
                      {selectedDress.colors.map((color, i) => (
                        <div 
                          key={color} 
                          className="w-16 h-16 bg-gray-100 rounded border border-gray-200 cursor-pointer overflow-hidden"
                          onClick={() => setSelectedColor(color)}
                        >
                          <img
                            src={selectedDress.colorImages[color] || selectedDress.image}
                            alt={`${selectedDress.name} in ${color}`}
                            className={`w-full h-full object-cover object-center ${selectedColor === color ? 'ring-2 ring-black' : ''}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedDress.name}</h2>
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(selectedDress.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">{selectedDress.rating} ({Math.floor(selectedDress.rating * 10)} reviews)</span>
                    </div>
                    
                    <p className="text-2xl font-bold mb-6">${selectedDress.price.toFixed(2)}</p>
                    
                    <p className="text-gray-700 mb-6">{selectedDress.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedDress.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1 border rounded-md hover:bg-gray-100 transition-colors ${
                              selectedSize === size 
                                ? 'bg-black text-white border-black' 
                                : 'border-gray-300'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedDress.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1 border rounded-md hover:bg-gray-100 transition-colors ${
                              selectedColor === color 
                                ? 'bg-black text-white border-black' 
                                : 'border-gray-300'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                    
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
                        onClick={() => handleAddToCart(selectedDress)}
                      >
                        <FiShoppingBag className="mr-2" />
                        Add to Cart
                      </button>
                      <button 
                        className={`flex-1 py-3 px-6 rounded-md font-medium border ${
                          isInWishlist(selectedDress.id) 
                            ? 'border-red-500 text-red-500' 
                            : 'border-gray-300 hover:border-gray-400'
                        } transition-colors flex items-center justify-center`}
                        onClick={() => handleToggleWishlist(selectedDress.id)}
                      >
                                                  <FiHeart className={`mr-2 ${
                            isInWishlist(selectedDress.id) ? 'fill-red-500 text-red-500' : ''
                          }`} />
                          {isInWishlist(selectedDress.id) ? 'In Wishlist' : 'Add to Wishlist'}
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

export default DressesPage;