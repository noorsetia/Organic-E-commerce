import { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Leaf } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useUIStore } from '../../store/useUIStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, toggleCart } = useCartStore();
  const { toggleSearch, toggleAuth } = useUIStore();

  // Listen for scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4 text-gray-800' : 'bg-transparent py-6 text-white'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-1 cursor-pointer">
          <Leaf className={isScrolled ? 'text-brandGreen' : 'text-green-400'} size={28} />
          <span className="text-2xl font-serif font-bold tracking-wide">
            GreenRoots
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 font-medium text-sm tracking-wide">
          <a href="#" className="hover:text-brandGreen transition">Home</a>
          <a href="#" className="hover:text-brandGreen transition">Shop</a>
          <a href="#" className="hover:text-brandGreen transition">About</a>
          <a href="#" className="hover:text-brandGreen transition">Testimonials</a>
          <a href="#" className="hover:text-brandGreen transition">Contact</a>
        </div>

        {/* Icons (Search, Cart, User) */}
        <div className="flex gap-5 items-center">
          <button 
            onClick={toggleSearch}
            className="hover:text-brandGreen transition">
                <Search size={20} />
        </button>

          <button 
            onClick={toggleCart} 
            className="hover:text-brandGreen transition relative"
          >
            <ShoppingCart size={20} />
            {/* Dynamic Cart Badge */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brandGreen text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
          <button 
            onClick={toggleAuth} 
            className="hover:text-brandGreen transition"
            >
            <User size={20} />
            </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;