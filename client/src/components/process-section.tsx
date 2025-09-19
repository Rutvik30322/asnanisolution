import { FileText, Search, UserCheck, Plane, Users, Building, Shield, Clock, HeartHandshake, Award, Globe, CheckCircle, Megaphone, List, Calendar, Users2, CheckSquare, ArrowRight, ArrowDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Card, CardContent } from '@/components/ui/card';

// 7-Step Recruitment Process based on the flowchart
const processSteps = [
  {
    title: "Understand Client Requirement",
    description: "Carefully analyze the client's manpower needs, job roles, and required skills.",
    image: "https://res.cloudinary.com/shivshaktisite/image/upload/v1758276250/Businessman_Review_Agreement_Document_before_Signing_Contract__Jubilant_Stock_Photo_-_Image_of_corporate_business__282365754_muxzts.jpg",
    color: "bg-orange-500",
    stepNumber: 1
  },
  {
    title: "Candidate Sourcing",
    description: "Identify and attract potential candidates through job portals, social media, and database.",
    image: "https://res.cloudinary.com/shivshaktisite/image/upload/v1758276410/Maximizing_Talent_Acquisition__Unleashing_the_Power_of_Talent_Management_and_Candidate_Sourcing_Software_dv4auy.jpg",
    color: "bg-blue-500",
    stepNumber: 2
  },
  {
    title: "Documentation",
    description: "Collect, verify, and organize candidate documents as per client and legal requirements.",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=400&q=60",
    color: "bg-purple-500",
    stepNumber: 3
  },
  {
    title: "Interview",
    description: "Coordinate interviews between candidates and clients for evaluation and selection.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=60",
    color: "bg-green-500",
    stepNumber: 4
  },
  {
    title: "Visa Process",
    description: "Assist selected candidates with medical tests, visa stamping, and travel formalities.",
    image: "https://res.cloudinary.com/shivshaktisite/image/upload/v1758276527/Best_Immigration_Consultant_Australia_Visa_Services_in_Australia_r5wraz.jpg",
    color: "bg-pink-500",
    stepNumber: 5
  },
  {
    title: "Departure",
    description: "Ensure smooth deployment of candidates by arranging tickets, orientation, and final handover.",
    image: "https://res.cloudinary.com/shivshaktisite/image/upload/v1758276666/Welcome_to_TravelTXS__Making_Travel_Enthusiastic_and_Affordable_vcagzm.jpg",
    color: "bg-teal-500",
    stepNumber: 6
  }
];

// Based on PDF commitment content
const commitments = [
  {
    title: "Premier Recruitment Solutions",
    description: "Positioned amongst topmost recruitment service providers since 2011, delivering services across all industries",
    icon: Award,
    highlight: "Since 2011"
  },
  {
    title: "Extensive Database",
    description: "Large database of candidates with sophisticated information technology ensuring easy accessibility and flexibility",
    icon: Users,
    highlight: "IT-Enabled"
  },
  {
    title: "Gulf/Middle East & Russia Expertise",
    description: "Specialized in overseas manpower recruitment for Gulf, Middle East and Russia markets with proven track record",
    icon: Globe,
    highlight: "Gulf & Russia Specialist"
  },
  {
    title: "Government Relations",
    description: "Excellent relations with consulates, airlines and local government authorities for quick mobilization",
    icon: Building,
    highlight: "Fast Processing"
  },
  {
    title: "Quality Assurance",
    description: "Guarantee performance and core values, ensuring complete client satisfaction today and years to come",
    icon: Shield,
    highlight: "Guaranteed"
  },
  {
    title: "Complete Satisfaction",
    description: "Endeavor to be the preferred recruitment solution provider ensuring complete satisfaction",
    icon: HeartHandshake,
    highlight: "100% Focus"
  }
];

export function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="process" ref={ref} className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Recruitment Process Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary">Recruitment Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive 7-step recruitment process designed for efficiency, quality, and complete client satisfaction
          </p>
        </div>

        {/* Process Flow - Fully Responsive Grid Layout */}
        <div className="mb-16 lg:mb-20">
          {/* Mobile: Single Column */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {processSteps.map((step, index) => {
              return (
                <div key={step.title} className="relative group">
                  <Card 
                    className={`timeline-item text-center cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-primary/20 hover:shadow-2xl h-80 ${
                      isVisible ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4 relative overflow-hidden h-full flex flex-col justify-between">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                        <div className="absolute top-2 right-2 w-16 h-16 border border-primary/20 rounded-full"></div>
                        <div className="absolute bottom-2 left-2 w-8 h-8 border border-primary/20 rounded-full"></div>
                      </div>
                      
                      {/* Image Container with Overlay */}
                      <div className="relative w-24 h-24 rounded-full mx-auto mb-3 overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-24 h-24 object-cover object-center rounded-full transition-transform duration-300 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Step Badge with Animation */}
                      <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                        Step {step.stepNumber}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-base font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-4">{step.description}</p>
                      </div>
                      
                      {/* Hover Indicator */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
                    </CardContent>
                  </Card>
                  
                  {/* Mobile Arrow Connector */}
                  {index < processSteps.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ArrowDown className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tablet: 2 Columns */}
          <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4 md:gap-6 mb-8">
            {processSteps.slice(0, 4).map((step, index) => {
              return (
                <div key={step.title} className="relative group">
                  <Card 
                    className={`timeline-item text-center cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-primary/20 hover:shadow-2xl h-72 ${
                      isVisible ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4 md:p-6 relative overflow-hidden h-full flex flex-col justify-between">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                        <div className="absolute top-3 right-3 w-20 h-20 border border-primary/20 rounded-full"></div>
                        <div className="absolute bottom-3 left-3 w-10 h-10 border border-primary/20 rounded-full"></div>
                      </div>
                      
                      {/* Image Container with Overlay */}
                      <div className="relative w-24 h-24 rounded-full mx-auto mb-3 overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-24 h-24 object-cover object-center rounded-full transition-transform duration-300 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Step Badge with Animation */}
                      <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                        Step {step.stepNumber}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-sm md:text-base font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">{step.title}</h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">{step.description}</p>
                      </div>
                      
                      {/* Hover Indicator */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
                    </CardContent>
                  </Card>
                  
                  {/* Tablet Arrow Connector */}
                  {index < 3 && (
                    <div className="hidden md:flex items-center absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tablet: 2 Columns for Bottom Row */}
          <div className="hidden sm:grid lg:hidden grid-cols-2 justify-center gap-4 md:gap-6">
            {processSteps.slice(4, 6).map((step, index) => {
              return (
                <div key={step.title} className="relative group">
                  <Card 
                    className={`timeline-item text-center cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-primary/20 hover:shadow-2xl h-72 ${
                      isVisible ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                  >
                    <CardContent className="p-4 md:p-6 relative overflow-hidden h-full flex flex-col justify-between">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                        <div className="absolute top-3 right-3 w-20 h-20 border border-primary/20 rounded-full"></div>
                        <div className="absolute bottom-3 left-3 w-10 h-10 border border-primary/20 rounded-full"></div>
                      </div>
                      
                      {/* Image Container with Overlay */}
                      <div className="relative w-24 h-24 rounded-full mx-auto mb-3 overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-24 h-24 object-cover object-center rounded-full transition-transform duration-300 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Step Badge with Animation */}
                      <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                        Step {step.stepNumber}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-sm md:text-base font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">{step.title}</h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">{step.description}</p>
                      </div>
                      
                      {/* Hover Indicator */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
                    </CardContent>
                  </Card>
                  
                  {/* Tablet Arrow Connector */}
                  {index < 1 && (
                    <div className="hidden md:flex items-center absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop: 4-2 Grid Layout */}
          <div className="hidden lg:block">
            {/* Top Row - 4 Steps */}
            <div className="grid grid-cols-4 gap-6 xl:gap-8 mb-8">
              {processSteps.slice(0, 4).map((step, index) => {
                return (
                  <div key={step.title} className="relative group">
                    <Card 
                      className={`timeline-item text-center cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-primary/20 hover:shadow-2xl h-80 ${
                        isVisible ? 'animate-fade-in' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <CardContent className="p-6 xl:p-8 relative overflow-hidden h-full flex flex-col justify-between">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                          <div className="absolute top-4 right-4 w-24 h-24 border border-primary/20 rounded-full"></div>
                          <div className="absolute bottom-4 left-4 w-12 h-12 border border-primary/20 rounded-full"></div>
                        </div>
                        
                        {/* Image Container with Overlay */}
                        <div className="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                          <img 
                            src={step.image} 
                            alt={step.title}
                            className="w-24 h-24 object-cover object-center rounded-full transition-transform duration-300 group-hover:scale-110"
                          />
                          
                          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        {/* Step Badge with Animation */}
                        <div className="bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-3 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                          Step {step.stepNumber}
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-lg xl:text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">{step.title}</h3>
                          <p className="text-gray-600 text-sm xl:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-4">{step.description}</p>
                        </div>
                        
                        {/* Hover Indicator */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
                      </CardContent>
                    </Card>
                    
                    {/* Horizontal Arrow connector for top row */}
                    {index < 3 && (
                      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Row - 2 Steps */}
            <div className="grid grid-cols-2 gap-6 xl:gap-8 justify-center max-w-3xl mx-auto">
              {processSteps.slice(4, 6).map((step, index) => {
                return (
                  <div key={step.title} className="relative group">
                    <Card 
                      className={`timeline-item text-center cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-primary/20 hover:shadow-2xl h-80 ${
                        isVisible ? 'animate-fade-in' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${(index + 4) * 150}ms` }}
                    >
                      <CardContent className="p-6 xl:p-8 relative overflow-hidden h-full flex flex-col justify-between">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                          <div className="absolute top-4 right-4 w-24 h-24 border border-primary/20 rounded-full"></div>
                          <div className="absolute bottom-4 left-4 w-12 h-12 border border-primary/20 rounded-full"></div>
                        </div>
                        
                        {/* Image Container with Overlay */}
                        <div className="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                          <img 
                            src={step.image} 
                            alt={step.title}
                            className="w-24 h-24 object-cover object-center rounded-full transition-transform duration-300 group-hover:scale-110"
                          />
                          
                          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        {/* Step Badge with Animation */}
                        <div className="bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-3 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                          Step {step.stepNumber}
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-lg xl:text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">{step.title}</h3>
                          <p className="text-gray-600 text-sm xl:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-4">{step.description}</p>
                        </div>
                        
                        {/* Hover Indicator */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
                      </CardContent>
                    </Card>
                    
                    {/* Horizontal Arrow connector for bottom row */}
                    {index < 1 && (
                      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Vertical Flow Connectors */}
            <div className="relative">
              {/* Top to Bottom Flow */}
              <div className="absolute left-1/4 top-0 w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent"></div>
              <div className="absolute left-1/4 top-8 w-0.5 h-8 bg-gradient-to-b from-transparent to-gray-300"></div>
              
              {/* Bottom to Top Flow */}
              <div className="absolute right-1/4 bottom-0 w-0.5 h-8 bg-gradient-to-t from-gray-300 to-transparent"></div>
              <div className="absolute right-1/4 bottom-8 w-0.5 h-8 bg-gradient-to-t from-transparent to-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary">Commitment</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Endeavoring to be the preferred recruitment solution provider of premier corporations worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {commitments.map((commitment, index) => {
              const Icon = commitment.icon;
              return (
                <Card 
                  key={commitment.title}
                  className={`group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 lg:p-8 text-center">
                    <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-full inline-block mb-4">
                      <Icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                    </div>
                    <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                      {commitment.highlight}
                    </div>
                    <h4 className="text-lg lg:text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                      {commitment.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{commitment.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}