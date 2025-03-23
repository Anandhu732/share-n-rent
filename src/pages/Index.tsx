import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import FeaturedItems from '@/components/home/FeaturedItems';
import HowItWorks from '@/components/home/HowItWorks';
import Footer from '@/components/home/Footer';
import DjangoConnectionStatus from '@/components/DjangoConnectionStatus';

const Index = () => {
  // component logic

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <DjangoConnectionStatus className="fixed top-20 right-4 z-50" />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Categories */}
        <CategorySection />
        
        {/* Featured Items */}
        <FeaturedItems />
        
        {/* How It Works */}
        <HowItWorks />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
