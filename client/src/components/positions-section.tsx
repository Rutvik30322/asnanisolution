import { useState } from 'react';
import { ChevronDown, HardHat, Zap, ConciergeBell, Fan, Check, BrainCircuit, Scissors, Users, Building2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

type PositionGroup = { title: string; positions: string[] };
type SectionWithGroups = { title: string; icon: any; color: string; groups: PositionGroup[] };
type SectionWithPositions = { title: string; icon: any; color: string; positions: string[] };
type Section = SectionWithGroups | SectionWithPositions;

const positionsData: Record<string, Section> = {
  oilgas: {
    title: "Oil & Gas / Mechanical Projects",
    icon: Zap,
    color: "from-red-500 to-red-600",
    groups: [
      {
        title: "👔 White Collar",
        positions: [
          "QA / QC Engineer / Supervisor / Inspector",
          "Welding Engineer / Inspector",
          "Painting Engineer / Supervisor / Inspector",
          "Safety Officer (Specialized in Mechanical)",
          "All Trades Supervisor / Foreman / Leadman",
          "Welding Foreman / Supervisor"
        ]
      },
      {
        title: "🛠️ Blue Collar",
        positions: [
          "Fitter – Pipe / Structural / Mechanical",
          "Rigger",
          "Rotating Equipment Technician",
          "Steel Erector",
          "Welder – Argon / Arc / MIG / Structural",
          "Sand Blaster / Spray Painter",
          "Sheet Metal Fabricator",
          "Millwright Fitter",
          "Fabricator – Pipe / Steel / Structural",
          "Mechanical Helpers",
          "Scaffolder",
          "Sheet Metal Fitter",
          "Grinder / Gas Cutter"
        ]
      }
    ]
  },
  electrical: {
    title: "Electrical & Instrumentation",
    icon: BrainCircuit,
    color: "from-blue-500 to-blue-600",
    groups: [
      {
        title: "👔 White Collar (Professional / Supervisory)",
        positions: [
          "QA / QC Engineer / Inspector",
          "Supervisor / Foreman / Leadman – Electrical / Instrument",
          "Electrical Engineer",
          "Instrumentation Engineer",
          "Draftsman – Electrical / Instrumentation",
          "Planning Engineer – E&I",
          "Testing & Commissioning Engineer"
        ]
      },
      {
        title: "🔧 Blue Collar (Skilled / Semi-skilled)",
        positions: [
          "Electrician – Building / Industrial / Generator",
          "Instrument Technician / Analyzer Technician",
          "Instrument Fitter",
          "Tray Fitter",
          "Motor Rewinder",
          "Cable Pullers",
          "Cable Jointer",
          "Lineman",
          "Electrical Helpers"
        ]
      }
    ]
  },
  construction: {
    title: "Construction",
    icon: HardHat,
    color: "from-orange-500 to-orange-600",
    groups: [
      {
        title: "🔧 Blue Collar (Skilled / Semi-skilled)",
        positions: [
          "Mason (Tiles / Marble / Block / Plaster)",
          "Shuttering Carpenter",
          "Carpenter (Finishing / Furniture / Carving)",
          "Furniture Polisher",
          "Painter (Brush / Spray)",
          "Furniture / Wood Painter (Brush / Spray)",
          "Gypsum Board Carpenter",
          "Gypsum Board Fixer",
          "Marble / Granite Cutter",
          "Steel Fixer",
          "Plumber",
          "Civil Labourers",
          "Scaffolder"
        ]
      },
      {
        title: "👔 White Collar",
        positions: [
          "Civil Engineer / Supervisor / Inspector",
          "QA QC Engineer / Supervisor / Inspector (Civil)",
          "Quantity Surveyor (Civil)",
          "Estimator (Civil)",
          "Land Surveyor",
          "Lab Technician (Concrete)",
          "Draftsman (Civil / Architectural)",
          "Project Coordinator / Site Coordinator"
        ]
      }
    ]
  },
  hvac: {
    title: "HVAC",
    icon: Fan,
    color: "from-cyan-500 to-cyan-600",
    groups: [
      {
        title: "👔 White Collar (Specialized / Supervisory)",
        positions: [
          "HVAC Engineer / Supervisor / Inspector",
          "Insulation Supervisor / Foreman / Leadman",
          "A/C Plant Supervisor",
          "HVAC Supervisor / Foreman / Leadman",
          "Duct Supervisor / Foreman / Leadman"
        ]
      },
      {
        title: "🔧 Blue Collar (Skilled / Semi-skilled)",
        positions: [
          "A/C Mechanic – Window / Split / Central / Chiller",
          "Water Cooler Mechanic",
          "HVAC Technician (Copper Brazing)",
          "Duct Fitter",
          "Duct Fabricator",
          "Duct Erector",
          "Duct Insulator",
          "A/C Pipe Fabricator",
          "Insulate",
          "Helpers – Air Conditioning / Duct"
        ]
      }
    ]
  },
  hospitality: {
    title: "Hospitality",
    icon: ConciergeBell,
    color: "from-pink-500 to-pink-600",
    groups: [
      {
        title: "🧑‍💼 White Collar",
        positions: [
          "F&B Manager",
          "Floor Supervisor",
          "Receptionist",
          "Accountant",
          "Captains (Restaurant)",
          "Time Keeper",
          "Security Officer",
          "Laundry Manager",
          "Housekeeping Supervisor",
          "Event Coordinator",
          "Concierge"
        ]
      },
      {
        title: "🛠️ Blue Collar",
        positions: [
          "Stewards",
          "Waiters",
          "Bell Boy",
          "Drivers",
          "Cook",
          "Chefs",
          "Butcher",
          "Roti Maker",
          "Baker",
          "Carpet Fixer",
          "Cleaners",
          "Beautician",
          "Hair Dresser",
          "Swimming Trainer",
          "Cashier",
          "Room Attendants",
          "Baristas",
          "Bartenders",
          "Kitchen Helpers",
          "Dishwashers",
          "Spa Therapist / Masseuse",
          "Gym Trainer / Fitness Instructor",
          "Porter / Baggage Handler"
        ]
      }
    ]
  },
  tailoring: {
    title: "Tailoring & Upholstery",
    icon: Scissors,
    color: "from-purple-500 to-purple-600",
    groups: [
      {
        title: "👔 White Collar (Specialized / Supervisory)",
        positions: [
          "Cutter Master (Gents & Ladies)",
          "Upholstry Personnel",
          "Juki Machine Mechanic"
        ]
      },
      {
        title: "🔧 Blue Collar (Skilled / Semi-skilled)",
        positions: [
          "Tailor (Gents / Ladies / Tent / Umbrella)",
          "Curtain Maker",
          "Embroider (Hand / Machine)",
          "Tailoring Helpers",
          "Juki Machine Operator",
          "Sewing Machine Operator",
          "Sofa Seat Cover Maker",
          "Sofa Cushion Maker"
        ]
      }
    ]
  }

};

export function PositionsSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const toggleSection = (sectionName: string) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  return (
    <section id="positions" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Positions We <span className="text-primary">Cover</span>
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive workforce solutions across all skill levels
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(positionsData).map(([key, section], index) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === key;
            
            return (
              <div 
                key={key}
                className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className={`bg-gradient-to-r ${section.color} text-white p-6 rounded-t-lg cursor-pointer hover:shadow-lg transition-all duration-300`}
                  onClick={() => toggleSection(key)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon className="h-8 w-8 mr-4" />
                      <h3 className="text-xl font-bold">{section.title}</h3>
                    </div>
                    <ChevronDown 
                      className={`h-6 w-6 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
                
                <div 
                  className={`position-section bg-gray-50 border border-gray-200 rounded-b-lg overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'expanded' : ''
                  }`}
                >
                  <div className="p-6">
                    {'groups' in section ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        {section.groups.map((group) => (
                          <div key={group.title}>
                            <div className="flex items-center mb-2">
                              <h4 className="text-base font-bold text-gray-800">{group.title}</h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              {group.positions.map((position: string) => (
                                <div key={position} className="flex items-center">
                                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{position}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={`grid ${(section as SectionWithPositions).positions.length > 14 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                        {(section as SectionWithPositions).positions.map((position: string, posIndex: number) => (
                          <div key={position} className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{position}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
