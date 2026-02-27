import { Leaf, ShoppingCart } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center text-center">
      {/* Background Image (Using a high-quality organic vegetable image) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop')",
        }}
      >
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 max-w-4xl flex flex-col items-center">
        
        {/* Small Badge */}
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
          <Leaf size={16} className="text-green-400" />
          <span>100% Certified Organic</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
          Nature's Best, <br /> Delivered Fresh
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light">
          Farm-to-table organic produce, sustainably sourced and delivered straight to your door. Nourish your body naturally.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-brandGreen hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition duration-300 flex items-center justify-center gap-2">
            <ShoppingCart size={18} />
            Shop Now
          </button>
          <button className="border border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-full font-medium transition duration-300">
            Learn More
          </button>
        </div>

      </div>
    </div>
  );
};

export default Hero;