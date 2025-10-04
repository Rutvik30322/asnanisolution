import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

type FAQ = { question: string; answer: string | JSX.Element };

const faqs: FAQ[] = [
  {
    question: 'How can I apply for a job through Asnani HR Solution?',
    answer:
      'You can apply by submitting your CV through our website or by contacting us on WhatsApp/Email. Once we receive your CV, our team will match your profile with suitable job openings and connect with you if shortlisted.',
  },
  {
    question: 'What documents are required to apply for overseas jobs?',
    answer: (
      <div>
        <div className="mb-2">Generally, you need:</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>Updated CV</li>
          <li>Passport copy</li>
          <li>Educational certificates</li>
          <li>Experience certificates</li>
          <li>Professional certifications (if required, e.g., NACE, CSWIP, IWE, ARAMCO)</li>
        </ul>
        <div className="mt-2">Our team will guide you if additional documents are needed for a specific company.</div>
      </div>
    ),
  },
  {
    question: 'How does the recruitment process work?',
    answer: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>Client shares requirements</li>
        <li>We source & screen CVs</li>
        <li>Candidate coordination & confirmation</li>
        <li>Client shortlists candidates</li>
        <li>Interviews (online or face-to-face)</li>
        <li>Selection & Offer</li>
        <li>Visa process (stamping / employment visa)</li>
        <li>Deployment (candidate flies to destination country)</li>
      </ol>
    ),
  },
  {
    question: 'How long does it take to get a visa after selection?',
    answer:
      'Visa processing time depends on the country and employer. On average, it takes between 10 - 15 days. Our team will keep you updated throughout the process.',
  },
  {
    question: 'Which industries do you provide manpower for?',
    answer: (
      <div>
        <div className="mb-2">We provide manpower solutions for both blue-collar and white-collar categories.</div>
        <div className="font-semibold">Blue-Collar Roles:</div>
        <div>Welders, Fabricators, Electricians, Pipe Fitters, Scaffolders, Technicians, Helpers, and more.</div>
        <div className="font-semibold mt-2">White-Collar Roles:</div>
        <div>Managers, Engineers, Inspectors, Supervisors, QA/QC, Safety Officers, Administrative Staff.</div>
      </div>
    ),
  },
  {
    question: 'How do I know if a job offer is genuine?',
    answer:
      'If the job is processed through Asnani HR Solution, it is verified and authentic. We work only with trusted companies and ensure full transparency at every step.',
  },
  {
    question: 'Do you provide support after the candidate travels abroad?',
    answer:
      'Yes. Even after deployment, our team stays in touch to ensure smooth onboarding with the client company.',
  },
];

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" ref={ref} className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">FAQs - Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-2">Answers for candidates and clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {faqs.map((item, idx) => (
            <Card key={idx} className={`border-2 hover:border-primary/20 hover:shadow-lg transition-all ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: `${idx * 60}ms` }}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>{item.question}</span>
                </h3>
                <div className="text-gray-700 leading-relaxed text-sm md:text-base">{item.answer}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="inline-flex items-center px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-secondary transition-colors text-sm font-semibold">Still have questions? Contact us</a>
        </div>
      </div>
    </section>
  );
}


