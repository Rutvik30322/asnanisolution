// Simple SVG logos for client companies
export const companyLogos: Record<string, JSX.Element> = {
  'Al-Futtaim Group': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#1a365d"/>
      <text x="50" y="35" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">AF</text>
      <text x="50" y="70" textAnchor="middle" fill="#ffd700" fontSize="10">GROUP</text>
    </svg>
  ),
  'Emirates Group': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#c41e3a"/>
      <text x="50" y="40" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">EMIRATES</text>
      <circle cx="50" cy="65" r="8" fill="white"/>
    </svg>
  ),
  'Majid Al Futtaim': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#2d5aa0"/>
      <text x="50" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">MAF</text>
      <rect x="30" y="55" width="40" height="3" fill="#ffd700"/>
      <text x="50" y="75" textAnchor="middle" fill="white" fontSize="8">RETAIL</text>
    </svg>
  ),
  'ADNOC': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#0066cc"/>
      <text x="50" y="40" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">ADNOC</text>
      <circle cx="25" cy="70" r="3" fill="#ffd700"/>
      <circle cx="50" cy="70" r="3" fill="#ffd700"/>
      <circle cx="75" cy="70" r="3" fill="#ffd700"/>
    </svg>
  ),
  'Dubai Airports': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#1e3a8a"/>
      <polygon points="50,25 65,45 35,45" fill="white"/>
      <text x="50" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">DUBAI</text>
      <text x="50" y="80" textAnchor="middle" fill="#ffd700" fontSize="8">AIRPORTS</text>
    </svg>
  ),
  'Qatar Airways': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#5d1a5d"/>
      <text x="50" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">QATAR</text>
      <text x="50" y="55" textAnchor="middle" fill="#ffd700" fontSize="10">AIRWAYS</text>
      <circle cx="50" cy="75" r="6" fill="white"/>
    </svg>
  ),
  'Saudi Aramco': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#006633"/>
      <text x="50" y="35" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ARAMCO</text>
      <rect x="35" y="50" width="30" height="15" rx="3" fill="#ffd700"/>
      <text x="50" y="80" textAnchor="middle" fill="white" fontSize="8">SAUDI</text>
    </svg>
  ),
  'Etisalat Group': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#00a651"/>
      <text x="50" y="35" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ETISALAT</text>
      <circle cx="50" cy="60" r="10" stroke="white" strokeWidth="2" fill="none"/>
      <text x="50" y="80" textAnchor="middle" fill="white" fontSize="8">GROUP</text>
    </svg>
  ),
  'Almarai Company': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#228b22"/>
      <text x="50" y="35" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ALMARAI</text>
      <ellipse cx="50" cy="60" rx="15" ry="8" fill="white"/>
      <text x="50" y="80" textAnchor="middle" fill="#ffd700" fontSize="8">DAIRY</text>
    </svg>
  ),
  'Dar Al-Handasah': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#4169e1"/>
      <text x="50" y="30" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">DAR AL</text>
      <text x="50" y="50" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">HANDASAH</text>
      <polygon points="35,70 50,60 65,70 50,80" fill="#ffd700"/>
    </svg>
  ),
  'Gulf Constructions': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#8b4513"/>
      <text x="50" y="30" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">GULF</text>
      <text x="50" y="50" textAnchor="middle" fill="white" fontSize="8">CONSTRUCTIONS</text>
      <rect x="40" y="60" width="20" height="15" fill="#ffd700"/>
      <rect x="42" y="62" width="16" height="2" fill="#8b4513"/>
      <rect x="42" y="66" width="16" height="2" fill="#8b4513"/>
    </svg>
  ),
  'Rotana Hotel Group': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#800080"/>
      <text x="50" y="35" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ROTANA</text>
      <rect x="30" y="50" width="40" height="20" rx="5" fill="#ffd700"/>
      <text x="50" y="78" textAnchor="middle" fill="white" fontSize="8">HOTELS</text>
    </svg>
  )
};

export const getCompanyLogo = (companyName: string) => {
  return companyLogos[companyName] || (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" rx="10" fill="#6366f1"/>
      <text x="50" y="55" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">
        {companyName.charAt(0)}
      </text>
    </svg>
  );
};