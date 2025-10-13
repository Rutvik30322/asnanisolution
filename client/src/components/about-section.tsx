import { Globe, Users, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Link } from 'wouter';

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'} h-full`}>
            <div className="h-[400px] md:h-[450px] lg:h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Asnani HR Solutions team connecting global talent with opportunities"
                className="rounded-xl shadow-lg w-full h-full object-cover"
                loading="lazy"
                width="1200"
                height="500"
              />
            </div>
          </div>
          <div className={isVisible ? 'animate-slide-in-right' : 'opacity-0'}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              "Asnani HR Solutions – Your Future, Our Commitment."
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">About Us</h3>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              At Asnani HR Solutions, we are a global manpower consultancy dedicated to connecting the right talent with the right opportunities. With a strong presence across the Gulf, Russia, and international markets, we have built a reputation for delivering recruitment solutions that are timely, ethical, and impactful.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              We specialize in both blue-collar and white-collar recruitment, proudly serving industries such as Oil & Gas, Construction, Mechanical, Civil, Electrical & Instrumentation, HVAC, Hospitality, and Services.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Vision</h4>
                <p className="text-gray-700 leading-relaxed">
                  To be a globally recognized recruitment partner, trusted for our integrity, excellence, and ability to deliver sustainable workforce solutions that empower both organizations and individuals.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">What We Offer</h4>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
                  <li>✅ End-to-End Recruitment Solutions</li>
                  <li>✅ Blue-Collar & White-Collar Hiring</li>
                  <li>✅ Visa Processing & Documentation Support</li>
                  <li>✅ Candidate Deployment Services</li>
                  <li>✅ Industry-Specific Workforce Expertise</li>
                  <li>✅ Personalized Client & Candidate Assistance</li>
                </ul>
              </div>
            </div>

            <Link href="/about">
              <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Read More About Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
