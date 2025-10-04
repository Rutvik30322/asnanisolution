import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useCounterAnimation } from '@/hooks/use-counter-animation';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Star } from 'lucide-react';
import ALBawaniLogo from '../assets/AL-Bawani-logo.png';
import AlKhodariLogo from '../assets/Al-Khodari_Logo.svg.png';
import ALQussieLogo from '../assets/AL-QUSSIE.png';
import AlmaraiLogo from '../assets/Almarai_Corporate_Logo.svg.png';
import ArabtecLogo from '../assets/ARABTEC.png';
import BechtelLogo from '../assets/BECHTEL.jpeg';
import DrydocksLogo from '../assets/DRYDOCKS WORLD.jpeg';
import EpicPipingLogo from '../assets/epic_piping_logo.jpeg';
import FabtechLogo from '../assets/FABTECH.png';
import GacLogo from '../assets/GAC.jpg';
import DewaLogo from '../assets/Logo_of_DEWA.png';
import NassLogo from '../assets/Nass_Corporation_B.S.C._Logo.jpg';
import NesmaLogo from '../assets/NESMA & PARTNERS.png';
import RobtStoneLogo from '../assets/ROBT STONE.png';
import SaudiKadLogo from '../assets/SAUDI KAD.jpeg';
import SaudiOgerLogo from '../assets/Saudi-Oger-Ltd-Logo-Vector.svg-.png';
import STERLING from '../assets/STERLING & WILSON.png';
import UNEC from '../assets/UNEC.png';


// Client data with actual logo images
const clients = [
  {
    name: "AL BAWANI",
    industry: "Construction",
    logo: ALBawaniLogo,
    country: "Saudi Arabia"
  },
  {
    name: "Al-Khodari",
    industry: "Construction",
    logo: AlKhodariLogo,
    country: "Saudi Arabia"
  },
  {
    name: "AL-QUSSIE",
    industry: "International",
    logo: ALQussieLogo,
    country: "Saudi Arabia"
  },
  {
    name: "Almarai",
    industry: "Food & Beverage",
    logo: AlmaraiLogo,
    country: "Saudi Arabia"
  },
  {
    name: "ARABTEC",
    industry: "Construction",
    logo: ArabtecLogo,
    country: "UAE"
  },
  {
    name: "BECHTEL",
    industry: "Engineering",
    logo: BechtelLogo,
    country: "International"
  },
  {
    name: "DRYDOCKS WORLD",
    industry: "Maritime",
    logo: DrydocksLogo,
    country: "UAE"
  },
  {
    name: "EPIC PIPING",
    industry: "Manufacturing",
    logo: EpicPipingLogo,
    country: "International"
  },
  {
    name: "FABTECH",
    industry: "Manufacturing",
    logo: FabtechLogo,
    country: "International"
  },
  {
    name: "GAC",
    industry: "Logistics",
    logo: GacLogo,
    country: "International"
  },
  {
    name: "DEWA",
    industry: "Utilities",
    logo: DewaLogo,
    country: "UAE"
  },
  {
    name: "Nass Corporation",
    industry: "Construction",
    logo: NassLogo,
    country: "Oman"
  },
  {
    name: "NESMA & PARTNERS",
    industry: "Construction",
    logo: NesmaLogo,
    country: "Saudi Arabia"
  },
  {
    name: "ROBT STONE",
    industry: "Manufacturing",
    logo: RobtStoneLogo,
    country: "International"
  },
  {
    name: "SAUDI KAD",
    industry: "Construction",
    logo: SaudiKadLogo,
    country: "Saudi Arabia"
  },
  {
    name: "Saudi Oger",
    industry: "Construction",
    logo: SaudiOgerLogo,
    country: "Saudi Arabia"
  },
  {
    name: "STERLING & WILSON",
    industry: "Engineering",
    logo: STERLING,
    country: "International"
  },
  {
    name: "UNEC",
    industry: "Construction",
    logo: UNEC,
    country: "International"
  }
];

const testimonials = [
  {
    text: "Asnani HR Solutions provided us with highly skilled construction professionals who exceeded our project expectations. Their screening process is thorough and reliable.",
    client: "Project Manager",
    company: "Major Construction Firm, UAE",
    rating: 5
  },
  {
    text: "We have been working with Asnani HR for over 5 years. They consistently deliver quality candidates for our oil & gas operations across the Gulf region.",
    client: "HR Director",
    company: "Petrochemical Company, Saudi Arabia",
    rating: 5
  },
  {
    text: "Their hospitality recruitment services helped us staff our new hotel with experienced professionals. The mobilization process was smooth and efficient.",
    client: "General Manager",
    company: "Luxury Hotel Chain, Qatar",
    rating: 5
  }
];

export function ClientsSection() {
  const { ref, isVisible } = useScrollAnimation();
  
  // Counter animations for stats
  const yearsCount = useCounterAnimation(13, 2000, isVisible);
  const placementsCount = useCounterAnimation(50000, 2000, isVisible);
  const countriesCount = useCounterAnimation(10, 2000, isVisible);
  const clientsCount = useCounterAnimation(25, 2000, isVisible);
  const profilesCount = useCounterAnimation(100000, 2000, isVisible);
  const repeatClientsCount = useCounterAnimation(90, 2000, isVisible);

  return (
    <section id="clients" ref={ref} className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 md:mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary">Trusted Clients</span>
          </h2>
          <p className="text-xl text-gray-600">
            Proud to serve leading organizations across Gulf, Middle East, Russia and International markets
          </p>
        </div>

        {/* Sliding Client Carousel */}
        <div className="mb-12 w-full overflow-hidden">
          <div className="relative w-full">
            <div className="flex animate-scroll-horizontal space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10">
              {[...clients, ...clients].map((client, index) => (
                <div 
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56"
                >
                  <Card className="industry-card text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white">
                    <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center">
                                              {/* Client Logo Image */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-lg flex items-center justify-center mb-2 sm:mb-3 shadow-md overflow-hidden border-2 border-gray-100 hover:border-primary/20 transition-colors">
                          <img 
                            src={client.logo} 
                            alt={`${client.name} logo`} 
                            className="w-full h-full object-contain p-2 sm:p-3" 
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'w-full h-full flex items-center justify-center text-gray-500 text-xs font-semibold';
                              fallback.textContent = client.name.substring(0, 2);
                              target.parentNode?.appendChild(fallback);
                            }}
                          />
                        </div>
                      <h4 className="font-semibold text-xs md:text-sm mb-1 text-gray-800">{client.name}</h4>
                      <p className="text-xs text-gray-500 mb-1">{client.industry}</p>
                      <p className="text-xs text-gray-400">{client.country}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Testimonials */}
        <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-3 sm:mb-4 italic text-sm sm:text-base">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="border-t pt-3 sm:pt-4">
                    <p className="font-semibold text-xs sm:text-sm">{testimonial.client}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stats */}
        <div className={`mt-12 bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-4 sm:p-6 lg:p-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 text-center">
            <div>
              <Building className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-accent mx-auto mb-2 sm:mb-3 lg:mb-4" />
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                {yearsCount}+
              </h4>
              <p className="opacity-90 text-xs sm:text-sm lg:text-base">Years of Excellence</p>
            </div>
            <div>
              <Building className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-accent mx-auto mb-2 sm:mb-3 lg:mb-4" />
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                {placementsCount}+
              </h4>
              <p className="opacity-90 text-xs sm:text-sm lg:text-base">Successful Placements</p>
            </div>
            <div>
              <Building className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-accent mx-auto mb-2 sm:mb-3 lg:mb-4" />
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                {countriesCount}+
              </h4>
              <p className="opacity-90 text-xs sm:text-sm lg:text-base">Countries Served</p>
            </div>
            <div>
              <Building className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-accent mx-auto mb-2 sm:mb-3 lg:mb-4" />
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                {clientsCount}+
              </h4>
              <p className="opacity-90 text-xs sm:text-sm lg:text-base">Satisfied Clients</p>
            </div>
            <div>
              <Building className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-accent mx-auto mb-2 sm:mb-3 lg:mb-4" />
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                {profilesCount.toLocaleString()}+
              </h4>
              <p className="opacity-90 text-xs sm:text-sm lg:text-base">Candidate Profiles</p>
            </div>
            <div>
              <Building className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-accent mx-auto mb-2 sm:mb-3 lg:mb-4" />
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                {repeatClientsCount}%
              </h4>
              <p className="opacity-90 text-xs sm:text-sm lg:text-base">Repeat Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}