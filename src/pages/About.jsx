import { useEffect } from 'react';
import { Leaf, Heart, Globe, Users } from 'lucide-react';

const About = () => {
  // Premium UX: Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <main className="pt-24 pb-20">
      {/* About Hero Banner */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden mb-20">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <Leaf size={48} className="text-brandGreen mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">Our Roots</h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto font-light">
            Cultivating health, sustaining the earth, and bringing the farm directly to your table.
          </p>
        </div>
      </section>

      {/* Our Story Split Section */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-sm font-bold text-brandGreen uppercase tracking-widest mb-2">The Beginning</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Born from a simple belief.</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              GreenRoots started in 2018 when our founders realized how disconnected modern grocery stores had become from the actual source of our food. Produce was traveling thousands of miles, losing nutrients, and being sprayed with chemicals just to survive the trip.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We decided to build a bridge directly between sustainable, local farmers and families who care about what they eat. Today, we partner with over 50 regenerative organic farms to deliver food the way nature intended: fresh, wild, and incredibly flavorful.
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-brandGreen rounded-3xl translate-x-4 translate-y-4 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1595856728551-7360098df24b?q=80&w=1000&auto=format&fit=crop" 
              alt="Farmers harvesting" 
              className="relative z-10 rounded-3xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Mission Grid */}
      <section className="bg-lightGreen/30 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">What Drives Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-50 text-brandGreen rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Community First</h4>
              <p className="text-gray-600 text-sm leading-relaxed">By cutting out the middlemen, we ensure our farmers get paid fair wages, and you get the freshest food at honest prices.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-50 text-brandGreen rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Regenerative Agriculture</h4>
              <p className="text-gray-600 text-sm leading-relaxed">We only partner with farms that actively rebuild soil health and pull carbon out of the atmosphere.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-50 text-brandGreen rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Complete Transparency</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Every item in our store is fully traceable. You will always know exactly who grew your food and where.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;