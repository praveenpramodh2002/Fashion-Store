import React from 'react';
import { 
  FiUsers, FiAward, FiShoppingBag, FiHeart,
  FiInstagram, FiTwitter, FiFacebook 
} from 'react-icons/fi';

// Online images - replace with your actual company images
const heroImage = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
const teamImage = 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
const founderImage = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80';
const storeImage = 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1987&q=80';

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section with Company Image */}
      <section className="relative h-[500px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-white">
               About Us
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Crafting timeless fashion with purpose since 2015
            </p>
           
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Fashion Philosophy</h2>
            <p className="text-gray-600 mb-6">
              At PEPPERSTREET, we believe fashion should be both beautiful and responsible. Each collection is thoughtfully designed to blend contemporary style with timeless elegance, using sustainable materials that respect both people and planet.
            </p>
            <p className="text-gray-600 mb-6">
              From our ethically sourced fabrics to our inclusive sizing, every decision reflects our commitment to creating fashion that looks good and does good.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">
                <span className="font-medium">50+</span> Ethical Suppliers
              </div>
              <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">
                <span className="font-medium">100%</span> Organic Cotton
              </div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src={storeImage} 
              alt="PEPPERSTREET flagship store" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Guiding Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiHeart className="w-8 h-8 text-indigo-600" />,
                title: "Sustainable Practices",
                description: "We prioritize eco-friendly materials and reduce waste at every production stage."
              },
              {
                icon: <FiUsers className="w-8 h-8 text-indigo-600" />,
                title: "Inclusive Design",
                description: "Our collections celebrate all body types with sizes 00-24."
              },
              {
                icon: <FiAward className="w-8 h-8 text-indigo-600" />,
                title: "Artisan Quality",
                description: "Each garment is crafted by skilled artisans earning fair wages."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-last lg:order-first">
            <img 
              src={founderImage} 
              alt="PEPPERSTREET founder" 
              className="rounded-xl shadow-xl w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Message From Our Founder</h2>
            <blockquote className="text-gray-600 mb-6 text-lg italic">
              "PEPPERSTREET was born from a simple idea: fashion should empower both the wearer and the maker. We're proving style and sustainability can coexist beautifully."
            </blockquote>
            <p className="text-gray-900 font-medium mb-6">
              - Alexandra Chen, Founder & Creative Director
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
                <FiInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
                <FiTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">The PEPPERSTREET Family</h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Meet the passionate team redefining fashion
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alexandra Chen",
                role: "Founder & Creative Director",
                bio: "Visionary leader with 15+ years in sustainable fashion"
              },
              {
                name: "Jamal Williams",
                role: "Head of Design",
                bio: "Specializes in innovative sustainable fabrics"
              },
              {
                name: "Sophia Rodriguez",
                role: "Sustainability Lead",
                bio: "Ensures ethical supply chain practices"
              },
              {
                name: "Marcus Lee",
                role: "Retail Director",
                bio: "Creates exceptional customer experiences"
              }
            ].map((member, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition">
                <div className="bg-gray-700 h-48 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={teamImage} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-indigo-400 mb-3">{member.role}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Ethical Fashion?</h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Join thousands of customers who look good while doing good.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition">
              Shop the Collection
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition">
              Learn Our Process
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;