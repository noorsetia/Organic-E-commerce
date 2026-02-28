import { useState, useEffect, useMemo } from 'react';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import CategoryFilter from '../components/shop/CategoryFilter';
import PriceFilter from '../components/shop/PriceFilter';
import { products, categories } from '../utils/mockData';
import { useUIStore } from '../store/useUIStore'; 
import FilterDrawer from '../components/shop/FilterDrawer'; 

const Shop = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  // Filter States
  const[activeCategory, setActiveCategory] = useState("All");
  const[price, setPrice] = useState(20);
  const[viewMode, setViewMode] = useState('grid');
  const toggleFilter = useUIStore((state) => state.toggleFilter);

  // Memoized filtering logic for performance
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => activeCategory === "All" || product.category === activeCategory)
      .filter(product => product.price <= price);
  },[activeCategory, price]);

  const resetFilters = () => {
    setActiveCategory("All");
    setPrice(20);
  };

  return (
    <main>
      <FilterDrawer
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        price={price}
        setPrice={setPrice}
        resetFilters={resetFilters}
      />

      {/* Shop Header/Banner */}
      <section className="bg-green-50 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Explore Our Store</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          From sun-ripened fruits to crisp vegetables and pantry staples, find everything you need for a healthy, organic lifestyle.
        </p>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sticky Sidebar */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0 lg:sticky lg:top-24 h-fit">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
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
          </aside>

          {/* Product Listing Area */}
          <div className="flex-1">
            {/* Header with Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <button 
                onClick={toggleFilter}
                className="lg:hidden flex items-center gap-2 mb-4 w-full justify-center py-3 bg-white border rounded-lg shadow-sm font-bold"
              >
                <SlidersHorizontal size={18} /> 
                Filters
              </button>

              <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> of <span className="font-bold text-gray-900">{products.length}</span> products
              </div>

              {/* Active Filter Tags */}
              <div className="flex flex-wrap gap-2 items-center">
                {activeCategory !== "All" && (
                  <span className="flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {activeCategory}
                    <button onClick={() => setActiveCategory("All")}><X size={12} /></button>
                  </span>
                )}
                {price < 20 && (
                  <span className="flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Max ${price}
                    <button onClick={() => setPrice(20)}><X size={12} /></button>
                  </span>
                )}
                {(activeCategory !== "All" || price < 20) && (
                  <button onClick={resetFilters} className="text-xs text-red-500 hover:underline">
                    Reset All
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-brandGreen text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition ${viewMode === 'list' ? 'bg-brandGreen text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Product Grid / List */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "flex flex-col gap-6"
            }>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;