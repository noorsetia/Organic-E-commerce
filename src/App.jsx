import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import ProductSection from './components/product/ProductSection';
import TrustSection from './components/home/TrustSection';
import Newsletter from './components/home/Newsletter'; // <-- NEW
import Footer from './components/layout/Footer'; // <-- NEW
import CartDrawer from './components/layout/CartDrawer';
import SearchOverlay from './components/layout/SearchOverlay';
import AuthModal from './components/layout/AuthModal';

function App() {
  return (
    <div className="min-h-screen relative font-sans text-gray-800 bg-gray-50">
      <Toaster position="bottom-right" /> 
      <CartDrawer /> 
      <SearchOverlay />
      <AuthModal />
      <Navbar />
      
      {/* Main Content */}
      <main>
        <Hero />
        <ProductSection />
        <TrustSection />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

export default App;