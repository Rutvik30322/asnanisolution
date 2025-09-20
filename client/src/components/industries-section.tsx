import { HardHat, Zap, ConciergeBell, Fan, Factory, Sparkles,  } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Card, CardContent } from '@/components/ui/card';

const industries = [
   {
    title: "Oil & Gas",
    icon: Zap,
    description: "Specialized personnel for petrochemical, refinery, and mechanical projects in the energy sector.",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    tags: ["Welder", "Fitter", "QA/QC Engineer/ Supervisor/ Inspector"]
  },
  {
    title: "Electrical & Instrumentation",
    icon: Sparkles,
    description: "Experienced electrical and instrumentation engineers, technicians, and supervisors supporting power, oil & gas and industrial facilities.",
    image: "https://res.cloudinary.com/shivshaktisite/image/upload/v1758280123/How_to_Troubleshoot_and_Repair_a_Faulty_Power_Transformer_amnxzd.jpg",
    tags: ["Electrical Engineer/ Supervisor/ Inspector", "Instrumentation Engineer/ Supervisor/ Inspector", "PLC Engineer/ Supervisor/ Inspector"]
  },
  {
    title: "Construction",
    icon: HardHat,
    description: "Civil Engineer/ Supervisor/ Inspector, QA/QC supervisors, skilled trades, and construction laborers for major projects.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    tags: ["Civil Engineer/ Supervisor/ Inspector", "Mason", "Carpenter"]
  },
  {
    title: "HVAC",
    icon: Fan,
    description: "HVAC Engineer/ Supervisor/ Inspector, technicians, duct fabricators, and air conditioning specialists.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    tags: ["HVAC Engineer/ Supervisor/ Inspector", "A/C Mechanic", "Duct Fitter"]
  },
  {
    title: "Hospitality",
    icon: ConciergeBell,
    description: "Hotel management, F&B services, housekeeping, and specialized hospitality roles.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    tags: ["Chef", "Waiter", "Receptionist"]
  },
 
  {
    title: "Manufacturing",
    icon: Factory,
    description: "Production specialists, quality control experts, and skilled manufacturing personnel.",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
    tags: ["Technician", "Operator", "Supervisor"]
  },
  
];

export function IndustriesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="industries" ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Key Industries We <span className="text-primary">Specialize In</span>
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive recruitment solutions across multiple sectors
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <Card 
                key={industry.title}
                className={`industry-card overflow-hidden cursor-pointer ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={industry.image} 
                  alt={`Asnani HR Solutions ${industry.title} recruitment and manpower services for Gulf and Middle East`} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  width="400"
                  height="200"
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Icon className="h-8 w-8 text-accent mr-3" />
                    <h3 className="text-xl font-bold">{industry.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
