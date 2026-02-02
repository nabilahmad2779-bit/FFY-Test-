
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Moon, Sun, Rocket, Mail, 
  Linkedin, Facebook, Instagram, Trophy,
  Users, ChevronRight, ChevronLeft, Activity as Pulse, Quote, Zap, Plus, Info,
  MapPin, PieChart, Shield, Target, Smartphone, BarChart, Download, Sparkles,
  UserPlus
} from 'lucide-react';
import { MobileMenuMainPage } from '../components/MobileMenuMainPage.tsx';
import { FORTE_EVENTS, HALL_OF_FAME, HERO_IMAGE_URL, COLLABORATIONS, AWARDS, DEPARTMENT_LIST, PARTNER_LOGOS } from '../constants.tsx';
import ScrollReveal from '../components/ScrollReveal.tsx';
import SmartImage from '../components/SmartImage.tsx';
import DepartmentDetailView from '../components/DepartmentDetailView.tsx';

// Import Event Detail Pages
import { MosaicStoriesMobile } from './pages/EventsForMobile/MosaicStories.tsx';
import { SpiritualQuestMobile } from './pages/EventsForMobile/SpiritualQuest.tsx';
import { CosmicQuestMobile } from './pages/EventsForMobile/CosmicQuest.tsx';
import { BrushFlashMobile } from './pages/EventsForMobile/BrushFlash.tsx';

// Import Main Menu Pages
import { EventsPageMobile } from '../components/MainMenuPages/MainMenuPagesMobile/EventsPageMobile.tsx';
import { StoryPageMobile } from '../components/MainMenuPages/MainMenuPagesMobile/StoryPageMobile.tsx';
import { AlumniPageMobile } from '../components/MainMenuPages/MainMenuPagesMobile/AlumniPageMobile.tsx';
import { PanelPageMobile } from '../components/MainMenuPages/MainMenuPagesMobile/PanelPageMobile.tsx';
import { HallOfFamePageMobile } from '../components/MainMenuPages/MainMenuPagesMobile/HallOfFamePageMobile.tsx';

// --- UTILITY: COUNT UP ---
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const animate = (currentTime: number) => {
             if (!startTime) startTime = currentTime;
             const progress = currentTime - startTime;
             const ease = (x: number): number => 1 - Math.pow(1 - x, 3);
             if (progress < duration) {
                setCount(Math.floor(end * ease(progress / duration)));
                requestAnimationFrame(animate);
             } else {
                setCount(end);
             }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

// --- UTILITY: ANIMATED BAR ---
const AnimatedBar: React.FC<{ percentage: number; colorClass: string; isVertical?: boolean }> = ({ percentage, colorClass, isVertical = false }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(percentage), 200);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div 
      ref={ref} 
      className={`rounded-full transition-all duration-1000 ease-out ${colorClass}`} 
      style={isVertical ? { height: `${width}%`, width: '100%' } : { width: `${width}%`, height: '100%' }} 
    />
  );
};

// --- ANALYTICS SECTION ---
const MobileNeuralNexus: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [index, setIndex] = useState(0);
  const current = FORTE_EVENTS[index];
  const next = () => setIndex((prev) => (prev + 1) % FORTE_EVENTS.length);
  const prev = () => setIndex((prev) => (prev - 1 + FORTE_EVENTS.length) % FORTE_EVENTS.length);

  // Dynamic colors for Light/Dark modes
  const accentText = isDark ? 'text-cyan-500' : 'text-cyan-700';
  const subText = isDark ? 'text-cyan-400' : 'text-cyan-600';
  const barColor = isDark ? 'bg-cyan-500' : 'bg-cyan-600';

  return (
    <section className={`py-24 px-6 border-t ${isDark ? 'bg-[#030303] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
      <ScrollReveal className="text-center mb-12">
        <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${accentText}`}>Intelligence Suite</span>
        <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>System <span className={accentText}>Analysis.</span></h2>
      </ScrollReveal>

      <div className={`relative p-6 rounded-[2.5rem] border shadow-2xl overflow-hidden transition-all duration-500 ${isDark ? 'bg-black border-white/10' : 'bg-white border-slate-300'}`}>
         {/* Navigation */}
         <div className="relative z-10 flex items-center justify-between mb-10">
            <button onClick={prev} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDark ? 'bg-white/5 text-cyan-500' : 'bg-slate-100 text-slate-800'}`}>
               <ChevronLeft size={24} />
            </button>
            <div className="text-center flex-1 px-2">
               <h3 className={`text-xl font-heading font-black uppercase italic tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>{current.name}</h3>
               <p className={`text-[9px] font-bold uppercase tracking-widest mt-2 ${subText}`}>{current.year} Sequence</p>
            </div>
            <button onClick={next} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDark ? 'bg-white/5 text-cyan-500' : 'bg-slate-100 text-slate-800'}`}>
               <ChevronRight size={24} />
            </button>
         </div>

         <div className="space-y-6">
            
            {/* 1. KEY METRICS */}
            <div className="grid grid-cols-2 gap-4">
               <div className={`p-6 rounded-3xl border text-center ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2 block">Reach</span>
                  <p className={`text-3xl font-heading font-black italic ${accentText}`}>
                     <CountUp end={current.metrics.reach / 1000} suffix="K+" />
                  </p>
               </div>
               <div className={`p-6 rounded-3xl border text-center ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2 block">Members</span>
                  <p className={`text-3xl font-heading font-black italic ${isDark ? 'text-white' : 'text-slate-900'}`}>
                     <CountUp end={current.metrics.participants} />
                  </p>
               </div>
            </div>

            {/* 2. AMBASSADOR HIGHLIGHT */}
            <div className="relative p-8 rounded-[2.5rem] overflow-hidden border border-cyan-500/30 group">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-black to-black z-0" />
               <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12">
                  <Shield size={120} className="text-cyan-500" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                     <Users size={16} className="text-cyan-400" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Campaign Force</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                     <span className="text-6xl font-heading font-black italic text-white leading-none">
                        <CountUp end={current.metrics.ambassadors} />
                     </span>
                     <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-2">Active</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">
                     Campus Ambassadors deployed across 100+ institutions.
                  </p>
               </div>
            </div>

            {/* 3. GEOGRAPHIC DEMOGRAPHICS (Animated Bars) */}
            <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900/30 border-white/5' : 'bg-white border-slate-200'}`}>
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                     <MapPin size={16} className={accentText} />
                     <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] ${accentText}`}>Geo Density</h4>
                  </div>
                  <div className="text-[8px] uppercase font-bold opacity-40 bg-gray-500/10 px-2 py-1 rounded">Top 5 Regions</div>
               </div>
               <div className="space-y-4">
                  {[
                    { l: 'Dhaka', v: current.demographics.geoDhaka }, 
                    { l: 'Chattogram', v: current.demographics.geoChattogram },
                    { l: 'Sylhet', v: current.demographics.geoSylhet },
                    { l: 'Rajshahi', v: current.demographics.geoRajshahi },
                    { l: 'Khulna', v: current.demographics.geoKhulna }
                  ].map((d) => (
                    <div key={d.l}>
                        <div className="flex justify-between items-end mb-1">
                           <span className="text-[9px] font-bold uppercase w-20 text-left opacity-60">{d.l}</span>
                           <span className={`text-[9px] font-mono ${subText}`}><CountUp end={d.v} suffix="%" /></span>
                        </div>
                       <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}>
                          <AnimatedBar percentage={d.v} colorClass={barColor} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* 4. AGE DEMOGRAPHICS (Vertical Animated Bars) */}
            <div className={`p-8 rounded-[2.5rem] border flex flex-col gap-4 ${isDark ? 'bg-zinc-900/30 border-white/5' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <BarChart size={14} className={accentText} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${accentText}`}>Core Age Group</span>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Target Audience: 16-24</span>
                </div>
                
                <div className={`flex items-center justify-between p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                   <span className={`text-3xl font-heading font-black italic ${isDark ? 'text-white' : 'text-slate-900'}`}>14 - 24 Years</span>
                   <div className="flex gap-1 h-8 items-end">
                      <div className="w-1.5 h-full bg-gray-500/10 rounded-sm overflow-hidden flex items-end">
                         <AnimatedBar percentage={30} colorClass={`${barColor} opacity-30`} isVertical />
                      </div>
                      <div className="w-1.5 h-full bg-gray-500/10 rounded-sm overflow-hidden flex items-end">
                         <AnimatedBar percentage={60} colorClass={`${barColor} opacity-60`} isVertical />
                      </div>
                      <div className="w-1.5 h-full bg-gray-500/10 rounded-sm overflow-hidden flex items-end">
                         <AnimatedBar percentage={100} colorClass={barColor} isVertical />
                      </div>
                      <div className="w-1.5 h-full bg-gray-500/10 rounded-sm overflow-hidden flex items-end">
                         <AnimatedBar percentage={60} colorClass={`${barColor} opacity-60`} isVertical />
                      </div>
                      <div className="w-1.5 h-full bg-gray-500/10 rounded-sm overflow-hidden flex items-end">
                         <AnimatedBar percentage={30} colorClass={`${barColor} opacity-30`} isVertical />
                      </div>
                   </div>
                </div>
            </div>

         </div>
      </div>
    </section>
  );
};

// --- APEX CIRCLE SECTION (CAROUSEL) ---
const MobileApexCircle: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Dynamic colors
  const accentText = isDark ? 'text-cyan-500' : 'text-cyan-700';

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HALL_OF_FAME.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HALL_OF_FAME.length) % HALL_OF_FAME.length);
  };

  return (
    <section className={`py-24 px-6 border-t ${isDark ? 'bg-black border-white/5' : 'bg-white border-slate-200'}`}>
       <ScrollReveal className="text-center mb-12">
          <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${accentText}`}>Honored Members</span>
          <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Apex <span className={accentText}>Circle.</span></h2>
       </ScrollReveal>
       
       <div className="relative">
          {/* Main Card */}
          <div className="relative overflow-hidden min-h-[400px]">
             {HALL_OF_FAME.map((member, i) => (
                <div 
                  key={i}
                  className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
                    i === currentIndex ? 'opacity-100 translate-x-0 scale-100 z-10' : 'opacity-0 translate-x-10 scale-95 z-0'
                  }`}
                >
                   <div className={`p-8 rounded-[2.5rem] border flex flex-col items-center text-center shadow-2xl ${isDark ? 'bg-zinc-900/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-500/30 p-1 mb-6 shadow-lg shadow-cyan-500/20">
                         <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                      </div>
                      <h3 className={`text-2xl font-heading font-black uppercase italic mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-6 px-3 py-1 rounded-full ${isDark ? 'text-cyan-500 bg-cyan-500/10' : 'text-cyan-700 bg-cyan-100'}`}>{member.role}</p>
                      <div className="relative">
                         <Quote size={20} className="text-cyan-500/20 absolute -top-4 -left-2" />
                         <p className={`text-base italic font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>"{member.impact}"</p>
                      </div>
                   </div>
                </div>
             ))}
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-8 px-4">
             <button 
                onClick={handlePrev}
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all active:scale-90 ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}
             >
                <ChevronLeft size={20} />
             </button>
             
             <div className="flex gap-2">
                {HALL_OF_FAME.map((_, i) => (
                   <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? (isDark ? 'w-8 bg-cyan-500' : 'w-8 bg-cyan-600') : (isDark ? 'w-2 bg-zinc-600' : 'w-2 bg-slate-300')}`} />
                ))}
             </div>

             <button 
                onClick={handleNext}
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all active:scale-90 ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}
             >
                <ChevronRight size={20} />
             </button>
          </div>
       </div>
    </section>
  );
};

// --- MOBILE KINETIC PILLAR (Updated for Stronger Gradients) ---
const KineticPillar: React.FC<{ dept: any, isCenter: boolean, isDark: boolean, onNav: (path: string) => void }> = ({ dept, isCenter, isDark, onNav }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Tilt Calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;
    
    setRotation({ x: rotateX, y: rotateY });
    
    // Glare position
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleTouchEnd = () => {
    setRotation({ x: 0, y: 0 });
  };

  // Enhance gradient visibility for both modes, especially light mode
  const gradientOverlay = isDark 
    ? `linear-gradient(135deg, ${dept.accent}40 0%, transparent 80%)`
    : `linear-gradient(135deg, ${dept.accent}60 0%, ${dept.accent}10 60%, transparent 100%)`;

  const borderColor = isDark 
    ? 'rgba(255,255,255,0.1)' 
    : `${dept.accent}30`; // Colored border in light mode

  return (
    <div 
      ref={cardRef}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => onNav(`/departments/${dept.id}`)}
      className={`relative rounded-[2rem] border transition-all duration-300 p-6 overflow-hidden group flex flex-col ${
        isCenter ? 'col-span-2 min-h-[180px] flex-row gap-6 items-center text-left' : 'col-span-1 min-h-[280px] items-start'
      } ${isDark ? 'bg-[#080808] shadow-2xl' : 'bg-white shadow-xl'}`}
      style={{ 
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${rotation.x !== 0 ? 0.98 : 1})`,
        transition: 'transform 0.1s ease-out',
        borderColor: borderColor
      }}
    >
       {/* 1. Dynamic Gradient Background (Stronger) */}
       <div 
         className="absolute inset-0 transition-opacity duration-300 z-0 animate-pulse-slow" 
         style={{ background: gradientOverlay, opacity: isDark ? 0.3 : 0.6 }} 
       />
       
       {/* 2. Interactive Glare Effect */}
       <div 
         className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
         style={{
           background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, transparent 50%)`,
           opacity: rotation.x !== 0 ? 1 : 0
         }}
       />

       {/* 3. Border Glow */}
       <div 
         className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-40"
         style={{ border: `1px solid ${dept.accent}` }}
       />

       {/* 4. Large Faded Icon Background */}
       <div 
         className="absolute -right-8 -bottom-8 opacity-10 transform rotate-12 scale-150 transition-transform duration-500 group-active:scale-[1.7] group-active:rotate-0" 
         style={{ color: dept.accent }}
       >
          {React.cloneElement(dept.icon as React.ReactElement<any>, { size: 140 })}
       </div>

       {/* Content */}
       <div 
         className={`relative z-20 p-3 rounded-2xl mb-4 transition-transform duration-300 group-active:scale-95 shadow-inner flex items-center justify-center`} 
         style={{ 
           color: dept.accent, 
           backgroundColor: isDark ? `${dept.accent}20` : `${dept.accent}30`,
           boxShadow: `0 0 15px ${dept.accent}20`
         }}
       >
          {React.cloneElement(dept.icon as React.ReactElement<any>, { size: isCenter ? 32 : 40 })}
       </div>
       
       <div className="relative z-20 flex-1 w-full">
          <h3 className={`font-heading font-black uppercase italic tracking-tight mb-2 ${isCenter ? 'text-2xl' : 'text-lg'} ${isDark ? 'text-white' : 'text-slate-900'}`}>{dept.name}</h3>
          <p className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: dept.accent }}>System Core</p>
       </div>
       
       {!isCenter && (
         <div className="mt-auto w-full flex justify-between items-center z-20 relative">
            <div className="h-1 w-12 rounded-full transition-all duration-300 group-active:w-20" style={{ backgroundColor: dept.accent }} />
            <div className={`p-1.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
               <ChevronRight size={14} className={isDark ? 'text-white' : 'text-slate-900'} />
            </div>
         </div>
       )}
       
       <style>{`
         @keyframes pulse-slow { 0% { opacity: 0.2; } 50% { opacity: 0.5; } 100% { opacity: 0.2; } }
         .animate-pulse-slow { animation: pulse-slow 4s infinite ease-in-out; }
       `}</style>
    </div>
  );
};

const MobileHome: React.FC<{ isDark: boolean; onNavigate: (view: string) => void }> = ({ isDark, onNavigate }) => {
  // Theme Variables
  const textCyan = isDark ? 'text-cyan-500' : 'text-cyan-700';
  
  return (
    <div className="animate-fade-in relative z-10">
       
       {/* 1. HERO SECTION (Updated Colors & Buttons & Gradient Fix) */}
       <section className="relative h-[100vh] w-full flex flex-col justify-end px-6 pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
               src={HERO_IMAGE_URL} 
               className={`w-full h-full object-cover transition-all duration-[3000ms] ${isDark ? 'brightness-[0.9]' : 'brightness-100'}`} 
               style={{ transform: 'scale(1.1)' }}
               alt="Hero" 
            />
            {/* Darker overlay for Light Mode to prevent "too white" look */}
            <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/40 to-transparent' : 'from-slate-200 via-slate-100/50 to-transparent mix-blend-multiply opacity-80'}`} />
            
            {/* Top Gradient for Whitish Issue Fix */}
            <div className={`absolute top-0 left-0 w-full h-64 bg-gradient-to-b z-10 pointer-events-none ${isDark ? 'from-black/80 to-transparent' : 'from-slate-300/80 to-transparent'}`} />

            {/* Additional bottom gradient for text contrast in light mode */}
            {!isDark && <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />}
          </div>

          <div className="relative z-10 w-full mt-auto">
            <ScrollReveal className="flex flex-col items-center text-center">
              <div className="mb-8">
                 <h1 className={`text-[17vw] font-heading font-black uppercase italic leading-[0.8] tracking-tighter drop-shadow-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                   Manifest <br/> <span className={`${textCyan} drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]`}>Tomorrow.</span>
                 </h1>
              </div>
              
              <p className={`text-base font-bold leading-relaxed max-w-[280px] mx-auto mb-12 drop-shadow-lg ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>
                We manufacture a generation of excellence through systemic skill elevation.
              </p>

              {/* REORDERED & UPDATED BUTTONS with Increased Interactivity */}
              <div className="grid grid-cols-2 gap-4 w-full px-2">
                 {/* About Us (First) - Enhanced Interaction */}
                 <button 
                    onClick={() => { document.getElementById('first-steps')?.scrollIntoView({ behavior: 'smooth' }); }} 
                    className={`py-5 font-black uppercase tracking-widest text-[11px] rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-90 border backdrop-blur-md hover:scale-[1.02] shadow-lg ${isDark ? 'border-white/30 text-white bg-white/10 active:bg-white/20 active:border-cyan-500 shadow-cyan-500/20 active:shadow-cyan-500/40' : 'border-slate-400 text-slate-900 bg-white/90 active:bg-white active:border-cyan-600 shadow-slate-400/20'}`}
                 >
                   About Us <Rocket size={16} className="animate-pulse" />
                 </button>
                 
                 {/* Join Us (Second) - Enhanced Interaction */}
                 <button 
                    onClick={() => window.open('https://forms.google.com', '_blank')} 
                    className={`py-5 bg-gradient-to-r text-white font-black uppercase tracking-widest text-[11px] rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-90 shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-white/20 hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:from-cyan-400 active:to-blue-500 ${isDark ? 'from-cyan-500 to-blue-600' : 'from-cyan-600 to-blue-700'}`}
                 >
                   Join Us <UserPlus size={16} />
                 </button>
              </div>
            </ScrollReveal>
          </div>
       </section>

       {/* 2. HISTORY (Text Justified, Title Updated) */}
       <section id="first-steps" className={`py-24 px-6 border-t ${isDark ? 'bg-[#050505] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
          <ScrollReveal>
             <h2 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-4 block ${textCyan}`}>Our Origin</h2>
             <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter mb-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>The Genesis.</h2>
             
             <div className="rounded-[3rem] mb-12 shadow-2xl border border-white/10 overflow-hidden aspect-square">
                <SmartImage src={HERO_IMAGE_URL} alt="Founding" className="w-full h-full" />
             </div>
             
             <div className={`relative pl-6 border-l-2 mb-10 ${isDark ? 'border-cyan-500' : 'border-cyan-600'}`}>
                <p className={`text-xl font-medium italic leading-relaxed ${isDark ? 'text-white' : 'text-slate-900'}`}>
                   "We don't just build skills; we manufacture community and resilient character."
                </p>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-4 ${textCyan}`}>— Founders' Collective</p>
             </div>

             {/* Justified Text Block */}
             <div className={`space-y-6 text-lg font-light leading-relaxed text-justify ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>
                <p>Forte-FY began with a singular focus: bridging the gap between raw talent and professional execution.</p>
                <p>Founded in Dhaka, we established a sanctuary where learning is intentional, disciplined, and designed for global scalability.</p>
             </div>
          </ScrollReveal>
       </section>

       {/* 3. ARCHIVE (Lighter Buttons) */}
       <section className="py-24 px-6">
          <ScrollReveal className="text-center mb-16">
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${textCyan}`}>Initiative Records</span>
            <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>The Archive</h2>
          </ScrollReveal>
          <div className="space-y-16">
             {FORTE_EVENTS.map((event, i) => (
               <ScrollReveal key={event.id} delay={i * 100}>
                 <div className={`rounded-[3rem] overflow-hidden border transition-all active:scale-[0.98] ${isDark ? 'bg-black border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                    <div className="relative aspect-[16/10]">
                       <SmartImage src={event.image} alt={event.name} className="w-full h-full" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="p-10">
                       <h3 className={`text-3xl font-heading font-black uppercase italic tracking-tight mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.name}</h3>
                       
                       {/* LIGHTER "LEARN MORE" BUTTONS */}
                       <button onClick={() => onNavigate(`/events/${event.id}`)} className={`w-full py-5 font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all group border shadow-lg relative overflow-hidden ${isDark ? 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-cyan-500/50' : 'bg-slate-100 text-slate-900 border-slate-200 hover:bg-white hover:shadow-xl'}`}>
                          <span className="relative z-10">Learn More</span>
                          <ChevronRight size={18} className="text-cyan-500 group-hover:translate-x-1 transition-transform relative z-10" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       </button>
                    </div>
                 </div>
               </ScrollReveal>
             ))}
          </div>
       </section>

       <MobileNeuralNexus isDark={isDark} />

       {/* 5. PILLARS */}
       <section className={`py-24 px-5 border-y ${isDark ? 'bg-[#030303] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
          <ScrollReveal className="mb-14 text-center">
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${textCyan}`}>Core Architecture</span>
            <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Structural <span className={textCyan}>Pillars.</span></h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 gap-4">
             <KineticPillar dept={DEPARTMENT_LIST[0]} isCenter={false} isDark={isDark} onNav={onNavigate} />
             <KineticPillar dept={DEPARTMENT_LIST[1]} isCenter={false} isDark={isDark} onNav={onNavigate} />
             <KineticPillar dept={DEPARTMENT_LIST[4]} isCenter={true} isDark={isDark} onNav={onNavigate} />
             <KineticPillar dept={DEPARTMENT_LIST[2]} isCenter={false} isDark={isDark} onNav={onNavigate} />
             <KineticPillar dept={DEPARTMENT_LIST[3]} isCenter={false} isDark={isDark} onNav={onNavigate} />
          </div>
       </section>

       {/* 6. APEX CIRCLE */}
       <MobileApexCircle isDark={isDark} />

       {/* 7. PARTNERS */}
       <section className={`py-24 border-t ${isDark ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
          <ScrollReveal className="text-center mb-12">
             <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${textCyan}`}>Institutional Network</span>
             <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Our <span className={textCyan}>Partners.</span></h2>
          </ScrollReveal>
          <div className="flex overflow-hidden relative group">
             <div className="flex animate-marquee-fast gap-8 px-6 py-4">
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].slice(0, 14).map((p, i) => (
                   <div key={i} className={`w-28 h-28 rounded-full border shrink-0 flex items-center justify-center p-6 transition-all duration-700 hover:scale-110 shadow-lg ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-slate-200'}`}>
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" />
                   </div>
                ))}
             </div>
          </div>
       </section>

       <section className={`py-24 px-6 border-t ${isDark ? 'bg-black border-white/5' : 'bg-white border-slate-200'}`}>
          <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>Connect <br/><span className={textCyan}>Nexus.</span></h2>
          <div className="space-y-12">
             <a href="mailto:fortefy.org@gmail.com" className="flex items-center gap-6 group">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${isDark ? 'bg-white/5 border-white/10 text-cyan-500' : 'bg-slate-100 border-slate-200 text-blue-600 shadow-lg'}`}>
                   <Mail size={28} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Direct Hub</span>
                   <span className="text-sm font-bold uppercase tracking-widest truncate max-w-[200px]">fortefy.org@gmail.com</span>
                </div>
             </a>
             <div className="flex gap-4">
                {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                  <div key={i} className={`w-16 h-16 rounded-full border flex items-center justify-center active:scale-95 transition-all ${isDark ? 'bg-white/5 border-white/10 text-zinc-400' : 'bg-white border-slate-200 text-slate-600 shadow-lg'}`}>
                     <Icon size={26} />
                  </div>
                ))}
             </div>
          </div>
       </section>
       <div className="h-12" />
       <style>{`
          @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee-fast { display: flex; animation: marquee-fast 20s linear infinite; width: max-content; }
       `}</style>
    </div>
  );
};

const MobileApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const navigate = (id: string) => {
    const tab = id.replace('/', '') || 'home';
    if (tab.includes('departments')) setActiveTab('detail');
    else if (tab.includes('events/mosaic-stories')) setActiveTab('ev-mosaic');
    else if (tab.includes('events/spiritual-quest')) setActiveTab('ev-spiritual');
    else if (tab.includes('events/cosmic-quest')) setActiveTab('ev-cosmic');
    else if (tab.includes('events/brush-flash')) setActiveTab('ev-brush');
    // General Routes
    else if (tab === 'events') setActiveTab('events');
    else if (tab === 'story') setActiveTab('story');
    else if (tab === 'alumni') setActiveTab('alumni');
    else if (tab === 'panel') setActiveTab('panel');
    else if (tab === 'hall-of-fame') setActiveTab('hall-of-fame');
    else setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
     switch(activeTab) {
        case 'home': return <MobileHome isDark={isDark} onNavigate={navigate} />;
        
        // Detail Pages
        case 'ev-mosaic': return <MosaicStoriesMobile onBack={() => navigate('/events')} isDark={isDark} />;
        case 'ev-spiritual': return <SpiritualQuestMobile onBack={() => navigate('/events')} isDark={isDark} />;
        case 'ev-cosmic': return <CosmicQuestMobile onBack={() => navigate('/events')} isDark={isDark} />;
        case 'ev-brush': return <BrushFlashMobile onBack={() => navigate('/events')} isDark={isDark} />;
        case 'detail':
           const currentPath = window.location.hash || window.location.pathname;
           const deptId = currentPath.split('/').pop();
           const dept = DEPARTMENT_LIST.find(d => d.id === deptId) || DEPARTMENT_LIST[0];
           return <DepartmentDetailView dept={dept} navigate={navigate} isDark={isDark} setIsDark={setIsDark} />;
        
        // Main Menu Pages
        case 'events': return <EventsPageMobile isDark={isDark} navigate={navigate} />;
        case 'story': return <StoryPageMobile isDark={isDark} />;
        case 'alumni': return <AlumniPageMobile isDark={isDark} />;
        case 'panel': return <PanelPageMobile isDark={isDark} />;
        case 'hall-of-fame': return <HallOfFamePageMobile isDark={isDark} />;
        
        default: return <MobileHome isDark={isDark} onNavigate={navigate} />;
     }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
       <header className={`fixed top-0 left-0 w-full h-18 flex items-center justify-between px-6 z-[120] backdrop-blur-md border-b ${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-slate-200'}`}>
          <div className="flex items-center gap-3" onClick={() => navigate('/')}>
             <div className="w-8 h-8 rounded-full border border-cyan-500/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
             </div>
             <span className="font-heading font-black uppercase italic text-xl tracking-tighter">Forte-FY</span>
          </div>
          <div className="flex items-center gap-2">
             <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-full ${isDark ? 'bg-white/10 text-yellow-400' : 'bg-slate-100 text-slate-900 shadow-md'}`}>
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button onClick={() => setIsMenuOpen(true)} className={`p-3 rounded-full ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
                <Menu size={26} />
             </button>
          </div>
       </header>

       <main className="min-h-screen pt-18">
          {renderContent()}
       </main>

       {isMenuOpen && (
          <MobileMenuMainPage isDark={isDark} setIsDark={setIsDark} onClose={() => setIsMenuOpen(false)} navigate={navigate} />
       )}
       <style>{` .pt-18 { padding-top: 4.5rem; } .h-18 { height: 4.5rem; } `}</style>
    </div>
  );
};

export default MobileApp;
