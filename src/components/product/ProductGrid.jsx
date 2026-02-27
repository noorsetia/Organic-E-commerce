// src/components/product/ProductGrid.jsx
import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { products } from '../../utils/mockData'; // Your array of product objects

const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Featured');

  // Derived state: instantly updates when category or sortOption changes
  const displayedProducts = useMemo(() => {
    // 1. Filter
    let filtered = products;
    if (activeCategory !== 'All') {
      filtered = products.filter(p => p.category === activeCategory);
    }

    // 2. Sort
    return [...filtered].sort((a, b) => {
      if (sortOption === 'Price: Low to High') return a.price - b.price;
      if (sortOption === 'Price: High to Low') return b.price - a.price;
      if (sortOption === 'Name: A to Z') return a.name.localeCompare(b.name);
      return 0; // Featured (default)
    });
  }, [activeCategory, sortOption]);

  return (
    <div className="container mx-auto px-4">
      {/* Categories & Sort Dropdown UI goes here */}
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};