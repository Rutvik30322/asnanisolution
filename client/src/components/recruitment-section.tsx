import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { recruitmentCategories } from '@/data/recruitment';

// retained inline data for display comes from central data module
const localCategories = recruitmentCategories;

export function RecruitmentSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [, setLocation] = useLocation();

  const handleRecruitmentClick = (category: any) => {
    // Navigate to SEO-friendly details page using slug
    setLocation(`/recruitment/${category.slug}`);
  };

  return (
    <section id="recruitment" ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary">Recruitment Options</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive recruitment solutions across multiple industries and specializations
          </p>
        </div>

        {/* Recruitment Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.title}
                className={`group cursor-pointer overflow-hidden transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 hover:shadow-2xl ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleRecruitmentClick(category)}
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Position Count Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold text-gray-800">
                      {category.totalPositions}+ Positions
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Categories List */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Specializations:</h4>
                    <div className="space-y-2">
                      {Array.isArray(category.categories) && typeof category.categories[0] === 'object' && 'name' in category.categories[0] ? (
                        // New structure with detailed positions
                        category.categories.map((cat: any, idx: number) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3">
                            <h5 className="text-sm font-semibold text-gray-800 mb-1">{cat.name}</h5>
                            <div className="flex flex-wrap gap-1">
                              {cat.positions.slice(0, 4).map((position: string, posIdx: number) => (
                                <span 
                                  key={posIdx}
                                  className="bg-white text-gray-600 px-2 py-1 rounded text-xs border"
                                >
                                  {position}
                                </span>
                              ))}
                              {cat.positions.length > 4 && (
                                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                                  +{cat.positions.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        // Old structure with simple categories
                        (category.categories as string[]).map((cat: string, idx: number) => (
                          <span 
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {cat}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">View Details</span>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Custom Recruitment Solutions?</h3>
            <p className="text-lg mb-6 opacity-90">
              We provide tailored recruitment services for specialized requirements across all industries
            </p>
            <button 
              onClick={() => setLocation('/contact')}
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
