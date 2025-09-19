import { ChevronDown, Handshake, Info, HardHat, Zap, ConciergeBell, Factory, RefreshCw } from 'lucide-react';
import { useCounterAnimation } from '@/hooks/use-counter-animation';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Industry configuration
const industryConfig = [
  {
    name: "Construction",
    icon: HardHat,
    id: "construction",
    fallbackVideo: "https://user-gen-media-assets.s3.amazonaws.com/veo_videos/3fc5f73c-282d-4c56-838f-e69208cbe153.mp4",
    keywords: ["construction", "building"]
  },
  {
    name: "Oil & Gas",
    icon: Zap,
    id: "oil-gas",
    fallbackVideo: "https://user-gen-media-assets.s3.amazonaws.com/veo_videos/ba9828bc-8cb0-4cf2-b3c0-df05849201c0.mp4",
    keywords: ["oil", "gas", "energy"]
  },
  {
    name: "Hospitality",
    icon: ConciergeBell,
    id: "hospitality",
    fallbackVideo: "https://user-gen-media-assets.s3.amazonaws.com/veo_videos/48804e1b-db62-4dc9-aca2-224eb9d89dfd.mp4",
    keywords: ["hotel", "restaurant"]
  },
  {
    name: "Manufacturing",
    icon: Factory,
    id: "manufacturing",
    fallbackVideo: "https://res.cloudinary.com/shivshaktisite/video/upload/v1755711869/image_wj2kdx.mp4",
    keywords: ["factory", "manufacturing"]
  }
];

interface IndustryVideo {
  name: string;
  icon: any;
  id: string;
  video: string;
  isCustom?: boolean;
  uploadedAt?: string;
}

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [industryData, setIndustryData] = useState<IndustryVideo[]>([]);
  const [currentIndustryIndex, setCurrentIndustryIndex] = useState<number>(0);
  const [isAutoCycling] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const yearsCount = useCounterAnimation(13, 2000, isVisible);
  const clientsCount = useCounterAnimation(25, 2000, isVisible);
  const placementsCount = useCounterAnimation(50000, 2000, isVisible);
  const countriesCount = useCounterAnimation(10, 2000, isVisible);
  const profilesCount = useCounterAnimation(100000, 2000, isVisible);
  const repeatClientsCount = useCounterAnimation(90, 2000, isVisible);

  // Load videos from localStorage or use fallbacks
  const loadVideosFromStorage = (): IndustryVideo[] => {
    try {
      const stored = localStorage.getItem('industry_videos');
      const customVideos = stored ? JSON.parse(stored) : {};
      
      return industryConfig.map(industry => ({
        ...industry,
        video: customVideos[industry.id]?.url || industry.fallbackVideo,
        isCustom: !!customVideos[industry.id],
        uploadedAt: customVideos[industry.id]?.uploadedAt
      }));
    } catch (error) {
   //   console.warn('Failed to load from localStorage:', error);
      return industryConfig.map(industry => ({
        ...industry,
        video: industry.fallbackVideo
      }));
    }
  };

  // Save videos to localStorage
  const saveVideoToStorage = (industryId: string, videoUrl: string) => {
    try {
      const stored = localStorage.getItem('industry_videos');
      const customVideos = stored ? JSON.parse(stored) : {};
      
      customVideos[industryId] = {
        url: videoUrl,
        uploadedAt: new Date().toISOString()
      };
      
      localStorage.setItem('industry_videos', JSON.stringify(customVideos));
      
      // Update industry data
      setIndustryData(prev => prev.map(industry => 
        industry.id === industryId 
          ? { 
              ...industry, 
              video: videoUrl, 
              isCustom: true, 
              uploadedAt: new Date().toISOString() 
            }
          : industry
      ));
    } catch (error) {
    //  console.error('Failed to save video:', error);
      alert('Failed to save video. Storage might be full.');
    }
  };

  // Handle file upload
  const handleFileUpload = (industryId: string, file: File) => {
    if (!file || !file.type.startsWith('video/')) {
      alert('Please select a valid video file');
      return;
    }

    // Check file size (limit to 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('File too large. Please select a video under 50MB.');
      return;
    }

   //setUploadingFor(industryId);

    try {
      // Create object URL for the file
      const objectUrl = URL.createObjectURL(file);
      
      // Save to storage
      saveVideoToStorage(industryId, objectUrl);
      
     // setUploadingFor(null);
      alert(`Video uploaded successfully for ${industryConfig.find(i => i.id === industryId)?.name}!`);
    } catch (error) {
    //  console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
     /// setUploadingFor(null);
    }
  };

  // Reset video to fallback
  const resetVideoToFallback = (industryId: string) => {
    try {
      const stored = localStorage.getItem('industry_videos');
      const customVideos = stored ? JSON.parse(stored) : {};
      
      // Remove custom video
      delete customVideos[industryId];
      localStorage.setItem('industry_videos', JSON.stringify(customVideos));
      
      // Update industry data
      const fallbackVideo = industryConfig.find(i => i.id === industryId)?.fallbackVideo;
      setIndustryData(prev => prev.map(industry => 
        industry.id === industryId 
          ? { 
              ...industry, 
              video: fallbackVideo || industry.video, 
              isCustom: false, 
              uploadedAt: undefined 
            }
          : industry
      ));
    } catch (error) {
    //  console.error('Failed to reset video:', error);
    }
  };

  // Initialize videos on mount and preload them
  useEffect(() => {
    const videos = loadVideosFromStorage();
    setIndustryData(videos);
    
    // Preload all videos for smoother transitions
    videos.forEach(industry => {
      const preloadVideo = document.createElement('video');
      preloadVideo.src = industry.video;
      preloadVideo.preload = 'auto';
      preloadVideo.load();
    });
  }, []);

  // Auto-cycling logic
  useEffect(() => {
    if (!isAutoCycling || isPaused || industryData.length === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    
    // Ensure videos cycle every 8 seconds for better viewing experience
    intervalRef.current = setInterval(() => {
      setCurrentIndustryIndex(prevIndex => {
        // Cycle to the next industry
        const nextIndex = (prevIndex + 1) % industryData.length;
        
        // Ensure the video is loaded and ready to play
        const videoElement = document.createElement('video');
        videoElement.src = industryData[nextIndex].video;
        videoElement.load();
        
        return nextIndex;
      });
    }, 8000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoCycling, isPaused, industryData.length]);

  // Auto cycling is always enabled

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  
  // Toggle auto-cycling manually
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard navigation when user is on the hero section
      if (isVisible) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          setCurrentIndustryIndex(prevIndex => (prevIndex + 1) % industryData.length);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          setCurrentIndustryIndex(prevIndex => 
            prevIndex === 0 ? industryData.length - 1 : prevIndex - 1
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, industryData.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  const referralUrl = import.meta.env.VITE_REFERRAL_URL as string | undefined;

  const currentIndustry = industryData[currentIndustryIndex];

  return (
    <section 
      id="home" 
      ref={ref}
      className="relative bg-gradient-to-br from-primary to-secondary text-white overflow-hidden min-h-screen flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {industryData.map((industry, index) => {
          const isActive = currentIndustryIndex === index;
          return (
            <video 
              key={industry.video}
              ref={index === currentIndustryIndex ? videoRef : undefined}
              className={`absolute min-w-full min-h-full w-auto h-auto object-cover top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
              autoPlay 
              muted 
              loop 
              playsInline
              preload="metadata"
              onLoadedData={index === currentIndustryIndex ? handleVideoLoad : undefined}
            >
              <source src={industry.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        })}
        
        {/* Industry selector */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center items-center gap-2 bg-black/30 backdrop-blur-sm p-2 rounded-full max-w-[90%] md:max-w-[80%]">
            {industryData.map((industry, index) => {
              const Icon = industry.icon;
              const isActive = currentIndustryIndex === index;
              return (
                <button
                  key={industry.name}
                  onClick={() => setCurrentIndustryIndex(index)}
                  className={`relative flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all cursor-pointer ${isActive 
                    ? 'bg-white text-primary font-medium shadow-lg' 
                    : 'bg-black/20 text-white hover:bg-black/40'}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{industry.name}</span>
                  {industry.isCustom && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full" title="Custom video" />
                  )}
                </button>
              );
            })}

          </div>
          
          {/* Progress indicators */}
          <div className="flex gap-2 mt-1">
            {industryData.map((_, index) => {
              const isActive = currentIndustryIndex === index;
              return (
                <button
                  key={`progress-${index}`}
                  onClick={() => setCurrentIndustryIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${isActive ? 'w-8 bg-accent' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`View industry ${index + 1}`}
                />
              );
            })}
          </div>
          
          {/* Auto-cycle controls */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-white/70">
            {isAutoCycling && !isPaused ? (
              <>
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <span>Auto-cycling</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePause(); }}
                  className="ml-1 px-1.5 py-0.5 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
                  aria-label="Pause auto-cycling"
                >
                  Pause
                </button>
              </>
            ) : (
              <>
                <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                <span>Paused</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePause(); }}
                  className="ml-1 px-1.5 py-0.5 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
                  aria-label="Resume auto-cycling"
                >
                  Resume
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Current industry indicator and navigation */}
        <div className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-white/70">Showing:</span>
            {currentIndustry && (
              <div className="flex items-center gap-1.5">
                <currentIndustry.icon className="h-4 w-4 text-accent" />
                <span className="font-semibold">{currentIndustry.name}</span>
                {currentIndustry.isCustom && (
                  <span className="text-green-400 text-xs bg-green-400/10 px-1.5 py-0.5 rounded">Custom</span>
                )}
              </div>
            )}
          </div>
          
          <div className="h-4 w-px bg-white/20"></div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentIndustryIndex(prev => prev === 0 ? industryData.length - 1 : prev - 1)}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous industry"
            >
              <ChevronDown className="h-3 w-3 rotate-90" />
            </button>
            
            <span className="text-white/70 text-xs">{currentIndustryIndex + 1}/{industryData.length}</span>
            
            <button 
              onClick={() => setCurrentIndustryIndex(prev => (prev + 1) % industryData.length)}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next industry"
            >
              <ChevronDown className="h-3 w-3 -rotate-90" />
            </button>
            
            {isAutoCycling && !isPaused && (
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse ml-1" />
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-10 pointer-events-none"></div>
      
      {/* Rest of your component */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">
              Asnani HR Solutions - Premier <span className="text-accent">Manpower</span><br />
              Consultancy for Gulf, Middle East & Russia
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connecting talent with opportunity since 2011. Specializing in Gulf/Middle East & Russia recruitment across construction, oil & gas, hospitality, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-accent/90 transition-colors"
              >
                <Handshake className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button 
                onClick={() => scrollToSection('about')}
                variant="outline"
                className="border-2 border-white/80 text-white px-8 py-3 rounded-lg font-poppins font-semibold bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary transition-colors"
              >
                <Info className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Animated Stats */}
          <div className={`grid grid-cols-2 gap-6 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {yearsCount}+
              </div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {clientsCount}+
              </div>
              <div className="text-sm opacity-90">Satisfied Clients</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {placementsCount}+
              </div>
              <div className="text-sm opacity-90">Successful Placements</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {countriesCount}+
              </div>
              <div className="text-sm opacity-90">Countries Served</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {profilesCount}+
              </div>
              <div className="text-sm opacity-90">Candidate Profiles</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {repeatClientsCount}%
              </div>
              <div className="text-sm opacity-90">Repeat Clients</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        <motion.button
          aria-label="Scroll up"
          drag="y"
          dragConstraints={{ top: -140, bottom: 0 }}
          dragElastic={0.2}
          dragSnapToOrigin
          onClick={scrollToTop}
          onDragEnd={(e, info) => { if (info.offset.y < -30 || info.velocity.y < -600) scrollToTop(); }}
          className="touch-none select-none cursor-grab active:cursor-grabbing h-11 w-11 rounded-full bg-white/80 text-black border border-white shadow-sm flex items-center justify-center hover:bg-white"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
        <motion.button
          aria-label="Go down / referral"
          drag="y"
          dragConstraints={{ top: 0, bottom: 140 }}
          dragElastic={0.2}
          dragSnapToOrigin
          onClick={() => {
            if (referralUrl) {
              window.open(referralUrl, '_blank', 'noopener,noreferrer');
            } else {
              scrollToBottom();
            }
          }}
          onDragEnd={(e, info) => {
            if (info.offset.y > 30 || info.velocity.y > 600) {
              if (referralUrl) {
                window.open(referralUrl, '_blank', 'noopener,noreferrer');
              } else {
                scrollToBottom();
              }
            }
          }}
          className="touch-none select-none cursor-grab active:cursor-grabbing h-11 w-11 rounded-full bg-white/80 text-black border border-white shadow-sm flex items-center justify-center hover:bg-white"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.button>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <button 
          onClick={() => scrollToSection('about')}
          className="text-white hover:text-accent transition-colors"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}