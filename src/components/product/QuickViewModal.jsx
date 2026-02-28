import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, Heart, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useCartStore } from '../../store/useCartStore';
import toast from 'react-hot-toast';

const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView } = useUIStore();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [quantity, setQuantity] = useState(1);

  // Reset quantity to 1 every time a new product is opened
  useEffect(() => {
    setQuantity(1);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isOutOfStock = quickViewProduct.stock === 0;
  const isLowStock = quickViewProduct.stock > 0 && quickViewProduct.stock <= 10;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    toast.success(`${quantity}x ${quickViewProduct.name} added!`, {
      icon: '🛒',
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });
    closeQuickView(); // Close modal after adding
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        
        {/* Dark blurred backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto max-h-[90vh]"
        >
          {/* Close Button */}
          <button 
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-900 rounded-full backdrop-blur shadow-sm transition-all"
          >
            <X size={20} />
          </button>

          {/* Left Column: Image */}
          <div className="md:w-1/2 bg-gray-50 relative p-8 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
            {quickViewProduct.badge && (
              <span className={`absolute top-6 left-6 px-3 py-1 text-xs font-bold rounded-full shadow-sm z-10 ${
                quickViewProduct.badge === 'Out of Stock' ? 'bg-red-100 text-red-600' : 
                quickViewProduct.badge === 'New' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-700'
              }`}>
                {quickViewProduct.badge}
              </span>
            )}
            <img 
              src={quickViewProduct.image} 
              alt={quickViewProduct.name} 
              className="w-full h-full object-contain max-h-[400px] drop-shadow-xl"
            />
          </div>

          {/* Right Column: Details */}
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
            
            {/* Reviews */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm text-gray-500">({quickViewProduct.reviews} reviews)</span>
            </div>

            {/* Title & Price */}
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{quickViewProduct.name}</h2>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-brandGreen">${quickViewProduct.price.toFixed(2)}</span>
              {quickViewProduct.oldPrice && (
                <span className="text-lg text-gray-400 line-through mb-1">${quickViewProduct.oldPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Dietary Tags */}
            {quickViewProduct.dietary && (
              <div className="flex flex-wrap gap-2 mb-8">
                {quickViewProduct.dietary.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs font-medium text-green-800 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                    <ShieldCheck size={14} className="text-brandGreen" /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Spacer to push actions to bottom */}
            <div className="flex-grow"></div>

            {/* Scarcity Bar */}
            {isLowStock && (
              <div className="mb-6 bg-orange-50 p-4 rounded-xl border border-orange-100">
                <div className="flex justify-between text-sm text-orange-700 font-bold mb-2">
                  <span>Hurry! Almost gone.</span>
                  <span>{quickViewProduct.stock} left in stock</span>
                </div>
                <div className="w-full bg-orange-200/50 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(quickViewProduct.stock / 20) * 100}%` }}></div>
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-2 sm:w-1/3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white rounded-lg shadow-sm text-gray-600 transition disabled:opacity-50"
                  disabled={isOutOfStock}
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(quickViewProduct.stock || 10, quantity + 1))}
                  className="p-3 hover:bg-white rounded-lg shadow-sm text-gray-600 transition disabled:opacity-50"
                  disabled={isOutOfStock || quantity >= quickViewProduct.stock}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add Button */}
              <button 
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${
                  isOutOfStock 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none' 
                    : 'bg-brandGreen text-white hover:bg-green-700 hover:-translate-y-1 hover:shadow-green-900/20'
                }`}
              >
                <ShoppingCart size={20} />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>

              {/* Wishlist Button */}
              <button className="p-4 bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors shadow-sm flex items-center justify-center">
                <Heart size={24} />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;