import { Leaf, Instagram, Twitter, Facebook, MapPin, Phone, Mail as MailIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a3622] text-green-50 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
              <Leaf className="text-green-400" size={28} />
              <span className="text-2xl font-serif font-bold tracking-wide text-white">
                GreenRoots
              </span>
            </div>
            <p className="text-green-200/80 mb-6 leading-relaxed">
              Farm-to-table organic products, sustainably sourced for a healthier you and a healthier planet.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition duration-300">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-green-200/80 hover:text-white hover:translate-x-1 inline-block transition transform">Home</a></li>
              <li><a href="#" className="text-green-200/80 hover:text-white hover:translate-x-1 inline-block transition transform">Shop</a></li>
              <li><a href="#" className="text-green-200/80 hover:text-white hover:translate-x-1 inline-block transition transform">About Us</a></li>
              <li><a href="#" className="text-green-200/80 hover:text-white hover:translate-x-1 inline-block transition transform">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Categories</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-green-200/80 hover:text-white hover:translate-x-1 inline-block transition transform">Fresh Fruits</a></li>
              <li><a href="#" className="text-green-200/80 hover:text-white hover:translate-x-1 inline-block transition transform">Vegetables</a></li>
              <li><a href="#" className="text-green-200/80 hover:text-white hover:translate-x-1 inline-block transition transform">Dairy & Eggs</a></li>
              <li><a href="#" className="text-green-200/80 hover:text-white hover:translate-x-1 inline-block transition transform">Pantry Essentials</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-green-400 flex-shrink-0 mt-1" />
                <span className="text-green-200/80">123 Organic Lane, Portland, OR 97201</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-green-400 flex-shrink-0" />
                <span className="text-green-200/80">(503) 555-0142</span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon size={20} className="text-green-400 flex-shrink-0" />
                <span className="text-green-200/80">hello@greenroots.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-green-200/60 text-sm">
            © {new Date().getFullYear()} GreenRoots. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-green-200/60">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;