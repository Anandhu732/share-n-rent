
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Mail, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 pt-16 border-t border-gray-200 dark:border-gray-800 animate-fade-in">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                ShareRent
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              The modern platform for resource sharing and rentals. 
              Find what you need, share what you don't use.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Browse', 'How It Works', 'List an Item'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item === 'Home' ? '' : item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Account</h3>
            <ul className="space-y-3">
              {['Login', 'Register', 'Dashboard', 'My Listings', 'My Rentals'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="h-10 rounded-md bg-white dark:bg-gray-900"
              />
              <Button size="sm" className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe
              </Button>
            </div>
            <div className="mt-6 space-y-3">
              <a href="mailto:support@sharerent.com" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm gap-2 transition-colors">
                <Mail className="h-4 w-4" />
                support@sharerent.com
              </a>
              <a href="tel:+123456789" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm gap-2 transition-colors">
                <PhoneCall className="h-4 w-4" />
                +1 (234) 567-89
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} ShareRent. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Help Center'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
