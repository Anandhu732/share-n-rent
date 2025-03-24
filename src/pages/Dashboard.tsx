
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlusCircle, Star, Clock, CreditCard, ChevronRight, Bell, Package, CheckCircle2, 
  AlertCircle, User, Calendar, DollarSign, BarChart3, ShoppingBag, MessageCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Mock data for dashboard
const mockRentals = [
  {
    id: '1',
    itemName: 'DSLR Camera Canon EOS 5D Mark IV',
    owner: 'Michael S.',
    startDate: '2023-10-15',
    endDate: '2023-10-18',
    status: 'Active',
    price: 105,
    itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '2',
    itemName: 'Mountain Bike - Trek X-Caliber 8',
    owner: 'David C.',
    startDate: '2023-10-25',
    endDate: '2023-10-27',
    status: 'Upcoming',
    price: 50,
    itemImage: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '3',
    itemName: 'Premium Tent for 4 Persons',
    owner: 'Robert W.',
    startDate: '2023-09-10',
    endDate: '2023-09-15',
    status: 'Completed',
    price: 150,
    itemImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=500&auto=format&fit=crop'
  }
];

const mockListings = [
  {
    id: '101',
    name: 'Electric Drill with 20+ Accessories',
    price: 15,
    totalRentals: 8,
    revenue: 320,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '102',
    name: 'Sony PlayStation 5 with Two Controllers',
    price: 20,
    totalRentals: 6,
    revenue: 480,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=500&auto=format&fit=crop'
  }
];

const mockRequests = [
  {
    id: '201',
    renterName: 'Emma L.',
    itemName: 'Electric Drill',
    startDate: '2023-10-22',
    endDate: '2023-10-23',
    status: 'Pending',
    message: 'Hi, I would like to rent your drill for a weekend project.'
  }
];

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAcceptRequest = (requestId: string) => {
    toast({
      title: "Request accepted",
      description: "You've approved the rental request.",
    });
  };
  
  const handleDeclineRequest = (requestId: string) => {
    toast({
      title: "Request declined",
      description: "You've declined the rental request.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your rentals, listings, and account
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => window.location.href = '/messages'}
              >
                <MessageCircle className="h-4 w-4" />
                Messages
              </Button>
              
              <Button 
                className="gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = '/create-listing'}
              >
                <PlusCircle className="h-4 w-4" />
                List New Item
              </Button>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
              <TabsTrigger 
                value="overview" 
                className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="rentals" 
                className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                My Rentals
              </TabsTrigger>
              <TabsTrigger 
                value="listings" 
                className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                My Listings
              </TabsTrigger>
              <TabsTrigger 
                value="requests" 
                className="py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 relative"
              >
                Requests
                {mockRequests.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5">
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center">
                      {mockRequests.length}
                    </span>
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Active Rentals', icon: <Clock className="h-5 w-5" />, value: '1', color: 'bg-blue-500' },
                  { title: 'Total Spent', icon: <CreditCard className="h-5 w-5" />, value: '$305', color: 'bg-green-500' },
                  { title: 'Total Earned', icon: <DollarSign className="h-5 w-5" />, value: '$800', color: 'bg-purple-500' },
                  { title: 'Avg. Rating', icon: <Star className="h-5 w-5" />, value: '4.8', color: 'bg-amber-500' },
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`rounded-full p-2 ${stat.color} text-white`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Recent Activity and Upcoming */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Recent Activity
                    </h3>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                      View All
                    </Button>
                  </div>
                  
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 animate-pulse">
                          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          <div className="space-y-2 flex-1">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 text-blue-600 dark:text-blue-400">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white font-medium">
                            You rented <span className="font-semibold">DSLR Camera</span>
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            3 days ago
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 text-green-600 dark:text-green-400">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white font-medium">
                            You earned <span className="font-semibold">$45</span> from rentals
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            1 week ago
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-2 text-purple-600 dark:text-purple-400">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white font-medium">
                            <span className="font-semibold">Sarah J.</span> gave you a 5-star review
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            2 weeks ago
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Upcoming Rentals */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Upcoming Rentals
                    </h3>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                      View Calendar
                    </Button>
                  </div>
                  
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mockRentals.filter(rental => rental.status === 'Upcoming').map((rental) => (
                        <div 
                          key={rental.id}
                          className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                        >
                          <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                            <img 
                              src={rental.itemImage} 
                              alt={rental.itemName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {rental.itemName}
                            </h4>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                Upcoming
                              </Badge>
                              <span className="text-gray-900 dark:text-white font-medium">
                                ${rental.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {mockRentals.filter(rental => rental.status === 'Upcoming').length === 0 && (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                          <p className="text-gray-600 dark:text-gray-400">
                            No upcoming rentals
                          </p>
                          <Button
                            variant="link"
                            className="mt-2 text-blue-600 dark:text-blue-400"
                            onClick={() => window.location.href = '/browse'}
                          >
                            Browse items to rent
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Rentals Tab */}
            <TabsContent value="rentals" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Your Rentals
                  </h3>
                  <div className="mt-3 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.href = '/browse'}
                    >
                      Browse More Items
                    </Button>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockRentals.map((rental) => (
                      <div 
                        key={rental.id}
                        className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                      >
                        <div className="h-40 md:h-24 md:w-40 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={rental.itemImage} 
                            alt={rental.itemName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {rental.itemName}
                            </h4>
                            <Badge 
                              className={`self-start md:self-auto mt-2 md:mt-0 ${
                                rental.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                                rental.status === 'Upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {rental.status}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            From {rental.owner}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                          </div>
                          
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
                            <span className="text-gray-900 dark:text-white font-medium mb-2 md:mb-0">
                              Total: ${rental.price}
                            </span>
                            
                            <div className="flex gap-2">
                              {rental.status === 'Active' && (
                                <Button variant="outline" size="sm">
                                  Request Extension
                                </Button>
                              )}
                              <Button 
                                className={`${
                                  rental.status === 'Completed' ? 'bg-blue-600 hover:bg-blue-700' : 
                                  'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                }`}
                                size="sm"
                                disabled={rental.status !== 'Completed'}
                              >
                                {rental.status === 'Completed' ? 'Leave Review' : 'View Details'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {mockRentals.length === 0 && (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          You haven't rented any items yet
                        </p>
                        <Button
                          onClick={() => window.location.href = '/browse'}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Browse Items to Rent
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Listings Tab */}
            <TabsContent value="listings" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Your Listings
                  </h3>
                  <div className="mt-3 md:mt-0">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 gap-2"
                      onClick={() => window.location.href = '/create-listing'}
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add New Listing
                    </Button>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockListings.map((listing) => (
                      <div 
                        key={listing.id}
                        className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                      >
                        <div className="h-40 md:h-24 md:w-40 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={listing.image} 
                            alt={listing.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {listing.name}
                            </h4>
                            <Badge 
                              className="self-start md:self-auto mt-2 md:mt-0 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            >
                              {listing.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Daily Rate</p>
                              <p className="font-medium text-gray-900 dark:text-white">${listing.price}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Total Rentals</p>
                              <p className="font-medium text-gray-900 dark:text-white">{listing.totalRentals}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                              <p className="font-medium text-gray-900 dark:text-white">${listing.revenue}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row justify-end gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              Edit Listing
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                              Deactivate
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {mockListings.length === 0 && (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          You haven't listed any items yet
                        </p>
                        <Button
                          onClick={() => window.location.href = '/create-listing'}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Create Your First Listing
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {mockListings.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                    Performance Overview
                  </h3>
                  
                  <div className="h-64 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 mb-4">
                    <BarChart3 className="h-12 w-12 text-gray-400" />
                    <span className="ml-3 text-gray-500 dark:text-gray-400">
                      Performance Chart (Coming Soon)
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">$800</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Rentals</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">14</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Rating</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Rental Requests
                </h3>
                
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(1)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockRequests.map((request) => (
                      <div 
                        key={request.id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                              <User className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {request.renterName}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Wants to rent: {request.itemName}
                              </p>
                            </div>
                          </div>
                          <Badge 
                            className="self-start md:self-auto mt-2 md:mt-0 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          >
                            {request.status}
                          </Badge>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg mb-4">
                          <p className="text-gray-700 dark:text-gray-300">
                            {request.message}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                              onClick={() => handleDeclineRequest(request.id)}
                            >
                              Decline
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAcceptRequest(request.id)}
                            >
                              Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {mockRequests.length === 0 && (
                      <div className="text-center py-12">
                        <Bell className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 dark:text-gray-400">
                          No pending rental requests
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
