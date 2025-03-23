
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Camera, Monitor, Wrench, Mountain, Music, Car, Pizza, 
  Briefcase, Smartphone, PaintBucket, Tent, Package, Plus 
} from 'lucide-react';

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
};

const categories: Category[] = [
  { 
    id: 'electronics',
    name: 'Electronics', 
    icon: <Monitor />, 
    count: 349, 
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    id: 'cameras',
    name: 'Cameras & Video', 
    icon: <Camera />, 
    count: 218, 
    color: 'from-purple-500 to-pink-500'
  },
  { 
    id: 'tools',
    name: 'Tools & Equipment', 
    icon: <Wrench />, 
    count: 512, 
    color: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'outdoor',
    name: 'Outdoor Gear', 
    icon: <Mountain />, 
    count: 327, 
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'music',
    name: 'Musical Instruments', 
    icon: <Music />, 
    count: 156, 
    color: 'from-red-500 to-rose-500'
  },
  { 
    id: 'vehicles',
    name: 'Vehicles', 
    icon: <Car />, 
    count: 203, 
    color: 'from-cyan-500 to-sky-500'
  },
  { 
    id: 'party',
    name: 'Party Supplies', 
    icon: <Pizza />, 
    count: 187, 
    color: 'from-fuchsia-500 to-purple-500'
  },
  { 
    id: 'business',
    name: 'Business Equipment', 
    icon: <Briefcase />, 
    count: 143, 
    color: 'from-gray-500 to-slate-500'
  },
  { 
    id: 'phones',
    name: 'Phones & Tablets', 
    icon: <Smartphone />, 
    count: 279, 
    color: 'from-blue-500 to-sky-500'
  },
  { 
    id: 'art',
    name: 'Art & Crafts', 
    icon: <PaintBucket />, 
    count: 168, 
    color: 'from-yellow-500 to-amber-500'
  },
  { 
    id: 'camping',
    name: 'Camping Gear', 
    icon: <Tent />, 
    count: 231, 
    color: 'from-lime-500 to-green-500'
  },
  { 
    id: 'other',
    name: 'Other Categories', 
    icon: <Package />, 
    count: 453, 
    color: 'from-blue-500 to-indigo-500'
  }
];

const CategorySection = () => {
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4 animate-fade-up">
            Browse by Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Explore items by category to find exactly what you need. From electronics to outdoor gear, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/browse?category=${category.id}`}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 group animate-fade-up overflow-hidden relative",
                "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-subtle",
                hoveredCategoryId === category.id 
                  ? "shadow-elevated transform translate-y-[-4px]" 
                  : ""
              )}
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              onMouseEnter={() => setHoveredCategoryId(category.id)}
              onMouseLeave={() => setHoveredCategoryId(null)}
            >
              <div className="relative z-10">
                <div 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 transition-transform duration-500 mx-auto",
                    `bg-gradient-to-br ${category.color}`,
                    hoveredCategoryId === category.id ? "scale-110" : "scale-100"
                  )}
                >
                  {category.icon}
                </div>
                
                <h3 className="text-gray-900 dark:text-gray-100 font-medium text-center mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  {category.count} items
                </p>
              </div>
              
              {/* Background gradient effect on hover */}
              <div 
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 -z-10",
                  `${category.color}`,
                  hoveredCategoryId === category.id ? "opacity-5 dark:opacity-10" : "opacity-0"
                )}
              />
            </Link>
          ))}
          
          <Link
            to="/categories"
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 border border-dashed border-gray-300 dark:border-gray-700 group animate-fade-up",
              "hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
            )}
            style={{ animationDelay: '0.7s' }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              <Plus className="h-5 w-5" />
            </div>
            
            <h3 className="text-gray-900 dark:text-gray-100 font-medium text-center mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              View All Categories
            </h3>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
              Explore more options
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
