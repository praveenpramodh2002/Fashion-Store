import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
// Import your brand logos from assets
import ZaraLogo from '../image/zara.jpeg';
import HMLogo from '../image/H&M.jpeg';
import CalvinKleinLogo from '../image/ck.jpeg';
import AdidasLogo from '../image/Adidas.jpeg';
import NikeLogo from '../image/nike.jpeg';

const BestsellersPage = () => {
  // Brand logos imported from your assets
  const brandLogos = [
    ZaraLogo,
    HMLogo,
    CalvinKleinLogo,
    AdidasLogo,
    NikeLogo
  ];

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
      {/* New Hero Section */}
      <div className="relative bg-gray-900 h-96 md:h-[500px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="Fashion background"
          />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Bestsellers
          </h1>
          <p className="mt-4 text-xl text-gray-200 max-w-3xl">
            Discover this season's most loved fashion pieces
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors">
            Shop Collection
          </button>
        </div>
      </div>

      {/* Brand Logos Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-medium text-gray-500 mb-8">
            FEATURED BRANDS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 items-center">
            {brandLogos.map((logo, index) => (
              <div key={index} className="flex justify-center p-2">
                <img
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
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
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>Sort by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestsellers.map((product) => (
            <div key={product.id} className="group relative">
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
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all">
                  <HeartIcon className="h-5 w-5 text-gray-700 hover:text-red-500" />
                </button>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestsellersPage;