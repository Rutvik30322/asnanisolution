import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ArrowLeft, TrendingUp, BookOpen, Target, Users } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { useEffect, useState } from 'react';

const insightsData = {
  'how-to-get-a-job-gulf-russia': {
    title: 'How to Get a Job in the Gulf or Russia',
    description: 'Step‑by‑step guide from choosing your industry to deployment.',
    icon: TrendingUp,
    color: 'bg-blue-600',
    content: {
      heading: 'Step by Step Guide',
      sections: [
        {
          title: 'Identify the Right Industry',
          content: 'Gulf: Oil & Gas, Civil Construction, Mechanical, Hospitality. Russia: Oil & Gas projects, Construction (bridges, pipelines, infrastructure), Manufacturing, Skilled Technicians, Blue‑Collar trades.'
        },
        {
          title: 'Prepare a Professional CV',
          content: 'Keep it clear and updated (2–3 pages). Highlight technical skills and certifications: CSWIP, IWE, NACE (AMPP)/BGAS, NEBOSH, ASNT, relevant professional certificates. Mention Gulf/Russia experience if any.'
        },
        {
          title: 'Apply Through a Trusted Recruitment Agency',
          content: 'Avoid unverified agents. Apply via licensed agencies like Asnani HR Solutions—approved and experienced in both Gulf and Russian recruitment.'
        },
        {
          title: 'Attend Interviews',
          content: 'Interviews may be online, telephonic, or face‑to‑face. Gulf employers focus on project experience. Russian employers check adaptability to climate, commitment to longer contracts, and technical efficiency.'
        },
        {
          title: 'Complete Documentation & Visa',
          content: 'Gulf: Offer → Medical → Visa stamping/paper visa → Travel. Russia: Offer → Medical → Work permit & visa processing → Travel. Your agency guides every step.'
        },
        {
          title: 'Travel & Start Your Career',
          content: 'After visa approval, fly to your destination—Dubai, Doha, Riyadh, or Moscow—and begin onboarding.'
        },
        {
          title: 'Conclusion',
          content: 'With the right preparation and support, securing a job in the Gulf or Russia is achievable. Asnani HR Solutions has placed 50,000+ candidates overseas.'
        }
      ]
    }
  },
  'why-choose-us-asnani': {
    title: 'Why Choose Us – Asnani HR Solutions',
    description: 'Experience, trust and end‑to‑end support for Gulf & Russia.',
    icon: Users,
    color: 'bg-orange-600',
    content: {
      heading: 'What Sets Us Apart',
      sections: [
        { title: '13+ Years of Recruitment Expertise', content: 'Extensive white‑collar and blue‑collar hiring across Oil & Gas, Construction, Mechanical, Civil, Hospitality; now expanding into Russia’s infrastructure and manufacturing.' },
        { title: '25+ Trusted Clients Worldwide', content: 'Leading Gulf companies and growing Russian partnerships rely on us for quality manpower and workforce planning.' },
        { title: '50,000+ Successful Placements', content: 'Engineers, inspectors, technicians, welders, hospitality staff across the Middle East; now enabling opportunities in Russia.' },
        { title: 'Strong Candidate Database', content: 'Large pool of verified CVs for Gulf and Russia enables fast sourcing, better matching, and high selection ratios.' },
        { title: 'End‑to‑End Recruitment Support', content: 'Requirements understanding → CV sourcing & screening → coordination → interviews → selection → visa/work‑permit processing → deployment.' },
        { title: 'Transparent & Reliable Process', content: 'Ethical, compliant, clear communication—no false promises, only verified opportunities.' },
        { title: 'Conclusion', content: 'Choose experience, trust, and results. Whether you are a company or a candidate, we connect talent with success.' }
      ]
    }
  },
  'in-demand-jobs-2025': {
    title: 'Most In‑Demand Jobs in 2025 – Gulf & Russia',
    description: 'Top roles hiring Indian professionals across both regions.',
    icon: BookOpen,
    color: 'bg-green-600',
    content: {
      heading: 'Opportunities for Indian Professionals',
      sections: [
        { title: 'Regional Outlook', content: 'Gulf remains a hub for energy investments—refineries, petrochemicals, offshore drilling, LNG. Russia is growing across oil & gas, heavy infrastructure, power plants, and skilled trades.' },
        { title: 'Engineers (Mechanical, Civil, Electrical)', content: 'Industries: Oil & Gas, Infrastructure, Power, Manufacturing. Skills: Project Management, PV Elite, AME Tanks, SolidWorks, AutoCAD. Gulf experience is a plus.' },
        { title: 'QA/QC Inspectors', content: 'Certifications: CSWIP, NACE (AMPP)/BGAS, ISO 9001 Lead Auditor, ASNT Level II, IWE. Skills: welding inspection, material testing, pipeline QA.' },
        { title: 'Skilled Technicians & Welders', content: 'Demand for Pipe Fitters, 6G Welders, Fabricators, Electrical Technicians, Vessel Fitters, Riggers and more. Qualifications: ITI/Trade certificates; adaptability valued.' },
        { title: 'HSE Professionals', content: 'Certifications: NEBOSH IGC, IOSH, OSHA. Industries: Oil & Gas, Construction, Manufacturing.' },
        { title: 'Hospitality & Services', content: 'Gulf tourism drives roles across UAE, Saudi, Qatar. Russia sees growing need for multilingual staff, chefs, and service professionals.' },
        { title: 'Hiring Trends 2025', content: 'Certified professionals preferred; overseas‑experienced candidates shortlisted faster; demand across blue‑ and white‑collar; growth sectors: Oil & Gas, Construction, Manufacturing.' },
        { title: 'Conclusion', content: 'We bridge talent and opportunity with 13+ years’ experience, 25+ clients, and 50,000+ placements across Gulf and Russia.' }
      ]
    }
  },
  'visa-process-gulf-russia': {
    title: 'Visa Process – Gulf & Russia Guide',
    description: 'Clear steps from offer to deployment with tips for candidates.',
    icon: Target,
    color: 'bg-purple-600',
    content: {
      heading: 'A Complete Guide for Indian Candidates',
      sections: [
        { title: 'Step 1: Offer Letter', content: 'Issued after selection; includes role, salary, benefits, and terms.' },
        { title: 'Step 2: Medical Examination', content: 'Gulf: GAMCA/GCC or employer‑specified medicals. Russia: government‑approved clinics; may include blood work, X‑ray, general checks.' },
        { title: 'Step 3: Visa Processing', content: 'Employer initiates; agency coordinates documents (passport, photos, certificates) and shares status updates.' },
        { title: 'Step 4: Visa Stamping / Employment Visa', content: 'Some countries require embassy stamping; others issue electronic employment visas (paper visas).' },
        { title: 'Step 5: Travel & Deployment', content: 'After approval, travel is arranged; onboarding begins in destination city—Dubai, Doha, Riyadh, or Moscow.' },
        { title: 'Quick Tips', content: 'Keep passport valid 6+ months. Keep documents accurate and ready. Follow agency guidance to avoid delays. Expect country‑specific requirements (e.g., translated documents for Russia).' },
        { title: 'Conclusion', content: 'With proper guidance, the visa process is straightforward. Asnani HR Solutions supports candidates from job selection to deployment.' }
      ]
    }
  }
};

export default function Insights() {
  const [, params] = useRoute('/insights/:slug');
  const [insightData, setInsightData] = useState<any>(null);

  useEffect(() => {
    const slug = params?.slug;
    const data = insightsData[slug as keyof typeof insightsData];
    if (data) {
      setInsightData(data);
    }
  }, [params]);

  if (!insightData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const Icon = insightData.icon;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/">
          <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </Link>
      </div>

      {/* Insights Detail Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Image Section */}
            <div className="lg:col-span-1">
              <div className="h-[400px] md:h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt={insightData.title}
                  className="rounded-xl shadow-lg w-full h-full object-cover"
                  loading="lazy"
                  width="1200"
                  height="500"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className={`${insightData.color} w-16 h-16 rounded-xl flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {insightData.title}
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    {insightData.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {insightData.content.heading}
                </h2>
                
                {insightData.content.sections.map((section: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
