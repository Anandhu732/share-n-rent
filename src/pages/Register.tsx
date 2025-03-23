
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ArrowRight, User, Mail, Lock, AlertCircle } from 'lucide-react';
import { authAPI } from '@/lib/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear password error when user types
    if (name === 'password' || name === 'password_confirm') {
      setPasswordError('');
    }
  };
  
  const validatePasswords = () => {
    if (formData.password !== formData.password_confirm) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPasswordError('');
    
    if (!validatePasswords()) {
      return;
    }
    
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { password_confirm, ...registerData } = formData;
      await authAPI.register(registerData);
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please log in.",
      });
      navigate('/login');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error ||
        'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Left side - form */}
        <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-12 md:p-16 lg:p-20 animate-fade-in">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center md:text-left">
              <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-8 transition-colors hover:text-blue-800 dark:hover:text-blue-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                Create your account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join ShareRent to start renting and sharing
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="First name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last name
                  </label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password_confirm"
                    name="password_confirm"
                    type="password"
                    value={formData.password_confirm}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
                
                {passwordError && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {passwordError}
                  </p>
                )}
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  I agree to the{' '}
                  <Link
                    to="/terms-of-service"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy-policy"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-lg font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
                {!isLoading && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-lg"
                >
                  <img src="/lovable-uploads/b1736a0b-1f1a-4bb1-afeb-6584092cbe2d.png" alt="Google" className="h-5 w-5 mr-2" />
                  Google
                </Button>
              </div>
              
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
        
        {/* Right side - image/info */}
        <div className="hidden md:block md:w-1/2 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
          
          {/* Floating shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white opacity-10 blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-xl"></div>
          
          <div className="relative h-full flex flex-col justify-center items-center text-white p-12">
            <h2 className="text-3xl font-bold mb-6 max-w-md text-center">
              Join our community of sharers and renters
            </h2>
            <p className="text-blue-100 max-w-md text-center mb-12">
              Create an account to start browsing, listing items, and connecting with others in your area.
            </p>
            
            <div className="space-y-6 max-w-md w-full">
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v4l2 2"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Quick & Easy Setup</h3>
                  <p className="text-blue-100 text-sm">
                    Create your account in minutes and start browsing available items immediately.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Save Money</h3>
                  <p className="text-blue-100 text-sm">
                    Rent items instead of buying them and save hundreds or thousands of dollars.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Secure Transactions</h3>
                  <p className="text-blue-100 text-sm">
                    Our platform ensures safe and secure rentals with verified users and secure payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
