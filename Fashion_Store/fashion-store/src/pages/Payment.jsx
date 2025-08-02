import React, { useState } from 'react';
import { CreditCard, Lock, Calendar, User, ShoppingBag, Check, ArrowLeft } from 'lucide-react';

const Payment = () => {
  const [form, setForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'US'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formatted.length <= 19) {
        setForm(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formatted.length <= 5) {
        setForm(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    // Limit CVV to 4 digits
    if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '');
      if (formatted.length <= 4) {
        setForm(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      console.log('Payment processed:', form);
    }, 3000);
  };

  const orderItems = [
    { name: 'Premium Cotton T-Shirt', price: 49.99, quantity: 2 },
    { name: 'Designer Jeans', price: 129.99, quantity: 1 },
    { name: 'Leather Sneakers', price: 199.99, quantity: 1 }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = 15.00;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button className="flex items-center text-gray-600 hover:text-black transition-colors mr-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
          <div className="flex items-center">
            <ShoppingBag className="w-8 h-8 mr-3" />
            <h1 className="text-3xl font-bold text-black">Secure Checkout</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {/* Payment Method Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-black mb-4">Payment Method</h2>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">Card</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 bg-current rounded"></div>
                    <span className="text-sm font-medium">PayPal</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'apple'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 bg-current rounded"></div>
                    <span className="text-sm font-medium">Apple Pay</span>
                  </button>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Information
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <CreditCard className="w-5 h-5 text-gray-500 group-hover:text-black group-focus-within:text-black transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={form.cardNumber}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all group-hover:border-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar className="w-5 h-5 text-gray-500 group-hover:text-black group-focus-within:text-black transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={form.expiryDate}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all group-hover:border-gray-400"
                        required
                      />
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-500 group-hover:text-black group-focus-within:text-black transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={form.cvv}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all group-hover:border-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="w-5 h-5 text-gray-500 group-hover:text-black group-focus-within:text-black transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="cardholderName"
                      placeholder="Cardholder Name"
                      value={form.cardholderName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all group-hover:border-gray-400"
                      required
                    />
                  </div>

                  {/* Billing Address */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-black mb-4">Billing Address</h3>
                    
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="billingAddress"
                        placeholder="Street Address"
                        value={form.billingAddress}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all hover:border-gray-400"
                        required
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={form.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all hover:border-gray-400"
                          required
                        />
                        <input
                          type="text"
                          name="zipCode"
                          placeholder="ZIP Code"
                          value={form.zipCode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all hover:border-gray-400"
                          required
                        />
                      </div>
                      
                      <select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all hover:border-gray-400"
                        required
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Lock className="w-5 h-5 text-gray-600 mr-3" />
                    <p className="text-sm text-gray-600">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </form>
              )}

              {/* Alternative Payment Methods */}
              {paymentMethod === 'paypal' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">PayPal Payment</h3>
                  <p className="text-gray-600 mb-6">You'll be redirected to PayPal to complete your payment securely.</p>
                  <button 
                    type="button"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue with PayPal
                  </button>
                </div>
              )}

              {paymentMethod === 'apple' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-white rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Apple Pay</h3>
                  <p className="text-gray-600 mb-6">Use Touch ID or Face ID to pay with Apple Pay.</p>
                  <button 
                    type="button"
                    className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Pay with Apple Pay
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <h2 className="text-xl font-semibold text-black mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-black">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Complete Payment Button */}
              {paymentMethod === 'card' && (
                <button
                  type="submit"
                  form="payment-form"
                  disabled={isProcessing}
                  className="w-full mt-6 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Complete Payment
                    </>
                  )}
                </button>
              )}

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-600 mr-1" />
                    SSL Encrypted
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-600 mr-1" />
                    Secure Payment
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Protected by 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;