import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CollectionPage = () => {
  const { toggleWishlist, isInWishlist } = useCart();
  
  // Hero images with animation effects
  const heroImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      alt: 'Fashion Collection Display',
      transition: { duration: 1.5 }
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      alt: 'Clothing Rack',
      transition: { duration: 1.5 }
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      alt: 'Minimalist Fashion',
      transition: { duration: 1.5 }
    }
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Collection categories
  const collections = [
    {
      id: 1,
      name: 'Summer Essentials',
      description: 'Lightweight fabrics and breezy silhouettes',
      image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      items: 42,
      link: '/collection/summer'
    },
    {
      id: 2,
      name: 'Urban Minimalism',
      description: 'Clean lines and monochromatic palettes',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      items: 36,
      link: '/collection/minimal'
    },
    {
      id: 3,
      name: 'Evening Glam',
      description: 'Statement pieces for special occasions',
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      items: 28,
      link: '/collection/evening'
    },
    {
      id: 4,
      name: 'Streetwear',
      description: 'Edgy urban styles and bold graphics',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      items: 51,
      link: '/collection/streetwear'
    },
    {
      id: 5,
      name: 'Workwear',
      description: 'Professional yet fashionable office attire',
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      items: 39,
      link: '/collection/workwear'
    },
    {
      id: 6,
      name: 'Athleisure',
      description: 'Comfort meets style for active lifestyles',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80',
      items: 47,
      link: '/collection/athleisure'
    }
  ];

  // Featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Oversized Linen Shirt',
      price: 89.99,
      collection: 'Summer Essentials',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Wide-Leg Wool Pants',
      price: 129.99,
      collection: 'Urban Minimalism',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Silk Slip Dress',
      price: 159.99,
      collection: 'Evening Glam',
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Animation variants
  const fadeVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 1000 : -1000
    }),
    center: {
      opacity: 1,
      x: 0
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir < 0 ? 1000 : -1000
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white">
      {/* Animated Hero Section */}
      <div className="relative h-96 md:h-screen max-h-[800px] overflow-hidden">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentHeroIndex}
            custom={direction}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={heroImages[currentHeroIndex].transition}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroImages[currentHeroIndex].src}
              alt={heroImages[currentHeroIndex].alt}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end pb-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-4"
                >
                  Curated Collections
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl text-white/90 max-w-2xl"
                >
                  Handpicked selections for every style and occasion
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link 
                    to="#collections" 
                    className="mt-8 inline-flex items-center justify-center bg-white text-black px-8 py-3 text-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Explore Collections <FiArrowRight className="ml-2" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentHeroIndex ? 1 : -1);
                setCurrentHeroIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${index === currentHeroIndex ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Animated Collections Grid */}
      <section id="collections" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-light"
          >
            Shop by Collection
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/collections/all" className="text-gray-600 hover:text-black underline underline-offset-4 flex items-center">
              View All <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {collections.map((collection) => (
            <motion.div 
              key={collection.id}
              variants={itemAnimation}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <motion.img
                src={collection.image}
                alt={collection.name}
                className="w-full h-80 md:h-96 object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                <motion.div 
                  initial={{ y: 0 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-medium text-white mb-1">{collection.name}</h3>
                  <p className="text-gray-300 mb-3">{collection.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">{collection.items} items</span>
                    <Link
                      to={collection.link}
                      className="text-white hover:text-gray-300 underline underline-offset-4 flex items-center"
                    >
                      Explore <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Animated Featured Products */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-light mb-12"
          >
            Featured Collection Pieces
          </motion.h2>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id}
                variants={itemAnimation}
                whileHover={{ y: -5 }}
                className="group relative bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="aspect-square overflow-hidden relative">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-4 right-4 flex flex-col gap-2"
                  >
                    <button 
                      className="bg-white p-2 rounded-full hover:bg-gray-100 transition"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <FiHeart className={`w-5 h-5 ${isInWishlist(product.id) ? 'text-red-500' : ''}`} />
                    </button>
                    <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
                      <FiShoppingBag className="w-5 h-5" />
                    </button>
                  </motion.div>
                </div>
                <div className="mt-4 px-2 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{product.collection}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Animated CTA Section */}
      <section className="py-20 bg-black text-white text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">Need Help Finding Your Style?</h2>
          <p className="text-gray-300 mb-8">
            Our fashion experts can create a personalized collection just for you.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/services/personal-styling" 
              className="inline-flex items-center justify-center bg-white text-black px-8 py-3 text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get Personalized Recommendations <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default CollectionPage;