
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-nairagreen flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="font-bold text-xl">NairaLock</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-nairablue to-nairablue-800 text-white">
          <div className="container mx-auto px-6 py-24 min-h-screen flex flex-col justify-center">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Save in USD, Beat Inflation in Nigeria
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                NairaLock helps you hedge against Naira devaluation by offering USD savings accounts and virtual dollar cards for Nigerians.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <Link to="/register">
                  <Button size="lg" className="bg-nairagreen hover:bg-nairagreen-600 text-white w-full sm:w-auto">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    Login to Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Preserve Your Wealth</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                With NairaLock, you can save in USD and protect your money from currency fluctuations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-lg bg-nairagreen/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-nairagreen">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 01-.75.75h-.75m-6-1.5H2.25m19.5 0v.75c0 .414-.336.75-.75.75h-.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 01-.75.75h-.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">USD Savings Account</h3>
                <p className="text-muted-foreground">
                  Save in USD and protect your money from Naira inflation and devaluation
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-lg bg-nairablue/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-nairablue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Virtual USD Cards</h3>
                <p className="text-muted-foreground">
                  Create virtual USD cards for international payments and subscriptions
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-lg bg-nairagreen/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-nairagreen">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Easy Currency Conversion</h3>
                <p className="text-muted-foreground">
                  Convert between Naira and USD with competitive exchange rates
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your financial future?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Create an account today and start saving in USD to protect against Naira inflation.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-nairagreen hover:bg-nairagreen-600 text-white">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-nairagreen flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="font-bold text-xl text-white">NairaLock</span>
              </div>
              <p className="text-gray-400">
                Protect your money from inflation with USD savings and virtual cards.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">USD Savings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Virtual Cards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FX Exchange</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between">
            <p>© 2025 NairaLock. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
