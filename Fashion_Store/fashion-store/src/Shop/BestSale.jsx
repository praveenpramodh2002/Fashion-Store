import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useCart } from '../context/CartContext';
// Import your brand logos from assets
import ZaraLogo from '../image/zara.jpeg';
import HMLogo from '../image/H&M.jpeg';
import CalvinKleinLogo from '../image/ck.jpeg';
import AdidasLogo from '../image/Adidas.jpeg';
import NikeLogo from '../image/nike.jpeg';

const BestsellersPage = () => {
  const { toggleWishlist, isInWishlist, addToCart } = useCart();
  
  // Brand logos imported from your assets
  const brandLogos = [
    { src: ZaraLogo, alt: "Zara" },
    { src: HMLogo, alt: "H&M" },
    { src: CalvinKleinLogo, alt: "Calvin Klein" },
    { src: AdidasLogo, alt: "Adidas" },
    { src: NikeLogo, alt: "Nike" }
  ];

  // Hero images with animation
  const heroImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  ];

  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Handle adding item to cart
  const handleAddToCart = (product) => {
    // Default to first available color and size, or you can add a modal for selection
    const defaultColor = product.colors[0];
    const defaultSize = 'M'; // You can make this dynamic based on available sizes
    addToCart(product, defaultColor, defaultSize, 1);
    
    // Show success feedback (you can replace this with a toast notification)
    alert(`${product.name} added to cart!`);
  };

  // Updated bestseller data
  const bestsellers = [
    {
      id: 1,
      name: 'Premium Denim Jacket',
      price: 89.99,
      rating: 4.8,
      reviewCount: 124,
      colors: ['Black', 'Blue', 'Light Wash'],
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 2,
      name: 'Silk Blend Blouse',
      price: 59.99,
      rating: 4.6,
      reviewCount: 89,
      colors: ['White', 'Nude', 'Black'],
      image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 3,
      name: 'High-Waisted Trousers',
      price: 65.99,
      rating: 4.9,
      reviewCount: 210,
      colors: ['Black', 'Beige', 'Navy'],
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 4,
      name: 'Cashmere Sweater',
      price: 129.99,
      rating: 4.7,
      reviewCount: 156,
      colors: ['Cream', 'Gray', 'Camel'],
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 5,
      name: 'Leather Crossbody Bag',
      price: 149.99,
      rating: 4.9,
      reviewCount: 342,
      colors: ['Black', 'Brown', 'Burgundy'],
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 6,
      name: 'Wool Blend Coat',
      price: 199.99,
      rating: 4.8,
      reviewCount: 187,
      colors: ['Camel', 'Black', 'Gray'],
      image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <div className="bg-white">
      {/* Enhanced Hero Section with Carousel */}
      <div className="relative bg-gray-900 h-96 md:h-[500px] overflow-hidden">
        {/* Hero image slides */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHeroImage ? 'opacity-40' : 'opacity-0'}`}
          >
            <img
              className="w-full h-full object-cover"
              src={image}
              alt={`Fashion background ${index + 1}`}
            />
          </div>
        ))}
        
        {/* Hero content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in">
            Our Bestsellers
          </h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl animate-fade-in animate-delay-100">
            Discover this season's most loved fashion pieces
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-fade-in animate-delay-200">
            Shop Collection
          </button>
        </div>
        
        {/* Hero image indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentHeroImage ? 'bg-white w-6' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Brand Logos Section with improved sizing */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-medium text-gray-500 mb-8">
            FEATURED BRANDS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 items-center">
            {brandLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex justify-center p-2 transition-all duration-300 hover:scale-105"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-16 object-contain object-center opacity-80 hover:opacity-100 transition-opacity"
                  style={{ maxWidth: '120px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Shop Bestsellers</h2>
          <div className="flex space-x-4">
            <select className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all">
              <option>Sort by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestsellers.map((product) => (
            <div 
              key={product.id} 
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${product.id * 100}ms` }}
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-50 group-hover:opacity-90 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/500x500?text=Product+Image';
                  }}
                />
                                 <button 
                   className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all duration-300 transform hover:scale-110"
                   aria-label="Add to favorites"
                   onClick={() => {
                     toggleWishlist(product.id);
                     if (!isInWishlist(product.id)) {
                       alert(`${product.name} added to wishlist!`);
                     }
                   }}
                 >
                   <HeartIcon className={`h-5 w-5 transition-colors ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`} />
                 </button>
                {/* Color options */}
                <div className="absolute bottom-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {product.colors.map((color, i) => (
                    <div 
                      key={i}
                      className="w-5 h-5 rounded-full border border-gray-200 shadow-sm"
                      style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fff' : color.toLowerCase() === 'black' ? '#000' : color.toLowerCase() === 'blue' ? '#2563eb' : color.toLowerCase() === 'light wash' ? '#93c5fd' : color.toLowerCase() === 'nude' ? '#f5d0b1' : color.toLowerCase() === 'beige' ? '#e2d5c1' : color.toLowerCase() === 'navy' ? '#1e3a8a' : color.toLowerCase() === 'cream' ? '#fef9c3' : color.toLowerCase() === 'gray' ? '#6b7280' : color.toLowerCase() === 'camel' ? '#b88b4a' : color.toLowerCase() === 'brown' ? '#78350f' : color.toLowerCase() === 'burgundy' ? '#831843' : '#fff' }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-center">
                    <div className="flex">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={`h-5 w-5 ${
                            rating < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button 
                className="mt-3 w-full py-2 bg-gray-100 text-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-200"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add some global animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-delay-100 {
          animation-delay: 100ms;
        }
        .animate-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
};

export default BestsellersPage;