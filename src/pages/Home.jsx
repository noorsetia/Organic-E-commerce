import Hero from '../components/home/Hero';
import ProductSection from '../components/product/ProductSection';
import TrustSection from '../components/home/TrustSection';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <main>
      <Hero />
      <ProductSection />
      <TrustSection />
      <Newsletter />
    </main>
  );
};

export default Home;