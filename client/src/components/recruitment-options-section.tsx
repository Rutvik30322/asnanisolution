import { ArrowRight, Users, Building, Zap, Wrench, Factory, HardHat } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useLocation } from 'wouter';

const recruitmentOptions = [
  {
    id: 'oil-gas-mechanical-projects',
    title: 'Oil & Gas / Mechanical Projects',
    icon: Zap,
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    description: 'Specialized personnel for petrochemical, refinery, and mechanical projects'
  },
  {
    id: 'construction',
    title: 'Construction',
    icon: Building,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    description: 'Civil engineers, trades, and construction personnel for major projects'
  },
  {
    id: 'electrical-instrumentation',
    title: 'Electrical & Instrumentation',
    icon: Wrench,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    description: 'Electrical engineers, technicians, and instrumentation specialists'
  },
  {
    id: 'hvac-manufacturing',
    title: 'HVAC & Manufacturing',
    icon: Factory,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    description: 'HVAC specialists, manufacturing personnel, and production experts'
  },
  {
    id: 'hospitality-services',
    title: 'Hospitality & Services',
    icon: Users,
    color: 'bg-pink-500',
    hoverColor: 'hover:bg-pink-600',
    description: 'Hotel management, F&B services, and specialized hospitality roles'
  },
  {
    id: 'tailoring-upholstery',
    title: 'Tailoring & Upholstery',
    icon: HardHat,
    color: 'bg-rose-500',
    hoverColor: 'hover:bg-rose-600',
    description: 'Skilled tailors, upholstery specialists, machine operators and supervisors'
  }
];

export function RecruitmentOptionsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [, setLocation] = useLocation();

  const handleOptionClick = (optionId: string) => {
    setLocation(`/recruitment/${optionId}`);
  };

  return (
    <section id="recruitment" ref={ref} className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80" 
          alt="Professional HR and recruitment team background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-primary">Recruitment Options</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Comprehensive recruitment solutions across multiple industries and specializations. 
            Click on any option below to explore detailed positions and requirements.
          </p>
        </div>

        {/* Recruitment Options Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recruitmentOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleOptionClick(option.id)}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 hover:bg-white/40 hover:border-white/50 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className={`${option.color} ${option.hoverColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 mb-6 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                    {option.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium group-hover:text-yellow-300 transition-colors duration-300">
                      View Details
                    </span>
                    <ArrowRight className="w-5 h-5 text-white group-hover:text-yellow-300 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Need Custom Recruitment Solutions?</h3>
            <p className="text-lg text-gray-200 mb-6">
              We provide tailored recruitment services for specialized requirements across all industries
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
