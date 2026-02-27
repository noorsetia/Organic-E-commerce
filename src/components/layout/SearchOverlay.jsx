import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useCartStore } from '../../store/useCartStore';
import { products } from '../../utils/mockData';
import toast from 'react-hot-toast';

const SearchOverlay = () => {
  const { isSearchOpen, closeSearch } = useUIStore();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const[query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Auto-focus input when opened & Close on "Escape" key
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeSearch();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      setQuery(''); // Clear search when closed
    }
  },[isSearchOpen, closeSearch]);

  // Real-time Filtering
  const filteredProducts = query === '' 
    ?[] 
    : products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleQuickAdd = (product) => {
    addToCart(product);
    toast.success(`${product.name} added!`, { icon: '🌿' });
    closeSearch(); // Optionally close search after adding
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[80] bg-white/95 backdrop-blur-xl overflow-y-auto"
        >
          {/* Close Button */}
          <button 
            onClick={closeSearch}
            className="absolute top-8 right-8 p-2 text-gray-400 hover:text-brandGreen hover:bg-green-50 rounded-full transition-all duration-300 z-50"
          >
            <X size={32} />
          </button>

          <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
            
            {/* Massive Search Input */}
            <div className="relative mb-16">
              <SearchIcon size={40} className="absolute left-0 bottom-6 text-gray-300" />
              <input
                ref={inputRef}
                type="text"
                placeholder="What are you craving?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-4xl md:text-6xl font-serif font-bold text-gray-900 bg-transparent border-b-2 border-gray-200 focus:border-brandGreen focus:outline-none pl-16 pb-4 placeholder-gray-300 transition-colors duration-300"
              />
            </div>

            {/* Search Results Area */}
            <div>
              {query && (
                <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                  <h3 className="text-gray-500 text-lg">
                    {filteredProducts.length} results for "<span className="text-gray-900 font-bold">{query}</span>"
                  </h3>
                  {filteredProducts.length > 0 && (
                    <button className="text-brandGreen font-medium hover:underline flex items-center gap-1">
                      View All <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              )}

              {/* Real-time Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map(product => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={product.id} 
                    className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:border-green-100 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-brandGreen transition-colors">{product.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-brandGreen">${product.price.toFixed(2)}</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleQuickAdd(product); }}
                          disabled={product.stock === 0}
                          className="text-xs bg-gray-100 hover:bg-brandGreen hover:text-white px-3 py-1.5 rounded-full font-medium transition-colors disabled:opacity-50"
                        >
                          {product.stock === 0 ? 'Out of Stock' : '+ Quick Add'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* No Results State */}
              {query !== '' && filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <span className="text-6xl mb-4 block">🥑</span>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No matches found</h3>
                  <p className="text-gray-500">Try searching for "Avocados", "Honey", or "Milk".</p>
                </div>
              )}

              {/* Quick Links (Shown when typing nothing) */}
              {query === '' && (
                <div>
                  <h3 className="text-gray-400 font-medium mb-4 uppercase tracking-wider text-sm">Popular Searches</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Organic Kale', 'Raw Honey', 'Avocados', 'Almond Milk', 'Fresh Fruits'].map(term => (
                      <button 
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-6 py-3 rounded-full bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-brandGreen transition-colors border border-gray-100 hover:border-green-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;