import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import toast from 'react-hot-toast';

const AuthModal = () => {
  const { isAuthOpen, closeAuth } = useUIStore();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!", {
      icon: '🌱',
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });
    closeAuth();
    
    // Reset to login for next time
    setTimeout(() => setIsLogin(true), 500); 
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Top Banner Image */}
              <div className="relative h-32 bg-brandGreen w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=1000&auto=format&fit=crop" 
                  alt="Organic Banner" 
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <button 
                  onClick={closeAuth}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <h2 className="text-2xl font-serif font-bold">
                    {isLogin ? 'Welcome Back' : 'Join GreenRoots'}
                  </h2>
                  <p className="text-sm opacity-90">
                    {isLogin ? 'Sign in to access your organic store.' : 'Start your healthy journey today.'}
                  </p>
                </div>
              </div>

              {/* Form Area */}
              <div className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name Input (Only for Signup) */}
                  <AnimatePresence mode="popLayout">
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="relative"
                      >
                        <UserIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          required={!isLogin}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen/50 focus:border-brandGreen transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email Input */}
                  <div className="relative">
                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen/50 focus:border-brandGreen transition-all"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen/50 focus:border-brandGreen transition-all"
                    />
                  </div>

                  {/* Forgot Password Link (Only Login) */}
                  {isLogin && (
                    <div className="flex justify-end">
                      <a href="#" className="text-xs font-medium text-brandGreen hover:text-green-800 transition-colors">
                        Forgot Password?
                      </a>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="w-full bg-brandGreen hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 mt-2"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                  </button>
                </form>

                {/* Toggle Mode */}
                <div className="mt-6 text-center text-sm text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-bold text-brandGreen hover:text-green-800 hover:underline transition-all"
                  >
                    {isLogin ? 'Sign Up' : 'Log In'}
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;