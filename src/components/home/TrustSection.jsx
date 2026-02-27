import { useState } from 'react';
import { Sprout, ShieldCheck, Truck, CheckCircle, Star } from 'lucide-react';

const features =[
  {
    icon: <Sprout size={32} />,
    title: "100% Organic",
    desc: "Certified organic products, free from synthetic chemicals and pesticides."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Sustainably Sourced",
    desc: "We partner with local farms committed to regenerative agriculture."
  },
  {
    icon: <Truck size={32} />,
    title: "Farm to Door",
    desc: "Fresh produce delivered within 24 hours of harvest, right to your doorstep."
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Quality Guaranteed",
    desc: "Every product passes our rigorous quality and freshness standards."
  }
];

const testimonials =[
  {
    name: "Sarah Mitchell",
    role: "Health Coach",
    text: `"GreenRoots has completely changed how I shop for produce. The quality is outstanding and I love knowing exactly where my food comes from."`
  },
  {
    name: "David Chen",
    role: "Home Chef",
    text: `"The freshness is unmatched. I've tried many organic delivery services, but GreenRoots consistently delivers the best quality produce."`
  },
  {
    name: "Emily Rodriguez",
    role: "Nutritionist",
    text: `"I recommend GreenRoots to all my clients. Their commitment to sustainable, pesticide-free farming really shows in the taste."`
  }
];

const TrustSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // If a feature is hovered, the whole section goes into "Dark Mode"
  const isDark = hoveredFeature !== null;

  return (
    <section className={`py-24 transition-colors duration-700 ease-in-out ${isDark ? 'bg-[#0f2814]' : 'bg-lightGreen/30'}`}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Core Values Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 transition-colors duration-700">
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Why Choose GreenRoots?
          </h2>
          <p className={`transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            We believe that healthy eating starts with knowing where your food comes from.
          </p>
        </div>

        {/* Cinematic Interactive Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`p-8 rounded-2xl transition-all duration-500 cursor-pointer text-center flex flex-col items-center ${
                hoveredFeature === index 
                  ? 'bg-white shadow-[0_20px_50px_rgba(34,197,94,0.2)] border-transparent scale-105 z-10 translate-y-[-10px]' 
                  : isDark 
                    ? 'bg-white/5 border border-white/10 opacity-60 backdrop-blur-sm scale-95' 
                    : 'bg-white shadow-sm border border-green-50 hover:shadow-md'
              }`}
            >
              {/* Icon Container */}
              <div className={`p-4 rounded-full mb-6 transition-all duration-500 ${
                hoveredFeature === index 
                  ? 'bg-green-100 text-brandGreen scale-110 shadow-inner' 
                  : isDark 
                    ? 'bg-white/10 text-green-300' 
                    : 'bg-lightGreen text-brandGreen'
              }`}>
                {feature.icon}
              </div>
              
              {/* Text Content */}
              <h3 className={`font-bold text-lg mb-2 transition-colors duration-500 ${
                hoveredFeature === index ? 'text-gray-900' : isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                hoveredFeature === index ? 'text-gray-600' : isDark ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            What Our Customers Say
          </h2>
          <p className={`transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of happy customers who've made the switch to organic.
          </p>
        </div>

        {/* Interactive Inverting Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:bg-brandGreen hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div>
                <div className="flex gap-1 mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 italic mb-6 text-sm leading-relaxed group-hover:text-green-50 transition-colors duration-500">
                  {testimonial.text}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brandGreen text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-white group-hover:text-brandGreen transition-colors duration-500">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-white transition-colors duration-500">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500 group-hover:text-green-200 transition-colors duration-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustSection;