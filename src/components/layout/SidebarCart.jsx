// src/components/layout/SidebarCart.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { X } from 'lucide-react';

const SidebarCart = () => {
  const { isCartOpen, toggleCart, cart } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={toggleCart}
          />
          
          {/* Sliding Drawer */}
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-bold">Cart ({cart.length})</h2>
              <button onClick={toggleCart}><X /></button>
            </div>
            {/* Map cart items here */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};