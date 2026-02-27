import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart:[],
  isCartOpen: false,

  // Open/Close the sidebar cart
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  // Add item to cart
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // If it exists, just increase the quantity
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          isCartOpen: true, // Auto-open cart when adding
        };
      }
      // If it's new, add to array with quantity 1
      return { 
        cart: [...state.cart, { ...product, quantity: 1 }],
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
  }
}));