import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, 
  FiShoppingBag, 
  FiHeart, 
  FiStar, 
  FiArrowRight, 
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiPlay,
  FiPause
} from 'react-icons/fi';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [textAnimated, setTextAnimated] = useState(false);

  // Auto-rotate hero slides
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setTextAnimated(false);
      setTimeout(() => setTextAnimated(true), 100);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Text animation trigger
  useEffect(() => {
    setTextAnimated(true);
  }, [currentSlide]);

  // Sample data
  const heroSlides = [
    {
      id: 1,
      title: "Elevate Your",
      titleAccent: "Wardrobe",
      subtitle: "Summer Collection 2024",
      description: "Discover premium fashion pieces designed for the modern lifestyle. Crafted with care, styled with confidence.",
      bgImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80",
      ctaPrimary: "Shop Collection",
      ctaSecondary: "View Lookbook",
      theme: "light"
    },
    {
      id: 2,
      title: "Minimalist",
      titleAccent: "Essentials",
      subtitle: "Fall Collection 2024",
      description: "Timeless pieces for your everyday wardrobe. Quality fabrics, perfect fit, effortless style.",
      bgImage: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80",
      ctaPrimary: "New Arrivals",
      ctaSecondary: "Shop Mens",
      theme: "dark"
    },
    {
      id: 3,
      title: "Contemporary",
      titleAccent: "Fashion",
      subtitle: "Limited Edition",
      description: "Exclusive pieces that define modern elegance. Sustainable materials, contemporary cuts.",
      bgImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80",
      ctaPrimary: "Limited Edition",
      ctaSecondary: "Discover More",
      theme: "light"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Elegant Summer Dress',
      price: 89.99,
      originalPrice: 120.00,
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'Dresses',
      isNew: true,
      rating: 4.8,
      reviewCount: 124
    },
    {
      id: 2,
      name: 'Classic Denim Jacket',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'Jackets',
      isBestSeller: true,
      rating: 4.9,
      reviewCount: 89
    },
    {
      id: 3,
      name: 'Casual Linen Shirt',
      price: 59.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'Tops',
      rating: 4.5,
      reviewCount: 56
    },
    {
      id: 4,
      name: 'Tailored Wool Pants',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      category: 'Bottoms',
      rating: 4.7,
      reviewCount: 42
    }
  ];

  const collections = [
    {
      name: 'New Arrivals',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      link: '/new-arrivals'  // Updated link
    },
    {
      name: 'Summer Collection',
      image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      link: '/shop/summer'
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      link: '/shop/accessories'
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "The quality exceeded my expectations! Will definitely shop here again.",
      author: "Sarah Johnson",
      role: "Fashion Blogger",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      quote: "Fast shipping and excellent customer service. The dress fits perfectly!",
      author: "Michael Chen",
      role: "Loyal Customer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      quote: "I love the minimalist design of their clothing. Always my go-to store.",
      author: "Emma Williams",
      role: "Stylist",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const currentSlideData = heroSlides[currentSlide];
  const isDarkTheme = currentSlideData.theme === 'dark';

  return (
    <div className="bg-white">
      {/* Ultra-Modern Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Dynamic Background with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform scale-105"
            style={{
              backgroundImage: `url(${currentSlideData.bgImage})`,
              transform: textAnimated ? 'scale(1)' : 'scale(1.05)'
            }}
          />
          
          {/* Multi-layered Gradient Overlays */}
          <div className={`absolute inset-0 transition-all duration-1000 ${
            isDarkTheme 
              ? 'bg-gradient-to-br from-black/80 via-black/50 to-transparent' 
              : 'bg-gradient-to-br from-black/60 via-black/30 to-transparent'
          }`} />
          
          {/* Animated Gradient Accent */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-1000 ${
            textAnimated ? 'opacity-100' : 'opacity-50'
          }`} />
          
          {/* Geometric Design Elements */}
          <div className="absolute top-20 right-10 w-32 h-32 border border-white/20 rotate-45 animate-pulse" />
          <div className="absolute bottom-32 left-16 w-16 h-16 bg-white/10 rotate-12 animate-bounce" style={{ animationDelay: '2s' }} />
        </div>

        {/* Hero Content with Advanced Animations */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl">
              {/* Animated Subtitle */}
              <div className="overflow-hidden mb-6">
                <span className={`block text-sm uppercase tracking-[0.3em] text-white/90 font-light transition-all duration-1000 ${
                  textAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '0.2s' }}>
                  {currentSlideData.subtitle}
                  <span className="inline-block w-12 h-px bg-white/60 ml-4 align-middle" />
                </span>
              </div>
              
              {/* Dynamic Main Title */}
              <div className="overflow-hidden mb-8">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight text-white leading-[0.9]">
                  <span className={`block transition-all duration-1000 ${
                    textAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                  }`} style={{ transitionDelay: '0.4s' }}>
                    {currentSlideData.title}
                  </span>
                  <span className={`block font-serif italic bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent transition-all duration-1000 ${
                    textAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                  }`} style={{ transitionDelay: '0.6s' }}>
                    {currentSlideData.titleAccent}
                  </span>
                </h1>
              </div>
              
              {/* Enhanced Description */}
              <div className="overflow-hidden mb-12">
                <p className={`text-xl text-white/80 max-w-2xl leading-relaxed font-light transition-all duration-1000 ${
                  textAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '0.8s' }}>
                  {currentSlideData.description}
                </p>
              </div>
              
              {/* Modern CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 ${
                textAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '1s' }}>
                <Link 
                  to="/shop" 
                  className="group relative inline-flex items-center justify-center bg-white text-gray-900 px-12 py-5 text-lg font-medium overflow-hidden transition-all duration-500 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center">
                    {currentSlideData.ctaPrimary} 
                    <FiArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <Link 
                  to="/lookbook" 
                  className="group relative inline-flex items-center justify-center border-2 border-white/80 text-white px-12 py-5 text-lg font-medium overflow-hidden backdrop-blur-sm bg-white/5 transition-all duration-500 hover:bg-white/10 hover:border-white hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10">
                    {currentSlideData.ctaSecondary}
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Bottom UI Elements */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex justify-between items-end">
              {/* Left Side: Social Proof */}
              <div className="hidden lg:flex flex-col space-y-4">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                  Follow Our Journey
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <FiInstagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <FiTwitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    <FiFacebook className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Center: Slide Navigation */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-2">
                  {heroSlides.map((slide, index) => (
                    <button 
                      key={slide.id}
                      onClick={() => {
                        setCurrentSlide(index);
                        setTextAnimated(false);
                        setTimeout(() => setTextAnimated(true), 100);
                      }}
                      className={`relative h-1 transition-all duration-500 ${
                        currentSlide === index 
                          ? 'w-12 bg-white' 
                          : 'w-6 bg-white/40 hover:bg-white/60'
                      }`}
                    >
                      {currentSlide === index && (
                        <div className="absolute inset-0 bg-white animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Slide Counter */}
                <div className="text-white/70 text-sm font-mono">
                  <span className="text-white font-medium">0{currentSlide + 1}</span>
                  <span className="mx-2">/</span>
                  0{heroSlides.length}
                </div>
              </div>

              {/* Right Side: Playback Control */}
              <div className="hidden md:flex flex-col items-end space-y-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white/70 hover:text-white transition-colors flex items-center space-x-2"
                >
                  {isPlaying ? <FiPause className="w-4 h-4" /> : <FiPlay className="w-4 h-4" />}
                  <span className="text-sm uppercase tracking-wider">
                    {isPlaying ? 'Pause' : 'Play'}
                  </span>
                </button>
                
                <div className="text-white/60 text-sm">
                  Auto-rotating slides
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="text-white/60 text-xs uppercase tracking-wider">Scroll</div>
            <div className="w-px h-8 bg-white/40" />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-gray-500">Collections</span>
          <h2 className="text-3xl md:text-4xl font-light mt-2">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <div key={index} className="relative group overflow-hidden rounded-none">
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-500 group-hover:bg-black/30">
                <Link 
                  to={collection.link}
                  className="text-white text-2xl font-medium tracking-wider hover:underline underline-offset-4 flex items-center"
                >
                  {collection.name} <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <span className="text-sm uppercase tracking-wider text-gray-500">Featured</span>
              <h2 className="text-3xl md:text-4xl font-light mt-2">Our Best Sellers</h2>
            </div>
            <Link to="/bestsellers" className="flex items-center text-gray-600 hover:text-gray-900 underline underline-offset-4">
              View All Products <FiArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative bg-white">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.isNew && (
                      <span className="bg-white px-3 py-1 text-xs font-medium tracking-wider">NEW</span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-black text-white px-3 py-1 text-xs font-medium tracking-wider">BESTSELLER</span>
                    )}
                  </div>
                  {/* Quick actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
                      <FiHeart className="w-4 h-4" />
                    </button>
                    <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
                      <FiShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-6 px-2 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        <Link to={`/product/${product.id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="text-right">
                      {product.originalPrice && (
                        <p className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
                      )}
                      <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  {product.rating && (
                    <div className="mt-3 flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-wider text-gray-400">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-light mt-2">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-900 p-8">
                <div className="text-yellow-400 text-2xl mb-4">"</div>
                <p className="text-gray-300 mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <span className="text-sm uppercase tracking-wider text-gray-500">Stay Updated</span>
            <h2 className="text-3xl md:text-4xl font-light mt-2">Subscribe to Our Newsletter</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get 10% off your first order and be the first to know about new arrivals, exclusive offers, and styling tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-6 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-black text-center sm:text-left"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-none hover:bg-gray-800 transition duration-300 uppercase tracking-wider text-sm font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;