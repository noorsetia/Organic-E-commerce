import { ChevronDown, ChevronUp } from 'lucide-react';
import { products } from '../../utils/mockData';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex justify-between items-center cursor-pointer">
        <h3 className="font-bold text-gray-800">Categories</h3>
        <ChevronUp size={18} />
      </div>
      <ul className="space-y-3 mt-4">
        {categories.map(cat => (
          <li key={cat}>
            <button
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-left flex justify-between items-center transition text-sm ${
                activeCategory === cat 
                  ? 'text-brandGreen font-bold' 
                  : 'text-gray-600 hover:text-brandGreen'
              }`}
            >
              {cat}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === cat 
                  ? 'bg-brandGreen text-white' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {cat === "All" ? products.length : products.filter(p => p.category === cat).length}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;