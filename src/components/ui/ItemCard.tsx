
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface ItemProps {
  id: string;
  title: string;
  price: number;
  currency?: string;
  priceUnit?: string;
  category: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  image: string;
  owner?: {
    name: string;
    image?: string;
  };
  featured?: boolean;
  isNew?: boolean;
}

const ItemCard = ({
  id,
  title,
  price,
  currency = '$',
  priceUnit = 'day',
  category,
  location,
  rating = 0,
  reviewCount = 0,
  image,
  owner,
  featured = false,
  isNew = false,
}: ItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link
      to={`/items/${id}`}
      className={cn(
        "group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all duration-300",
        isHovered ? "shadow-elevated transform translate-y-[-4px]" : "shadow-subtle",
        featured ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-950" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {featured && (
            <Badge className="bg-gradient-to-r from-blue-600 to-blue-400 text-white border-0">
              Featured
            </Badge>
          )}
          {isNew && (
            <Badge variant="outline" className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              New
            </Badge>
          )}
        </div>

        {/* Category chip */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="outline" className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-xs">
            {category}
          </Badge>
        </div>
        
        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 h-8 w-8 rounded-full",
            isFavorited 
              ? "bg-white dark:bg-gray-800 text-red-500" 
              : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500",
          )}
          onClick={handleFavoriteClick}
        >
          <Heart className={cn("h-4 w-4", isFavorited ? "fill-current" : "")} />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <div className="text-xs text-gray-500 dark:text-gray-400">{location}</div>
          
          {rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
              {reviewCount > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">({reviewCount})</span>
              )}
            </div>
          )}
        </div>
        
        <h3 className="font-medium text-gray-900 dark:text-gray-100 leading-snug mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <div className="mt-auto pt-3 flex justify-between items-center">
          <div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {currency}{price}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">/{priceUnit}</span>
          </div>
          
          {owner && (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                {owner.image ? (
                  <img src={owner.image} alt={owner.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                    {owner.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[80px]">
                {owner.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
