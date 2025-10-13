import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Link } from 'wouter';

type BlogCard = {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
};

const blogCards: BlogCard[] = [
  {
    title: 'How to Get a Job in the Gulf or Russia',
    excerpt: 'Step-by-step guide from industry choice to deployment.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    slug: 'how-to-get-a-job-gulf-russia',
  },
  {
    title: 'Why Choose Us – Asnani HR Solutions',
    excerpt: 'Experience, network and transparent, end‑to‑end recruitment.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    slug: 'why-choose-us-asnani',
  },
  {
    title: 'Most In‑Demand Jobs in 2025',
    excerpt: 'Gulf and Russia roles hiring Indian professionals now.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    slug: 'in-demand-jobs-2025',
  },
  {
    title: 'Visa Process – Gulf & Russia Guide',
    excerpt: 'Offer to deployment: clear steps and tips for candidates.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
    slug: 'visa-process-gulf-russia',
  },
];

export function BlogSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="blog" ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Our Insights</h2>
          <p className="text-gray-600 mt-2">Curated articles to help candidates and clients make better decisions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogCards.map((card, index) => (
            <Link key={card.slug} href={`/insights/${card.slug}`}>
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
                    <p className="text-sm opacity-90 mt-1 line-clamp-2">{card.excerpt}</p>
                    <span className="inline-block mt-3 text-xs font-semibold tracking-wide uppercase">Read more →</span>
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

