
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import FeaturedItems from '@/components/home/FeaturedItems';
import HowItWorks from '@/components/home/HowItWorks';
import Footer from '@/components/layout/Footer';

const Index = () => {
  // component logic

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
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
