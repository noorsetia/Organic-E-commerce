import { useState } from 'react';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import { products, categories } from '../../utils/mockData';

const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const[viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter logic
  const filteredProducts = products.filter(product => 
    activeCategory === "All" || product.category === activeCategory
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
              Shop Our Organic Selection
            </h2>
            <p className="text-gray-500 max-w-xl">
              Handpicked, pesticide-free produce sourced directly from local regenerative farms.
            </p>
          </div>

          {/* View Toggles & Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium">
              <SlidersHorizontal size={16} /> Filters
            </button>
            
            <div className="hidden md:flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-brandGreen text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition ${viewMode === 'list' ? 'bg-brandGreen text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Advanced Sidebar (Filters) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-3 mb-8">
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left flex justify-between items-center transition ${activeCategory === cat ? 'text-brandGreen font-semibold' : 'text-gray-600 hover:text-brandGreen'}`}
                    >
                      {cat}
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
                        {cat === "All" ? products.length : products.filter(p => p.category === cat).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="font-bold text-lg mb-4">Dietary Needs</h3>
              <div className="space-y-3">
                {["Vegan", "Gluten-Free", "Keto", "Dairy-Free"].map(diet => (
                  <label key={diet} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 text-brandGreen rounded border-gray-300 focus:ring-brandGreen cursor-pointer" />
                    <span className="text-gray-600 group-hover:text-gray-900">{diet}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid/List Area */}
          <div className="flex-1">
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "flex flex-col gap-6"
            }>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductSection;