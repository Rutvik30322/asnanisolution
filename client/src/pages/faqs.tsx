import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ArrowLeft, HelpCircle, FileText, Clock, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { useEffect, useState } from 'react';
import { SEO } from '@/components/seo';

const faqsData = {
  'general-faqs': {
    title: 'General FAQs',
    description: 'Common questions about our recruitment services, processes, and general information.',
    icon: HelpCircle,
    color: 'bg-blue-600',
    faqs: [
      {
        question: 'How can I apply for a job through Asnani HR Solution?',
        answer: 'You can apply by submitting your CV through our website or by contacting us on WhatsApp/Email. Once we receive your CV, our team will match your profile with suitable job openings and connect with you if shortlisted.'
      },
      {
        question: 'What documents are required to apply for overseas jobs?',
        answer: 'Generally, you need: Updated CV, Passport copy, Educational certificates, Experience certificates, and professional certifications if required (e.g., NACE, CSWIP, IWE, ARAMCO, etc.). Our team will guide you if any additional documents are needed for a specific company.'
      },
      {
        question: 'How does the recruitment process work?',
        answer: 'Our process is simple: Client shares requirements → We source & screen CVs → Candidate coordination & confirmation → Client shortlists candidates → Interviews (online or face‑to‑face) → Selection & Offer → Visa process (stamping / employment visa) → Deployment (candidate flies to destination country).'
      },
      {
        question: 'How long does it take to get a visa after selection?',
        answer: 'Visa processing time depends on the country and employer, typically 10–15 days. Our team keeps you updated throughout.'
      },
      {
        question: 'Which industries do you provide manpower for?',
        answer: 'We provide manpower solutions for both blue‑collar and white‑collar categories. Blue‑collar: Welders, Fabricators, Electricians, Pipe Fitters, Scaffolders, Technicians, Helpers, and other skilled/unskilled manpower. White‑collar: Managers, Engineers, Inspectors, Supervisors, QA/QC, Safety Officers, Administrative Staff.'
      },
      {
        question: 'How do I know if a job offer is genuine?',
        answer: 'If the job is processed through Asnani HR Solution, it is verified and authentic. We work only with trusted companies and ensure full transparency at every step.'
      },
      {
        question: 'Do you provide support after the candidate travels abroad?',
        answer: 'Yes. Even after deployment, our team stays in touch to ensure smooth onboarding with the client company.'
      }
    ]
  },
  'candidate-faqs': {
    title: 'For Candidates',
    description: 'Questions about job opportunities, application process, visa requirements, and deployment.',
    icon: FileText,
    color: 'bg-green-600',
    faqs: [
      {
        question: 'How can I apply for jobs through Asnani HR Solutions?',
        answer: 'You can apply by submitting your resume and relevant documents through our website or by visiting our office. We will review your qualifications and match you with suitable opportunities based on your skills and experience.'
      },
      {
        question: 'What documents do I need to provide?',
        answer: 'You will need to provide your resume, educational certificates, work experience certificates, passport copy, and any relevant skill certifications. We will guide you through the complete documentation process.'
      },
      // {
      //   question: 'Do you charge candidates any fees?',
      //   answer: 'Our recruitment services are free for candidates. We are paid by our clients (employers) for successful placements. However, candidates are responsible for their own visa and travel expenses as per standard industry practices.'
      // },
      {
        question: 'How long does the recruitment process take?',
        answer: 'The recruitment process typically takes 2-4 weeks from initial application to final selection, depending on the specific requirements and client timelines. We keep candidates informed throughout the process.'
      },
      {
        question: 'What support do you provide after placement?',
        answer: 'We provide comprehensive support including visa processing assistance, travel arrangements, orientation about the destination country, and ongoing support during the initial period of employment to ensure smooth transition.'
      }
    ]
  },
  'client-faqs': {
    title: 'For Clients',
    description: 'Information about our services, timelines, and how we can help your business.',
    icon: Clock,
    color: 'bg-purple-600',
    faqs: [
      {
        question: 'How do you source candidates?',
        answer: 'We maintain an extensive database of qualified candidates and use multiple sourcing channels including job portals, social media, referrals, and direct recruitment. Our IT-enabled system ensures easy access to candidate information and quick matching.'
      },
      // {
      //   question: 'What is your pricing structure?',
      //   answer: 'Our pricing is competitive and varies based on the type of positions, number of candidates required, and specific requirements. We offer transparent pricing with no hidden costs. Contact us for a detailed quote tailored to your needs.'
      // },
      {
        question: 'How quickly can you provide candidates?',
        answer: 'We can typically provide qualified candidates within 1-2 weeks for most positions, thanks to our extensive database and efficient sourcing processes. For specialized roles, the timeline may be slightly longer.'
      },
      {
        question: 'Do you provide replacement guarantees?',
        answer: 'Yes, we provide replacement guarantees for candidates who do not meet performance standards or leave within the guarantee period. This ensures you get the right talent for your organization.'
      },
      {
        question: 'What industries do you specialize in?',
        answer: 'We specialize in Oil & Gas, Construction, Electrical & Instrumentation, HVAC, Manufacturing, Hospitality, and General Services. Our expertise covers both blue-collar and white-collar positions across these industries.'
      }
    ]
  },
  'support-faqs': {
    title: 'Support & Help',
    description: 'Technical support, account assistance, and help with any issues you may encounter.',
    icon: Shield,
    color: 'bg-orange-600',
    faqs: [
      {
        question: 'How can I contact your support team?',
        answer: 'You can contact us through our website contact form, email, phone, or by visiting our office. Our support team is available during business hours and will respond to your queries promptly.'
      },
      {
        question: 'What if I have issues with my application?',
        answer: 'If you encounter any issues with your application, please contact our support team immediately. We will investigate and resolve the issue as quickly as possible to ensure your application process continues smoothly.'
      },
      {
        question: 'Do you provide assistance with visa processing?',
        answer: 'Yes, we provide comprehensive assistance with visa processing including document preparation, application submission, and coordination with relevant authorities. Our strong government relations help expedite the process.'
      },
      {
        question: 'What if I need to update my information?',
        answer: 'You can update your information by contacting our support team or visiting our office. We recommend keeping your profile updated with the latest information to ensure accurate matching with opportunities.'
      },
      {
        question: 'How do you handle complaints or feedback?',
        answer: 'We take all complaints and feedback seriously. You can submit your feedback through our website or contact our support team directly. We will investigate and take appropriate action to address your concerns.'
      }
    ]
  }
};

export default function FAQs() {
  const [, params] = useRoute('/faqs/:slug');
  const [faqData, setFaqData] = useState<any>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const slug = params?.slug;
    const data = faqsData[slug as keyof typeof faqsData];
    if (data) {
      setFaqData(data);
    }
  }, [params]);

  if (!faqData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const Icon = faqData.icon;

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${faqData.title} | Asnani HR Solutions`}
        description={faqData.description}
        keywords={`${faqData.title.toLowerCase()}, faqs, recruitment, hr solutions, job questions`}
      />
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

      {/* FAQs Detail Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Image Section */}
            <div className="lg:col-span-1">
              <div className="h-[400px] md:h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt={faqData.title}
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
                <div className={`${faqData.color} w-16 h-16 rounded-xl flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {faqData.title}
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    {faqData.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                
                {faqData.faqs.map((faq: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 py-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
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
