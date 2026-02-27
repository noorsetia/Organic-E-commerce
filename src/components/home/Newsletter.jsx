import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const[email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false); // New state to track interactivity

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    toast.success("You're subscribed! Welcome to the GreenRoots family.", {
      icon: '🎉',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

    setEmail('');
    setIsFocused(false); // Remove focus effect after subscribing
  };

  return (
    <section 
      className={`py-24 relative overflow-hidden transition-colors duration-700 ease-in-out ${
        isFocused ? 'bg-[#0a1c0e]' : 'bg-brandGreen'
      }`}
    >
      {/* Interactive Glowing Background Orbs */}
      <div 
        className={`absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 transition-all duration-1000 ease-out ${
          isFocused ? 'translate-x-10 translate-y-10 scale-150 opacity-30' : '-translate-x-1/2 -translate-y-1/2'
        }`}
      ></div>
      <div 
        className={`absolute bottom-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-overlay filter blur-3xl opacity-20 transition-all duration-1000 ease-out ${
          isFocused ? '-translate-x-10 -translate-y-10 scale-125 opacity-30' : 'translate-x-1/3 translate-y-1/3'
        }`}
      ></div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
        
        {/* Dynamic Icon */}
        <div className={`inline-flex items-center justify-center p-4 rounded-full mb-6 transition-all duration-500 ${
          isFocused ? 'bg-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'bg-transparent'
        }`}>
          <Mail size={48} className={`transition-colors duration-500 ${isFocused ? 'text-green-400' : 'text-green-200'}`} />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
          Stay Fresh & Informed
        </h2>
        <p className={`mb-10 text-lg transition-colors duration-500 ${isFocused ? 'text-gray-300' : 'text-green-100'}`}>
          Subscribe to get exclusive deals, seasonal recipes, and organic living tips delivered weekly.
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto relative z-20">
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}   // Trigger interactive state
            onBlur={() => setIsFocused(false)}   // Remove interactive state
            required
            className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none shadow-xl transition-all duration-300 border-4 border-transparent focus:border-green-400/50"
          />
          <button 
            type="submit" 
            className={`px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-xl flex items-center justify-center gap-2 ${
              isFocused 
                ? 'bg-green-500 hover:bg-green-400 text-gray-900 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:-translate-y-1' 
                : 'bg-gray-900 hover:bg-black text-white hover:-translate-y-1'
            }`}
          >
            Subscribe <Send size={18} />
          </button>
        </form>
        
        <p className="text-green-200/50 text-xs mt-6 transition-opacity duration-300">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;