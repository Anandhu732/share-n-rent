
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ItemCard, { ItemProps } from '@/components/ui/ItemCard';
import { cn } from '@/lib/utils';

// Mock data for featured items
const mockItems: ItemProps[] = [
  {
    id: '1',
    title: 'DSLR Camera Canon EOS 5D Mark IV',
    price: 35,
    category: 'Cameras',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    owner: {
      name: 'Michael Scott',
    },
    featured: true
  },
  {
    id: '2',
    title: 'Electric Drill with 20+ Accessories',
    price: 15,
    category: 'Tools',
    location: 'Austin, TX',
    rating: 4.7,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1000&auto=format&fit=crop',
    owner: {
      name: 'Sarah Johnson',
    }
  },
  {
    id: '3',
    title: 'Mountain Bike - Trek X-Caliber 8',
    price: 25,
    category: 'Outdoor',
    location: 'Denver, CO',
    rating: 4.8,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1000&auto=format&fit=crop',
    owner: {
      name: 'David Chen',
    },
    isNew: true
  },
  {
    id: '4',
    title: 'Sony PlayStation 5 with Two Controllers',
    price: 20,
    category: 'Electronics',
    location: 'Seattle, WA',
    rating: 5.0,
    reviewCount: 35,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000&auto=format&fit=crop',
    owner: {
      name: 'Lisa Wong',
    }
  },
  {
    id: '5',
    title: 'Premium Tent for 4 Persons - Weatherproof',
    price: 30,
    category: 'Camping',
    location: 'Portland, OR',
    rating: 4.6,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000&auto=format&fit=crop',
    owner: {
      name: 'Robert Wilson',
    }
  },
  {
    id: '6',
    title: 'DJ Equipment Set with Speakers',
    price: 80,
    category: 'Music',
    location: 'Miami, FL',
    rating: 4.9,
    reviewCount: 14,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
    owner: {
      name: 'Katie Martinez',
    }
  },
];

const FeaturedItems = () => {
  const [visibleItems, setVisibleItems] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchItems = () => {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleItems(mockItems);
        setIsLoading(false);
      }, 800);
    };
    
    fetchItems();
  }, []);
  
  return (
    <section className="py-16 md:py-24 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4 animate-fade-up">
              Featured Items Near You
            </h2>
            <p className="text-gray-600 dark:text-gray-400 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Discover high-quality items available for rent in your area. From tech gadgets to outdoor gear, find exactly what you need.
            </p>
          </div>
          
          <Link 
            to="/browse"
            className={cn(
              "inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mt-4 md:mt-0 group transition-colors animate-fade-up",
            )}
            style={{ animationDelay: '0.2s' }}
          >
            View All Items
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl bg-white dark:bg-gray-800 overflow-hidden shadow-subtle animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/3"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {visibleItems.map((item, index) => (
              <div 
                key={item.id} 
                className="animate-fade-up" 
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <ItemCard {...item} />
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-colors"
            onClick={() => window.location.href = '/browse'}
          >
            Browse All Items
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
