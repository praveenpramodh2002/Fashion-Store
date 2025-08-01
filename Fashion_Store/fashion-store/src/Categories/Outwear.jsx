import React, { useState } from 'react';
import { FiHeart, FiShoppingBag, FiChevronDown, FiX, FiStar } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';

// Import local men's fashion images
import m1 from '../image/m1.jpeg';
import m2 from '../image/m2.jpeg';
import m3 from '../image/m3.jpeg';
import m4 from '../image/m4.jpeg';
import m5 from '../image/m5.jpeg';
import m6 from '../image/6.jpeg';
import heroImage from '../image/mb.png'; // Updated hero image import

const MensOutwearPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [quickViewSelectedColor, setQuickViewSelectedColor] = useState(null);
  const [quickViewSelectedSize, setQuickViewSelectedSize] = useState(null);

  // Men's outwear products data with local images
  const mensOutwearProducts = [
    {
      id: 1,
      name: 'Premium Wool Overcoat',
      price: 299,
      category: 'coats',
      colors: ['black', 'charcoal'],
      sizes: ['S', 'M', 'L', 'XL'],
      image: m1,
      rating: 4.8,
      reviews: 124,
      description: 'Classic tailored overcoat made from premium wool blend. Perfect for formal occasions or everyday wear.',
      details: {
        material: '80% Wool, 20% Polyester',
        care: 'Dry clean only',
        fit: 'Regular fit',
        lining: 'Full satin lining',
        features: ['Notched lapel', 'Double-breasted', 'Functional cuffs']
      }
    },
    {
      id: 2,
      name: 'Quilted Puffer Jacket',
      price: 189,
      category: 'jackets',
      colors: ['black', 'navy', 'olive'],
      sizes: ['XS', 'S', 'M', 'L'],
      image: m2,
      rating: 4.5,
      reviews: 89,
      description: 'Lightweight yet warm quilted puffer jacket with water-resistant finish.',
      details: {
        material: '100% Nylon',
        care: 'Machine wash cold',
        fit: 'Regular fit',
        insulation: '100g synthetic',
        features: ['Zip closure', 'Adjustable hem', 'Hidden pockets']
      }
    },
    {
      id: 3,
      name: 'Leather Moto Jacket',
      price: 349,
      category: 'jackets',
      colors: ['black', 'brown'],
      sizes: ['S', 'M', 'L'],
      image: m3,
      rating: 4.7,
      reviews: 203,
      description: 'Genuine leather moto jacket with multiple zipper details.',
      details: {
        material: '100% Genuine Leather',
        care: 'Leather conditioner recommended',
        fit: 'Slim fit',
        lining: 'Polyester',
        features: ['Asymmetrical zip', 'Zippered pockets', 'Stand collar']
      }
    },
    {
      id: 4,
      name: 'Wool Peacoat',
      price: 279,
      category: 'coats',
      colors: ['navy', 'charcoal'],
      sizes: ['S', 'M', 'L', 'XL'],
      image: m4,
      rating: 4.9,
      reviews: 156,
      description: 'Warm wool peacoat with double-breasted front and notch lapel.',
      details: {
        material: '100% Wool',
        care: 'Dry clean only',
        fit: 'Regular fit',
        lining: 'Full lining',
        features: ['Double-breasted', 'Flap pockets', 'Inner pocket']
      }
    },
    {
      id: 5,
      name: 'Denim Trucker Jacket',
      price: 129,
      category: 'jackets',
      colors: ['blue', 'black'],
      sizes: ['XS', 'S', 'M', 'L'],
      image: m5,
      rating: 4.6,
      reviews: 178,
      description: 'Classic denim trucker jacket with modern fit and distressed details.',
      details: {
        material: '100% Cotton denim',
        care: 'Machine wash cold',
        fit: 'Regular fit',
        features: ['Button front', 'Chest pockets', 'Adjustable cuffs']
      }
    },
    {
      id: 6,
      name: 'Bomber Jacket',
      price: 199,
      category: 'jackets',
      colors: ['black', 'olive'],
      sizes: ['S', 'M', 'L', 'XL'],
      image: m6,
      rating: 4.7,
      reviews: 112,
      description: 'Classic bomber jacket with ribbed collar and cuffs.',
      details: {
        material: 'Nylon exterior',
        care: 'Machine wash cold',
        fit: 'Regular fit',
        lining: 'Polyester',
        features: ['Zipper closure', 'Side pockets', 'Elastic waistband']
      }
    }
  ];

  // Filter products based on selections
  const filteredProducts = mensOutwearProducts.filter(product => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Size filter
    if (selectedSizes.length > 0 && !selectedSizes.some(size => product.sizes.includes(size))) {
      return false;
    }
    
    // Color filter
    if (selectedColors.length > 0 && !selectedColors.some(color => product.colors.includes(color))) {
      return false;
    }
    
    return true;
  });

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewSelectedColor(product.colors[0]);
    setQuickViewSelectedSize(product.sizes[0]);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    setQuickViewSelectedColor(null);
    setQuickViewSelectedSize(null);
  };

  const addToCart = (product, color, size) => {
    const newItem = {
      id: `${product.id}-${color}-${size}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      color,
      size,
      image: product.image,
      quantity: 1
    };
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === newItem.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, newItem];
      }
    });
    
    closeQuickView();
  };

  const handleAddToCartFromGrid = (product) => {
    addToCart(product, product.colors[0], product.sizes[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Updated with mb.png */}
      <div className="relative h-[500px] flex items-center justify-center bg-gray-100 overflow-hidden">
        <img
          src={heroImage}
          alt="Men's Fashion Collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Elevate Your Style
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Discover premium men's outerwear designed for comfort and sophistication
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-3 font-medium hover:bg-gray-100 transition-colors rounded-md">
              Shop New Arrivals
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-gray-900 transition-colors rounded-md">
              View Collection
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-black text-white' : 'bg-white border border-gray-300'}`}
          >
            All Outerwear
          </button>
          <button
            onClick={() => setSelectedCategory('coats')}
            className={`px-6 py-2 rounded-full ${selectedCategory === 'coats' ? 'bg-black text-white' : 'bg-white border border-gray-300'}`}
          >
            Coats
          </button>
          <button
            onClick={() => setSelectedCategory('jackets')}
            className={`px-6 py-2 rounded-full ${selectedCategory === 'jackets' ? 'bg-black text-white' : 'bg-white border border-gray-300'}`}
          >
            Jackets
          </button>
        </div>

        {/* Filter and Product Grid */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Filters</h3>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden text-gray-500"
                >
                  <FiChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
                {/* Price Range Filter */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="font-medium mb-3">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                          selectedSizes.includes(size) ? 'bg-black text-white border-black' : 'border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h4 className="font-medium mb-3">Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {['black', 'navy', 'blue', 'charcoal', 'olive', 'brown'].map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColors.includes(color) ? 'border-black' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 500]);
                    setSelectedSizes([]);
                    setSelectedColors([]);
                  }}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredProducts.length} products</p>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                <select id="sort" className="bg-white border border-gray-300 rounded px-3 py-1">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Best Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search for something else</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 500]);
                    setSelectedSizes([]);
                    setSelectedColors([]);
                  }}
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-4 right-4 p-2 rounded-full ${
                          wishlist.includes(product.id) ? 'text-red-500 bg-white/90' : 'text-gray-400 bg-white/90'
                        }`}
                        aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <FiHeart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                      </button>
                      {/* Quick View Button */}
                      <button
                        onClick={() => handleQuickView(product)}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Quick View
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="font-medium">${product.price}</p>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-1">
                          {product.colors.slice(0, 3).map((color) => (
                            <span
                              key={color}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                              aria-label={color}
                            />
                          ))}
                          {product.colors.length > 3 && (
                            <span className="text-xs text-gray-500 flex items-center">+{product.colors.length - 3}</span>
                          )}
                        </div>
                        <button 
                          onClick={() => handleAddToCartFromGrid(product)}
                          className="text-gray-400 hover:text-black"
                        >
                          <FiShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeQuickView}></div>
            </div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl leading-6 font-medium text-gray-900">
                        {quickViewProduct.name}
                      </h3>
                      <button 
                        onClick={closeQuickView}
                        className="text-gray-400 hover:text-gray-500"
                        aria-label="Close modal"
                      >
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Product Images */}
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={quickViewProduct.image}
                          alt={quickViewProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div>
                        <div className="flex items-center mb-4">
                          <p className="text-2xl font-bold">${quickViewProduct.price}</p>
                          <div className="flex items-center ml-4">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(quickViewProduct.rating) ? 'fill-current' : ''}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">({quickViewProduct.reviews} reviews)</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-6">{quickViewProduct.description}</p>
                        
                        {/* Color Selection */}
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Color</h4>
                          <div className="flex flex-wrap gap-2">
                            {quickViewProduct.colors.map((color) => (
                              <button
                                key={color}
                                onClick={() => setQuickViewSelectedColor(color)}
                                className={`w-10 h-10 rounded-full border-2 ${
                                  quickViewSelectedColor === color ? 'border-black' : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color }}
                                aria-label={color}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Size Selection */}
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Size</h4>
                          <div className="flex flex-wrap gap-2">
                            {quickViewProduct.sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => setQuickViewSelectedSize(size)}
                                className={`w-12 h-10 flex items-center justify-center border rounded ${
                                  quickViewSelectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Product Details */}
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(quickViewProduct.details).map(([key, value]) => (
                              <div key={key}>
                                <p className="text-xs text-gray-500 capitalize">{key.replace(/_/g, ' ')}</p>
                                {Array.isArray(value) ? (
                                  <ul className="list-disc pl-5 text-sm">
                                    {value.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm">{value}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <button 
                            onClick={() => addToCart(quickViewProduct, quickViewSelectedColor, quickViewSelectedSize)}
                            className="flex-1 bg-black text-white px-4 py-3 font-medium hover:bg-gray-800 transition-colors"
                          >
                            Add to Bag
                          </button>
                          <button
                            onClick={() => toggleWishlist(quickViewProduct.id)}
                            className="flex-1 bg-white border border-black text-black px-4 py-3 font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
                          >
                            <FiHeart className={`mr-2 ${wishlist.includes(quickViewProduct.id) ? 'text-red-500 fill-current' : ''}`} />
                            {wishlist.includes(quickViewProduct.id) ? 'Saved' : 'Save'}
                          </button>
                        </div>
                        
                        {/* Share Buttons */}
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-2">Share this product</p>
                          <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                              <FaFacebookF className="w-3 h-3" />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                              <FaTwitter className="w-3 h-3" />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                              <FaPinterestP className="w-3 h-3" />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                              <FaLinkedinIn className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-medium mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe for new arrivals and exclusive men's fashion offers</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensOutwearPage;