
import React, { useState, useEffect, useRef } from 'react';
import { NavSection, SkillRoadmap, Demographics } from './types';
import { FORTE_EVENTS, HALL_OF_FAME, HERO_IMAGE_URL, COLLABORATIONS, AWARDS } from './constants';
import { generateSkillRoadmap } from './services/geminiService';
import ImpactGenerator from './components/ImpactGenerator';
import { 
  Rocket, Users, Mail, Phone, ChevronRight, 
  Loader2, Quote, Menu, X, ArrowUpRight,
  Star, Target, Laptop, GraduationCap,
  Activity as Pulse, Disc, Briefcase, Megaphone, Trophy,
  Shield, Terminal, Radio, Zap, Globe, Cpu, ChevronDown,
  Layers, Bookmark, CheckCircle, Database
} from 'lucide-react';

// --- Utility Components ---

const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    setCount(0);
    startTime.current = null;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (percentage < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
};

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-[1000ms] transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- INTERACTIVE ARCHIVE: COLLABORATIONS & AWARDS ---

const InteractiveArchive: React.FC = () => {
  return (
    <section id={NavSection.Laurels} className="relative py-24 md:py-36 bg-[#030707] overflow-hidden border-t border-white/5">
      {/* Background Texture - Clean Dot Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(0,247,255,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Subtle Depth Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/[0.03] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/[0.03] blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="mb-24 flex flex-col items-center">
           <div className="inline-flex items-center gap-3 px-5 py-1.5 bg-white/[0.02] border border-white/10 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_#00f7ff]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">Archival Records & Synthesis</span>
           </div>
           <h2 className="text-4xl md:text-7xl font-heading font-bold text-white tracking-tight uppercase leading-[0.9] text-center mb-8">
              Institutional <br/> <span className="text-cyan-500">Excellence.</span>
           </h2>
           <div className="w-20 h-0.5 bg-cyan-500/30" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Column 1: Ecosystem Partnerships */}
          <div className="lg:col-span-7 relative">
             <div className="flex items-center gap-4 mb-14">
                <Layers size={20} className="text-cyan-500" />
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-tight">Strategic Partnerships</h3>
             </div>

             {/* Vertical Timeline Line */}
             <div className="absolute left-[20px] md:left-[214px] top-28 bottom-12 w-px bg-white/5" />

             <div className="space-y-16">
                {COLLABORATIONS.map((collab, i) => (
                  <ScrollReveal key={i} delay={i * 80} className="group relative flex flex-col md:flex-row items-start">
                    
                    {/* Date/Label Column */}
                    <div className="md:w-[190px] md:pr-12 md:text-right mb-4 md:mb-0 pt-1">
                       <span className="text-[10px] font-mono text-cyan-600 uppercase font-bold tracking-wider block mb-1">
                          {collab.date}
                       </span>
                       <h4 className="text-sm md:text-base font-bold text-zinc-300 uppercase tracking-tight group-hover:text-white transition-colors">
                          {collab.name}
                       </h4>
                    </div>

                    {/* Timeline Dot */}
                    <div className="relative z-20 shrink-0 md:mt-2.5">
                       <div className="w-10 h-10 md:w-11 md:h-11 bg-[#050909] rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(0,247,255,0.15)]">
                          <div className="w-2 h-2 bg-zinc-700 rounded-full group-hover:bg-cyan-500 transition-colors" />
                       </div>
                    </div>

                    {/* Content Card */}
                    <div className="md:flex-1 md:pl-12 w-full">
                       <div className="p-7 md:p-9 bg-white/[0.01] border border-white/5 rounded-2xl group-hover:border-cyan-500/20 transition-all duration-500 hover:bg-white/[0.02] shadow-sm">
                          <h5 className="text-base md:text-xl font-heading font-medium text-zinc-400 group-hover:text-zinc-100 leading-snug">
                             {collab.event}
                          </h5>
                          <div className="mt-6 flex items-center gap-2">
                             <div className="w-6 h-px bg-cyan-500/30" />
                             <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">Verification ID: FP-0{i+1}</span>
                          </div>
                       </div>
                    </div>

                  </ScrollReveal>
                ))}
             </div>
          </div>

          {/* Column 2: Apex Awards */}
          <div className="lg:col-span-5">
             <div className="flex items-center gap-4 mb-14">
                <Trophy size={20} className="text-cyan-500" />
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-tight">Merit Accomplishments</h3>
             </div>

             <div className="grid grid-cols-1 gap-6">
                {AWARDS.map((award, i) => (
                  <ScrollReveal key={i} delay={(i + 2) * 100} className="group">
                    <div className="p-8 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-cyan-500/40 transition-all duration-700 flex flex-col gap-6 shadow-xl relative overflow-hidden">
                       <div className="flex items-start gap-6 relative z-10">
                          <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500">
                             <Trophy size={24} />
                          </div>
                          <div className="flex-1">
                             <h4 className="text-lg md:text-xl font-heading font-bold text-zinc-200 uppercase tracking-tight group-hover:text-white leading-tight">
                                {award.title}
                             </h4>
                             {award.subtitle && (
                               <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mt-2 border-l border-cyan-500/20 pl-4">
                                  {award.subtitle}
                               </p>
                             )}
                          </div>
                       </div>
                       <div className="flex justify-between items-center pt-6 border-t border-white/5">
                          <span className="text-[9px] font-mono text-zinc-700 tracking-wider">AWD_REF_NO: {2023001 + i}</span>
                          <Shield size={16} className="text-zinc-800 group-hover:text-cyan-500/60 transition-colors" />
                       </div>
                    </div>
                  </ScrollReveal>
                ))}
             </div>

             {/* Status Block */}
             <div className="mt-12 p-8 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center justify-between group hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-5">
                   <div className="w-10 h-10 rounded-full bg-cyan-500/5 flex items-center justify-center">
                      <Database size={18} className="text-cyan-500/60" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Historical Ledger</span>
                      <span className="text-[8px] font-mono text-zinc-600 mt-1 uppercase">Synchronized with main database</span>
                   </div>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-green-500/20 flex items-center gap-2">
                   <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[9px] font-mono font-bold text-green-500/80">ONLINE</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- DATA COMPARISON OVERLAY ---

interface ComparisonData {
  label: string;
  key: keyof Demographics | 'reach' | 'ambassadors' | 'participants';
  value: number;
  position: { x: number; y: number } | null;
}

const DataComparisonPopup: React.FC<{ data: ComparisonData | null }> = ({ data }) => {
  if (!data || !data.position) return null;
  const isNumeric = ['reach', 'ambassadors', 'participants'].includes(data.key);
  const popupWidth = 300;
  let leftPos = data.position.x - popupWidth / 2;
  let topPos = data.position.y - 350 - 20;
  if (leftPos < 20) leftPos = 20;
  if (leftPos + popupWidth > window.innerWidth - 20) leftPos = window.innerWidth - popupWidth - 20;
  if (topPos < 20) topPos = data.position.y + 20;

  return (
    <div 
      className="fixed z-[100] w-[260px] md:w-[300px] glass p-6 rounded-[2rem] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,247,255,0.2)] animate-fade-in pointer-events-none"
      style={{ left: `${leftPos}px`, top: `${topPos}px` }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Pulse className="text-cyan-500 animate-pulse" size={12} />
        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Benchmark Data</span>
      </div>
      <h4 className="text-lg font-heading font-black text-white uppercase italic mb-6">{data.label}</h4>
      <div className="space-y-4">
        {FORTE_EVENTS.map((event) => {
          let val = 0;
          if (['reach', 'ambassadors', 'participants'].includes(data.key)) {
            val = event.metrics[data.key as 'reach' | 'ambassadors' | 'participants'];
          } else {
            val = event.demographics[data.key as keyof Demographics] as number;
          }
          const isReach = data.key === 'reach';
          const displayVal = isNumeric ? (isReach ? (val / 1000).toFixed(0) + 'K' : val.toLocaleString()) : val + '%';
          const maxVal = isReach ? 200000 : (isNumeric ? 2000 : 100);
          const percentageWidth = Math.min((val / maxVal) * 100, 100);
          return (
            <div key={event.id} className="relative">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[7px] font-bold text-zinc-500 uppercase">{event.name}</span>
                <span className="text-xs font-heading font-black italic text-cyan-500">{displayVal}</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 shadow-[0_0_8px_#00f7ff]" style={{ width: `${percentageWidth}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- NEURAL NEXUS: COMMAND CENTER ---

interface NeuralNexusCommandProps {
  onNav: (section: NavSection) => void;
  onJoin: () => void;
}

const NeuralNexusCommand: React.FC<NeuralNexusCommandProps> = ({ onNav, onJoin }) => {
  const [selectedId, setSelectedId] = useState(FORTE_EVENTS[0].id);
  const [isUpdating, setIsUpdating] = useState(false);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const current = FORTE_EVENTS.find(e => e.id === selectedId) || FORTE_EVENTS[0];

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 600);
    return () => clearTimeout(timer);
  }, [selectedId]);

  const handleMouseMove = (e: React.MouseEvent, label: string, key: any, value: number) => {
    if (window.innerWidth < 1024) return;
    setComparison({ label, key, value, position: { x: e.clientX, y: e.clientY } });
  };

  return (
    <div className="w-full bg-[#030303] py-16 md:py-24 px-4 md:px-8 relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] md:h-[1200px] bg-cyan-500/5 blur-[150px] md:blur-[200px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10 w-full">
        <div className="text-center mb-10 md:mb-16">
           <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
              <div className="w-8 md:w-12 h-px bg-cyan-500/40" />
              <h2 className="text-lg md:text-3xl font-black uppercase tracking-[0.6em] md:tracking-[1.2em] text-cyan-500 font-heading">Neural Nexus Command</h2>
              <div className="w-8 md:w-12 h-px bg-cyan-500/40" />
           </div>
           <p className="text-[8px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em] md:tracking-[0.8em]">Understanding Our Audience Through Data</p>
        </div>

        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-3 md:gap-4 mb-8 md:mb-12 no-scrollbar bg-black/20 md:bg-black/40 p-2 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-3xl">
          {FORTE_EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedId(event.id)}
              className={`flex-none md:flex-1 min-w-[180px] md:min-w-[200px] px-6 py-4 md:px-8 md:py-6 rounded-xl md:rounded-2xl transition-all duration-700 relative overflow-hidden group border ${
                selectedId === event.id 
                ? 'bg-[#0a0a0a] border-cyan-500/60 text-white shadow-lg' 
                : 'bg-transparent border-white/5 text-zinc-600 hover:border-white/20 hover:text-zinc-400'
              }`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <span className="block text-lg lg:text-2xl font-heading font-black uppercase italic tracking-tighter leading-none mb-1 md:mb-2 group-hover:scale-105 transition-transform">
                  {event.name}
                </span>
                <span className="block text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 group-hover:text-cyan-500 transition-colors">
                  {event.year}
                </span>
              </div>
              {selectedId === event.id && (
                <div className="absolute bottom-0 left-0 h-[2px] md:h-[3px] w-full bg-cyan-500" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
            <div 
              className="bg-[#080808] rounded-[2rem] md:rounded-[2.5rem] border border-white/10 p-10 md:p-12 flex flex-col items-center justify-center relative overflow-hidden group shadow-3xl cursor-help flex-1"
              onMouseMove={(e) => handleMouseMove(e, 'Total Resonance (Reach)', 'reach', current.metrics.reach)}
              onMouseLeave={() => setComparison(null)}
            >
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
                 <div className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] border-2 border-dashed border-cyan-500 rounded-full animate-spin-slow" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-zinc-500 mb-4 md:mb-6">Aggregate Impact</span>
                <h3 className="text-5xl md:text-8xl font-heading font-black italic tracking-tighter text-white leading-none mb-4 md:mb-6 group-hover:text-cyan-500 transition-colors duration-1000 select-none">
                  <CountUp key={`reach-${selectedId}`} end={current.metrics.reach / 1000} suffix="K+" />
                </h3>
                <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mt-2 md:mt-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
               <div 
                 className="bg-[#080808] rounded-[1.5rem] md:rounded-[2rem] border border-white/10 p-6 md:p-8 flex flex-col items-center justify-center text-center group transition-all hover:border-cyan-500/30 hover:bg-[#0a0a0a] cursor-help"
                 onMouseMove={(e) => handleMouseMove(e, 'Ambassadors', 'ambassadors', current.metrics.ambassadors)}
                 onMouseLeave={() => setComparison(null)}
               >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-cyan-500/5 flex items-center justify-center text-cyan-500/40 mb-3 md:mb-4 group-hover:text-cyan-500 transition-colors">
                    <Users size={18} />
                  </div>
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1 md:mb-2 group-hover:text-zinc-400">Ambassadors</span>
                  <p className="text-3xl md:text-4xl font-heading font-black italic text-white group-hover:text-cyan-500 transition-colors">
                    <CountUp key={`ambassadors-${selectedId}`} end={current.metrics.ambassadors} />
                  </p>
               </div>
               <div 
                 className="bg-[#080808] rounded-[1.5rem] md:rounded-[2rem] border border-white/10 p-6 md:p-8 flex flex-col items-center justify-center text-center group transition-all hover:border-cyan-500/30 hover:bg-[#0a0a0a] cursor-help"
                 onMouseMove={(e) => handleMouseMove(e, 'Participants', 'participants', current.metrics.participants)}
                 onMouseLeave={() => setComparison(null)}
               >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-cyan-500/5 flex items-center justify-center text-cyan-500/40 mb-3 md:mb-4 group-hover:text-cyan-500 transition-colors">
                    <Target size={18} />
                  </div>
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1 md:mb-2 group-hover:text-zinc-400">Participants</span>
                  <p className="text-3xl md:text-4xl font-heading font-black italic text-white group-hover:text-cyan-500 transition-colors">
                    <CountUp key={`participants-${selectedId}`} end={current.metrics.participants} />
                  </p>
               </div>
            </div>
          </div>
          <div className="lg:col-span-7 bg-[#080808] rounded-[2rem] md:rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-3xl relative overflow-hidden flex flex-col h-full order-1 lg:order-2">
            <div className="flex justify-between items-center mb-8 md:mb-10">
               <div className="flex items-center gap-4 md:gap-6">
                  <div className="p-3 md:p-4 bg-cyan-500/5 rounded-xl md:rounded-2xl border border-cyan-500/10 shadow-[0_0_30px_rgba(0,247,255,0.08)]">
                     <Pulse className="text-cyan-500 animate-pulse w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-heading font-black text-white uppercase italic tracking-tight leading-none mb-1">Demographic Scan</h4>
                    <p className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest">System Status: Active</p>
                  </div>
               </div>
            </div>
            <div className="mb-8 md:mb-10">
              <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/5">
                <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.3em] md:tracking-[0.4em]">Geographic Array</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 md:gap-x-12 gap-y-4 md:gap-y-6">
                {[
                  { label: 'Dhaka', key: 'geoDhaka' as keyof Demographics },
                  { label: 'Chattogram', key: 'geoChattogram' as keyof Demographics },
                  { label: 'Sylhet', key: 'geoSylhet' as keyof Demographics },
                  { label: 'Rajshahi', key: 'geoRajshahi' as keyof Demographics },
                  { label: 'Khulna', key: 'geoKhulna' as keyof Demographics },
                  { label: 'Barishal', key: 'geoBarishal' as keyof Demographics },
                  { label: 'Rangpur', key: 'geoRangpur' as keyof Demographics },
                  { label: 'Mymensingh', key: 'geoMymensingh' as keyof Demographics },
                ].map((div, i) => (
                  <div 
                    key={div.label} 
                    className="group cursor-help"
                    onMouseMove={(e) => handleMouseMove(e, `${div.label} Division`, div.key, current.demographics[div.key] as number)}
                    onMouseLeave={() => setComparison(null)}
                  >
                    <div className="flex justify-between items-end mb-1 md:mb-2">
                       <span className="text-[8px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-widest group-hover:text-white transition-colors">{div.label}</span>
                       <span className="text-base md:text-xl font-heading font-black italic text-cyan-500/60 group-hover:text-cyan-500 transition-colors">
                          <CountUp key={`geo-${div.key}-${selectedId}`} end={current.demographics[div.key] as number} suffix="%" />
                       </span>
                    </div>
                    <div className="h-1 md:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full transition-all duration-[1s] ease-out ${i === 0 ? 'bg-cyan-500 shadow-[0_0_12px_#00f7ff]' : 'bg-white/20'}`} style={{ width: isUpdating ? '0%' : `${current.demographics[div.key]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8 md:mb-10">
              <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/5">
                <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.3em] md:tracking-[0.4em]">Academic Stratum</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { label: 'School', key: 'eduSchool' as keyof Demographics, icon: <Disc size={10} /> },
                  { label: 'College', key: 'eduCollege' as keyof Demographics, icon: <Laptop size={10} /> },
                  { label: 'Undergrad', key: 'eduUndergrad' as keyof Demographics, icon: <GraduationCap size={10} /> },
                  { label: 'Postgrad', key: 'eduPostgrad' as keyof Demographics, icon: <Briefcase size={10} /> },
                ].map((edu, i) => (
                  <div 
                    key={edu.label} 
                    className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5 group hover:bg-white/10 hover:border-cyan-500/20 transition-all flex flex-col items-center cursor-help"
                    onMouseMove={(e) => handleMouseMove(e, `${edu.label} Level`, edu.key, current.demographics[edu.key] as number)}
                    onMouseLeave={() => setComparison(null)}
                  >
                    <div className="text-zinc-700 group-hover:text-cyan-500 transition-colors mb-1 md:mb-2">{edu.icon}</div>
                    <span className="text-[7px] md:text-[8px] font-black text-zinc-600 uppercase mb-1 md:mb-2 text-center tracking-widest">{edu.label}</span>
                    <p className="text-xl md:text-2xl font-heading font-black italic text-white group-hover:text-cyan-500 transition-colors leading-none">
                      <CountUp key={`edu-${edu.key}-${selectedId}`} end={current.demographics[edu.key] as number} suffix="%" />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 pt-6 md:pt-8 border-t border-white/5 mt-auto">
               <div className="bg-[#111] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 flex flex-col items-center justify-center w-full md:w-auto md:min-w-[200px] shadow-3xl relative group overflow-hidden">
                  <div className="text-center relative z-10">
                     <p className="text-[8px] md:text-[9px] font-black text-cyan-500/60 uppercase tracking-[0.4em] mb-1 md:mb-2">Target Cluster</p>
                     <p className="text-3xl md:text-4xl font-heading font-black italic text-white tracking-tighter leading-none">{current.demographics.ageRange}</p>
                  </div>
               </div>
               <div className="flex-1 text-center md:text-left">
                  <p className="text-zinc-500 text-xs md:text-sm italic font-light leading-relaxed mb-4 md:mb-0">Peak resonance achieved within the <span className="text-white font-bold italic">{current.demographics.ageRange}</span> window.</p>
                  <button onClick={onJoin} className="px-6 py-2 bg-white text-black rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all active:scale-95">Deploy System Array</button>
               </div>
            </div>
          </div>
        </div>
      </div>
      <DataComparisonPopup data={comparison} />
    </div>
  );
};

const DepartmentsSection: React.FC = () => {
  const departmentData = [
    {
      name: "Human Resources",
      icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
      tagline: "Cultivating Talent",
      description: "Directing the recruitment pipeline and volunteer lifecycle management.",
      colorClass: "text-[#bf00ff] border-[#bf00ff]/20 bg-[#bf00ff]/5 shadow-[#bf00ff]/10",
      accent: "#bf00ff"
    },
    {
      name: "Public Relations",
      icon: <Megaphone className="w-8 h-8 md:w-10 md:h-10" />,
      tagline: "Voice of Forte-FY",
      description: "Managing external communications and official digital presence.",
      colorClass: "text-[#ff0000] border-[#ff0000]/20 bg-[#ff0000]/5 shadow-[#ff0000]/10",
      accent: "#ff0000"
    },
    {
      name: "Academics",
      icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />,
      tagline: "Knowledge Forge",
      description: "Ensuring educational excellence through high-impact curriculum orchestration.",
      colorClass: "text-[#00a2ff] border-[#00a2ff]/20 bg-[#00a2ff]/5 shadow-[#00a2ff]/10",
      accent: "#00a2ff"
    },
    {
      name: "Information Tech",
      icon: <Laptop className="w-8 h-8 md:w-10 md:h-10" />,
      tagline: "Technical Backbone",
      description: "Architecting the digital infrastructure to power youth-led initiatives.",
      colorClass: "text-[#00f7ff] border-[#00f7ff]/20 bg-[#00f7ff]/5 shadow-[#00f7ff]/10",
      accent: "#00f7ff"
    }
  ];

  return (
    <section id={NavSection.Architecture} className="py-20 md:py-32 px-6 relative overflow-hidden bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <h2 className="text-cyan-500 text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] mb-4">Framework</h2>
          <h3 className="text-3xl md:text-5xl font-heading font-black uppercase italic tracking-tighter">Structural <span className="text-white/40">Pillars</span></h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {departmentData.map((dept, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className={`h-full group border p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 flex flex-col relative overflow-hidden ${dept.colorClass} hover:brightness-110 shadow-lg`}>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 border border-white/5 shadow-inner" style={{ color: dept.accent }}>
                  {dept.icon}
                </div>
                <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-2 md:mb-3 opacity-60">{dept.tagline}</h4>
                <h3 className="text-xl md:text-2xl font-heading font-black text-white italic tracking-tight mb-4 md:mb-6">{dept.name}</h3>
                <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed mb-6">{dept.description}</p>
                <div className="mt-auto pt-6 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-opacity">
                  <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Domain 0{i+1}</span>
                  <div className="w-8 md:w-10 h-0.5" style={{ backgroundColor: dept.accent }} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.Home);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [roadmap, setRoadmap] = useState<SkillRoadmap | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (section: NavSection) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      const yOffset = -70; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleJoinUs = () => window.open('https://forms.google.com/your-form-link-here', '_blank');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const data = await generateSkillRoadmap(skillInput);
      setRoadmap(data);
    } catch (error) {
      console.error("Skill roadmap generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen text-white bg-[#030303] text-center overflow-x-hidden selection:bg-cyan-500 selection:text-black w-full flex flex-col transition-all duration-300">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 md:h-20 flex items-center px-4 md:px-0 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-cyan-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-2 lg:px-10 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => handleNav(NavSection.Home)}>
            <div className="w-8 h-8 md:w-10 md:h-10 border border-cyan-500/50 rounded-full flex items-center justify-center transition-transform group-hover:rotate-180 duration-1000">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_#00f7ff]" />
            </div>
            <span className="font-heading font-black text-base md:text-xl tracking-tighter uppercase italic group-hover:text-cyan-400 transition-colors">Forte-FY</span>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            {[
              { label: 'About Us', val: NavSection.History },
              { label: 'Chronicle', val: NavSection.Initiatives },
              { label: 'Resonance', val: NavSection.Analysis },
              { label: 'Structure', val: NavSection.Architecture },
              { label: 'Apex', val: NavSection.HallOfFame },
              { label: 'Archive', val: NavSection.Laurels },
              { label: 'Forge', val: NavSection.SkillBuilder },
              { label: 'Synthesis', val: NavSection.Impact },
            ].map(item => (
              <button key={item.val} onClick={() => handleNav(item.val as NavSection)} className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-cyan-400 relative py-2 ${activeSection === item.val ? 'text-cyan-400' : 'text-zinc-600'}`}>
                {item.label}
                {activeSection === item.val && <span className="absolute bottom-0 left-0 right-0 h-px bg-cyan-500" />}
              </button>
            ))}
            <button onClick={handleJoinUs} className="px-5 py-2 bg-cyan-500 text-black hover:bg-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all glow-cyan active:scale-95 shadow-lg">Join Us</button>
          </div>
          <button className="lg:hidden text-white p-2 z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <section id={NavSection.Home} className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden group/hero">
        <div className="absolute inset-0 z-0 overflow-hidden">
           <img src={HERO_IMAGE_URL} className="w-full h-full object-cover grayscale brightness-[0.2] transition-all duration-[3000ms] group-hover/hero:scale-105" alt="Hero Backdrop" />
           <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] opacity-80" />
        </div>
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2.5 glass rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-10 text-cyan-500 border border-cyan-500/20 shadow-cyan">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" /> For a Fortunate Future
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black uppercase leading-[0.9] mb-6 md:mb-8 italic tracking-tighter text-glow-cyan w-full px-2">Manifest <br /><span className="text-white not-italic">Tomorrow.</span></h1>
            <p className="text-sm md:text-xl text-zinc-500 max-w-3xl mb-8 md:mb-12 leading-relaxed font-light px-4 mx-auto">Established May 26, 2022. We manufacture a generation of accomplished individuals through rigorous skill development.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-5 w-full max-w-xs sm:max-w-none mx-auto px-4">
              <button onClick={() => handleNav(NavSection.History)} className="px-8 py-4 md:px-10 md:py-5 bg-cyan-500 hover:bg-white text-black font-black uppercase tracking-widest transition-all rounded-xl md:rounded-full flex items-center justify-center gap-3 glow-cyan text-xs md:text-base group active:scale-95 shadow-xl min-w-[160px]">About Us <Rocket size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></button>
              <button onClick={handleJoinUs} className="px-8 py-4 md:px-10 md:py-5 glass hover:bg-white/10 text-white font-black uppercase tracking-widest transition-all rounded-xl md:rounded-full flex items-center justify-center gap-3 text-xs md:text-base active:scale-95 border border-cyan-500/10 min-w-[160px]">Join Us <ArrowUpRight size={18} /></button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id={NavSection.History} className="py-16 md:py-32 px-6 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <ScrollReveal className="text-center mb-12 md:mb-24">
             <h2 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] text-cyan-500 mb-4 md:mb-6 block">Where a vision became action</h2>
             <h3 className="text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none">The First Step</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
             <ScrollReveal className="text-center lg:text-left">
                <div className="space-y-8 md:space-y-10">
                   <div>
                      <h4 className="text-2xl md:text-5xl font-heading font-black italic uppercase text-white mb-4 md:mb-6 leading-tight">May 26, 2022. <br/><span className="text-cyan-500">The Initiation.</span></h4>
                      <div className="space-y-4 md:space-y-5 text-zinc-500 text-sm md:text-lg lg:text-xl font-light leading-relaxed">
                        <p>Forte-FY began with a singular focus: bridging the gap between talent and professional execution. Founded in Dhaka, we established an environment where learning is intentional.</p>
                        <p>We believe that youth empowerment requires more than recognition—it requires consistent investment in skill-building.</p>
                      </div>
                   </div>
                   <div className="border-l-2 md:border-l-3 border-cyan-500 pl-6 lg:pl-10 relative">
                      <Quote className="absolute -top-6 -left-4 w-12 h-12 text-cyan-500/5" />
                      <p className="text-base md:text-xl text-zinc-300 italic font-medium leading-relaxed">"We don't just build skills; we manufacture community and character."</p>
                      <p className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500 mt-4 md:mt-6">— FOUNDERS' COLLECTIVE</p>
                   </div>
                </div>
             </ScrollReveal>
             <ScrollReveal className="relative flex justify-center w-full" delay={200}>
                <div className="w-full max-sm:max-w-xs aspect-square glass rounded-2xl md:rounded-[3rem] overflow-hidden relative group shadow-xl border-cyan-500/10">
                   <img src="https://i.postimg.cc/Nf2dQJwn/IMG_7751.jpg" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1500ms]" alt="Founding moment" />
                   <div className="absolute inset-0 bg-cyan-500/5 group-hover:opacity-0 transition-opacity" />
                </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      <section id={NavSection.Initiatives} className="py-16 md:py-32 px-6 bg-white/[0.01] flex flex-col items-center">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
          <ScrollReveal className="text-center mb-12 md:mb-24">
            <h2 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] text-cyan-500 mb-4 md:mb-6 block">Steps that moved us forward</h2>
            <h3 className="text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none">The Archive</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 w-full">
            {FORTE_EVENTS.map((event, idx) => (
              <ScrollReveal key={event.id} className={`delay-${idx * 150}`}>
                <div className="group relative glass rounded-xl md:rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-cyan-500/30 flex flex-col items-center shadow-lg hover:-translate-y-2 h-full">
                  <div className="w-full aspect-video relative overflow-hidden bg-black">
                     <img src={event.image} className="w-full h-full object-cover grayscale brightness-50 blur-[0.5px] transition-all duration-[1000ms] group-hover:grayscale-0 group-hover:brightness-100 group-hover:blur-0 group-hover:scale-105" alt={event.name} />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-6 md:p-10 flex flex-col items-center text-center flex-1">
                    <div className="mb-4 md:mb-6">
                      <h4 className="text-cyan-500 font-black text-[7px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 md:mb-3 block">{event.tagline}</h4>
                      <h3 className="text-xl md:text-3xl font-heading font-black uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors leading-none">{event.name}</h3>
                    </div>
                    <p className="text-zinc-500 text-xs md:text-base font-light leading-relaxed mb-6 md:mb-8 max-w-xl">{event.description}</p>
                    <div className="mt-auto w-8 md:w-10 h-0.5 bg-cyan-500/20 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id={NavSection.Analysis} className="py-0 relative w-full overflow-hidden">
        <NeuralNexusCommand onNav={handleNav} onJoin={handleJoinUs} />
      </section>

      <DepartmentsSection />

      <section id={NavSection.HallOfFame} className="py-16 md:py-32 px-6 relative overflow-hidden border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <ScrollReveal className="text-center mb-12 md:mb-24">
            <h2 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] text-cyan-500 mb-4 md:mb-6 block">Resonant Figures</h2>
            <h3 className="text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none">The Apex Circle</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 w-full">
             {HALL_OF_FAME.map((member, i) => (
               <ScrollReveal key={i} className={`delay-${i * 100}`}>
                 <div className="group relative flex flex-col items-center text-center h-full">
                   <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border border-white/5 p-1 mb-6 md:mb-8 group-hover:border-cyan-500/50 transition-all duration-700 shadow-lg active:scale-95 shrink-0">
                     <img src={member.image} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={member.name} />
                   </div>
                   <h4 className="text-lg md:text-xl font-heading font-black uppercase mb-1 italic tracking-tight group-hover:text-cyan-400 transition-colors leading-tight">{member.name}</h4>
                   <p className="text-cyan-500 font-black uppercase text-[7px] md:text-[8px] tracking-[0.2em] mb-4 md:mb-6">{member.role}</p>
                   <div className="max-w-[200px] md:max-w-[240px] flex-1">
                     <Quote size={14} className="text-cyan-500/10 mb-2 md:mb-3 mx-auto group-hover:text-cyan-500/40 transition-colors" />
                     <p className="text-zinc-500 text-[10px] md:text-sm font-light leading-relaxed italic group-hover:text-zinc-300 transition-colors">"{member.impact}"</p>
                   </div>
                 </div>
               </ScrollReveal>
             ))}
          </div>
        </div>
      </section>

      <InteractiveArchive />

      <section id={NavSection.SkillBuilder} className="py-16 md:py-32 px-6 flex flex-col items-center relative overflow-hidden bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 bg-cyan-500/5 text-cyan-500 rounded-full text-[8px] md:text-[9px] font-black mb-8 md:mb-10 border border-cyan-500/10 uppercase tracking-[0.3em] md:tracking-[0.5em] shadow-lg">SKILL FORGE PROTOCOL</div>
            <h2 className="text-3xl md:text-6xl font-heading font-black uppercase italic mb-8 md:mb-12 leading-[0.9] tracking-tighter text-center px-4">Manufacture <br /> <span className="text-cyan-500 not-italic">Mastery.</span></h2>
          </ScrollReveal>
          <ScrollReveal className="w-full max-w-3xl px-4">
            <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-3 p-3 md:p-6 glass rounded-2xl md:rounded-[3rem] w-full mb-12 md:mb-20 items-center shadow-xl group transition-all">
              <input 
                type="text" 
                value={skillInput} 
                onChange={(e) => setSkillInput(e.target.value)} 
                placeholder="Initialize skill mastery..." 
                className="flex-1 bg-transparent py-3 md:py-4 px-4 md:px-6 focus:outline-none text-base md:text-2xl font-medium placeholder:text-zinc-800 text-center md:text-left selection:bg-cyan-500/20 w-full" 
              />
              <button disabled={isGenerating} className="bg-cyan-500 text-black h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-white transition-all shadow-lg shrink-0 active:scale-90">
                {isGenerating ? <Loader2 size={24} className="animate-spin" /> : <ChevronRight size={24} />}
              </button>
            </form>
          </ScrollReveal>
          {roadmap && (
            <ScrollReveal className="w-full max-w-4xl px-4">
              <div className="w-full glass p-8 md:p-16 rounded-2xl md:rounded-[4rem] border border-cyan-500/10 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 bg-cyan-500 p-3 md:p-5 rounded-lg md:rounded-[1.5rem] rotate-12 shadow-xl text-black">
                  <Star className="w-[18px] h-[18px] md:w-6 md:h-6" />
                </div>
                <h3 className="text-2xl md:text-5xl font-heading font-black uppercase mb-4 md:mb-10 italic text-white tracking-tighter leading-none">{roadmap.skill}</h3>
                <p className="text-base md:text-2xl text-zinc-400 font-light italic leading-relaxed mb-10 md:mb-20 max-w-3xl px-2 md:px-4">"{roadmap.vision}"</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 w-full">
                  {roadmap.milestones.map((m, i) => (
                    <div key={i} className="flex flex-col items-start gap-3 md:gap-5 p-6 md:p-8 glass rounded-xl md:rounded-[2.5rem] hover:bg-cyan-500/5 transition-all border border-white/5 text-left h-full group/item">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-cyan-500 flex items-center justify-center transition-all duration-500 group-hover/item:scale-105 shadow-md shadow-cyan-500/10 shrink-0">
                        <span className="font-heading font-black text-black text-lg md:text-2xl italic">0{i+1}</span>
                      </div>
                      <div className="w-full">
                         <p className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-cyan-500 mb-1 group-hover/item:translate-x-1 transition-transform">{m.phase}</p>
                         <p className="text-white text-base md:text-2xl font-bold tracking-tight leading-snug group-hover/item:text-cyan-400 transition-colors">{m.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      <section id={NavSection.Impact} className="py-16 md:py-32 px-6 bg-[#030303]">
        <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
          <ImpactGenerator />
        </div>
      </section>

      <footer id={NavSection.Contact} className="bg-black pt-16 md:pt-40 pb-10 md:pb-24 px-6 relative flex flex-col items-center overflow-hidden border-t border-cyan-500/5">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center w-full">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-6xl md:text-9xl font-heading font-black uppercase italic mb-12 md:mb-24 leading-[0.8] tracking-tighter text-center text-glow-cyan">Forge <br /> <span className="text-cyan-500 not-italic">Nexus.</span></h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-16 mb-16 md:mb-40 w-full max-w-4xl px-4">
            {[
              { icon: <Mail className="w-6 h-6 md:w-8 md:h-8" />, label: 'Email Portal', href: 'mailto:fortefy.org@gmail.com' },
              { icon: <Rocket className="w-6 h-6 md:w-8 md:h-8" />, label: 'Join System', action: handleJoinUs },
              { icon: <Phone className="w-6 h-6 md:w-8 md:h-8" />, label: 'Direct Link', href: 'tel:01974362254' }
            ].map((item, i) => (
              <ScrollReveal key={i} className={`delay-${i * 100} w-full`}>
                <button 
                  onClick={() => item.action ? item.action() : window.open(item.href)} 
                  className="flex flex-row sm:flex-col items-center sm:justify-center gap-4 md:gap-6 group w-full bg-white/5 sm:bg-transparent p-4 sm:p-0 rounded-2xl"
                >
                  <div className="w-12 h-12 md:w-32 md:h-32 glass rounded-xl md:rounded-[2.5rem] border border-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-700 shadow-lg hover:scale-105 active:scale-95 shadow-cyan-500/10 shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-sm md:text-2xl font-heading font-black italic tracking-tighter group-hover:text-cyan-400 transition-colors uppercase whitespace-nowrap">{item.label}</span>
                </button>
              </ScrollReveal>
            ))}
          </div>
          <div className="flex flex-col items-center gap-8 md:gap-24 pt-12 md:pt-32 border-t border-white/5 w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 md:w-20 md:h-20 border-2 border-cyan-500/50 rounded-full flex items-center justify-center p-2 group-hover:rotate-180 transition-transform duration-1000 shadow-cyan">
                <div className="w-3 h-3 md:w-8 md:h-8 bg-cyan-500 rounded-full animate-pulse" />
              </div>
              <div className="text-center md:text-left">
                <p className="font-heading font-black text-2xl md:text-5xl uppercase italic tracking-tighter leading-none group-hover:text-cyan-400 transition-colors">Forte-FY</p>
                <p className="text-[7px] md:text-[11px] font-black text-cyan-500 uppercase tracking-[0.5em] md:tracking-[0.8em] mt-2 md:mt-5">FORTUNATE FUTURE</p>
              </div>
            </div>
            <p className="text-[7px] md:text-[9px] font-black text-zinc-800 uppercase tracking-[0.3em] md:tracking-[0.4em] hover:text-cyan-900 transition-colors text-center px-4 leading-relaxed">EST. MAY 26, 2022 • DHAKA • FORTE-FY ORGANIZATION</p>
          </div>
        </div>
      </footer>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[70] bg-black/98 backdrop-blur-3xl text-white flex flex-col p-8 md:p-12 animate-fade-in text-center overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 border border-cyan-500/50 rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
               </div>
               <span className="font-heading font-black text-lg uppercase italic tracking-tighter text-cyan-500">Forte-FY</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 active:bg-cyan-500/10 rounded-full text-cyan-500"><X size={32}/></button>
          </div>
          <div className="flex flex-col gap-6 items-center flex-1 justify-center">
            {[
              { l: 'About Us', v: NavSection.History }, 
              { l: 'Chronicle', v: NavSection.Initiatives },
              { l: 'Resonance', v: NavSection.Analysis },
              { l: 'Apex circle', v: NavSection.HallOfFame },
              { l: 'Hub', v: NavSection.Laurels },
              { l: 'The Forge', v: NavSection.SkillBuilder },
              { l: 'Synthesis', v: NavSection.Impact },
              { l: 'Nexus Portal', v: NavSection.Contact },
            ].map((item, i) => (
              <button 
                key={item.l} 
                onClick={() => handleNav(item.v)} 
                className="text-2xl sm:text-3xl font-heading font-black uppercase italic hover:text-cyan-500 tracking-tighter leading-none transition-all active:scale-95 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {item.l}
              </button>
            ))}
          </div>
          <div className="mt-12">
            <button onClick={handleJoinUs} className="w-full py-4 bg-cyan-500 text-black rounded-xl font-heading font-black uppercase italic tracking-tighter text-lg glow-cyan shadow-xl active:scale-95">Join Us</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
