import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Card, CardContent } from '@/components/ui/card';

export function BlogSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="blog" ref={ref} className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <span>New</span>
            <span className="opacity-90">Insights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Insights & Guidance
          </h2>
          <p className="text-gray-600 mt-2">Overseas careers, processes, and opportunities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <Card className={`border-2 hover:border-primary/20 hover:shadow-lg transition-all ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Blog 1: How to Get a Job in the Gulf or Russia from India – Step by Step Guide</h3>
              <p className="text-gray-700 mb-3">For decades, the Gulf region has been a dream destination for Indian professionals... Russia is also emerging as a strong destination.</p>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>
                  <span className="font-semibold">Identify the Right Industry</span>
                  <div className="text-gray-700">
                    <div>Gulf: Oil & Gas, Civil Construction, Mechanical, Hospitality.</div>
                    <div>Russia: Oil & Gas, Infrastructure, Manufacturing, Skilled Trades.</div>
                  </div>
                </li>
                <li>
                  <span className="font-semibold">Prepare a Professional CV</span>
                  <div>Highlight skills and certifications (CSWIP, IWE, NACE/AMPP, BGAS, NEBOSH, ASNT, etc.). Keep it 2–3 pages.</div>
                </li>
                <li>
                  <span className="font-semibold">Apply Through a Trusted Recruitment Agency</span>
                  <div>Use licensed agencies like Asnani HR Solutions for verified roles.</div>
                </li>
                <li>
                  <span className="font-semibold">Attend Interviews</span>
                  <div>Gulf: emphasize project experience. Russia: check adaptability and technical efficiency.</div>
                </li>
                <li>
                  <span className="font-semibold">Complete Documentation & Visa Process</span>
                  <div>Gulf: Offer → Medical → Visa → Travel. Russia: Offer → Medical → Work Permit & Visa → Travel.</div>
                </li>
                <li>
                  <span className="font-semibold">Travel & Start Your Career Abroad</span>
                </li>
              </ol>
              <p className="text-gray-800 mt-4"><span className="font-semibold">Conclusion:</span> With the right preparation, securing a job in the Gulf or Russia is achievable. We’ve placed 50,000+ candidates overseas.</p>
              <div className="mt-4">
                <a href="#contact" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors text-sm font-semibold">Contact Us</a>
              </div>
            </CardContent>
          </Card>

          <Card className={`border-2 hover:border-primary/20 hover:shadow-lg transition-all ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Blog 2: Why Choose Us – Asnani HR Solution</h3>
              <p className="text-gray-700 mb-3">Recruitment is about building careers and strong businesses. Here’s why companies and candidates choose us:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><span className="font-semibold">13+ Years of Recruitment Expertise</span> across Gulf and Russia.</li>
                <li><span className="font-semibold">25+ Trusted Clients Worldwide</span> with long-term partnerships.</li>
                <li><span className="font-semibold">50,000+ Successful Placements</span> across roles and industries.</li>
                <li><span className="font-semibold">Strong Candidate Database</span> of verified CVs for fast sourcing.</li>
                <li><span className="font-semibold">End-to-End Recruitment Support</span> from requirements to deployment.</li>
                <li><span className="font-semibold">Transparent & Reliable Process</span> with compliant, ethical practices.</li>
              </ul>
              <p className="text-gray-800 mt-4">Choosing us means choosing experience, trust, and results.</p>
              <div className="mt-4">
                <a href="#contact" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors text-sm font-semibold">Work With Us</a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6">
          <Card className={`border-2 hover:border-primary/20 hover:shadow-lg transition-all ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Article 1: Most In-Demand Jobs in the Middle East / Russia for 2025</h3>
              <p className="text-gray-700 mb-3">Energy investments and infrastructure create strong demand across both regions.</p>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li><span className="font-semibold">Engineers</span> – Mechanical, Civil, Electrical. Skills: PM, design tools.</li>
                <li><span className="font-semibold">QA/QC Inspectors</span> – Certifications: CSWIP, NACE/AMPP, BGAS, ISO, ASNT, IWE.</li>
                <li><span className="font-semibold">Skilled Technicians & Welders</span> – Pipe Fitters, 6G Welders, Fabricators, etc.</li>
                <li><span className="font-semibold">HSE Professionals</span> – NEBOSH, IOSH, OSHA. Oil & Gas, Construction, Manufacturing.</li>
                <li><span className="font-semibold">Hospitality & Services</span> – Roles in Gulf and a growing market in Russia.</li>
              </ol>
              <p className="text-gray-800 mt-4">We connect Indian professionals with genuine employers across these roles.</p>
            </CardContent>
          </Card>

          <Card className={`border-2 hover:border-primary/20 hover:shadow-lg transition-all ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Article 2: Visa Process for Gulf & Russia Jobs – A Complete Guide</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li><span className="font-semibold">Offer Letter</span> – confirms role, salary, and terms.</li>
                <li><span className="font-semibold">Medical Examination</span> – GAMCA/GCC for Gulf; govt-approved clinics for Russia.</li>
                <li><span className="font-semibold">Visa Processing</span> – employer initiates; agency coordinates documents.</li>
                <li><span className="font-semibold">Visa Stamping / Employment Visa</span> – embassy stamping or e-visa.</li>
                <li><span className="font-semibold">Travel & Deployment</span> – fly to destination and onboard.</li>
              </ol>
              <div className="mt-3 text-gray-700">
                <div className="font-semibold mb-1">Quick Tips</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Passport validity of 6+ months</li>
                  <li>Keep documents accurate and ready</li>
                  <li>Follow agency guidance to avoid delays</li>
                  <li>Account for country-specific requirements</li>
                </ul>
              </div>
              <p className="text-gray-800 mt-4">We assist candidates at every stage — from selection to deployment.</p>
              <div className="mt-4">
                <a href="#contact" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors text-sm font-semibold">Get Help with Visa</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}


