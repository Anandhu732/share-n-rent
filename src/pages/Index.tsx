
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedItems from '@/components/home/FeaturedItems';
import CategorySection from '@/components/home/CategorySection';
import HowItWorks from '@/components/home/HowItWorks';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedItems />
        <CategorySection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
