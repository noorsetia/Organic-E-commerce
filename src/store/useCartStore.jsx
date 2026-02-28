import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart:[],
  isCartOpen: false,

  // Open/Close the sidebar cart
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  // Add item to cart
 // Change this: addToCart: (product) => {
  addToCart: (product, qty = 1) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            // Use the qty parameter instead of hardcoding + 1
            item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
          ),
          isCartOpen: true, 
        };
      }
      return { 
        // Use the qty parameter here too
        cart:[...state.cart, { ...product, quantity: qty }],
        isCartOpen: true, 
      };
    });
  },

  
  // Increase/Decrease quantity in the cart drawer
  updateQuantity: (id, amount) => {
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + amount); // Prevent going below 1
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    }));
  },

  // Remove item completely
  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  // Calculate Subtotal dynamically
  cartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Clear cart after successful checkout (NEW)
  clearCart: () => {
    set({ cart:[], isCartOpen: false });
  }
}));