import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { HelpCircle } from 'lucide-react';
import { Link } from 'wouter';

type FaqCard = {
  title: string;
  description: string;
  image: string;
  slug: string;
};

const faqCards: FaqCard[] = [
  {
    title: 'General FAQs',
    description: 'Know our services, process and overall information.',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop',
    slug: 'general-faqs',
  },
  {
    title: 'For Candidates',
    description: 'Applications, documents, timelines and support.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop',
    slug: 'candidate-faqs',
  },
  {
    title: 'For Clients',
    description: 'Sourcing speed, pricing and guarantees explained.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop',
    slug: 'client-faqs',
  },
  {
    title: 'Support & Help',
    description: 'Account issues, updates and visa assistance.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
    slug: 'support-faqs',
  },
];

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Our FAQs</h2>
          <p className="text-gray-600 mt-2">Quick answers organized by topic</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faqCards.map((card, index) => (
            <Link key={card.slug} href={`/faqs/${card.slug}`}>
              <a className={`group block relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: `${index * 80}ms` }}>
                <div className="h-72 md:h-80">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  {/* Bottom gradient to improve text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                </div>
                <div className="absolute left-0 right-0 bottom-0 text-white pointer-events-none">
                  <svg className="w-full h-24 text-gray-900" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <path d="M0.00,49.98 C150.00,150.00 349.74,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-gray-900/95 group-hover:fill-primary transition-colors duration-300"></path>
                  </svg>
                  <div className="-mt-14 px-5 pb-5 pointer-events-auto">
                    <h3 className="text-xl font-bold">{card.title}</h3>
                    <p className="text-sm opacity-90 mt-1 line-clamp-2">{card.description}</p>
                    <span className="inline-block mt-3 text-xs font-semibold tracking-wide uppercase">View FAQs →</span>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


