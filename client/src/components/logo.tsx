import logoImage from '../assets/Asnani.png';

export function Logo({ className = "h-8 w-auto", variant = "default" }: { className?: string; variant?: "default" | "white" }) {
  const isWhite = variant === "white";
  
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Image */}
      <div className="flex-shrink-0">
        <img 
          src={logoImage} 
          alt="Asnani HR Solutions Logo" 
          className="h-12 w-auto object-contain"
        />
      </div>
      
      {/* Company Name Text - Same styling for both variants */}
      <div className="flex flex-col">
        <div className="text-2xl font-bold leading-tight">
          <span className={isWhite ? 'text-white' : 'text-gray-800'}>Asnani</span>
          <span className="text-yellow-500 ml-2">HR</span>
          <span className={isWhite ? 'text-white' : 'text-gray-800'}>&nbsp;Solution</span>
        </div>
        <div className={`text-xs font-medium tracking-wide ${isWhite ? 'text-gray-300' : 'text-gray-600'}`}>
          Professional Recruitment Services
        </div>
      </div>
    </div>
  );
}
