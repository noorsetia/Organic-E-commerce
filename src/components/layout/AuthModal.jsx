import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, ArrowRight, CheckCircle } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const AuthModal = () => {
  const { isAuthOpen, closeAuth } = useUIStore();
  const [authMode, setAuthMode] = useState('login');
  const { signup, login, sendPasswordReset } = useAuthStore();

  const content = {
    login: { title: 'Welcome Back', subtitle: 'Sign in to access your organic store.' },
    signup: { title: 'Join GreenRoots', subtitle: 'Start your healthy journey today.' },
    forgotPassword: { title: 'Reset Password', subtitle: 'Enter your email to get a reset link.' },
    forgotPasswordSuccess: { title: 'Check Your Email', subtitle: 'We\'ve sent a password reset link.' },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    try {
      if (authMode === 'login') {
        await login(email, password);
        toast.success("Welcome back!");
      } else if (authMode === 'signup') {
        await signup(name, email, password);
        toast.success("Account created! Welcome!");
      } else if (authMode === 'forgotPassword') {
        await sendPasswordReset(email);
        setAuthMode('forgotPasswordSuccess');
        return;
      }
      closeAuth();
      setTimeout(() => setAuthMode('login'), 300);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeAuth} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-32 bg-brandGreen ...">
              <img src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=1000&auto=format&fit=crop" alt="Banner" className="w-full h-full object-cover opacity-60 mix-blend-overlay"/>
              <button onClick={closeAuth} className="absolute top-4 right-4 ..."><X size={18} /></button>
              <div className="absolute bottom-4 left-6 text-white">
                <h2 className="text-2xl font-serif font-bold">{content[authMode].title}</h2>
                <p className="text-sm opacity-90">{content[authMode].subtitle}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.form key={authMode} variants={formVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* CORRECT CONDITIONAL RENDERING FOR FORMS */}
                  {authMode === 'signup' && (
                    <div className="relative"><UserIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input name="name" type="text" placeholder="Full Name" required className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen/50"/></div>
                  )}

                  {(authMode === 'login' || authMode === 'signup' || authMode === 'forgotPassword') && (
                    <div className="relative"><Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input name="email" type="email" placeholder="Email Address" required className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen/50"/></div>
                  )}

                  {(authMode === 'login' || authMode === 'signup') && (
                    <div className="relative"><Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input name="password" type="password" placeholder="Password" required className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brandGreen/50"/></div>
                  )}
                  
                  {authMode === 'forgotPasswordSuccess' && (
                    <div className="text-center"><CheckCircle size={48} className="mx-auto text-brandGreen mb-4" /><p>If an account exists, a reset link has been sent.</p></div>
                  )}

                  {/* Buttons */}
                  {authMode === 'login' && <button type="submit" className="w-full bg-brandGreen hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 mt-2">Sign In</button>}                  
                  {authMode === 'signup' && <button type="submit" className="w-full bg-brandGreen hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 mt-2">Create Account</button>}
                  {authMode === 'forgotPassword' && <button type="submit" className="w-full bg-brandGreen hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 mt-2">Send Reset Link</button>}
                  {authMode === 'forgotPasswordSuccess' && <button type="button" onClick={() => setAuthMode('login')} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 mt-2">Back to Login</button>}
                </motion.form>
              </AnimatePresence>

              <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
                {authMode === 'login' && <button type="button" onClick={() => setAuthMode('forgotPassword')} className="text-xs font-medium text-brandGreen hover:underline">Forgot Password?</button>}
                <div>
                  {authMode === 'login' && "Don't have an account? "}
                  {authMode === 'signup' && "Already have an account? "}
                  <button onClick={() => setAuthMode(authMode === 'login' || authMode === 'forgotPassword' ? 'signup' : 'login')} className="font-bold text-brandGreen hover:underline">
                    {authMode === 'login' || authMode === 'forgotPassword' ? 'Sign Up' : 'Log In'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;