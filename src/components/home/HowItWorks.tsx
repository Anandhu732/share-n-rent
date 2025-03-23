
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, CheckCircle, Clock, CreditCard, Star, Package, Users } from 'lucide-react';

const steps = [
  {
    id: 'find',
    title: 'Find What You Need',
    description: 'Browse thousands of items available for rent in your area. Use filters to find exactly what you're looking for.',
    icon: <Search />,
    color: 'bg-blue-500'
  },
  {
    id: 'book',
    title: 'Book with Confidence',
    description: 'Reserve your items with our secure booking system. Choose your rental dates and verify availability instantly.',
    icon: <CheckCircle />,
    color: 'bg-green-500'
  },
  {
    id: 'pickup',
    title: 'Pick Up or Get Delivered',
    description: 'Arrange pickup with the owner or opt for delivery service where available for added convenience.',
    icon: <Package />,
    color: 'bg-purple-500'
  },
  {
    id: 'use',
    title: 'Use & Enjoy',
    description: 'Make the most of your rented item for the duration of your booking period.',
    icon: <Clock />,
    color: 'bg-amber-500'
  },
  {
    id: 'return',
    title: 'Return & Review',
    description: 'Return the item in the same condition and leave a review to help other users make informed decisions.',
    icon: <Star />,
    color: 'bg-red-500'
  }
];

const benefits = [
  {
    title: 'Save Money',
    description: 'Why buy expensive items you'll rarely use? Rent and save hundreds of dollars.',
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: 'Reduce Waste',
    description: 'Help the environment by sharing resources instead of buying new items.',
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: 'Support Community',
    description: 'Connect with locals and support the sharing economy in your community.',
    icon: <Users className="h-5 w-5" />,
  }
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState<string>('find');
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4 animate-fade-up">
            How ShareRent Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Our platform makes renting and sharing resources simple, secure, and seamless. Follow these easy steps to get started.
          </p>
        </div>
        
        {/* Steps on desktop */}
        <div className="hidden md:block">
          <div className="flex justify-between items-start mb-16 relative">
            {/* Progress line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-0"></div>
            
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={cn(
                  "flex flex-col items-center relative z-10 transition-all duration-300",
                  "w-1/5",
                  activeStep === step.id 
                    ? "scale-105" 
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                )}
                onMouseEnter={() => setActiveStep(step.id)}
              >
                <div 
                  className={cn(
                    "h-16 w-16 rounded-full flex items-center justify-center text-white mb-4",
                    step.color,
                    activeStep === step.id 
                      ? "shadow-lg" 
                      : "shadow-subtle"
                  )}
                >
                  {step.icon}
                </div>
                
                <h3 className={cn(
                  "text-lg font-medium text-center mb-2 transition-colors",
                  activeStep === step.id 
                    ? "text-gray-900 dark:text-white" 
                    : "text-gray-700 dark:text-gray-300"
                )}>
                  {step.title}
                </h3>
                
                <p className={cn(
                  "text-sm text-center max-w-[230px] transition-opacity duration-300",
                  activeStep === step.id 
                    ? "opacity-100" 
                    : "opacity-70"
                )}>
                  {step.description}
                </p>
                
                {/* Step number */}
                <div className={cn(
                  "absolute -top-6 text-xs font-semibold bg-gray-100 dark:bg-gray-800 rounded-full h-6 w-6 flex items-center justify-center",
                  activeStep === step.id 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-500 dark:text-gray-400"
                )}>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Steps on mobile */}
        <div className="md:hidden">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-subtle"
              >
                <div className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center text-white flex-shrink-0",
                  step.color
                )}>
                  {step.icon}
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 font-semibold rounded-full h-5 w-5 flex items-center justify-center mr-2">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Benefits */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-subtle flex flex-col items-center text-center animate-fade-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
