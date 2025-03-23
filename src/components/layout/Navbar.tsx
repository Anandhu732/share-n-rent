
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, User, Bell, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token') !== null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse', path: '/browse' },
    { name: 'How It Works', path: '/how-it-works' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md py-3 shadow-subtle' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/"
          className="flex items-center animate-fade-in transition-all duration-300"
        >
          <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            ShareRent
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors duration-300 relative group',
                location.pathname === link.path
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              )}
            >
              {link.name}
              <span 
                className={cn(
                  'absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full',
                  location.pathname === link.path ? 'w-full' : 'w-0'
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Search + Auth Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 border border-gray-200 dark:border-gray-800 rounded-full hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-all duration-300 shadow-sm"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-0 h-9 w-9"
                  >
                    <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">My Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/listings" className="cursor-pointer">My Listings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/rentals" className="cursor-pointer">My Rentals</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      localStorage.removeItem('token');
                      window.location.href = '/';
                    }}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="default" 
                size="sm" 
                className="rounded-full shadow-subtle px-5 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                onClick={() => window.location.href = '/create-listing'}
              >
                List an Item
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => window.location.href = '/login'}
              >
                Log In
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="rounded-full shadow-subtle px-5 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                onClick={() => window.location.href = '/register'}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </Button>
          
          {isLoggedIn && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-0 h-8 w-8"
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'fixed inset-0 bg-white dark:bg-gray-950 z-40 flex flex-col pt-20 px-6 transition-transform duration-300 ease-in-out transform',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col space-y-6 items-center pt-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-lg font-medium transition-colors duration-300',
                location.pathname === link.path
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="w-full pt-4">
            <Button 
              variant="outline" 
              className="w-full gap-2 justify-center text-base font-medium text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </div>
          
          {isLoggedIn ? (
            <>
              <Link 
                to="/create-listing" 
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button 
                  variant="default" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 mt-4"
                >
                  List an Item
                </Button>
              </Link>
              
              <div className="border-t border-gray-200 dark:border-gray-800 w-full my-4"></div>
              
              <Link 
                to="/dashboard" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full flex items-center py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Dashboard
              </Link>
              <Link 
                to="/listings" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full flex items-center py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Listings
              </Link>
              <Link 
                to="/rentals" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full flex items-center py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Rentals
              </Link>
              <Link 
                to="/profile" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full flex items-center py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile Settings
              </Link>
              
              <Button 
                variant="ghost" 
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full flex items-center justify-center py-3 mt-4"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/';
                  setIsMobileMenuOpen(false);
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <div className="w-full flex flex-col space-y-3 mt-4">
              <Link 
                to="/login" 
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Log In
                </Button>
              </Link>
              <Link 
                to="/register" 
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button 
                  variant="default" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
