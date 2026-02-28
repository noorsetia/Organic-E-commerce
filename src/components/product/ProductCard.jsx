import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import toast from 'react-hot-toast';
import { useUIStore } from '../../store/useUIStore';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, viewMode }) => {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;
  
  // Bring in the add function from our global store
  const addToCart = useCartStore((state) => state.addToCart);
  const openQuickView = useUIStore((state) => state.openQuickView); 

  // Function to handle adding to cart and showing the beautiful popup
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      icon: '🌿',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className={`group bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex ${viewMode === 'list' ? 'flex-row items-center p-4 gap-6' : 'flex-col p-4'}`}>
        
        {/* Badges */}
        {product.badge && (
          <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold rounded-full ${
            product.badge === 'Out of Stock' ? 'bg-red-100 text-red-600' : 
            product.badge === 'New' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-700'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Image Container with Hover Actions */}
        <div className={`relative overflow-hidden rounded-xl ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'w-full h-56 mb-4'}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Quick Actions overlay (Appears on hover) */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button className="bg-white p-2 rounded-full text-gray-700 hover:text-brandGreen hover:scale-110 transition shadow-md">
              <Heart size={20} />
            </button>
            <button 
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                openQuickView(product); 
              }} 
              className="bg-white p-2 rounded-full text-gray-700 hover:text-brandGreen hover:scale-110 transition shadow-md" 
              title="Quick View"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-yellow-400 text-sm">★★★★★</span>
              <span className="text-gray-400 text-xs">({product.reviews})</span>
            </div>
            
            <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
            
            {viewMode === 'list' && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
            )}

            {/* Pricing */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xl font-bold text-brandGreen">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
          </div>

          {/* Scarcity Bar & Button Container */}
          <div className={`mt-4 ${viewMode === 'list' ? 'w-48' : 'w-full'}`}>
            {/* Low Stock Indicator */}
            {isLowStock && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-orange-600 font-medium mb-1">
                  <span>Almost gone!</span>
                  <span>{product.stock} left</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(product.stock / 20) * 100}%` }}></div>
                </div>
              </div>
            )}

            <button 
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                isOutOfStock 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-brandGreen text-white hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <ShoppingCart size={18} />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </Link>
    );
  };

  export default ProductCard;