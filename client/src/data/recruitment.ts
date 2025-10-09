import { HardHat, Zap, Wrench, Users, Building, Factory } from 'lucide-react';

export type RecruitmentCategory = {
  slug: string;
  title: string;
  description: string;
  icon: any;
  image: string;
  color: string; // tailwind gradient classes
  categories: any[];
  totalPositions: number;
};

export const recruitmentCategories: RecruitmentCategory[] = [
  {
    slug: 'oil-gas-mechanical-projects',
    title: 'Oil & Gas / Mechanical Projects',
    description: 'Specialized personnel for petrochemical, refinery, and mechanical projects',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    color: 'from-orange-500 to-red-600',
    categories: [
      {
        name: 'Welders',
        positions: [
          'GTAW Welder', 'GTAW+SMAW Welder', 'GMAW Welder', 'FCAW Welder 6G',
          'FCAW Welder 3G/4G', 'FCAW+SMAW Welder', 'Gouger', 'Aluminium Pipe Welder',
          'Inconel Welder', 'SAW Welder', 'SMAW Welder', 'TACK Welder 2G/3G/4G',
          'Alloy Welder', 'Welding Foreman'
        ]
      },
      {
        name: 'Fabrication & Fitting',
        positions: [
          'Vessel Fabricator', 'Vessel Fitter', 'Tank Fabricator', 'Tank Fitter',
          'Structure Fabricator', 'Structure Fitter', 'Pipe Fabricator', 'Pipe Fitter',
          'Aluminium Fabricator', 'Vessel Foreman', 'Structure Foreman', 'Piping Foreman'
        ]
      },
      {
        name: 'Mechanical Projects',
        positions: [
          'Manual Milling Machine Operator', 'Manual Lathe Machine Operator', 'CNC Operator',
          'VMC Operator', 'Turner', 'Machinist', 'CNC Plasma Machine Operator',
          'CNC Oxy Machine Operator', 'Machine Shop Mechanic', 'Compressor Mechanic',
          'AC Technician', 'Hydraulic Heavy Equipment Mechanic', 'Hydra Operator',
          'Panel Electrician', 'Auto Electrician', 'Denter (Car & Bus)', 'Rigger', 'Rigging Foreman'
        ]
      },
      {
        name: 'Engineers / Supervisors',
        positions: [
          'QA/QC Engineer / Inspector', 'Mechanical Draftsman', 'Production Manager / Engineer',
          'Welding Engineer', 'Welding Supervisor', 'NDT Engineer / Inspector',
          'Structure Engineer', 'Structure Supervisor', 'Vessel Supervisor',
          'Piping Engineer', 'Piping Supervisor', 'Safety Officer (Mechanical)',
          'Rigging Supervisor', 'Document Controller', 'Dimension Inspector'
        ]
      }
    ],
    totalPositions: 50
  },
  {
    slug: 'construction',
    title: 'Construction',
    description: 'Civil engineers, trades, and construction personnel for major projects',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    color: 'from-blue-500 to-indigo-600',
    categories: [
      {
        name: 'Heavy Vehicle Operators',
        positions: [
          'Forklift Operator', 'Crane Operator', 'Hydra Operator', 'Heavy Driver', 'Light Driver'
        ]
      },
      {
        name: 'Painting & Blasting',
        positions: [
          'Airless Spray Painter', 'Thermal Spray Painter', 'Sand Blaster',
          'Brush Painter', 'Roller Painter', 'Painting Foreman', 'Painting Supervisor'
        ]
      },
      {
        name: 'Civil Trades',
        positions: [
          'Mason', 'Plumber', 'Gypsum Carpenter', 'Furnishing Carpenter',
          'Scaffolder', 'Steel Fixer', 'Shuttering Carpenter'
        ]
      },
      {
        name: 'Engineers / Supervisors',
        positions: [
          'Civil Engineer', 'QA/QC Engineer (Civil) / Inspector', 'Quantity Surveyor',
          'Estimator', 'All Trades Supervisor', 'Site Engineer', 'Civil Draftsman'
        ]
      }
    ],
    totalPositions: 35
  },
  {
    slug: 'electrical-instrumentation',
    title: 'Electrical & Instrumentation',
    description: 'Electrical engineers, technicians, and instrumentation specialists',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    color: 'from-green-500 to-emerald-600',
    categories: [
      {
        name: 'Electricians',
        positions: [
          'Industrial Electrician',
          'House Electrician',
          'General Fitter'
        ]
      },
      {
        name: 'Technicians',
        positions: [
          'Electrical Technician',
          'Mechanical Technician',
          'Instrument Technician',
          'E&I Technician'
        ]
      },
      {
        name: 'Instrumentation',
        positions: [
          'Wireman',
          'Cable Jointer',
          'Tray Fitter',
          'Motor Rewinder'
        ]
      },
      {
        name: 'Engineers / Supervisors',
        positions: [
          'Electrical Foreman',
          'Electrical Supervisor',
          'QA/QC Engineer (E&I) / Inspector',
          'Supervisor - Electrical / Instrument'
        ]
      }
    ],
    totalPositions: 20
  },
  {
    slug: 'hvac-manufacturing',
    title: 'HVAC & Manufacturing',
    description: 'HVAC specialists, manufacturing personnel, and production experts',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    color: 'from-purple-500 to-violet-600',
    categories: [
      {
        name: 'HVAC Technicians',
        positions: [
          'HVAC Technician (Copper Brazing)',
          'AC Mechanic (Window / Split / Central / Chiller)',
          'Water Cooler Mechanic'
        ]
      },
      {
        name: 'Duct / Insulation',
        positions: [
          'Duct Fitter',
          'Duct Fabricator',
          'Duct Erector',
          'Duct Insulator',
          'Insulation Supervisor / Foreman / Lead hand'
        ]
      },
      {
        name: 'Cooling Systems',
        positions: [
          'Plant Supervisor'
        ]
      },
      {
        name: 'Engineers / Supervisors',
        positions: [
          'HVAC Engineer',
          'HVAC Supervisor / Foreman / Lead Man'
        ]
      }
    ],
    totalPositions: 20
  },
  {
    slug: 'hospitality-services',
    title: 'Hospitality & Services',
    description: 'Hotel management, F&B services, and specialized hospitality roles',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    color: 'from-pink-500 to-rose-600',
    categories: [
      {
        name: 'Chefs / Cooks',
        positions: [
          'Executive Chef',
          'Sous Chef',
          'Continental Cook',
          'Indian Cook',
          'Tandoor Cook',
          'Pastry Chef'
        ]
      },
      {
        name: 'Service Staff',
        positions: [
          'Waiter',
          'Captain',
          'Barista',
          'Bartender'
        ]
      },
      {
        name: 'Housekeeping',
        positions: [
          'Housekeeping Staff',
          'Room Attendant',
          'Laundry Staff'
        ]
      },
      {
        name: 'Supervisors / Managers',
        positions: [
          'Restaurant Manager',
          'F&B Manager',
          'Housekeeping Supervisor',
          'Front Office Manager'
        ]
      }
    ],
    totalPositions: 20
  },
  {
    slug: 'tailoring-upholstery',
    title: 'Tailoring & Upholstery',
    description: 'Skilled tailors, upholstery specialists, machine operators and supervisors',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    color: 'from-rose-500 to-amber-500',
    categories: [
      {
        name: 'Tailors',
        positions: [
          'Tailor (Gents)',
          'Tailor (Ladies)',
          'Tent / Umbrella Tailor'
        ]
      },
      {
        name: 'Upholstery',
        positions: [
          'Sofa Seat Cover Maker',
          'Sofa Cushion Maker',
          'Curtain Maker',
          'Upholstery Personnel'
        ]
      },
      {
        name: 'Machine Operators',
        positions: [
          'Juki Machine Mechanic',
          'Juki Machine Operator',
          'Sewing Machine Operator'
        ]
      },
      {
        name: 'Supervisors',
        positions: [
          'Cutting Master',
          'Tailoring Helpers',
          'Embroidery (Hand/Machine)'
        ]
      }
    ],
    totalPositions: 15
  },
  {
    slug: 'general-positions',
    title: 'General Positions',
    description: 'Administrative, support, and general workforce positions',
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    color: 'from-gray-500 to-slate-600',
    categories: [
      'Administrative Staff',
      'Support Personnel',
      'General Workers',
      'Security Personnel'
    ],
    totalPositions: 15
  }
];

export const getCategoryBySlug = (slug?: string) =>
  recruitmentCategories.find((c) => c.slug === slug);


