import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import ContactPage from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import NewArrivals from './Shop/NewArrivals';
import BestsellersPage from './Shop/BestSale';
import SalePage from './Shop/Salle';
import Collections from './Shop/Collections';

import DressesPage from './Categories/Dresses';
import MensOutwearPage from './Categories/Outwear';
import AccessoriesPage from './Categories/Accerious';
import SummerCollection from './Categories/Summercollection';

import Payment from './pages/Payment';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Routes WITHOUT Layout (no Navbar/Footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          

          {/* Routes WITH Layout (includes Navbar/Footer) */}
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutUs />} />
                    <Route path="/new-arrivals" element={<NewArrivals />} />
                    <Route path="/bestsellers" element={<BestsellersPage />} />
                    <Route path="/shop/sale" element={<SalePage />} />
                    <Route path="/shop/collections" element={<Collections />} />
                    <Route path="/shop/dresses" element={<DressesPage />} />
                    <Route path="/shop/outerwear" element={<MensOutwearPage />} />
                    <Route path="/shop/accessories" element={<AccessoriesPage />} />
                    <Route path="/shop/summer-collection" element={<SummerCollection />} />
                    <Route path="/payment" element={<Payment />} />
                 

                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
