import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      users: [],         // Our "database" of registered users
      currentUser: null, // The currently logged-in user

      // ACTION: Sign Up a new user
      signup: (name, email, password) => {
        const { users } = get();
        
        // Check if email already exists
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
          throw new Error("An account with this email already exists.");
        }
        
        const newUser = { name, email, password };
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser, // Automatically log them in
        }));
      },

      // ACTION: Log In a user
      login: (email, password) => {
        const { users } = get();
        const user = users.find(user => user.email === email);
        
        if (!user) {
          throw new Error("No account found with this email.");
        }
        
        if (user.password !== password) {
          throw new Error("Incorrect password. Please try again.");
        }
        
        set({ currentUser: user });
      },

      // ACTION: Log Out the current user
      logout: () => {
        set({ currentUser: null });
      },

      // ACTION: Simulate sending a password reset link
      sendPasswordReset: (email) => {
        const { users } = get();
        const userExists = users.some(user => user.email === email);
        
        // For security, we don't tell the user if the email exists or not.
        // We just pretend it always works. A real backend would handle this.
        if (userExists) {
          console.log(`Password reset link sent to (simulation): ${email}`);
        }
        // No error is thrown intentionally.
      },
    }),
    {
      name: 'auth-storage', // The key in localStorage
    }
  )
);