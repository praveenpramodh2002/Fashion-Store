import React, { useState } from 'react';
import axios from 'axios';
import { 
  FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiMessageSquare,
  FiInstagram, FiTwitter, FiFacebook
} from 'react-icons/fi';

const contactBg = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Backend endpoint
      await axios.post('http://localhost:8080/public/addContact', formData);

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitSuccess(false), 5000); // Hide success after 5s
    } catch (error) {
      console.error(error);
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white pt-32 pb-24 h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${contactBg})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect With PEPPERSTREET</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Our team is ready to assist you with style advice, order inquiries, or just to chat fashion.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <div className="flex items-center mb-6">
              <FiMessageSquare className="text-indigo-600 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
            </div>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order Support">Order Support</option>
                <option value="Product Questions">Product Questions</option>
                <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                name="message"
                rows="5"
                placeholder="How can we help you today?"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <FiSend className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FiMail className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <p>Email: <a href="mailto:hello@pepperstreet.com" className="text-indigo-600 hover:underline">hello@pepperstreet.com</a></p>
                    <p>Email: <a href="mailto:support@pepperstreet.com" className="text-indigo-600 hover:underline">support@pepperstreet.com</a></p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiPhone className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <p>Phone: <a href="tel:+15551234567" className="text-indigo-600 hover:underline">+1 (555) 123-4567</a></p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiMapPin className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <p>123 Fashion Avenue, New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiClock className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <p>Store Hours:</p>
                    <p className="text-sm text-gray-500">Mon-Fri: 9am-8pm | Sat: 10am-8pm | Sun: 11am-6pm</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-100 p-4 rounded-full text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition">
                    <FiInstagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-gray-100 p-4 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition">
                    <FiTwitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-gray-100 p-4 rounded-full text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition">
                    <FiFacebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
