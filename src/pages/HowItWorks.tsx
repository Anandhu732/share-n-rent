
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, CheckCircle2, Clock3, Calendar, CreditCard, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              How ShareRent Works
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Our platform makes it easy to find, rent, and share items in your community. 
              Save money, reduce waste, and connect with others.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="rounded-full px-8 bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = '/browse'}
              >
                Start Browsing
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8"
                onClick={() => window.location.href = '/create-listing'}
              >
                List an Item
              </Button>
            </div>
          </div>
        </section>
        
        {/* Steps Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Renting is as Easy as 1-2-3
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Follow these simple steps to find and rent the items you need
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Step 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Find What You Need
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Browse through thousands of items available for rent in your area. 
                  Use filters to narrow down your search by category, price, and availability.
                </p>
                <Link to="/browse" className="text-blue-600 dark:text-blue-400 font-medium flex items-center group">
                  Browse Items
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Book Your Rental
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Select your rental dates, review the terms, and book your item. 
                  Communicate with the owner through our secure messaging system if you have questions.
                </p>
                <Link to="/register" className="text-blue-600 dark:text-blue-400 font-medium flex items-center group">
                  Create an Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Pick Up & Enjoy
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Meet the owner to pick up your item at the agreed location. 
                  Return it on time and in the same condition to maintain your good rental history.
                </p>
                <Link to="/login" className="text-blue-600 dark:text-blue-400 font-medium flex items-center group">
                  Sign In to Start
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* For Owners Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                For Item Owners
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Turn your unused items into a source of income
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Owner Step 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                  <CreditCard className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Earn Extra Income
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  List your items that are sitting unused and start earning money. 
                  Set your own prices and availability.
                </p>
              </div>
              
              {/* Owner Step 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                  <Shield className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Secure & Protected
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our platform includes verification, secure payments, and insurance options 
                  to protect your items.
                </p>
              </div>
              
              {/* Owner Step 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                  <Clock3 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Flexible Management
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your listings, bookings, and availability with our easy-to-use dashboard. 
                  Control who rents your items.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                size="lg" 
                className="rounded-full px-8 bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = '/create-listing'}
              >
                Start Listing Your Items
              </Button>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Got questions? We've got answers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  q: "How do I create an account?",
                  a: "Click the 'Sign Up' button in the top right corner of the page. Fill in your details, verify your email, and you're good to go!"
                },
                {
                  q: "Is there a fee to list my items?",
                  a: "Listing your items is completely free. We only charge a small service fee when your item is successfully rented."
                },
                {
                  q: "What if an item gets damaged?",
                  a: "We offer protection options for both renters and owners. You can purchase insurance during checkout for additional peace of mind."
                },
                {
                  q: "How do payments work?",
                  a: "Payments are processed securely through our platform. Funds are released to the owner after the rental period begins."
                },
                {
                  q: "Can I cancel a booking?",
                  a: "Yes, cancellation policies vary by listing. Each item page displays the specific cancellation terms."
                },
                {
                  q: "What items can I list?",
                  a: "You can list almost anything that's legal to rent. Popular categories include electronics, tools, outdoor gear, and more."
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                to="/help-center"
                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
              >
                View More FAQs
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-blue-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Sharing?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
              Join thousands of users who are already saving money and earning extra income through ShareRent.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="rounded-full px-8 bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => window.location.href = '/register'}
              >
                Sign Up Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 border-white text-white hover:bg-blue-700"
                onClick={() => window.location.href = '/browse'}
              >
                Browse Items
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
