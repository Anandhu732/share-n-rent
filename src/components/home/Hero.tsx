
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  "Electronics", "Vehicles", "Tools", "Outdoor Gear", "Cameras", "Party Supplies", "Musical Instruments"
];

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categories.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* Background gradient & pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 -z-10" />
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20 -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(0, 0, 255, 0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Floating objects */}
      <div 
        className="absolute top-1/4 right-[5%] w-64 h-64 rounded-full bg-blue-400/10 dark:bg-blue-400/5 blur-3xl -z-10"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      <div 
        className="absolute bottom-1/4 left-[5%] w-96 h-96 rounded-full bg-purple-400/10 dark:bg-purple-400/5 blur-3xl -z-10"
        style={{
          transform: `translateY(${-scrollY * 0.05}px)`,
        }}
      />
      
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6 text-blue-700 dark:text-blue-300 text-sm font-medium animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            Launching Beta — Join the Waitlist
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight md:leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Rent Anything.<br />
            <span className="relative">
              Share 
              <span className="relative">
                <span className="inline-block min-w-[180px] text-center transition-all duration-500 ease-in-out">
                  {categories.map((category, index) => (
                    <span
                      key={category}
                      className={cn(
                        "absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out",
                        index === activeCategory 
                          ? "opacity-100 transform-none" 
                          : "opacity-0 translate-y-8"
                      )}
                    >
                      {category}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mb-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            The modern platform for renting and sharing resources. Find what you need, share what you don't use, and save money while reducing waste.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 w-full max-w-lg mb-12 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Button 
              className="h-12 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-subtle flex-1 text-base"
              onClick={() => window.location.href = '/browse'}
            >
              Browse Items
            </Button>
            <Button 
              variant="outline" 
              className="h-12 px-6 rounded-full border-gray-300 dark:border-gray-700 flex-1 text-base hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-colors"
              onClick={() => window.location.href = '/create-listing'}
            >
              List Your Item
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="w-full max-w-3xl mx-auto relative animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <div className="relative flex items-center">
              <div className="glass absolute inset-0 rounded-2xl" aria-hidden="true"></div>
              <div className="relative w-full flex items-center h-16 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl px-6 shadow-subtle">
                <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search for items to rent..." 
                  className="flex-1 bg-transparent border-0 focus:ring-0 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 h-full"
                />
                <Button 
                  className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-subtle flex-shrink-0"
                >
                  Search
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {['Cameras', 'Projectors', 'Party Supplies', 'Tools', 'Sports', 'Vehicles'].map((tag) => (
                <Link 
                  key={tag}
                  to={`/browse?category=${tag}`}
                  className="inline-flex px-3 py-1 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-full border border-gray-200 dark:border-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
              <Link 
                to="/browse"
                className="inline-flex items-center px-3 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 transition-colors"
              >
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
