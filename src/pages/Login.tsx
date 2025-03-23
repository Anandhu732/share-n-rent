
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';
import { authAPI } from '@/lib/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await authAPI.login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to ShareRent!",
      });
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error ||
        'Invalid credentials. Please check your email and password.'
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
                Welcome back
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to continue to your account
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
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
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-lg font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
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
                  <img src="/lovable-uploads/99178560-b1c5-4886-b1e0-81b799a25567.png" alt="Google" className="h-5 w-5 mr-2" />
                  Google
                </Button>
              </div>
              
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Sign up
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
              Find, Rent, and Share Resources in Your Community
            </h2>
            <p className="text-blue-100 max-w-md text-center mb-8">
              Join thousands of users who save money and reduce waste by renting items instead of buying them.
            </p>
            
            <div className="grid grid-cols-2 gap-6 max-w-md w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">20K+</div>
                <div className="text-blue-100 text-sm">Available Items</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">15K+</div>
                <div className="text-blue-100 text-sm">Happy Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-blue-100 text-sm">Cities Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">$1.2M</div>
                <div className="text-blue-100 text-sm">Saved by Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
