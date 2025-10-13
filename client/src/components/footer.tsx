import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="mb-4 hover:opacity-90 transition-opacity"
            >
              <Logo className="h-12 w-auto" variant="white" />
            </button>
            <p className="text-gray-400 mb-4">
              Premier manpower consultancy since 2011, connecting talent with opportunity across Gulf/Middle East & Russia.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get in touch
            </button>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button type="button" onClick={() => scrollToSection('industries')} className="hover:text-accent transition-colors text-left w-full">Construction</button></li>
              <li><button type="button" onClick={() => scrollToSection('industries')} className="hover:text-accent transition-colors text-left w-full">Oil &amp; Gas</button></li>
              <li><button type="button" onClick={() => scrollToSection('industries')} className="hover:text-accent transition-colors text-left w-full">Hospitality</button></li>
              <li><button type="button" onClick={() => scrollToSection('industries')} className="hover:text-accent transition-colors text-left w-full">HVAC</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button type="button" onClick={() => scrollToSection('positions')} className="hover:text-accent transition-colors text-left w-full">Recruitment</button></li>
              <li><button type="button" onClick={() => scrollToSection('industries')} className="hover:text-accent transition-colors text-left w-full">Manpower Supply</button></li>
              <li><button type="button" onClick={() => scrollToSection('process')} className="hover:text-accent transition-colors text-left w-full">Recruitment Process</button></li>
              <li><button type="button" onClick={() => scrollToSection('about')} className="hover:text-accent transition-colors text-left w-full">About Our Services</button></li>
              <li><button type="button" onClick={() => scrollToSection('process')} className="hover:text-accent transition-colors text-left w-full">Consultation</button></li>
              <li><button type="button" onClick={() => scrollToSection('process')} className="hover:text-accent transition-colors text-left w-full">Documentation</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+917623011033" className="hover:text-accent transition-colors">+91 76230 11033</a>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+917623011044" className="hover:text-accent transition-colors">+91 76230 11044</a>
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@asnanihr.in" className="hover:text-accent transition-colors">info@asnanihr.in</a>
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Vadodara, Gujarat
              </p>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="mt-3 text-sm underline hover:text-accent transition-colors"
              >
                Go to contact section
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://facebook.com/asnanihr" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/asnanihrsolution/?igsh=MWc4djF5NnFzNWZyMw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/company/asnanihr" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          <p>&copy; 2024 Asnani HR Solutions. All rights reserved. | Designed with excellence for talent acquisition.</p>
        </div>
      </div>
    </footer>
  );
}
