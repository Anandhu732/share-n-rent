
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, CreditCard, User, Star, Heart, Share2, 
  MessageCircle, AlertTriangle, ChevronLeft, ChevronRight, Check, 
  Shield, ArrowLeft, BarChart, Calendar as CalendarIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { itemsAPI } from '@/lib/api';

interface ItemProps {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  priceUnit: string;
  images: string[];
  category: string;
  location: string;
  owner: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    responseRate: number;
    responseTime: string;
    memberSince: string;
  };
  availability: {
    startDate: string;
    endDate: string;
    unavailableDates?: string[];
  };
  specs: { [key: string]: string };
  features: string[];
  rules: string[];
  rating: number;
  reviewCount: number;
  reviews: {
    id: string;
    user: {
      name: string;
      avatar?: string;
    };
    rating: number;
    comment: string;
    date: string;
  }[];
}

// Mock data for the item
const mockItem: ItemProps = {
  id: '1',
  title: 'Canon EOS 5D Mark IV DSLR Camera with 24-105mm Lens',
  description: 'Professional DSLR camera with 30.4MP full-frame CMOS sensor. Includes 24-105mm f/4L IS II USM Lens, perfect for photography and videography. Excellent condition with all original accessories.',
  price: 55,
  currency: '$',
  priceUnit: 'day',
  images: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588372405219-e40d64efafcb?q=80&w=1000&auto=format&fit=crop',
  ],
  category: 'Cameras',
  location: 'San Francisco, CA',
  owner: {
    id: '101',
    name: 'Michael Scott',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.9,
    responseRate: 98,
    responseTime: 'within an hour',
    memberSince: 'June 2022',
  },
  availability: {
    startDate: '2023-08-01',
    endDate: '2023-12-31',
    unavailableDates: ['2023-08-15', '2023-08-16', '2023-09-01', '2023-09-02'],
  },
  specs: {
    'Brand': 'Canon',
    'Model': 'EOS 5D Mark IV',
    'Sensor': '30.4MP Full-Frame CMOS',
    'Processor': 'DIGIC 6+',
    'Lens': '24-105mm f/4L IS II USM',
    'ISO Range': '100-32000 (expandable to 50-102400)',
    'Autofocus': '61-point High-Density Reticular AF',
    'Video Resolution': '4K at 30fps',
    'Weight': '800g (body only)',
  },
  features: [
    '30.4MP Full-Frame CMOS Sensor',
    '4K Video Recording',
    'GPS, Wi-Fi & NFC Built-in',
    'Dual Pixel CMOS AF',
    'ISO Range: 100-32000',
    'Includes 64GB SD Card',
    'Extra Battery Included',
    'Carrying Case Provided',
  ],
  rules: [
    'Valid ID required for pickup',
    'Deposit: $500 (refundable)',
    'Return with same amount of battery charge',
    'Damage coverage required',
    'No international travel',
    'Clean before returning',
  ],
  rating: 4.9,
  reviewCount: 28,
  reviews: [
    {
      id: '201',
      user: {
        name: 'James Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      },
      rating: 5,
      comment: 'Amazing camera, was perfect for my weekend photoshoot. Michael was very helpful in explaining the features and settings. Highly recommend!',
      date: '2023-07-15',
    },
    {
      id: '202',
      user: {
        name: 'Emily Chen',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      },
      rating: 5,
      comment: 'Camera was in pristine condition and worked flawlessly. The owner was flexible with pickup and very responsive to messages. Would rent again!',
      date: '2023-06-22',
    },
    {
      id: '203',
      user: {
        name: 'David Kim',
      },
      rating: 4,
      comment: 'Great camera, just what I needed for my family reunion. Only giving 4 stars because the extra battery wasn't fully charged, but otherwise excellent.',
      date: '2023-05-30',
    },
  ],
};

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<ItemProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const { toast } = useToast();
  const isLoggedIn = localStorage.getItem('token') !== null;

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch from API
        // const response = await itemsAPI.getItemById(id as string);
        // setItem(response);
        
        // Using mock data for now
        setTimeout(() => {
          setItem(mockItem);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching item:', error);
        toast({
          title: 'Error',
          description: 'Failed to load item details. Please try again.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };
    
    fetchItem();
  }, [id, toast]);
  
  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to save items to your favorites.',
        variant: 'default',
      });
      return;
    }
    
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? 'Removed from favorites' : 'Added to favorites',
      description: isFavorited 
        ? 'This item has been removed from your favorites.' 
        : 'This item has been added to your favorites.',
      variant: 'default',
    });
  };
  
  const handleShareClick = () => {
    // In a real app, we would implement sharing functionality
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link copied',
      description: 'Item link has been copied to your clipboard.',
      variant: 'default',
    });
  };
  
  const handlePrevImage = () => {
    if (!item) return;
    setCurrentImageIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    if (!item) return;
    setCurrentImageIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };
  
  const handleDateSelection = (dates: { startDate: Date | null; endDate: Date | null }) => {
    setSelectedDates(dates);
    
    if (dates.startDate && dates.endDate) {
      const start = new Date(dates.startDate);
      const end = new Date(dates.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end days
      
      setTotalDays(diffDays);
      setTotalPrice(diffDays * (item?.price || 0));
      setShowDatePicker(false);
    }
  };
  
  const handleBookNow = () => {
    if (!isLoggedIn) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to book this item.',
        variant: 'default',
      });
      navigate('/login', { state: { redirectTo: `/items/${id}` } });
      return;
    }
    
    if (!selectedDates.startDate || !selectedDates.endDate) {
      setShowDatePicker(true);
      return;
    }
    
    // In a real app, we would implement booking functionality
    toast({
      title: 'Booking successful',
      description: `You have booked this item from ${selectedDates.startDate.toLocaleDateString()} to ${selectedDates.endDate.toLocaleDateString()}.`,
      variant: 'default',
    });
    
    // Navigate to booking confirmation page
    navigate(`/bookings/confirmation`);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:pt-28 md:pb-24 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-2/3 h-96 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse mb-8 md:mb-0"></div>
            <div className="md:w-1/3 space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-4"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:pt-28 md:pb-24 animate-fade-in">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Item Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The item you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:pt-28 md:pb-24 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/browse"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Left: Images & Details */}
          <div className="lg:w-2/3 space-y-8">
            {/* Image Gallery */}
            <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3]">
              <img 
                src={item.images[currentImageIndex]} 
                alt={item.title} 
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              
              {/* Image navigation */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Image indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {item.images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      index === currentImageIndex
                        ? "bg-white w-4"
                        : "bg-white/50 hover:bg-white/80"
                    )}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
              
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <Badge variant="outline" className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  {item.category}
                </Badge>
              </div>
            </div>
            
            {/* Thumbnail images */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {item.images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative cursor-pointer flex-shrink-0 w-20 h-20 rounded-md overflow-hidden",
                    index === currentImageIndex && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-950"
                  )}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Item Information Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
                <TabsTrigger value="rules" className="flex-1">Rental Rules</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews
                  <span className="ml-1 text-xs">({item.reviewCount})</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6 animate-fade-in">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.description}
                  </p>
                  
                  <h3 className="text-lg font-semibold mt-8 mb-4">Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {item.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6 animate-fade-in">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(item.specs).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-200 dark:border-gray-800 pb-2">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{key}:</span>
                        <div className="font-medium text-gray-900 dark:text-gray-100 mt-1">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rules" className="mt-6 animate-fade-in">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Rental Rules & Requirements</h2>
                  <ul className="space-y-3">
                    {item.rules.map((rule, index) => (
                      <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Damage Protection</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                          We recommend purchasing damage protection for this rental. This covers accidental damage up to $1,000.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6 animate-fade-in">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-4">
                      <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                      <span className="font-semibold text-lg">{item.rating}</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-1">({item.reviewCount} reviews)</span>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-sm"
                      onClick={() => {
                        if (!isLoggedIn) {
                          toast({
                            title: 'Authentication required',
                            description: 'Please log in to leave a review.',
                            variant: 'default',
                          });
                          return;
                        }
                        // In a real app, we would implement review functionality
                        toast({
                          title: 'Feature coming soon',
                          description: 'This feature is still under development.',
                          variant: 'default',
                        });
                      }}
                    >
                      Write a Review
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {item.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0 mr-4">
                            {review.user.avatar ? (
                              <img 
                                src={review.user.avatar} 
                                alt={review.user.name} 
                                className="h-full w-full object-cover" 
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
                                {review.user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                  {review.user.name}
                                </h4>
                                <div className="flex items-center mt-1">
                                  {[...Array(5)].map((_, index) => (
                                    <Star 
                                      key={index}
                                      className={cn(
                                        "h-4 w-4",
                                        index < review.rating 
                                          ? "text-yellow-500 fill-current" 
                                          : "text-gray-300 dark:text-gray-700"
                                      )}
                                    />
                                  ))}
                                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                    {new Date(review.date).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {item.reviewCount > item.reviews.length && (
                      <Button 
                        variant="outline" 
                        className="w-full text-sm"
                      >
                        Load More Reviews
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right: Booking & Owner Info */}
          <div className="lg:w-1/3 mt-8 lg:mt-0 space-y-6">
            {/* Price & Booking Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-subtle overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {item.currency}{item.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/{item.priceUnit}</span>
                    
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium ml-1">{item.rating}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        ({item.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-9 w-9 rounded-full",
                        isFavorited
                          ? "text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
                          : "text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500"
                      )}
                      onClick={handleFavoriteClick}
                    >
                      <Heart className={cn("h-5 w-5", isFavorited ? "fill-current" : "")} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={handleShareClick}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Date selection */}
                <div className="space-y-4">
                  <div 
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                    onClick={() => setShowDatePicker(true)}
                  >
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rental Period
                    </div>
                    
                    <div className="flex items-center text-gray-900 dark:text-gray-100">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      {selectedDates.startDate && selectedDates.endDate ? (
                        <span>
                          {selectedDates.startDate.toLocaleDateString()} - {selectedDates.endDate.toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">
                          Select dates
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Date Picker Dialog */}
                  <Dialog open={showDatePicker} onOpenChange={setShowDatePicker}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Select Rental Period</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        {/* Calendar would go here - simplified for this example */}
                        <div className="flex justify-center items-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <p className="text-gray-600 dark:text-gray-400">
                            Calendar Component Placeholder
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-700 dark:text-gray-300">
                              Start Date
                            </label>
                            <input
                              type="date"
                              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900"
                              onChange={(e) => {
                                const date = e.target.value ? new Date(e.target.value) : null;
                                setSelectedDates(prev => ({ ...prev, startDate: date }));
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-700 dark:text-gray-300">
                              End Date
                            </label>
                            <input
                              type="date"
                              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900"
                              onChange={(e) => {
                                const date = e.target.value ? new Date(e.target.value) : null;
                                setSelectedDates(prev => ({ ...prev, endDate: date }));
                                
                                if (selectedDates.startDate && date) {
                                  const start = new Date(selectedDates.startDate);
                                  const end = new Date(date);
                                  const diffTime = Math.abs(end.getTime() - start.getTime());
                                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                                  
                                  setTotalDays(diffDays);
                                  setTotalPrice(diffDays * item.price);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setShowDatePicker(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            if (selectedDates.startDate && selectedDates.endDate) {
                              setShowDatePicker(false);
                            } else {
                              toast({
                                title: 'Date selection required',
                                description: 'Please select both start and end dates.',
                                variant: 'default',
                              });
                            }
                          }}
                        >
                          Apply
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  {selectedDates.startDate && selectedDates.endDate && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {item.currency}{item.price} × {totalDays} {totalDays === 1 ? 'day' : 'days'}
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {item.currency}{item.price * totalDays}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Service fee
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {item.currency}{Math.round(item.price * totalDays * 0.1)}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>
                          {item.currency}{Math.round(item.price * totalDays * 1.1)}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleBookNow}
                  >
                    {selectedDates.startDate && selectedDates.endDate 
                      ? 'Book Now' 
                      : 'Select Dates'}
                  </Button>
                  
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    You won't be charged yet
                  </div>
                </div>
              </div>
            </div>
            
            {/* Owner Information */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-subtle overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">About the Owner</h3>
                
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
                    {item.owner.avatar ? (
                      <img 
                        src={item.owner.avatar} 
                        alt={item.owner.name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
                        {item.owner.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {item.owner.name}
                    </h4>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-current mr-1" />
                      <span>{item.owner.rating}</span>
                      <span className="mx-1">•</span>
                      <span>Member since {item.owner.memberSince}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        Response time:
                      </span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        Usually responds {item.owner.responseTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <BarChart className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        Response rate:
                      </span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.owner.responseRate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        Location:
                      </span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-gray-200 dark:border-gray-800"
                  onClick={() => {
                    // In a real app, we would implement messaging functionality
                    toast({
                      title: 'Feature coming soon',
                      description: 'Messaging functionality is under development.',
                      variant: 'default',
                    });
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Owner
                </Button>
              </div>
            </div>
            
            {/* Location */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-subtle overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Location</h3>
                
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 mb-3">
                  {/* Map placeholder - would be an actual map in a real app */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Map of {item.location}
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Exact location provided after booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
