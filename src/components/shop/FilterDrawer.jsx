import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';

// Pass all filter states and setters as props
const FilterDrawer = ({ categories, activeCategory, setActiveCategory, price, setPrice, resetFilters }) => {
  const { isFilterOpen, toggleFilter } = useUIStore();

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleFilter}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-full max-w-xs bg-white z-50 shadow-2xl flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                <SlidersHorizontal className="text-brandGreen" /> Filters
              </h2>
              <button onClick={toggleFilter} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <CategoryFilter 
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
              <PriceFilter 
                price={price}
                setPrice={setPrice}
              />
            </div>
            <div className="p-6 border-t flex gap-4">
              <button 
                onClick={resetFilters} 
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold"
              >
                Reset All
              </button>
              <button 
                onClick={toggleFilter} 
                className="flex-1 py-3 bg-brandGreen text-white rounded-lg text-sm font-bold"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterDrawer;