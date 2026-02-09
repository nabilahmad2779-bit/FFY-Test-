
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { FORTE_EVENTS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { 
  ArrowLeft, Moon, Star, Calendar, 
  ChevronRight, ChevronLeft,
  Award, Users, Heart, BookOpen, Sparkles, Sun,
  Quote, MapPin
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---

const RAMADAN_QUESTS = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  title: [
    "The Initiation of Intent", "The Hands of Charity", "The Digital Fast", 
    "Names of Divine Grace", "The Book of Gratitude", "Silence of the Soul",
    "Wisdom of the Golden Age", "The Shared Bread", "Generational Footprints",
    "The Audit of the Heart"
  ][i % 10],
  task: [
    "Contemplation of Surah Al-Fatiha and its infinite depth.",
    "The art of hidden charity: Extending a hand in silence.",
    "Internal Silence: A four-hour digital fast for the soul.",
    "Divine Attributes: Reflecting upon three Names of Grace.",
    "The Gratitude Journal: Recording three profound blessings.",
    "Munaqib Practice: One hour of absolute meditative quiet.",
    "Scholarly Pursuit: Analyzing the Wisdom of the Golden Age.",
    "Community Bonding: The sacred protocol of shared Iftar.",
    "Ethical Legacy: Reflecting on your generational footprint.",
    "The Heart's Audit: Assessing milestones of internal growth."
  ][i % 10]
}));

const WINNERS = [
  { rank: "01", name: "Ahmed Zubair", category: "Theology & Merit", award: "Grand Synthesis" },
  { rank: "02", name: "Mariam Siddiqua", category: "Ethical Philosophy", award: "Elite Scholar" },
  { rank: "03", name: "Ibrahim Khalil", category: "Historical Analysis", award: "Merit Laureate" },
  { rank: "04", name: "Sara Al-Fayed", category: "Spiritual Reflection", award: "Academic Honor" },
];

// --- COMPONENTS: INTERACTIVE ELEMENTS ---

const InteractiveLantern: React.FC<{ delay: number; left: string; scale?: number; stringHeight?: number; defaultOn?: boolean }> = ({ 
  delay, left, scale = 1, stringHeight = 100, defaultOn = false 
}) => {
  const [isOn, setIsOn] = useState(defaultOn);
  const lanternRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGLineElement>(null);
  const knobRef = useRef<SVGCircleElement>(null);

  // Swaying Animation
  useEffect(() => {
    if (!lanternRef.current) return;
    
    // Randomize sway slightly for natural feel
    const duration = 4 + Math.random() * 2;
    const rotation = 2 + Math.random() * 2;

    const ctx = gsap.context(() => {
      gsap.to(lanternRef.current, {
        rotation: rotation,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
      gsap.to(lanternRef.current, {
        rotation: -rotation,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay + duration
      });
    }, lanternRef);

    return () => ctx.revert();
  }, [delay]);

  const toggleLight = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsOn(prev => !prev);

    // Pull Animation
    const tl = gsap.timeline();
    
    // Stretch rope down
    tl.to([ropeRef.current, knobRef.current], {
      y: 15,
      duration: 0.1,
      ease: "power2.out"
    })
    // Spring back up
    .to([ropeRef.current, knobRef.current], {
      y: 0,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <div 
      className="absolute top-0 pointer-events-auto z-50 origin-top"
      style={{ left: left, transform: `scale(${scale})` }}
    >
       {/* Main String */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#D4AF37]/60" style={{ height: `${stringHeight}px` }} />
       
       <div 
          ref={lanternRef} 
          className="relative origin-top"
          style={{ marginTop: `${stringHeight}px` }}
       >
          <div className={`transition-all duration-700 ${isOn ? 'drop-shadow-[0_0_60px_rgba(255,215,0,0.6)]' : 'drop-shadow-none'}`}>
            <svg width="80" height="140" viewBox="0 0 80 140" fill="none" className="overflow-visible">
                {/* Lantern Top */}
                <path d="M40 0L25 15H55L40 0Z" fill="#042f2e" stroke="#D4AF37" strokeWidth="1" />
                <rect x="39" y="-20" width="2" height="20" fill="#D4AF37" />
                
                {/* Lantern Body */}
                <path d="M25 15 L10 35 V95 L25 110 L55 110 L70 95 V35 L55 15 Z" 
                      fill={isOn ? "url(#glowGradient)" : "#021a1a"} 
                      stroke="#D4AF37" 
                      strokeWidth="1.5" 
                      className="transition-colors duration-500"
                />
                
                {/* Detailed Pattern (Grill) */}
                <path d="M10 35 H70 M10 95 H70" stroke="#D4AF37" strokeWidth="0.5" />
                <path d="M40 15 V110" stroke="#D4AF37" strokeWidth="0.5" />
                <path d="M25 15 V110 M55 15 V110" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 2" />
                
                {/* Inner Glow Bulb */}
                <circle cx="40" cy="65" r="12" 
                        fill="#F9E9A8" 
                        className={`transition-opacity duration-300 ${isOn ? 'opacity-100' : 'opacity-10'}`} 
                />
                
                {/* Bottom Decorative Tassel Base */}
                <path d="M25 110 L40 120 L55 110" fill="none" stroke="#D4AF37" strokeWidth="1" />

                {/* Definitions for Glow */}
                <defs>
                  <radialGradient id="glowGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40 65) rotate(90) scale(50)">
                    <stop stopColor="#F9E9A8" stopOpacity="0.4"/>
                    <stop offset="1" stopColor="#042f2e" stopOpacity="0.8"/>
                  </radialGradient>
                </defs>
            </svg>
          </div>

          {/* Interactive Pull String Area */}
          <div 
            onClick={toggleLight}
            className="absolute top-[120px] left-0 w-full h-[60px] cursor-pointer group z-50 flex justify-center"
          >
             <svg width="80" height="60" viewBox="0 0 80 60" className="overflow-visible pointer-events-none">
                 <line 
                    ref={ropeRef}
                    x1="40" y1="0" x2="40" y2="40" 
                    stroke="#D4AF37" 
                    strokeWidth="1.5" 
                    className="group-hover:stroke-white transition-colors"
                 />
                 <circle 
                    ref={knobRef}
                    cx="40" cy="40" r="4" 
                    fill="#D4AF37" 
                    className="group-hover:fill-white transition-colors shadow-lg" 
                 />
             </svg>
             {/* Invisible Hit Area Overlay */}
             <div className="absolute top-0 left-[30px] w-[20px] h-[50px] bg-transparent" />
          </div>
       </div>
    </div>
  );
};

// NEW BACKGROUND: Sacred Geometry & Stardust
const SacredGeometryBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#020b0e]">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a1f1f] to-[#022c2b] opacity-90" />

        {/* Rotating Geometric Patterns (Large & Slow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] opacity-[0.03] animate-spin-very-slow">
           <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] fill-none stroke-current stroke-[0.2]">
              <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="20" />
           </svg>
        </div>
        
        <div className="absolute top-0 left-0 w-[50vw] h-[50vw] opacity-[0.02] animate-spin-reverse-slow">
           <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] fill-none stroke-current stroke-[0.3]">
              <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
              <rect x="25" y="25" width="50" height="50" />
           </svg>
        </div>

        {/* Rising Gold Dust (Particles) */}
        <div className="absolute inset-0">
           {[...Array(40)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-[#F9E9A8] rounded-full animate-rise-fade"
                style={{
                   width: Math.random() * 3 + 'px',
                   height: Math.random() * 3 + 'px',
                   bottom: '-10px',
                   left: Math.random() * 100 + '%',
                   animationDuration: Math.random() * 10 + 10 + 's',
                   animationDelay: Math.random() * 10 + 's',
                   opacity: Math.random() * 0.5
                }}
              />
           ))}
        </div>

        {/* Twinkling Stars */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '70px 70px', opacity: 0.15 }}></div>
    </div>
  );
};

// --- NEW COMPONENT: LUNAR DECK (Replaces Astrolabe Dial) ---
const LunarDeck: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveDay(prev => (prev === 30 ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setActiveDay(prev => (prev === 1 ? 30 : prev - 1));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate transition between days
      gsap.fromTo(".quest-content", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeDay]);

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 relative z-10">
       <div className="text-center mb-20">
          <h4 className="text-[11px] font-mosaic font-bold uppercase tracking-[0.6em] text-[#D4AF37] mb-6">The Celestial Calendar</h4>
          <h5 className="text-5xl md:text-8xl font-mosaic font-black uppercase tracking-tighter text-white drop-shadow-xl">Ramadan Cycle</h5>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left: Typography & Day Indicator */}
          <div className="lg:col-span-5 text-center lg:text-left relative">
             <div className="absolute -left-20 -top-20 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
             
             <div className="inline-block border border-[#D4AF37]/30 px-6 py-2 rounded-full text-[#D4AF37] text-sm font-mosaic font-bold uppercase tracking-widest mb-8">
                Day {String(activeDay).padStart(2, '0')}
             </div>
             
             <h2 className="quest-content text-4xl md:text-6xl font-mosaic font-black text-white uppercase leading-[1.1] tracking-tight mb-8">
                {RAMADAN_QUESTS[activeDay - 1].title}
             </h2>

             <div className="flex items-center justify-center lg:justify-start gap-6">
                <button 
                   onClick={handlePrev}
                   className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 active:scale-90"
                >
                   <ChevronLeft size={24} />
                </button>
                <div className="h-px w-24 bg-[#D4AF37]/20" />
                <button 
                   onClick={handleNext}
                   className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 active:scale-90"
                >
                   <ChevronRight size={24} />
                </button>
             </div>
          </div>

          {/* Right: The Quest Card */}
          <div className="lg:col-span-7">
             <div className="quest-content relative p-10 md:p-16 rounded-[2rem] border border-[#D4AF37]/20 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                {/* Decorative Islamic Pattern Overlay (Abstract) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='%23D4AF37' fill-rule='evenodd'/%3E%3C/svg%3E")` }} 
                />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent rounded-bl-[100px]" />

                <div className="relative z-10">
                   <div className="flex items-center gap-4 mb-8 text-[#D4AF37]">
                      <Star className="fill-current" size={24} />
                      <span className="text-xs font-bold uppercase tracking-[0.4em]">Daily Mission</span>
                   </div>
                   
                   <p className="text-xl md:text-3xl font-literary italic text-zinc-300 leading-relaxed font-light">
                      "{RAMADAN_QUESTS[activeDay - 1].task}"
                   </p>

                   <div className="mt-12 flex items-center gap-4">
                      <div className="h-1 flex-1 bg-[#D4AF37]/10 rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-[#D4AF37] transition-all duration-700 ease-out" 
                           style={{ width: `${(activeDay / 30) * 100}%` }} 
                         />
                      </div>
                      <span className="text-[10px] font-bold text-[#D4AF37]/60 uppercase tracking-widest">{activeDay}/30 Complete</span>
                   </div>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export const SpiritualQuest: React.FC<{ onBack: () => void; isDark: boolean; setIsDark: (val: boolean) => void }> = ({ onBack, isDark, setIsDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      const tl = gsap.timeline();
      tl.fromTo(".hero-title-main", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" })
        .fromTo(".hero-decor", { opacity: 0 }, { opacity: 1, duration: 1.5 }, "-=0.5");

      // 2. Scroll Reveals
      gsap.utils.toArray('.reveal-majestic').forEach((item: any) => {
        gsap.fromTo(item, 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%"
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020202] text-[#f0fdf4] font-literary selection:bg-[#D4AF37] selection:text-[#042f2e] overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <div className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-4 text-[#D4AF37] hover:text-white transition-colors pointer-events-auto bg-[#0a0a0a]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#D4AF37]/30 shadow-lg"
        >
          <ArrowLeft size={20} />
          <span className="text-xs font-mosaic font-bold uppercase tracking-[0.2em] hidden sm:block">Return</span>
        </button>

        <button 
          onClick={() => setIsDark(!isDark)} 
          className="pointer-events-auto p-3 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all shadow-lg group"
        >
           {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <SacredGeometryBackground />
        
        {/* INTERACTIVE LANTERNS - Moved z-index to 30 to be ABOVE text (z-20) */}
        <div className="lantern-group absolute top-0 left-0 w-full h-full pointer-events-none z-30">
           <div className="w-full h-full relative">
              <InteractiveLantern delay={0} left="10%" scale={0.8} stringHeight={60} defaultOn={false} />
              <InteractiveLantern delay={1.5} left="25%" scale={1.1} stringHeight={120} defaultOn={true} />
              <InteractiveLantern delay={0.5} left="80%" scale={1.0} stringHeight={80} defaultOn={false} />
              <InteractiveLantern delay={2} left="92%" scale={0.7} stringHeight={150} defaultOn={true} />
           </div>
        </div>

        <div className="relative z-20 text-center flex flex-col items-center max-w-7xl px-6 -mt-12 pointer-events-none">
          
          <div className="hero-decor mb-6 flex flex-col items-center gap-2 opacity-90">
             <div className="text-[14px] font-mosaic font-bold uppercase tracking-[0.5em] text-[#D4AF37] drop-shadow-md">Forte-FY Presents</div>
             <div className="w-16 h-1 bg-[#D4AF37]" />
          </div>

          <div className="relative mb-8">
             <h1 className="hero-title-main text-[15vw] md:text-[8vw] font-mosaic font-black leading-[0.9] tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-[#F9E9A8] via-[#D4AF37] to-[#B8860B] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                The <br/> Spiritual <br/> Quest
             </h1>
          </div>

          <p className="hero-decor text-xl md:text-2xl font-literary italic text-[#D4AF37] tracking-wider px-4 max-w-2xl drop-shadow-md">
            "A Divine Journey into the Architecture of the Soul"
          </p>
        </div>

        {/* Scroll Indicator - To fill empty bottom space */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer group pointer-events-auto"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
            <span className="text-[9px] font-mosaic font-bold uppercase tracking-[0.3em] text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors">Begin Journey</span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-transparent relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1/3 bg-[#F9E9A8] blur-[1px] animate-scroll-light" />
            </div>
        </div>
      </section>

      {/* --- MANIFESTO (Midnight & Gold) --- */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 bg-[#050505] border-t border-[#D4AF37]/10">
        <div className="reveal-majestic">
          <div className="flex items-center gap-4 mb-8 text-[#D4AF37]">
             <Sparkles size={24} strokeWidth={2} />
             <h3 className="text-xs font-mosaic font-bold uppercase tracking-[0.4em]">The Visionary Path</h3>
          </div>
          <h2 className="text-4xl md:text-6xl font-mosaic font-black uppercase tracking-tight mb-10 leading-[1.1] text-white drop-shadow-lg">
             Cultivating <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9E9A8]">Inner Nobility.</span>
          </h2>
          <div className="space-y-8 text-lg md:text-xl font-literary leading-relaxed text-zinc-300 text-justify border-l-4 border-[#D4AF37]/50 pl-8">
            <p>
              In a world of noise, <strong className="text-[#D4AF37]">The Spiritual Quest</strong> is a sanctuary of silence and strength. We define leadership not by volume, but by the weight of character and the clarity of the soul.
            </p>
            <p>
              By fusing ancient wisdom with modern discipline, we forge a generation capable of navigating chaos with absolute ethical precision.
            </p>
          </div>
        </div>

        <div className="reveal-majestic relative flex justify-center">
          <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
             <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-full animate-spin-slow" style={{ animationDuration: '60s' }} />
             <div className="absolute inset-8 border-2 border-dashed border-[#D4AF37]/20 rounded-full animate-spin-slow" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[60px] animate-pulse" />
                <Moon size={180} strokeWidth={0.5} className="text-[#D4AF37] drop-shadow-[0_0_40px_rgba(212,175,55,0.6)] relative z-10" />
             </div>
          </div>
        </div>
      </section>

      {/* --- THE LUNAR PROGRESSION (NEW DIAL DESIGN) --- */}
      <section className="py-32 relative z-10 overflow-hidden bg-[#080808] border-y border-[#D4AF37]/20 shadow-2xl">
        <LunarDeck />
      </section>

      {/* --- METRICS (Charcoal Background) --- */}
      <section className="py-48 px-6 md:px-12 max-w-7xl mx-auto bg-[#020202]">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { label: "Spiritual Impressions", value: "95K+", icon: BookOpen },
              { label: "Journey Participants", value: "840", icon: Users },
              { label: "Community Synthesis", value: "110", icon: Heart }
            ].map((stat, i) => (
              <div key={i} className="reveal-majestic flex flex-col items-center text-center p-10 border border-[#D4AF37]/20 bg-[#0a0a0a] rounded-2xl shadow-lg hover:border-[#D4AF37]/50 transition-colors">
                 <stat.icon size={32} className="text-[#D4AF37] mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                 <h3 className="text-6xl font-mosaic font-bold italic mb-4 text-white tracking-tighter">{stat.value}</h3>
                 <p className="text-[10px] font-mosaic font-bold uppercase tracking-[0.4em] text-[#D4AF37]">{stat.label}</p>
              </div>
            ))}
         </div>
      </section>

      {/* --- APEX SCHOLARS (Dark & Gold) --- */}
      <section className="py-48 px-6 border-t border-[#D4AF37]/20 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="reveal-majestic text-center mb-32">
             <h3 className="text-[11px] font-mosaic font-bold uppercase tracking-[0.6em] text-[#D4AF37] mb-6">Hall of Merit</h3>
             <h4 className="text-5xl md:text-7xl font-mosaic font-black uppercase text-white tracking-tighter">Apex Scholars</h4>
          </div>

          <div className="space-y-6">
             {WINNERS.map((w, i) => (
                <div 
                  key={i} 
                  className="reveal-majestic group relative flex flex-col md:flex-row items-center justify-between p-10 border border-[#D4AF37]/20 bg-[#0a0a0a] hover:border-[#D4AF37] transition-all duration-500 overflow-hidden shadow-md"
                >
                   <div className="absolute left-0 top-0 h-full w-2 bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                   
                   <div className="flex items-center gap-12 mb-6 md:mb-0 relative z-10">
                      <span className="text-6xl font-mosaic font-bold text-zinc-800 group-hover:text-[#D4AF37]/20 transition-colors duration-500 select-none">
                        {w.rank}
                      </span>
                      <div>
                         <h5 className="text-2xl md:text-3xl font-mosaic font-bold text-white uppercase tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-300">
                            {w.name}
                         </h5>
                         <p className="text-[10px] font-mosaic font-bold text-[#D4AF37] uppercase tracking-[0.4em]">
                            {w.category}
                         </p>
                      </div>
                   </div>

                   <div className="flex items-center gap-8 relative z-10">
                      <div className="text-right hidden sm:block">
                         <span className="block text-lg font-mosaic font-bold text-zinc-300 uppercase tracking-wider mb-1">{w.award}</span>
                         <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]/60">Verified Distinction</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                         <Award size={20} />
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-48 flex flex-col items-center justify-center gap-16 border-t border-[#D4AF37]/30 relative bg-[#020202]">
         <div className="text-center space-y-8 relative z-10">
            <h4 className="text-[10vw] font-mosaic font-black text-[#0f0f0f] uppercase tracking-widest select-none leading-none">MCMXXII</h4>
            <div className="flex flex-col items-center gap-6">
               <p className="text-[11px] font-mosaic font-bold text-[#D4AF37] uppercase tracking-[1em] translate-x-4">Archival Registry Folio</p>
               <div className="w-24 h-[2px] bg-[#D4AF37]" />
            </div>
         </div>
         <button 
           onClick={onBack} 
           className="group relative px-16 py-6 border border-[#D4AF37] font-mosaic font-bold text-xs uppercase tracking-[0.5em] text-[#D4AF37] overflow-hidden transition-all duration-500 hover:text-black hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] z-20 bg-[#0a0a0a]"
         >
           <span className="relative z-10">Return to Nexus</span>
           <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
         </button>
      </footer>
      
      <style>{`
         @keyframes spin-very-slow {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
         }
         @keyframes spin-reverse-slow {
            from { transform: translate(-50%, -50%) rotate(360deg); }
            to { transform: translate(-50%, -50%) rotate(0deg); }
         }
         @keyframes rise-fade {
            0% { bottom: -10px; opacity: 0; }
            50% { opacity: 0.5; }
            100% { bottom: 100%; opacity: 0; }
         }
         @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
         }
         .animate-spin-very-slow {
            animation: spin-very-slow 200s linear infinite;
         }
         .animate-spin-reverse-slow {
            animation: spin-reverse-slow 150s linear infinite;
         }
         .animate-rise-fade {
            animation: rise-fade linear infinite;
         }
         .animate-spin-slow {
            animation: spin-slow 240s linear infinite;
         }
         @keyframes scroll-light {
            0% { top: -100%; }
            100% { top: 100%; }
         }
         .animate-scroll-light {
            animation: scroll-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
         }
      `}</style>

    </div>
  );
};
