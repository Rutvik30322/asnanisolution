import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './logo';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo className="h-10 w-auto" />
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => scrollToSection('home')} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">About</button>
              <button onClick={() => scrollToSection('industries')} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Industries</button>
              <button onClick={() => scrollToSection('positions')} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Positions</button>
              <button onClick={() => scrollToSection('clients')} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Clients</button>
              <button onClick={() => scrollToSection('process')} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Process</button>
              <button onClick={() => scrollToSection('contact')} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">Contact</button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => scrollToSection('home')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary w-full text-left">Home</button>
            <button onClick={() => scrollToSection('about')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary w-full text-left">About</button>
            <button onClick={() => scrollToSection('industries')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary w-full text-left">Industries</button>
            <button onClick={() => scrollToSection('positions')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary w-full text-left">Positions</button>
            <button onClick={() => scrollToSection('clients')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary w-full text-left">Clients</button>
            <button onClick={() => scrollToSection('process')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary w-full text-left">Process</button>
            <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white w-full text-left">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
}
