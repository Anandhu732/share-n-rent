
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, SlidersHorizontal, MapPin } from 'lucide-react';
import { useState } from 'react';
import ItemCard, { ItemProps } from '@/components/ui/ItemCard';

// Mock data for items
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
  {
    id: '7',
    title: 'Professional Lawn Mower',
    price: 40,
    category: 'Tools',
    location: 'Chicago, IL',
    rating: 4.5,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1590599145008-e4ec48682067?q=80&w=1000&auto=format&fit=crop',
    owner: {
      name: 'Tom Harris',
    }
  },
  {
    id: '8',
    title: 'Kayak for 2 Persons',
    price: 45,
    category: 'Outdoor',
    location: 'San Diego, CA',
    rating: 4.8,
    reviewCount: 26,
    image: 'https://images.unsplash.com/photo-1604715892844-fb050e669a1c?q=80&w=1000&auto=format&fit=crop',
    owner: {
      name: 'Emma Wilson',
    },
    featured: true
  },
];

const Browse = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
              Browse Available Items
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Find and rent items from people in your community
            </p>
          </div>
          
          {/* Search & Filter Section */}
          <div className="mb-8 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for items..."
                className="pl-10 pr-16 h-12 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                className="absolute right-1 top-1 h-10 rounded-lg"
                variant="ghost"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="h-12 rounded-xl flex items-center gap-2"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-5 w-5" />
                Filters
              </Button>
              <Button 
                variant="outline" 
                className="h-12 rounded-xl flex items-center gap-2"
              >
                <MapPin className="h-5 w-5" />
                Location
              </Button>
              <Button 
                variant="outline" 
                className="h-12 rounded-xl flex items-center gap-2"
              >
                <SlidersHorizontal className="h-5 w-5" />
                Sort
              </Button>
            </div>
          </div>
          
          {/* Filter Panel (Collapsible) */}
          {filterOpen && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider 
                      defaultValue={[priceRange[0], priceRange[1]]} 
                      max={100}
                      step={1}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {['Electronics', 'Tools', 'Outdoor', 'Cameras', 'Music'].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={`category-${category}`} />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Availability</h3>
                  <div className="space-y-2">
                    {['Available Now', 'Weekend Only', 'Weekday Only', 'Long-term Rental'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox id={`availability-${option}`} />
                        <label
                          htmlFor={`availability-${option}`}
                          className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 gap-2">
                <Button variant="outline">Clear All</Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          )}
          
          {/* Results Count & Categories */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              Showing <span className="font-medium">{mockItems.length}</span> items
            </p>
            
            <div className="flex flex-wrap gap-2">
              {['All', 'Electronics', 'Tools', 'Outdoor', 'Cameras', 'Music'].map((category, index) => (
                <Badge 
                  key={category}
                  variant={index === 0 ? 'default' : 'outline'} 
                  className={index === 0 ? 'bg-blue-600 hover:bg-blue-700' : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockItems.map((item) => (
              <div key={item.id}>
                <ItemCard {...item} />
              </div>
            ))}
          </div>
          
          {/* Load More */}
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-xl px-8"
            >
              Load More
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Browse;
