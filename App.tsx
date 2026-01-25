
import React, { useState, useEffect, useRef } from 'react';
import { NavSection, Demographics } from './types';
import { FORTE_EVENTS, HALL_OF_FAME, HERO_IMAGE_URL, COLLABORATIONS, AWARDS, PARTNER_LOGOS, SPONSORS, DEPARTMENT_LIST } from './constants';
import { jsPDF } from 'jspdf';
import { 
  Rocket, Users, Mail, Phone, 
  Quote, Menu, X, 
  Target, Laptop, GraduationCap,
  Activity as Pulse, Disc, Briefcase, Trophy,
  Shield, 
  Layers, Database,
  Linkedin, Facebook, Instagram, Download
} from 'lucide-react';

import ScrollReveal from './components/ScrollReveal';
import DepartmentCard from './components/DepartmentCard';
import DepartmentsView from './components/DepartmentsView';
import DepartmentDetailView from './components/DepartmentDetailView';

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

// --- INTERACTIVE ARCHIVE: COLLABORATIONS & AWARDS ---

const InteractiveArchive: React.FC = () => {
  return (
    <section id={NavSection.Laurels} className="relative py-20 md:py-36 bg-[#030707] overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(0,247,255,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/[0.03] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/[0.03] blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <ScrollReveal className="mb-16 md:mb-24 flex flex-col items-center">
           <div className="inline-flex items-center gap-3 px-5 py-1.5 bg-white/[0.02] border border-white/10 rounded-full mb-6 md:mb-8">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_#00f7ff]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">Archival Records & Synthesis</span>
           </div>
           <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold text-white tracking-tight uppercase leading-[1] text-center mb-6 md:mb-8">
              Institutional <br/> <span className="text-cyan-500">Excellence.</span>
           </h2>
           <div className="w-16 md:w-20 h-0.5 bg-cyan-500/30" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-7 relative">
             <div className="flex items-center gap-4 mb-10 md:mb-14">
                <Layers size={20} className="text-cyan-500" />
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-tight">Strategic Partnerships</h3>
             </div>
             <div className="absolute left-[20px] md:left-[214px] top-28 bottom-12 w-px bg-white/5 hidden sm:block" />
             <div className="space-y-12 md:space-y-16">
                {COLLABORATIONS.map((collab, i) => (
                  <ScrollReveal key={i} delay={i * 80} className="group relative flex flex-col md:flex-row items-start">
                    <div className="md:w-[190px] md:pr-12 md:text-right mb-2 md:mb-0 pt-1">
                       <span className="text-[10px] font-mono text-cyan-600 uppercase font-bold tracking-wider block mb-1">
                          {collab.date}
                       </span>
                       <h4 className="text-sm md:text-base font-bold text-zinc-300 uppercase tracking-tight group-hover:text-white transition-colors">
                          {collab.name}
                       </h4>
                    </div>
                    <div className="relative z-20 shrink-0 md:mt-2.5 hidden sm:flex">
                       <div className="w-10 h-10 md:w-11 md:h-11 bg-[#050909] rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(0,247,255,0.15)]">
                          <div className="w-2 h-2 bg-zinc-700 rounded-full group-hover:bg-cyan-500 transition-colors" />
                       </div>
                    </div>
                    <div className="md:flex-1 md:pl-12 w-full">
                       <div className="p-6 md:p-9 bg-white/[0.01] border border-white/5 rounded-2xl group-hover:border-cyan-500/20 transition-all duration-500 hover:bg-white/[0.02] shadow-sm">
                          <h5 className="text-sm md:text-xl font-heading font-medium text-zinc-400 group-hover:text-zinc-100 leading-snug">
                             {collab.event}
                          </h5>
                          <div className="mt-4 md:mt-6 flex items-center gap-2">
                             <div className="w-4 md:w-6 h-px bg-cyan-500/30" />
                             <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-widest text-zinc-600">Verification ID: FP-0{i+1}</span>
                          </div>
                       </div>
                    </div>
                  </ScrollReveal>
                ))}
             </div>
          </div>

          <div className="lg:col-span-5">
             <div className="flex items-center gap-4 mb-10 md:mb-14">
                <Trophy size={20} className="text-cyan-500" />
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-tight">Merit Accomplishments</h3>
             </div>
             <div className="grid grid-cols-1 gap-5 md:gap-6">
                {AWARDS.map((award, i) => (
                  <ScrollReveal key={i} delay={(i + 2) * 100} className="group">
                    <div className="p-6 md:p-8 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-cyan-500/40 transition-all duration-700 flex flex-col gap-5 md:gap-6 shadow-xl relative overflow-hidden">
                       <div className="flex items-start gap-4 md:gap-6 relative z-10">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shrink-0">
                             <Trophy size={20} />
                          </div>
                          <div className="flex-1">
                             <h4 className="text-base md:text-xl font-heading font-bold text-zinc-200 uppercase tracking-tight group-hover:text-white leading-tight">
                                {award.title}
                             </h4>
                             {award.subtitle && (
                               <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500 mt-2 border-l border-cyan-500/20 pl-3 md:pl-4">
                                  {award.subtitle}
                               </p>
                             )}
                          </div>
                       </div>
                       <div className="flex justify-between items-center pt-5 md:pt-6 border-t border-white/5">
                          <span className="text-[8px] md:text-[9px] font-mono text-zinc-700 tracking-wider">AWD_REF_NO: {2023001 + i}</span>
                          <Shield size={14} className="text-zinc-800 group-hover:text-cyan-500/60 transition-colors" />
                       </div>
                    </div>
                  </ScrollReveal>
                ))}
             </div>
             <div className="mt-8 md:mt-12 p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center justify-between group hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-4 md:gap-5">
                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/5 flex items-center justify-center shrink-0">
                      <Database size={16} className="text-cyan-500/60" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Historical Ledger</span>
                      <span className="text-[7px] md:text-[8px] font-mono text-zinc-600 mt-1 uppercase">Synchronized Main-DB</span>
                   </div>
                </div>
                <div className="px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1.5 md:gap-2">
                   <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[8px] md:text-[9px] font-mono font-bold text-green-500/80 uppercase">Online</span>
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
      className="fixed z-[100] w-[260px] md:w-[300px] glass p-6 rounded-[2rem] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,247,255,0.2)] animate-fade-in pointer-events-none hidden lg:block"
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
  onNav: (path: string) => void;
  onDownload: () => void;
}

const NeuralNexusCommand: React.FC<NeuralNexusCommandProps> = ({ onNav, onDownload }) => {
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
    <div className="w-full bg-[#030303] py-12 md:py-24 px-4 md:px-8 relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] md:h-[1200px] bg-cyan-500/5 blur-[120px] md:blur-[200px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10 w-full">
        <div className="text-center mb-8 md:mb-16">
           <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
              <div className="w-6 md:w-12 h-px bg-cyan-500/40" />
              <h2 className="text-sm md:text-3xl font-black uppercase tracking-[0.4em] md:tracking-[1.2em] text-cyan-500 font-heading">Neural Nexus Command</h2>
              <div className="w-6 md:w-12 h-px bg-cyan-500/40" />
           </div>
           <p className="text-[7px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] md:tracking-[0.8em]">Systematic Audience Synthesis</p>
        </div>

        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-2 md:gap-4 mb-8 md:mb-12 no-scrollbar bg-black/20 md:bg-black/40 p-1.5 md:p-2 rounded-[1.2rem] md:rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-3xl">
          {FORTE_EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedId(event.id)}
              className={`flex-none md:flex-1 min-w-[150px] md:min-w-[200px] px-5 py-3 md:px-8 md:py-6 rounded-lg md:rounded-2xl transition-all duration-700 relative overflow-hidden group border ${
                selectedId === event.id 
                ? 'bg-[#0a0a0a] border-cyan-500/60 text-white shadow-lg' 
                : 'bg-transparent border-white/5 text-zinc-600 hover:border-white/20 hover:text-zinc-400'
              }`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <span className="block text-sm sm:text-lg lg:text-2xl font-heading font-black uppercase italic tracking-tighter leading-none mb-1 md:mb-2 group-hover:scale-105 transition-transform">
                  {event.name}
                </span>
                <span className="block text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-700 group-hover:text-cyan-500 transition-colors">
                  {event.year}
                </span>
              </div>
              {selectedId === event.id && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-cyan-500" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6 order-2 lg:order-1">
            <div 
              className="bg-[#080808] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden group shadow-3xl cursor-help flex-1 min-h-[220px]"
              onMouseMove={(e) => handleMouseMove(e, 'Total Resonance (Reach)', 'reach', current.metrics.reach)}
              onMouseLeave={() => setComparison(null)}
            >
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
                 <div className="w-[180px] md:w-[300px] h-[180px] md:h-[300px] border border-dashed border-cyan-500 rounded-full animate-spin-slow" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-zinc-500 mb-3 md:mb-6">Aggregate Impact</span>
                <h3 className="text-4xl md:text-8xl font-heading font-black italic tracking-tighter text-white leading-none mb-3 md:mb-6 group-hover:text-cyan-500 transition-colors duration-1000 select-none">
                  <CountUp key={`reach-${selectedId}`} end={current.metrics.reach / 1000} suffix="K+" />
                </h3>
                <div className="w-16 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mt-2 md:mt-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
               <div 
                 className="bg-[#080808] rounded-[1.2rem] md:rounded-[2rem] border border-white/10 p-5 md:p-8 flex flex-col items-center justify-center text-center group transition-all hover:border-cyan-500/30 hover:bg-[#0a0a0a] cursor-help"
                 onMouseMove={(e) => handleMouseMove(e, 'Ambassadors', 'ambassadors', current.metrics.ambassadors)}
                 onMouseLeave={() => setComparison(null)}
               >
                  <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-cyan-500/5 flex items-center justify-center text-cyan-500/40 mb-2 md:mb-4 group-hover:text-cyan-500 transition-colors">
                    <Users size={16} />
                  </div>
                  <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1 md:mb-2 group-hover:text-zinc-400">Ambassadors</span>
                  <p className="text-2xl md:text-4xl font-heading font-black italic text-white group-hover:text-cyan-500 transition-colors">
                    <CountUp key={`ambassadors-${selectedId}`} end={current.metrics.ambassadors} />
                  </p>
               </div>
               <div 
                 className="bg-[#080808] rounded-[1.2rem] md:rounded-[2rem] border border-white/10 p-5 md:p-8 flex flex-col items-center justify-center text-center group transition-all hover:border-cyan-500/30 hover:bg-[#0a0a0a] cursor-help"
                 onMouseMove={(e) => handleMouseMove(e, 'Participants', 'participants', current.metrics.participants)}
                 onMouseLeave={() => setComparison(null)}
               >
                  <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-cyan-500/5 flex items-center justify-center text-cyan-500/40 mb-2 md:mb-4 group-hover:text-cyan-500 transition-colors">
                    <Target size={16} />
                  </div>
                  <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1 md:mb-2 group-hover:text-zinc-400">Participants</span>
                  <p className="text-2xl md:text-4xl font-heading font-black italic text-white group-hover:text-cyan-500 transition-colors">
                    <CountUp key={`participants-${selectedId}`} end={current.metrics.participants} />
                  </p>
               </div>
            </div>
          </div>
          <div className="lg:col-span-7 bg-[#080808] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 p-6 md:p-12 shadow-3xl relative overflow-hidden flex flex-col h-full order-1 lg:order-2">
            <div className="flex justify-between items-center mb-6 md:mb-10">
               <div className="flex items-center gap-3 md:gap-6">
                  <div className="p-2.5 md:p-4 bg-cyan-500/5 rounded-lg md:rounded-2xl border border-cyan-500/10 shadow-[0_0_20px_rgba(0,247,255,0.05)]">
                     <Pulse className="text-cyan-500 animate-pulse w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-2xl font-heading font-black text-white uppercase italic tracking-tight leading-none mb-1">Demographic Scan</h4>
                    <p className="text-[7px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest">Active System State</p>
                  </div>
               </div>
            </div>
            <div className="mb-6 md:mb-10">
              <div className="flex justify-between items-center mb-4 md:mb-6 pb-2 md:pb-4 border-b border-white/5">
                <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.2em] md:tracking-[0.4em]">Geographic Dispersion</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 md:gap-x-12 gap-y-3 md:gap-y-6">
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
                       <span className="text-[7px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-widest group-hover:text-white transition-colors truncate">{div.label}</span>
                       <span className="text-sm md:text-xl font-heading font-black italic text-cyan-500/60 group-hover:text-cyan-500 transition-colors">
                          <CountUp key={`geo-${div.key}-${selectedId}`} end={current.demographics[div.key] as number} suffix="%" />
                       </span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full transition-all duration-[1s] ease-out ${i === 0 ? 'bg-cyan-500 shadow-[0_0_12px_#00f7ff]' : 'bg-white/20'}`} style={{ width: isUpdating ? '0%' : `${current.demographics[div.key]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6 md:mb-10">
              <div className="flex justify-between items-center mb-4 md:mb-6 pb-2 md:pb-4 border-b border-white/5">
                <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.2em] md:tracking-[0.4em]">Academic Distribution</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
                {[
                  { label: 'School', key: 'eduSchool' as keyof Demographics, icon: <Disc size={8} /> },
                  { label: 'College', key: 'eduCollege' as keyof Demographics, icon: <Laptop size={8} /> },
                  { label: 'Undergrad', key: 'eduUndergrad' as keyof Demographics, icon: <GraduationCap size={8} /> },
                  { label: 'Postgrad', key: 'eduPostgrad' as keyof Demographics, icon: <Briefcase size={8} /> },
                ].map((edu, i) => (
                  <div 
                    key={edu.label} 
                    className="bg-white/5 p-2.5 md:p-4 rounded-lg md:rounded-2xl border border-white/5 group hover:bg-white/10 hover:border-cyan-500/20 transition-all flex flex-col items-center cursor-help"
                    onMouseMove={(e) => handleMouseMove(e, `${edu.label} Level`, edu.key, current.demographics[edu.key] as number)}
                    onMouseLeave={() => setComparison(null)}
                  >
                    <div className="text-zinc-700 group-hover:text-cyan-500 transition-colors mb-1 md:mb-2">{edu.icon}</div>
                    <span className="text-[6px] md:text-[8px] font-black text-zinc-600 uppercase mb-0.5 md:mb-2 text-center tracking-widest">{edu.label}</span>
                    <p className="text-lg md:text-2xl font-heading font-black italic text-white group-hover:text-cyan-500 transition-colors leading-none">
                      <CountUp key={`edu-${edu.key}-${selectedId}`} end={current.demographics[edu.key] as number} suffix="%" />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 pt-5 md:pt-8 border-t border-white/5 mt-auto">
               <div className="bg-[#111] p-5 md:p-8 rounded-[1.2rem] md:rounded-[2rem] border border-white/10 flex flex-col items-center justify-center w-full md:w-auto md:min-w-[200px] shadow-3xl relative group overflow-hidden">
                  <div className="text-center relative z-10">
                     <p className="text-[7px] md:text-[9px] font-black text-cyan-500/60 uppercase tracking-[0.3em] mb-1 md:mb-2">Target Cluster</p>
                     <p className="text-2xl md:text-4xl font-heading font-black italic text-white tracking-tighter leading-none">{current.demographics.ageRange}</p>
                  </div>
               </div>
               <div className="flex-1 text-center md:text-left">
                  <p className="text-zinc-500 text-[10px] md:text-sm italic font-light leading-relaxed mb-4 md:mb-0">High resonance peak within the <span className="text-white font-bold italic">{current.demographics.ageRange}</span> window.</p>
                  <button onClick={onDownload} className="px-5 py-2.5 bg-white text-black rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2">Get Portfolio <Download size={12} /></button>
               </div>
            </div>
          </div>
        </div>
      </div>
      <DataComparisonPopup data={comparison} />
    </div>
  );
};

const DepartmentsSection: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  return (
    <section id={NavSection.Architecture} className="py-16 md:py-32 px-5 md:px-6 relative overflow-hidden bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12 md:mb-24">
          <h2 className="text-cyan-500 text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-3 md:mb-4">Architecture</h2>
          <h3 className="text-3xl md:text-5xl font-heading font-black uppercase italic tracking-tighter">Structural <span className="text-white/40">Pillars</span></h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {DEPARTMENT_LIST.map((dept, i) => (
            <ScrollReveal key={i} delay={i * 100} className="h-full">
               <DepartmentCard dept={dept} navigate={navigate} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ... PartnersSection kept as is ...
const PartnersSection: React.FC = () => {
  const partners = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="py-16 md:py-32 bg-black overflow-hidden border-t border-white/5 relative">
       <ScrollReveal className="text-center mb-16 md:mb-24">
          <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2 md:mb-4">Ecosystem Network</h2>
          <h3 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase italic tracking-tighter">Strategic Allies</h3>
       </ScrollReveal>
       
       <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 py-8 items-start">
             {partners.map((partner, i) => (
                <div key={i} className="flex flex-col items-center gap-6 md:gap-10 transition-all duration-700 group shrink-0">
                   <div className="w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-white/20 p-3 md:p-6 transition-all duration-500 shadow-2xl flex items-center justify-center bg-zinc-900 shadow-cyan-500/10">
                      <img src={partner.imageUrl} alt={partner.name} className="w-full h-full object-contain rounded-full brightness-110 contrast-110" />
                   </div>
                   <span className="text-[10px] md:text-[14px] font-heading font-black uppercase tracking-[0.15em] text-white group-hover:text-cyan-500 text-center px-4 transition-colors whitespace-normal max-w-[140px] md:max-w-[240px] leading-tight">
                      {partner.name}
                   </span>
                </div>
             ))}
          </div>
       </div>

       <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 80s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
       `}</style>
    </section>
  );
};

// --- VIEWS ---

const HomeView: React.FC<{ navigate: (path: string) => void; handleDownload: () => void }> = ({ navigate, handleDownload }) => {
  return (
    <>
      <section id={NavSection.Home} className="relative min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20 px-5 overflow-hidden group/hero">
        <div className="absolute inset-0 z-0 overflow-hidden">
           <img src={HERO_IMAGE_URL} className="w-full h-full object-cover grayscale brightness-[0.2] transition-all duration-[3000ms] group-hover/hero:scale-105" alt="Hero Backdrop" />
           <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] opacity-80" />
        </div>
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2.5 glass rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-10 text-cyan-500 border border-cyan-500/20 shadow-cyan">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" /> For a Fortunate Future
            </div>
            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] font-heading font-black uppercase leading-[0.85] mb-6 md:mb-8 tracking-tighter w-full px-2">
              <span className="text-white italic">Manifest</span> <br />
              <span className="text-[#00f7ff] italic">Tomorrow.</span>
            </h1>
            <p className="text-sm md:text-xl text-zinc-500 max-w-2xl mb-8 md:mb-12 leading-relaxed font-light px-2 mx-auto">Established May 26, 2022. We manufacture a generation of accomplished individuals through rigorous skill elevation.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3.5 md:gap-5 w-full max-w-xs sm:max-w-none mx-auto px-4">
              <button onClick={() => navigate('#history')} className="px-7 py-3.5 md:px-10 md:py-5 bg-cyan-500 hover:bg-white text-black font-black uppercase tracking-widest transition-all rounded-lg md:rounded-full flex items-center justify-center gap-2.5 md:gap-3 text-xs md:text-base group active:scale-95 shadow-xl min-w-[150px]">About Us <Rocket size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" /></button>
              <button onClick={handleDownload} className="px-7 py-3.5 md:px-10 md:py-5 glass hover:bg-white/10 text-white font-black uppercase tracking-widest transition-all rounded-lg md:rounded-full flex items-center justify-center gap-2.5 md:gap-3 text-xs md:text-base active:scale-95 border border-white/10 min-w-[150px]">Portfolio PDF <Download size={18} className="shrink-0" /></button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id={NavSection.History} className="py-16 md:py-32 px-5 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <ScrollReveal className="text-center mb-10 md:mb-24">
             <h2 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-cyan-500 mb-3 md:mb-6 block">Vision-Action Convergence</h2>
             <h3 className="text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none">The First Step</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
             <ScrollReveal className="text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-6 md:space-y-10">
                   <div>
                      <h4 className="text-2xl md:text-5xl font-heading font-black italic uppercase text-white mb-4 md:mb-6 leading-tight">May 26, 2022. <br/><span className="text-cyan-500">The Initiation.</span></h4>
                      <div className="space-y-4 md:space-y-5 text-zinc-500 text-sm md:text-lg lg:text-xl font-light leading-relaxed">
                        <p>Forte-FY began with a singular focus: bridging the gap between raw talent and professional execution. Founded in Dhaka, we established a sanctuary where learning is intentional.</p>
                        <p>We believe that youth empowerment requires more than recognition—it requires consistent investment in systemic skill-building. Our mission is to manufacture a generation of accomplished individuals through rigorous skill elevation.</p>
                      </div>
                   </div>
                   <div className="border-l-2 md:border-l-3 border-cyan-500 pl-6 lg:pl-10 relative text-left">
                      <Quote className="absolute -top-6 -left-4 w-10 h-10 md:w-12 md:h-12 text-cyan-500/5" />
                      <p className="text-sm md:text-xl text-zinc-300 italic font-medium leading-relaxed">"We don't just build skills; we manufacture community and resilient character."</p>
                      <p className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500 mt-4 md:mt-6">— FOUNDERS' COLLECTIVE</p>
                   </div>
                </div>
             </ScrollReveal>
             <ScrollReveal className="relative flex justify-center w-full order-1 lg:order-2" delay={200}>
                <div className="w-full max-w-[400px] lg:max-w-none aspect-square glass rounded-2xl md:rounded-[3rem] overflow-hidden relative group shadow-xl border-white/5">
                   <img src="https://i.postimg.cc/Nf2dQJwn/IMG_7751.jpg" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1500ms]" alt="Founding moment" />
                   <div className="absolute inset-0 bg-cyan-500/5 group-hover:opacity-0 transition-opacity" />
                </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      <section id={NavSection.Initiatives} className="py-16 md:py-32 px-5 bg-white/[0.01] flex flex-col items-center">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
          <ScrollReveal className="text-center mb-10 md:mb-24">
            <h2 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-cyan-500 mb-3 md:mb-6 block">Strategic Progression</h2>
            <h3 className="text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none">The Archive</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 w-full">
            {FORTE_EVENTS.map((event, idx) => (
              <ScrollReveal key={event.id} className={`delay-${idx * 150}`}>
                <div className="group relative glass rounded-xl md:rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-cyan-500/30 flex flex-col items-center shadow-lg hover:-translate-y-1.5 h-full">
                  <div className="w-full aspect-[16/10] relative overflow-hidden bg-black">
                     <img src={event.image} className="w-full h-full object-cover grayscale brightness-50 blur-[0.5px] transition-all duration-[1000ms] group-hover:grayscale-0 group-hover:brightness-100 group-hover:blur-0 group-hover:scale-105" alt={event.name} />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-6 md:p-10 flex flex-col items-center text-center flex-1">
                    <div className="mb-4 md:mb-6">
                      <h4 className="text-cyan-500 font-black text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.4em] mb-1.5 md:mb-3 block">{event.tagline}</h4>
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
        <NeuralNexusCommand onNav={navigate} onDownload={handleDownload} />
      </section>

      <DepartmentsSection navigate={navigate} />

      <section id={NavSection.HallOfFame} className="py-16 md:py-32 px-5 relative overflow-hidden border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <ScrollReveal className="text-center mb-10 md:mb-24">
            <h2 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-cyan-500 mb-3 md:mb-6 block">Resonant Figures</h2>
            <h3 className="text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none">The Apex Circle</h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 w-full">
             {HALL_OF_FAME.map((member, i) => (
               <ScrollReveal key={i} className={`delay-${i * 100}`}>
                 <div className="group relative flex flex-col items-center text-center h-full">
                   <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-full overflow-hidden border border-white/5 p-1 mb-4 md:mb-8 group-hover:border-cyan-500/50 transition-all duration-700 shadow-lg active:scale-95 shrink-0">
                     <img src={member.image} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={member.name} />
                   </div>
                   <h4 className="text-sm md:text-xl font-heading font-black uppercase mb-1 italic tracking-tight group-hover:text-cyan-400 transition-colors leading-tight px-1">{member.name}</h4>
                   <p className="text-cyan-500 font-black uppercase text-[6px] md:text-[8px] tracking-[0.1em] md:tracking-[0.2em] mb-2 md:mb-6 leading-none">{member.role}</p>
                   <div className="max-w-[150px] md:max-w-[240px] flex-1 hidden sm:block">
                     <Quote size={12} className="text-cyan-500/10 mb-2 md:mb-3 mx-auto group-hover:text-cyan-500/40 transition-colors" />
                     <p className="text-zinc-500 text-[10px] md:text-sm font-light leading-relaxed italic group-hover:text-zinc-300 transition-colors">"{member.impact}"</p>
                   </div>
                 </div>
               </ScrollReveal>
             ))}
          </div>
        </div>
      </section>

      <InteractiveArchive />

      {/* --- CORPORATE SPONSORS SECTION --- */}
      <section className="bg-black py-20 md:py-32 px-5 relative overflow-hidden border-t border-cyan-500/10">
        <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <h2 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] text-cyan-500 mb-4 md:mb-6">Global Synergy</h2>
            <h3 className="text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none mb-6">Strategic <span className="text-white/40">Sponsors</span></h3>
            <p className="text-zinc-500 text-sm md:text-lg font-light leading-relaxed max-w-3xl mx-auto italic">Partnering with corporate leaders to deliver institutional excellence and youth empowerment.</p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-4xl">
            {SPONSORS.map((sponsor, i) => (
              <ScrollReveal key={i} delay={i * 200}>
                <div className="group relative glass rounded-2xl md:rounded-[3rem] p-8 md:p-12 overflow-hidden border border-white/5 hover:border-cyan-500/40 transition-all duration-700 shadow-2xl flex flex-col items-center">
                   <div className="h-24 md:h-36 w-full flex items-center justify-center mb-8 relative z-10 group-hover:scale-105 transition-transform duration-700">
                      <img src={sponsor.imageUrl} alt={sponsor.name} className="h-full w-auto object-contain drop-shadow-[0_0_20px_rgba(0,247,255,0.2)]" />
                   </div>
                   <div className="text-center relative z-10">
                      <h4 className="text-xl md:text-3xl font-heading font-black uppercase italic text-white group-hover:text-cyan-400 transition-colors">{sponsor.name}</h4>
                      <p className="text-[8px] md:text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-2">Core Institutional Partner</p>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & SOCIAL SECTION --- */}
      <section id={NavSection.Contact} className="bg-black py-20 md:py-32 px-5 relative overflow-hidden border-t border-white/5">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center w-full">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-heading font-black uppercase italic mb-16 md:mb-24 leading-[0.8] tracking-tighter text-center">Connect <br /> <span className="text-cyan-500 not-italic">Nexus.</span></h2>
          </ScrollReveal>

          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">
              <ScrollReveal delay={100}>
                <h4 className="text-[9px] md:text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-6 md:mb-8">Direct Outreach</h4>
                <div className="flex flex-col gap-5 md:gap-6 items-center md:items-start">
                  <a href="mailto:fortefy.org@gmail.com" className="group flex items-center gap-4 hover:text-cyan-400 transition-colors">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all shrink-0">
                      <Mail size={16} />
                    </div>
                    <span className="text-[11px] md:text-sm font-bold uppercase tracking-widest truncate max-w-[200px] sm:max-w-none">fortefy.org@gmail.com</span>
                  </a>
                  <a href="tel:01974362254" className="group flex items-center gap-4 hover:text-cyan-400 transition-colors">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all shrink-0">
                      <Phone size={16} />
                    </div>
                    <span className="text-[11px] md:text-sm font-bold uppercase tracking-widest">+880 1974 362254</span>
                  </a>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <h4 className="text-[9px] md:text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-6 md:mb-8">Digital Footprint</h4>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-5">
                   {[
                     { icon: <Linkedin size={18} />, label: 'LinkedIn', url: 'https://linkedin.com/company/fortefy' },
                     { icon: <Facebook size={18} />, label: 'Facebook', url: 'https://facebook.com/fortefy' },
                     { icon: <Instagram size={18} />, label: 'Instagram', url: 'https://instagram.com/fortefy' }
                   ].map((social, i) => (
                     <a key={i} href={social.url} target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-cyan-500 transition-all hover:scale-105" aria-label={social.label}>
                       {social.icon}
                     </a>
                   ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <h4 className="text-[9px] md:text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-6 md:mb-8">Action Array</h4>
                <button onClick={handleDownload} className="w-full px-7 py-3.5 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-lg hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2.5 text-xs md:text-sm active:scale-95">
                  Get Portfolio PDF <Download size={16} />
                </button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      <PartnersSection />
    </>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  // Helper to parse URL
  const getInitialState = () => {
    const path = window.location.pathname;
    if (path.startsWith('/departments/')) {
       return { view: 'detail' as const, id: path.split('/')[2] };
    }
    if (path === '/departments') {
       return { view: 'departments' as const, id: null };
    }
    return { view: 'home' as const, id: null };
  };

  const initialState = getInitialState();
  const [currentView, setCurrentView] = useState<'home' | 'departments' | 'detail'>(initialState.view);
  const [currentDeptId, setCurrentDeptId] = useState<string | null>(initialState.id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Popstate listener for back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const state = getInitialState();
      setCurrentView(state.view);
      setCurrentDeptId(state.id);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (path: string) => {
    setIsMenuOpen(false);

    // Hash navigation (anchors on home page)
    if (path.startsWith('#')) {
      const hash = path;
      if (currentView !== 'home') {
        window.history.pushState(null, '', '/' + hash);
        setCurrentView('home');
        setCurrentDeptId(null);
        setTimeout(() => {
           const el = document.getElementById(hash.substring(1));
           if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
         window.history.pushState(null, '', '/' + hash);
         const el = document.getElementById(hash.substring(1));
         if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Standard page navigation
    window.history.pushState(null, '', path);

    if (path.startsWith('/departments/')) {
      const id = path.split('/')[2];
      setCurrentDeptId(id);
      setCurrentView('detail');
      window.scrollTo(0, 0);
    } else if (path === '/departments') {
      setCurrentView('departments');
      setCurrentDeptId(null);
      window.scrollTo(0, 0);
    } else {
      setCurrentView('home');
      setCurrentDeptId(null);
      window.scrollTo(0, 0);
    }
  };

  const handleDownloadPortfolio = () => {
    const doc = new jsPDF();
    const primaryColor = [0, 247, 255]; // Cyan
    const darkColor = [3, 3, 3];
    const grayColor = [150, 150, 150];
    
    // Helper to draw common footer
    const drawFooter = (pageNum: number) => {
        doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.rect(0, 280, 210, 17, 'F');
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(`Forte-FY | Institutional Portfolio | Page ${pageNum}`, 105, 290, { align: "center" });
    };

    // Page 1: High Fidelity Hero Cover
    doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.rect(5, 5, 200, 287);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("FOR A FORTUNATE FUTURE", 105, 100, { align: "center", charSpace: 2 });
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(64);
    doc.text("MANIFEST", 105, 135, { align: "center" });
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(72);
    doc.text("TOMORROW.", 105, 165, { align: "center" });
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("ESTABLISHED MAY 26, 2022", 105, 190, { align: "center" });
    drawFooter(1);

    // Page 2: About (The First Step)
    doc.addPage();
    doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(10);
    doc.text("VISION-ACTION CONVERGENCE", 20, 30);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(42);
    doc.text("THE FIRST STEP", 20, 48);
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(2);
    doc.line(20, 55, 190, 55);
    doc.setFontSize(12);
    doc.setTextColor(200, 200, 200);
    const histText = "Forte-FY began with a singular focus: bridging the gap between raw talent and professional execution. Founded in Dhaka, we established a sanctuary where learning is intentional.\n\nWe believe that youth empowerment requires more than recognition—it requires consistent investment in systemic skill-building. Our mission is to manufacture a generation of accomplished individuals through rigorous skill elevation.";
    doc.text(doc.splitTextToSize(histText, 170), 20, 75);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text("FOUNDERS' COLLECTIVE", 20, 130);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(255, 255, 255);
    doc.text('"We don\'t just build skills; we manufacture community and resilient character."', 20, 140);
    drawFooter(2);

    doc.save("Forte-FY_Institutional_Portfolio.pdf");
  };

  const renderContent = () => {
    if (currentView === 'departments') {
      return <DepartmentsView navigate={navigate} />;
    }
    if (currentView === 'detail' && currentDeptId) {
      const dept = DEPARTMENT_LIST.find(d => d.id === currentDeptId);
      if (dept) return <DepartmentDetailView dept={dept} navigate={navigate} />;
    }
    return <HomeView navigate={navigate} handleDownload={handleDownloadPortfolio} />;
  };

  return (
    <div className="min-h-screen text-white bg-[#030303] text-center selection:bg-cyan-500 selection:text-black w-full flex flex-col transition-all duration-300">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 md:h-20 flex items-center px-4 md:px-0 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-cyan-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-10 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-8 h-8 md:w-10 md:h-10 border border-cyan-500/50 rounded-full flex items-center justify-center transition-transform group-hover:rotate-180 duration-1000">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_#00f7ff]" />
            </div>
            <span className="font-heading font-black text-sm md:text-xl tracking-tighter uppercase italic group-hover:text-cyan-400 transition-colors">Forte-FY</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <button 
              onClick={() => navigate('/')} 
              className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${currentView === 'home' ? 'text-cyan-500' : 'text-zinc-500 hover:text-white'}`}
            >
              Nexus
            </button>
            <button 
              onClick={() => navigate('/departments')} 
              className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${currentView === 'departments' ? 'text-cyan-500' : 'text-zinc-500 hover:text-white'}`}
            >
              Departments
            </button>
            <button onClick={handleDownloadPortfolio} className="px-6 py-2.5 bg-cyan-500 text-black hover:bg-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-2">Portfolio <Download size={14} /></button>
          </div>

          <button className="lg:hidden text-white p-2 z-50 rounded-full active:bg-white/5 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full">
        {renderContent()}
      </main>

      <footer className="bg-black py-10 md:py-16 px-5 relative flex flex-col items-center border-t border-white/5">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 md:gap-8 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-cyan-500/50 rounded-full flex items-center justify-center p-1 group-hover:rotate-180 transition-transform duration-1000">
              <div className="w-2 h-2 md:w-4 md:h-4 bg-cyan-500 rounded-full animate-pulse" />
            </div>
            <div className="text-center">
              <p className="font-heading font-black text-xl md:text-2xl uppercase italic tracking-tighter leading-none group-hover:text-cyan-400 transition-colors">Forte-FY</p>
              <p className="text-[7px] md:text-[8px] font-black text-zinc-700 uppercase tracking-[0.5em] mt-2">Fortunate Future Initiative</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center text-[7px] md:text-[9px] font-black text-zinc-800 uppercase tracking-[0.3em] mt-10">
             <span>Est. May 26, 2022</span>
             <span className="hidden sm:block w-1 h-1 bg-zinc-900 rounded-full" />
             <span>Dhaka, Bangladesh</span>
             <span className="hidden sm:block w-1 h-1 bg-zinc-900 rounded-full" />
             <span>Systems Nominal</span>
          </div>
        </div>
      </footer>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[70] bg-black/98 backdrop-blur-3xl text-white flex flex-col p-6 sm:p-12 animate-fade-in text-center overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 border border-cyan-500/50 rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
               </div>
               <span className="font-heading font-black text-lg uppercase italic tracking-tighter text-cyan-500">Forte-FY</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 active:bg-white/5 rounded-full text-cyan-500 transition-colors"><X size={28}/></button>
          </div>
          <div className="flex flex-col gap-8 items-center flex-1 justify-center py-4">
             <button onClick={() => navigate('/')} className={`text-4xl font-heading font-black uppercase italic tracking-tighter transition-all ${currentView === 'home' ? 'text-cyan-500' : 'text-white'}`}>Nexus</button>
             <button onClick={() => navigate('/departments')} className={`text-4xl font-heading font-black uppercase italic tracking-tighter transition-all ${currentView === 'departments' ? 'text-cyan-500' : 'text-white'}`}>Departments</button>
          </div>
          <div className="mt-10 pb-6">
            <button onClick={handleDownloadPortfolio} className="w-full py-5 bg-cyan-500 text-black rounded-xl font-heading font-black uppercase italic tracking-tighter text-xl active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3">Get Portfolio <Download size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
