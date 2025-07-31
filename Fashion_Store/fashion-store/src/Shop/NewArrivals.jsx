import React, { useState, useEffect } from 'react';
import { FiHeart, FiShoppingBag, FiStar, FiArrowRight, FiX } from 'react-icons/fi';
import fashionVideo from '../video/into.mp4';

// Payment logos
const KokoLogo = () => (
  <svg viewBox="0 0 100 30" className="h-5">
    <text x="0" y="20" fontFamily="Arial" fontSize="20" fill="#000">Koko</text>
  </svg>
);

const IntPayLogo = () => (
  <svg viewBox="0 0 100 30" className="h-5">
    <text x="0" y="20" fontFamily="Arial" fontSize="20" fill="#000">Int Pay</text>
  </svg>
);

const NewArrivals = () => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load cart and wishlist from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fashionCart');
    const savedWishlist = localStorage.getItem('fashionWishlist');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
      setCartCount(JSON.parse(savedCart).length);
    }
    
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
      setWishlistCount(JSON.parse(savedWishlist).length);
    }
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fashionCart', JSON.stringify(cart));
    setCartCount(cart.length);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fashionWishlist', JSON.stringify(wishlist));
    setWishlistCount(wishlist.length);
  }, [wishlist]);

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
      stock: 4
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
      stock: 6
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
      stock: 3
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
      stock: 5
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
      stock: 7
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
      stock: 2
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
      stock: 8
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
      stock: 4
    }
  ];

  // Add a notification and remove it after 3 seconds
  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Sort products based on selected option
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'newest') return b.id - a.id;
    return 0;
  });

  // Show first 4 products initially, all when showAllProducts is true
  const displayedProducts = showAllProducts ? sortedProducts : sortedProducts.slice(0, 4);

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

  // Calculate installment payments
  const calculateInstallments = (price, installments) => {
    return (price / installments).toFixed(2);
  };

  const addToCart = () => {
    if (!selectedProduct) return;
    
    const cartItem = {
      ...selectedProduct,
      selectedColor,
      selectedSize,
      quantity,
      cartId: `${selectedProduct.id}-${selectedColor}-${selectedSize}` // Unique ID for cart items
    };
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
      item.id === selectedProduct.id && 
      item.selectedColor === selectedColor && 
      item.selectedSize === selectedSize
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
      addNotification(`${selectedProduct.title} quantity updated in cart`, 'cart');
    } else {
      // Add new item to cart
      setCart(prev => [...prev, cartItem]);
      addNotification(`${selectedProduct.title} added to cart`, 'cart');
    }
    
    closeProductDetails();
  };

  const toggleWishlist = (productId, e) => {
    e?.stopPropagation(); // Prevent triggering the parent click event if event is provided
    
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      addNotification('Removed from wishlist', 'wishlist');
    } else {
      setWishlist(prev => [...prev, productId]);
      addNotification('Added to wishlist', 'wishlist');
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header with cart and wishlist indicators */}
      <header className="fixed top-0 left-0 right-0 bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-light">FASHION</h1>
          <div className="flex space-x-6">
            <button 
              className="relative"
              onClick={() => {
                // Navigate to wishlist or show wishlist items
                addNotification('Wishlist clicked', 'wishlist');
              }}
            >
              <FiHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              className="relative"
              onClick={() => {
                // Navigate to cart or show cart items
                addNotification('Cart clicked', 'cart');
              }}
            >
              <FiShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Notifications */}
      <div className="fixed top-20 right-4 space-y-2 z-50">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`px-4 py-2 rounded-md shadow-lg text-white ${
              notification.type === 'cart' ? 'bg-green-500' : 'bg-pink-500'
            } animate-fade-in-out`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-10" />
        
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
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">New Arrivals</h1>
            <p className="text-white/90 text-lg mb-6">
              Discover our curated selection of season's finest pieces. Fresh styles updated weekly.
            </p>
            <button className="flex items-center text-white border-b border-white/50 pb-1 hover:border-white transition-all group">
              <span className="group-hover:translate-x-1 transition-transform">Shop Collection</span>
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white mt-2 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products-section" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-light tracking-wide">Latest Additions</h2>
          <select 
            className="bg-transparent border border-gray-300 rounded px-3 py-1 text-sm focus:ring-0 focus:border-black"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <article 
              key={product.id} 
              className="group relative cursor-pointer"
              onClick={() => openProductDetails(product)}
            >
              <div className="aspect-[3/4] overflow-hidden relative bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/800x1066?text=Fashion+Item';
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex space-x-1">
                    {product.colors.map((color, i) => (
                      <div 
                        key={i} 
                        className="w-4 h-4 rounded-full border border-white/50" 
                        style={{ backgroundColor: color === 'Black' ? '#000000' : color === 'White' ? '#FFFFFF' : color }}
                      />
                    ))}
                  </div>
                  <button 
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                    onClick={(e) => toggleWishlist(product.id, e)}
                  >
                    <FiHeart 
                      className={`${wishlist.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} 
                    />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-500 text-sm">{product.category}</p>
                <h3 className="font-light text-lg mt-1">{product.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                  <div className="flex items-center">
                    <FiStar className="text-amber-400" />
                    <span className="text-sm ml-1">{product.rating}.0</span>
                  </div>
                </div>
              </div>
              <button 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/30"
                onClick={(e) => {
                  e.stopPropagation();
                  openProductDetails(product);
                }}
              >
                <div className="bg-white px-6 py-2 rounded-full flex items-center">
                  <FiShoppingBag className="mr-2" />
                  <span>Quick View</span>
                </div>
              </button>
            </article>
          ))}
        </div>

        {!showAllProducts && (
          <div className="mt-16 text-center">
            <button 
              onClick={handleViewAll}
              className="px-8 py-3 border border-black rounded-none hover:bg-black hover:text-white transition-all duration-300"
            >
              View All Products
            </button>
          </div>
        )}
      </section>

      {/* Lookbook Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-light text-center mb-12">Styled Looks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <figure key={item} className="group relative aspect-[4/5] overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&${item}`}
                  alt={`Look ${item}`}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-light mb-2">Spring Collection</h3>
                    <button className="flex items-center text-white border-b border-white/50 pb-1 hover:border-white transition-all text-sm">
                      Shop the Look <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={closeProductDetails}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Close product details"
            >
              <FiX className="w-5 h-5" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div className="aspect-[3/4] bg-gray-100">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-light mb-2">{selectedProduct.title}</h2>
                <p className="text-gray-500 mb-4">{selectedProduct.category}</p>
                
                <div className="mb-4">
                  <p className="text-xl font-medium">${selectedProduct.price.toFixed(2)}</p>
                  <div className="text-sm text-gray-500 mt-1 space-y-1">
                    <div className="flex items-center">
                      <span>or 3 payments of ${calculateInstallments(selectedProduct.price, 3)} with</span>
                      <span className="ml-1 inline-flex items-center">
                        <KokoLogo />
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span>or up to 4 x ${calculateInstallments(selectedProduct.price, 4)} with</span>
                      <span className="ml-1 inline-flex items-center">
                        <IntPayLogo />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500">Shipping calculated at checkout.</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex space-x-2">
                    {selectedProduct.colors.map(color => (
                      <button
                        key={color}
                        className={`px-4 py-2 border ${selectedColor === color ? 'border-black' : 'border-gray-300'} transition`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map(size => (
                      <button
                        key={size}
                        className={`px-4 py-2 border ${selectedSize === size ? 'border-black' : 'border-gray-300'} transition`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm">
                    <span className="font-medium">In stock {selectedProduct.stock}</span>
                  </p>
                  <div className="flex items-center mt-2">
                    <button 
                      className="border px-3 py-1 hover:bg-gray-100 transition"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button 
                      className="border px-3 py-1 hover:bg-gray-100 transition"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= selectedProduct.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button 
                    className="w-full bg-black text-white py-3 hover:bg-gray-800 transition"
                    onClick={addToCart}
                  >
                    Add to cart
                  </button>
                  
                  <button className="w-full border border-black py-3 hover:bg-gray-100 transition">
                    Buy It now
                  </button>
                </div>
                
                <div className="mt-4 flex items-center space-x-4">
                  <button 
                    className="text-sm underline flex items-center hover:text-gray-600 transition"
                    onClick={() => toggleWishlist(selectedProduct.id)}
                  >
                    {wishlist.includes(selectedProduct.id) ? (
                      <>
                        <FiHeart className="text-red-500 fill-red-500 mr-1" />
                        <span>Remove from wishlist</span>
                      </>
                    ) : (
                      <>
                        <FiHeart className="mr-1" />
                        <span>Add to wishlist</span>
                      </>
                    )}
                  </button>
                  
                  <button className="text-sm underline flex items-center hover:text-gray-600 transition">
                    View full details <FiArrowRight className="ml-1" />
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