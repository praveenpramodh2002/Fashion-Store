import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiStar, FiFilter, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DressesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Dress categories
  const dressCategories = [
    { name: 'All', value: 'all' },
    { name: 'Casual', value: 'casual' },
    { name: 'Evening', value: 'evening' },
    { name: 'Wedding', value: 'wedding' },
    { name: 'Summer', value: 'summer' },
    { name: 'Maxi', value: 'maxi' },
  ];

  // Dress collection
  const dresses = [
    {
      id: 1,
      name: 'Floral Summer Dress',
      price: 89.99,
      category: 'summer',
      image: 'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.8,
      isNew: true
    },
    {
      id: 2,
      name: 'Elegant Evening Gown',
      price: 159.99,
      category: 'evening',
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.9,
      isBestSeller: true
    },
    {
      id: 3,
      name: 'Casual Linen Dress',
      price: 69.99,
      category: 'casual',
      image: 'https://images.pexels.com/photos/6633656/pexels-photo-6633656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.5
    },
    {
      id: 4,
      name: 'Bridal Wedding Dress',
      price: 299.99,
      category: 'wedding',
      image: 'https://images.pexels.com/photos/1350614/pexels-photo-1350614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 5.0
    },
    {
      id: 5,
      name: 'Flowery Maxi Dress',
      price: 99.99,
      category: 'maxi',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.7,
      isNew: true
    },
    {
      id: 6,
      name: 'Silk Cocktail Dress',
      price: 129.99,
      category: 'evening',
      image: 'https://images.pexels.com/photos/4499804/pexels-photo-4499804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.6
    },
    {
      id: 7,
      name: 'Off-Shoulder Summer Dress',
      price: 79.99,
      category: 'summer',
      image: 'https://images.pexels.com/photos/4498223/pexels-photo-4498223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.4
    },
    {
      id: 8,
      name: 'Chiffon Evening Dress',
      price: 149.99,
      category: 'evening',
      image: 'https://images.pexels.com/photos/4498227/pexels-photo-4498227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.8,
      isBestSeller: true
    }
  ];

  const filteredDresses = activeFilter === 'all' 
    ? dresses 
    : dresses.filter(dress => dress.category === activeFilter);

  return (
    <div className="bg-white">
      {/* Hero Section with Video Background */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/video/dresses.mp4" type="video/mp4" />
          {/* Fallback image in case video doesn't load */}
         
        </video>
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
              <div className="aspect-[3/4] overflow-hidden relative bg-gray-100">
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
                  <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
                    <FiHeart className="w-4 h-4" />
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
                    <FiShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{dress.name}</h3>
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
    </div>
  );
};

export default DressesPage;