import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout Components (Always visible)
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import SearchOverlay from './components/layout/SearchOverlay';
import AuthModal from './components/layout/AuthModal';
import QuickViewModal from './components/product/QuickViewModal';

// Pages (Change based on URL)
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative font-sans text-gray-800 bg-gray-50 flex flex-col">
        {/* Global Overlays & Utilities */}
        <Toaster position="bottom-right" /> 
        <CartDrawer /> 
        <SearchOverlay />
        <AuthModal />
        <QuickViewModal />

        {/* Persistent Header */}
        <Navbar />
        
        {/* Dynamic Page Content Area */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} /> 
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>

        {/* Persistent Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;