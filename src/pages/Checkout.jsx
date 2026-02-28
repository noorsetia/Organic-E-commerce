import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Lock, User, Mail, Home, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCartStore();

  // If cart is empty, redirect to shop page
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/shop');
    }
  }, [cart, navigate]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    // Simulate API call and show loading toast
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Here you would typically make an API call to your backend
        // For now, we'll just simulate a success
        resolve("Order placed successfully!");
      }, 2000);
    });

    toast.promise(promise, {
      loading: 'Processing your order...',
      success: (message) => {
        clearCart(); // Clear cart on success
        navigate('/'); // Redirect to home page
        return message;
      },
      error: 'Something went wrong!',
    });
  };

  const shippingCost = 5.00;
  const total = cartTotal() + shippingCost;

  return (
    <main className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Checkout Form */}
          <form onSubmit={handleCheckout} className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><User size={22} className="text-brandGreen" /> Contact Information</h2>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="Email Address" required className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Home size={22} className="text-brandGreen" /> Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" required className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
                <input type="text" placeholder="Last Name" required className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
                <input type="text" placeholder="Address" required className="md:col-span-2 w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
                <input type="text" placeholder="City" required className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
                <input type="text" placeholder="State / Province" required className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
                <input type="text" placeholder="ZIP / Postal Code" required className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CreditCard size={22} className="text-brandGreen" /> Payment Details</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Card Number" required className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
                <input type="text" placeholder="Name on Card" required className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
                <div className="flex gap-4">
                  <input type="text" placeholder="MM / YY" required className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
                  <input type="text" placeholder="CVC" required className="w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen/50" />
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full mt-10 bg-brandGreen text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-green-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <Lock size={18} /> Pay ${total.toFixed(2)}
            </button>
          </form>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1 h-fit lg:sticky lg:top-24">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-gray-100" />
                      <div>
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-semibold">${cartTotal().toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-semibold">${shippingCost.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3 mt-3">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Checkout;