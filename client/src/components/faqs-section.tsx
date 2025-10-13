import { ArrowRight, HelpCircle, FileText, Clock, Shield } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useLocation } from 'wouter';

const faqCategories = [
  {
    id: 'experienced-knowledge',
    title: 'Experienced Industrial Knowledge',
    description: 'Our acquired expertise over the years allows us to provide affirmative manpower solution strategies that are tailored to your individual needs.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    icon: HelpCircle,
    color: 'bg-blue-600'
  },
  {
    id: 'professional-consultants',
    title: 'Professional Consultants',
    description: 'Our committed consultants ensure that our clients have an engaging and pleasant experience while fulfilling their recruitment needs.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    icon: FileText,
    color: 'bg-green-600'
  },
  {
    id: 'respect-integrity',
    title: 'Respect & Integrity',
    description: 'While treating all candidates and employers with respect, we work responsibly to match your desired employment needs through all circumstances.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    icon: Clock,
    color: 'bg-purple-600'
  },
  {
    id: 'save-time-money',
    title: 'Save Time & Money',
    description: 'With our partnerships and resources, we are able to act fast to meet your demands and save you the costly mistake of hiring unsuitable talent.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    icon: Shield,
    color: 'bg-orange-600'
  }
];

export function FAQsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [, setLocation] = useLocation();

  const handleFAQClick = (faqId: string) => {
    setLocation(`/faqs/${faqId}`);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-primary">Why Choose Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence and comprehensive recruitment solutions that deliver results
          </p>
        </div>

        {/* FAQs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faqCategories.map((faq, index) => {
            const Icon = faq.icon;
            return (
              <div
                key={faq.id}
                className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleFAQClick(faq.id)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={faq.image} 
                      alt={faq.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    {/* Icon overlay */}
                    <div className={`absolute top-4 right-4 ${faq.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 bg-gradient-to-br from-blue-900 to-blue-800">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                      {faq.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {faq.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium group-hover:text-primary transition-colors duration-300">
                        View FAQs
                      </span>
                      <ArrowRight className="w-5 h-5 text-white group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
