import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiStar, FiFilter, FiX, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import summerImage from '../image/banner5.png'; // Import the summer image

const SummerCollection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [cart, setCart] = useState([]); // Added cart state

  // Categories
  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Dresses', value: 'dresses' },
    { name: 'Swimwear', value: 'swimwear' },
    { name: 'Tops', value: 'tops' },
    { name: 'Shorts', value: 'shorts' },
    { name: 'Sets', value: 'sets' },
  ];

  // Summer products with new outfit images only
  const products = [
    {
      id: 1,
      name: 'Tropical Print Sundress',
      price: 79.99,
      category: 'dresses',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 4.8,
      colors: ['Coral', 'Aqua', 'Sunshine Yellow'],
      description: 'Flowy sundress with vibrant tropical print, perfect for beach vacations.',
      isNew: true
    },
    {
      id: 2,
      name: 'High-Waisted Bikini Set',
      price: 59.99,
      category: 'swimwear',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 4.9,
      colors: ['Black', 'Red', 'Navy'],
      description: 'Retro-inspired bikini with adjustable straps and cheeky bottom.',
      isBestSeller: true
    },
    {
      id: 3,
      name: 'Linen Off-Shoulder Top',
      price: 49.99,
      category: 'tops',
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 4.6,
      colors: ['White', 'Sky Blue', 'Mint Green'],
      description: 'Breathable linen top with romantic off-shoulder design.'
    },
    {
      id: 4,
      name: 'Denim Cutoff Shorts',
      price: 45.99,
      category: 'shorts',
      image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 4.5,
      colors: ['Light Wash', 'Medium Wash', 'Dark Wash'],
      description: 'Distressed denim shorts with raw hem detailing.'
    },
    {
      id: 5,
      name: 'Crochet Beach Set',
      price: 89.99,
      category: 'sets',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 4.7,
      colors: ['White', 'Beige', 'Ecru'],
      description: 'Handmade crochet top and skirt set perfect for summer.',
      isNew: true
    },
    {
      id: 6,
      name: 'Wrap Sarong Dress',
      price: 65.99,
      category: 'dresses',
      image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      rating: 4.4,
      colors: ['Pink', 'Turquoise', 'White'],
      description: 'Versatile wrap dress that can be styled multiple ways.'
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
    setQuantity(1); // Reset quantity when opening modal
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addToCart = () => {
    if (!selectedProduct) return;
    
    const cartItem = {
      ...selectedProduct,
      quantity,
      selectedColor,
      id: `${selectedProduct.id}-${selectedColor}`, // Create unique ID for cart items
      price: selectedProduct.price * quantity // Calculate total price for this item
    };
    
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        item => item.id === cartItem.id
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        updatedCart[existingItemIndex].price = 
          selectedProduct.price * updatedCart[existingItemIndex].quantity;
        return updatedCart;
      } else {
        // Add new item to cart
        return [...prevCart, cartItem];
      }
    });
    
    closeModal();
  };

  return (
    <div className="bg-white">
      {/* Hero Image Section - Adjusted height */}
      <div className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/20 via-transparent to-transparent z-10" />
        
        <img
          src={summerImage}
          alt="Summer Collection"
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            >
              Summer Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8"
            >
              Bright colors, lightweight fabrics, and effortless style for your sunniest days
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                to="/shop" 
                className="inline-flex items-center bg-white text-sunset-orange px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
              >
                Shop Now <FiChevronRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Collection Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-light mb-2">Summer Essentials</h2>
            <p className="text-gray-600">Curated pieces for your warm-weather wardrobe</p>
          </div>
          
          <div className="relative mt-4 md:mt-0">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full md:w-auto px-4 py-2 border border-gray-200 rounded-full bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">Filter</span>
              <FiFilter />
            </button>

            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl z-10 border border-gray-100 overflow-hidden"
              >
                <div className="p-2">
                  <div className="flex justify-between items-center px-2 py-1 border-b border-gray-100">
                    <h3 className="font-medium text-sm">Categories</h3>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                  <ul className="py-1">
                    {categories.map((category) => (
                      <li key={category.value}>
                        <button
                          onClick={() => {
                            setActiveFilter(category.value);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                            activeFilter === category.value 
                              ? 'bg-sunset-orange/10 text-sunset-orange' 
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

        {/* Mobile Filters */}
        <div className="flex md:hidden gap-2 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                activeFilter === category.value 
                  ? 'bg-sunset-orange text-white' 
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="group relative"
            >
              <div 
                className="aspect-[3/4] overflow-hidden relative bg-gray-50 rounded-xl cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Badges */}
                {product.isNew && (
                  <div className="absolute top-3 left-3 bg-white px-2.5 py-1 text-xs font-medium rounded-full shadow-sm">
                    NEW
                  </div>
                )}
                {product.isBestSeller && (
                  <div className="absolute top-3 left-3 bg-sunset-orange text-white px-2.5 py-1 text-xs font-medium rounded-full shadow-sm">
                    BESTSELLER
                  </div>
                )}
                
                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    <FiHeart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-sunset-orange text-sunset-orange' : ''}`} />
                  </button>
                  <button 
                    className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductModal(product);
                    }}
                  >
                    <FiShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 
                  className="font-medium text-gray-900 mb-1 cursor-pointer hover:underline"
                  onClick={() => openProductModal(product)}
                >
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900">${product.price.toFixed(2)}</p>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Summer Lookbook Section */}
      <section className="py-20 bg-gradient-to-br from-sunset-orange/5 via-yellow-50/50 to-sky-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Summer Lookbook</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Styled outfits to inspire your warm-weather wardrobe</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-xl aspect-[2/3]">
              <img
                src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt="Beach Day Outfit"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-medium text-xl mb-1">Beach Day</h3>
                  <p className="text-white/90 text-sm">Swimwear & cover-up combinations</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl aspect-[2/3]">
              <img
                src="https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt="City Summer Outfit"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-medium text-xl mb-1">City Summer</h3>
                  <p className="text-white/90 text-sm">Breezy urban styles</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl aspect-[2/3]">
              <img
                src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt="Evening Outfit"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white font-medium text-xl mb-1">Summer Nights</h3>
                  <p className="text-white/90 text-sm">Evening looks that keep you cool</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button 
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors"
                  onClick={closeModal}
                >
                  <FiX className="w-5 h-5" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                  <div className="relative">
                    <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    
                    {selectedProduct.colors && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Available Colors</h3>
                        <div className="flex gap-3">
                          {selectedProduct.colors.map(color => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`w-8 h-8 rounded-full border-2 transition-colors ${
                                selectedColor === color 
                                  ? 'border-sunset-orange' 
                                  : 'border-transparent'
                              }`}
                              style={{
                                backgroundColor: 
                                  color === 'Coral' ? '#FF7F50' :
                                  color === 'Aqua' ? '#00FFFF' :
                                  color === 'Sunshine Yellow' ? '#FFD700' :
                                  color === 'Black' ? '#000000' :
                                  color === 'Red' ? '#FF0000' :
                                  color === 'Navy' ? '#000080' :
                                  color === 'White' ? '#FFFFFF' :
                                  color === 'Sky Blue' ? '#87CEEB' :
                                  color === 'Mint Green' ? '#98FF98' :
                                  color === 'Light Wash' ? '#ADD8E6' :
                                  color === 'Dark Wash' ? '#00008B' :
                                  color === 'Natural' ? '#F5DEB3' :
                                  color === 'Pink' ? '#FFC0CB' :
                                  color === 'Turquoise' ? '#40E0D0' : '#FFFFFF'
                              }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(selectedProduct.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {selectedProduct.rating} ({Math.floor(selectedProduct.rating * 10)} reviews)
                      </span>
                    </div>
                    
                    <p className="text-2xl font-bold text-gray-900 mb-6">${selectedProduct.price.toFixed(2)}</p>
                    
                    <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
                    
                    <div className="mb-8">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                      <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                        <button 
                          className="px-4 py-2 text-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        >
                          -
                        </button>
                        <span className="px-4 py-2 border-x border-gray-200 w-12 text-center">{quantity}</span>
                        <button 
                          className="px-4 py-2 text-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setQuantity(prev => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        className="flex-1 bg-sunset-orange text-white py-3 px-6 rounded-lg font-medium hover:bg-sunset-orange/90 transition-colors flex items-center justify-center"
                        onClick={addToCart}
                      >
                        <FiShoppingBag className="mr-2" />
                        Add to Cart
                      </button>
                      <button 
                        className={`flex-1 py-3 px-6 rounded-lg font-medium border flex items-center justify-center transition-colors ${
                          wishlist.includes(selectedProduct.id) 
                            ? 'border-sunset-orange text-sunset-orange' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => toggleWishlist(selectedProduct.id)}
                      >
                        <FiHeart className={`mr-2 ${
                          wishlist.includes(selectedProduct.id) 
                            ? 'fill-sunset-orange text-sunset-orange' 
                            : ''
                        }`} />
                        {wishlist.includes(selectedProduct.id) ? 'Saved' : 'Save'}
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

export default SummerCollection;