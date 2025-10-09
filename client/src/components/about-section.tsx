import { Globe, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'} h-full`}>
            <div className="h-full min-h-[520px] md:min-h-[560px] lg:min-h-[600px]">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Asnani HR Solutions team connecting global talent with opportunities"
                className="rounded-xl shadow-lg w-full h-full object-cover"
                loading="lazy"
                width="1200"
                height="800"
              />
            </div>
          </div>
          <div className={isVisible ? 'animate-slide-in-right' : 'opacity-0'}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              “Asnani HR Solutions – Your Future, Our Commitment.”
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">About Us</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Asnani HR Solutions, we are a global manpower consultancy dedicated to connecting the right talent with the right opportunities. With a strong presence across the Gulf, Russia, and international markets, we have built a reputation for delivering recruitment solutions that are timely, ethical, and impactful.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We specialize in both blue-collar and white-collar recruitment, proudly serving industries such as Oil & Gas, Construction, Mechanical, Civil, Electrical & Instrumentation, HVAC, Hospitality, and Services. Our success lies in our ability to deeply understand client needs while providing candidates with genuine career opportunities abroad.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Vision</h4>
                <p className="text-gray-700 leading-relaxed">
                  To be a globally recognized recruitment partner, trusted for our integrity, excellence, and ability to deliver sustainable workforce solutions that empower both organizations and individuals.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Mission</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>To provide companies with qualified, skilled, and dependable manpower.</li>
                  <li>To connect job seekers with genuine international opportunities that shape fulfilling careers.</li>
                  <li>To maintain transparency, trust, and long-term partnerships with every client and candidate.</li>
                  <li>To continually adapt, innovate, and deliver in a fast-changing global workforce landscape.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Goal</h4>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Our ultimate goal is to bridge the global talent gap by offering end-to-end recruitment solutions that create real value for businesses and transform lives for the better.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Deliver efficient and timely recruitment services</li>
                  <li>Achieve 100% client and candidate satisfaction</li>
                  <li>Expand across new regions and industries</li>
                  <li>Stay ahead with evolving trends and technologies in international hiring</li>
                </ul>
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

              

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">About Our Founder & Managing Director – Mr. Mahesh Asnani</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  The strength and vision behind Asnani HR Solutions is Mr. Mahesh Asnani, whose leadership has been instrumental in shaping the organization into a trusted global recruitment partner. With decades of experience and a strong professional network across the Gulf and Russia, he has laid the foundation of trust, ethics, and service excellence.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-3">
                  <li>Integrity in Recruitment – ensuring transparent and verified opportunities.</li>
                  <li>Candidate-Centric Support – guiding candidates at every step, from CV selection to visa and deployment.</li>
                  <li>Client Satisfaction – delivering the right talent at the right time.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  His passion for connecting people and opportunities continues to inspire our team and drive our mission forward. ✨ At Asnani HR Solution, we don’t just provide jobs – we build careers and long-lasting partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
