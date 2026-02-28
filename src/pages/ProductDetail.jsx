import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../utils/mockData';
import { Star, Minus, Plus, ShoppingCart, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import toast from 'react-hot-toast';
import ProductCard from '../components/product/ProductCard';

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const product = products.find(p => p.id === parseInt(id));

  // Scroll to top and reset quantity when the ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-40">
        <h1 className="text-3xl font-bold">Product not found!</h1>
        <Link to="/shop" className="text-brandGreen mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity}x ${product.name} added to cart!`, { icon: '🛒' });
  };

  return (
    <main className="bg-gray-50 pt-20 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Product Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto max-h-[500px] object-contain drop-shadow-lg"
            />
          </div>

          {/* Product Details & Actions */}
          <div>
            <div className="mb-4">
              <Link to="/shop" className="text-sm text-gray-500 hover:text-brandGreen">&larr; Back to {product.category}</Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} customer reviews)</span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>
            
            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-bold text-brandGreen">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>

            {product.dietary && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.dietary.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-100 px-3 py-1.5 rounded-full">
                    <ShieldCheck size={14} /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Add to Cart Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4">
              <div className="flex items-center justify-between border rounded-xl p-2 flex-grow-[2]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-gray-500 hover:bg-gray-100 rounded-lg"><Minus /></button>
                <span className="font-bold text-xl w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-gray-500 hover:bg-gray-100 rounded-lg"><Plus /></button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow-[3] bg-brandGreen text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 transition-transform hover:-translate-y-1 shadow-lg"
              >
                <ShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-24">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} viewMode="grid" />)}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetail;