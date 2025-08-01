import React, { useState, useEffect } from 'react';
import { FiHeart, FiShoppingBag, FiStar, FiArrowRight, FiX, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import fashionVideo from '../video/into.mp4';
import { useCart } from '../context/CartContext';

const NewArrivals = () => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    cartCount, 
    wishlistCount 
  } = useCart();

  const allProducts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Kai Pepper Tee',
      category: 'T-Shirts',
      price: 47.50,
      rating: 4,
      colors: ['Black', 'White'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      stock: 4,
      isNew: true,
      discount: 0
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Silk Slip Dress',
      category: 'Dresses',
      price: 145,
      rating: 5,
      colors: ['#E8C4C4', '#2D2D2D', '#5A5A5A'],
      sizes: ['XS', 'S', 'M', 'L'],
      stock: 6,
      isNew: true,
      discount: 15
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Structured Handbag',
      category: 'Accessories',
      price: 220,
      rating: 4,
      colors: ['#3A3A3A', '#D4A373', '#FFFFFF'],
      sizes: ['One Size'],
      stock: 3,
      isNew: true,
      discount: 0
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Wide-Leg Trousers',
      category: 'Pants',
      price: 98,
      rating: 5,
      colors: ['#2D2D2D', '#5F5F5F', '#C4C4C4'],
      sizes: ['S', 'M', 'L', 'XL'],
      stock: 5,
      isNew: true,
      discount: 10
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Cashmere Sweater',
      category: 'Tops',
      price: 165,
      rating: 4,
      colors: ['#2D2D2D', '#5F5F5F', '#C4C4C4'],
      sizes: ['XS', 'S', 'M', 'L'],
      stock: 7,
      isNew: true,
      discount: 0
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Leather Mules',
      category: 'Shoes',
      price: 210,
      rating: 5,
      colors: ['#000000', '#5F5F5F'],
      sizes: ['36', '37', '38', '39', '40'],
      stock: 2,
      isNew: true,
      discount: 20
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Tailored Shirt',
      category: 'Tops',
      price: 85,
      rating: 4,
      colors: ['#FFFFFF', '#A8A8A8'],
      sizes: ['S', 'M', 'L', 'XL'],
      stock: 8,
      isNew: true,
      discount: 0
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Mini Skirt',
      category: 'Skirts',
      price: 75,
      rating: 4,
      colors: ['#000000', '#5A5A5A'],
      sizes: ['XS', 'S', 'M'],
      stock: 4,
      isNew: true,
      discount: 5
    }
  ];

  const categories = ['all', 'T-Shirts', 'Dresses', 'Accessories', 'Pants', 'Tops', 'Shoes', 'Skirts'];

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'newest') return b.id - a.id;
    return 0;
  });

  // Show first 4 products initially, all when showAllProducts is true
  const displayedProducts = showAllProducts ? sortedProducts : sortedProducts.slice(0, 4);

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleViewAll = () => {
    setShowAllProducts(true);
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
    document.body.style.overflow = 'hidden';
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= (selectedProduct?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const calculateInstallments = (price, installments) => {
    return (price / installments).toFixed(2);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    addToCart(selectedProduct, selectedColor, selectedSize, quantity);
    addNotification(`${selectedProduct.title} added to cart`, 'cart');
    closeProductDetails();
  };

  const handleToggleWishlist = (productId, e) => {
    e?.stopPropagation();
    
    toggleWishlist(productId);
    if (isInWishlist(productId)) {
      addNotification('Removed from wishlist', 'wishlist');
    } else {
      addNotification('Added to wishlist', 'wishlist');
    }
  };

  const getDiscountedPrice = (price, discount) => {
    return discount > 0 ? price * (1 - discount / 100) : price;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={fashionVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 flex items-center z-20 px-8 md:px-16">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-white text-sm font-medium">NEW ARRIVALS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight leading-tight">
              Fresh Styles
              <br />
              <span className="font-normal">This Season</span>
            </h1>
            <p className="text-white/90 text-xl mb-8 max-w-2xl">
              Discover our latest collection featuring contemporary designs and premium materials. 
              Each piece is carefully curated for the modern fashion enthusiast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black px-8 py-4 font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Shop Collection
              </button>
              <button className="border border-white text-white px-8 py-4 font-medium hover:bg-white hover:text-black transition-all duration-300">
                View Lookbook
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center animate-bounce">
            <div className="w-1 h-2 bg-white mt-2 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'All Items' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-light tracking-wide mb-2">
              {selectedCategory === 'all' ? 'Latest Additions' : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {displayedProducts.length} of {sortedProducts.length} items
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
            
            <select 
              className="bg-transparent border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {displayedProducts.map((product) => (
            <article 
              key={product.id} 
              className={`group relative cursor-pointer ${
                viewMode === 'list' ? 'flex gap-6' : ''
              }`}
              onClick={() => openProductDetails(product)}
            >
              <div className={`relative bg-gray-100 overflow-hidden ${
                viewMode === 'list' ? 'w-64 h-80 flex-shrink-0' : 'aspect-[3/4]'
              }`}>
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/800x1066?text=Fashion+Item';
                  }}
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-black text-white px-3 py-1 text-xs font-medium">NEW</span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 text-xs font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all duration-300 transform hover:scale-110"
                  onClick={(e) => handleToggleWishlist(product.id, e)}
                >
                  <FiHeart 
                    className={`w-4 h-4 ${isInWishlist(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} 
                  />
                </button>

                {/* Quick Add Button */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    className="bg-white text-black px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductDetails(product);
                    }}
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-4'}`}>
                <div className="flex items-start justify-between mb-2">
                  <p className="text-gray-500 text-sm uppercase tracking-wide">{product.category}</p>
                  <div className="flex items-center">
                    <FiStar className="text-amber-400 w-4 h-4" />
                    <span className="text-sm ml-1">{product.rating}.0</span>
                  </div>
                </div>
                
                <h3 className="font-light text-lg mb-2 group-hover:text-gray-600 transition-colors">
                  {product.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-lg font-medium">
                        ${getDiscountedPrice(product.price, product.discount).toFixed(2)}
                      </span>
                      <span className="text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
                  )}
                </div>

                {viewMode === 'list' && (
                  <p className="text-gray-600 text-sm mb-4">
                    Available in {product.colors.length} colors and {product.sizes.length} sizes
                  </p>
                )}

                <div className="flex space-x-1">
                  {product.colors.slice(0, 4).map((color, i) => (
                    <div 
                      key={i} 
                      className="w-4 h-4 rounded-full border border-gray-200" 
                      style={{ 
                        backgroundColor: color === 'Black' ? '#000000' : 
                                       color === 'White' ? '#FFFFFF' : color 
                      }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
                      <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {!showAllProducts && sortedProducts.length > 4 && (
          <div className="mt-16 text-center">
            <button 
              onClick={handleViewAll}
              className="px-12 py-4 border-2 border-black rounded-none hover:bg-black hover:text-white transition-all duration-300 font-medium"
            >
              View All {sortedProducts.length} Products
            </button>
          </div>
        )}
      </section>

      {/* Notifications */}
      <div className="fixed top-20 right-4 space-y-2 z-50">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 ${
              notification.type === 'cart' ? 'bg-green-500' : 'bg-pink-500'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={closeProductDetails}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Close product details"
            >
              <FiX className="w-6 h-6" />
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
              <div className="aspect-[3/4] bg-gray-100">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {selectedProduct.isNew && (
                    <span className="bg-black text-white px-3 py-1 text-xs font-medium">NEW</span>
                  )}
                  {selectedProduct.discount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 text-xs font-medium">
                      -{selectedProduct.discount}% OFF
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-light mb-2">{selectedProduct.title}</h2>
                <p className="text-gray-500 mb-6">{selectedProduct.category}</p>
                
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    {selectedProduct.discount > 0 ? (
                      <>
                        <span className="text-2xl font-medium">
                          ${getDiscountedPrice(selectedProduct.price, selectedProduct.discount).toFixed(2)}
                        </span>
                        <span className="text-gray-500 line-through text-lg">
                          ${selectedProduct.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-medium">${selectedProduct.price.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <span>or 3 payments of ${calculateInstallments(getDiscountedPrice(selectedProduct.price, selectedProduct.discount), 3)}</span>
                    </div>
                    <div className="flex items-center">
                      <span>Free shipping on orders over $100</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Color</h3>
                  <div className="flex space-x-3">
                    {selectedProduct.colors.map(color => (
                      <button
                        key={color}
                        className={`px-4 py-2 border-2 transition-all ${
                          selectedColor === color ? 'border-black' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.sizes.map(size => (
                      <button
                        key={size}
                        className={`px-4 py-2 border-2 transition-all ${
                          selectedSize === size ? 'border-black' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">In stock {selectedProduct.stock} items</span>
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300">
                      <button 
                        className="px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                      <button 
                        className="px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= selectedProduct.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button 
                    className="w-full bg-black text-white py-4 hover:bg-gray-800 transition font-medium"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  
                  <button className="w-full border-2 border-black py-4 hover:bg-gray-100 transition font-medium">
                    Buy Now
                  </button>
                </div>
                
                <div className="mt-6 flex items-center gap-6">
                  <button 
                    className="text-sm underline flex items-center hover:text-gray-600 transition"
                    onClick={() => handleToggleWishlist(selectedProduct.id)}
                  >
                    {isInWishlist(selectedProduct.id) ? (
                      <>
                        <FiHeart className="text-red-500 fill-red-500 mr-2" />
                        <span>Remove from wishlist</span>
                      </>
                    ) : (
                      <>
                        <FiHeart className="mr-2" />
                        <span>Add to wishlist</span>
                      </>
                    )}
                  </button>
                  
                  <button className="text-sm underline flex items-center hover:text-gray-600 transition">
                    View full details <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;