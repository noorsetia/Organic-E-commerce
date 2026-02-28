import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, User, Leaf, Menu, X } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore'; // Correctly import Auth store
import toast from 'react-hot-toast'; // Import toast for logout message

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cart, toggleCart } = useCartStore();
  const { toggleSearch, toggleAuth } = useUIStore(); // CORRECT: Destructure once
  const { currentUser, logout } = useAuthStore(); // Get user state and logout action

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);
  
  const handleLogout = () => {
    logout();
    toast.success("You've been logged out.");
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-white shadow-md py-4 text-gray-800' : 'bg-transparent py-6 text-white'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-1 cursor-pointer">
            <Leaf className={isScrolled || isMobileMenuOpen ? 'text-brandGreen' : 'text-green-400'} size={28} />
            <span className="text-2xl font-serif font-bold tracking-wide">GreenRoots</span>
          </Link>

          <div className="hidden md:flex gap-8 font-medium text-sm tracking-wide">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="hover:text-brandGreen transition-colors">{link.name}</Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleSearch} className="hover:text-brandGreen transition-colors"><Search size={20} /></button>
            <button onClick={toggleCart} className="hover:text-brandGreen transition-colors relative">
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brandGreen text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            
            {/* CORRECT DYNAMIC USER SECTION */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm font-medium">Hi, {currentUser.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-bold py-1.5 px-3 rounded-full transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={toggleAuth} className="hidden sm:block hover:text-brandGreen transition-colors"><User size={20} /></button>
            )}
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 -mr-2">
              <AnimatePresence mode="wait">
                <motion.div key={isMobileMenuOpen ? 'close' : 'open'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* CORRECT Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed inset-0 bg-white z-40 pt-24 px-6 flex flex-col">
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.name} to={link.path} className="text-3xl font-serif font-bold text-gray-800 hover:text-brandGreen" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto mb-12 flex justify-center">
              {currentUser ? (
                 <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="bg-red-600 text-white font-bold py-4 px-10 rounded-full text-lg flex items-center gap-2">
                   <User size={20} /> Logout
                 </button>
              ) : (
                <button onClick={() => { toggleAuth(); setIsMobileMenuOpen(false); }} className="bg-brandGreen text-white font-bold py-4 px-10 rounded-full text-lg flex items-center gap-2">
                  <User size={20} /> Sign In / Sign Up
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;