
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
  Linkedin, Facebook, Instagram, Download,
  Sun, Moon
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

const InteractiveArchive: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <section id={NavSection.Laurels} className={`relative py-16 md:py-36 overflow-hidden border-t transition-colors duration-500 ${isDark ? 'bg-[#030707] border-white/5' : 'bg-slate-50 border-black/5'}`}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(0,247,255,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none ${isDark ? 'bg-cyan-500/[0.03]' : 'bg-cyan-500/[0.05]'}`} />
      <div className={`absolute bottom-0 left-0 w-[800px] h-[800px] blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none ${isDark ? 'bg-cyan-500/[0.03]' : 'bg-purple-500/[0.05]'}`} />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <ScrollReveal className="mb-12 md:mb-24 flex flex-col items-center">
           <div className={`inline-flex items-center gap-3 px-5 py-1.5 rounded-full mb-6 md:mb-8 border ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_#00f7ff]" />
              <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>Archival Records & Synthesis</span>
           </div>
           <h2 className={`text-3xl sm:text-4xl md:text-7xl font-heading font-bold tracking-tight uppercase leading-[1] text-center mb-6 md:mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Institutional <br/> <span className="text-cyan-500">Excellence.</span>
           </h2>
           <div className="w-16 md:w-20 h-0.5 bg-cyan-500/30" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-7 relative">
             <div className="flex items-center gap-4 mb-8 md:mb-14">
                <Layers size={20} className="text-cyan-500" />
                <h3 className={`text-xl md:text-2xl font-heading font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Strategic Partnerships</h3>
             </div>
             <div className={`absolute left-[20px] md:left-[214px] top-28 bottom-12 w-px hidden sm:block ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
             <div className="space-y-8 md:space-y-16">
                {COLLABORATIONS.map((collab, i) => (
                  <ScrollReveal key={i} delay={i * 80} className="group relative flex flex-col md:flex-row items-start">
                    <div className="md:w-[190px] md:pr-12 md:text-right mb-2 md:mb-0 pt-1">
                       <span className="text-[10px] font-mono text-cyan-600 uppercase font-bold tracking-wider block mb-1">
                          {collab.date}
                       </span>
                       <h4 className={`text-sm md:text-base font-bold uppercase tracking-tight transition-colors ${isDark ? 'text-zinc-300 group-hover:text-white' : 'text-slate-600 group-hover:text-black'}`}>
                          {collab.name}
                       </h4>
                    </div>
                    <div className="relative z-20 shrink-0 md:mt-2.5 hidden sm:flex">
                       <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(0,247,255,0.15)] ${isDark ? 'bg-[#050909] border-white/10' : 'bg-white border-slate-200'}`}>
                          <div className={`w-2 h-2 rounded-full group-hover:bg-cyan-500 transition-colors ${isDark ? 'bg-zinc-700' : 'bg-slate-300'}`} />
                       </div>
                    </div>
                    <div className="md:flex-1 md:pl-12 w-full">
                       <div className={`p-6 md:p-9 border rounded-2xl group-hover:border-cyan-500/20 transition-all duration-500 shadow-sm ${isDark ? 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02]' : 'bg-white border-slate-200 hover:shadow-md'}`}>
                          <h5 className={`text-sm md:text-xl font-heading font-medium leading-snug ${isDark ? 'text-zinc-400 group-hover:text-zinc-100' : 'text-slate-600 group-hover:text-slate-900'}`}>
                             {collab.event}
                          </h5>
                          <div className="mt-4 md:mt-6 flex items-center gap-2">
                             <div className="w-4 md:w-6 h-px bg-cyan-500/30" />
                             <span className={`text-[7px] md:text-[8px] font-bold uppercase tracking-widest ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>Verification ID: FP-0{i+1}</span>
                          </div>
                       </div>
                    </div>
                  </ScrollReveal>
                ))}
             </div>
          </div>

          <div className="lg:col-span-5">
             <div className="flex items-center gap-4 mb-8 md:mb-14">
                <Trophy size={20} className="text-cyan-500" />
                <h3 className={`text-xl md:text-2xl font-heading font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Merit Accomplishments</h3>
             </div>
             <div className="grid grid-cols-1 gap-5 md:gap-6">
                {AWARDS.map((award, i) => (
                  <ScrollReveal key={i} delay={(i + 2) * 100} className="group">
                    <div className={`p-6 md:p-8 border rounded-2xl hover:border-cyan-500/40 transition-all duration-700 flex flex-col gap-5 md:gap-6 shadow-xl relative overflow-hidden ${isDark ? 'bg-white/[0.01] border-white/5' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
                       <div className="flex items-start gap-4 md:gap-6 relative z-10">
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shrink-0 ${isDark ? 'bg-white/[0.03] border-white/5' : 'bg-cyan-50 border-cyan-100'}`}>
                             <Trophy size={20} />
                          </div>
                          <div className="flex-1">
                             <h4 className={`text-base md:text-xl font-heading font-bold uppercase tracking-tight leading-tight ${isDark ? 'text-zinc-200 group-hover:text-white' : 'text-slate-800 group-hover:text-black'}`}>
                                {award.title}
                             </h4>
                             {award.subtitle && (
                               <p className={`text-[9px] font-semibold uppercase tracking-wider mt-2 border-l border-cyan-500/20 pl-3 md:pl-4 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                                  {award.subtitle}
                               </p>
                             )}
                          </div>
                       </div>
                       <div className={`flex justify-between items-center pt-5 md:pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                          <span className={`text-[8px] md:text-[9px] font-mono tracking-wider ${isDark ? 'text-zinc-700' : 'text-slate-400'}`}>AWD_REF_NO: {2023001 + i}</span>
                          <Shield size={14} className={`transition-colors ${isDark ? 'text-zinc-800 group-hover:text-cyan-500/60' : 'text-slate-300 group-hover:text-cyan-500'}`} />
                       </div>
                    </div>
                  </ScrollReveal>
                ))}
             </div>
             <div className={`mt-8 md:mt-12 p-6 md:p-8 rounded-2xl border flex items-center justify-between group transition-all ${isDark ? 'border-white/5 bg-white/[0.01] hover:bg-white/[0.02]' : 'border-slate-200 bg-white hover:shadow-lg'}`}>
                <div className="flex items-center gap-4 md:gap-5">
                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/5 flex items-center justify-center shrink-0">
                      <Database size={16} className="text-cyan-500/60" />
                   </div>
                   <div className="flex flex-col">
                      <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>Historical Ledger</span>
                      <span className={`text-[7px] md:text-[8px] font-mono mt-1 uppercase ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>Synchronized Main-DB</span>
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

const DataComparisonPopup: React.FC<{ data: ComparisonData | null; isDark: boolean }> = ({ data, isDark }) => {
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
      className={`fixed z-[100] w-[260px] md:w-[300px] p-6 rounded-[2rem] border shadow-[0_0_50px_rgba(0,247,255,0.2)] animate-fade-in pointer-events-none hidden lg:block backdrop-blur-xl ${isDark ? 'bg-black/90 border-cyan-500/30' : 'bg-white/95 border-cyan-500/20 shadow-xl'}`}
      style={{ left: `${leftPos}px`, top: `${topPos}px` }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Pulse className="text-cyan-500 animate-pulse" size={12} />
        <span className={`text-[8px] font-black uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Benchmark Data</span>
      </div>
      <h4 className={`text-lg font-heading font-black uppercase italic mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{data.label}</h4>
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
                <span className={`text-[7px] font-bold uppercase ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>{event.name}</span>
                <span className="text-xs font-heading font-black italic text-cyan-500">{displayVal}</span>
              </div>
              <div className={`h-1 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}>
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
  isDark: boolean;
}

const NeuralNexusCommand: React.FC<NeuralNexusCommandProps> = ({ onNav, onDownload, isDark }) => {
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
    <div className={`w-full py-16 md:py-24 px-4 md:px-8 relative overflow-hidden min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-[#030303]' : 'bg-slate-50'}`}>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] md:h-[1200px] bg-cyan-500/5 blur-[120px] md:blur-[200px] rounded-full pointer-events-none`} />
      
      <div className="max-w-[1400px] mx-auto relative z-10 w-full">
        <div className="text-center mb-8 md:mb-16">
           <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
              <div className="w-6 md:w-12 h-px bg-cyan-500/40" />
              <h2 className="text-sm md:text-3xl font-black uppercase tracking-[0.4em] md:tracking-[1.2em] text-cyan-500 font-heading">Neural Nexus Command</h2>
              <div className="w-6 md:w-12 h-px bg-cyan-500/40" />
           </div>
           <p className={`text-[7px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.8em] ${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>Systematic Audience Synthesis</p>
        </div>

        {/* Scrollable Event Selector */}
        <div className={`flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-2 md:gap-4 mb-8 md:mb-12 no-scrollbar p-1.5 md:p-2 rounded-[1.2rem] md:rounded-[2rem] border backdrop-blur-3xl shadow-xl snap-x ${isDark ? 'bg-black/20 border-white/5 shadow-black/50' : 'bg-white border-slate-200 shadow-slate-200/50'}`}>
          {FORTE_EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedId(event.id)}
              className={`flex-none snap-start md:flex-1 min-w-[150px] md:min-w-[200px] px-5 py-3 md:px-8 md:py-6 rounded-lg md:rounded-2xl transition-all duration-700 relative overflow-hidden group border ${
                selectedId === event.id 
                ? (isDark ? 'bg-[#0a0a0a] border-cyan-500/60 text-white shadow-lg' : 'bg-slate-900 border-cyan-500 text-white shadow-lg')
                : (isDark ? 'bg-transparent border-white/5 text-zinc-600 hover:border-white/20 hover:text-zinc-400' : 'bg-transparent border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-800')
              }`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <span className="block text-sm sm:text-lg lg:text-2xl font-heading font-black uppercase italic tracking-tighter leading-none mb-1 md:mb-2 group-hover:scale-105 transition-transform">
                  {event.name}
                </span>
                <span className={`block text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] group-hover:text-cyan-500 transition-colors ${selectedId === event.id ? 'text-cyan-500' : (isDark ? 'text-zinc-700' : 'text-slate-400')}`}>
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
              className={`rounded-[1.5rem] md:rounded-[2.5rem] border p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden group shadow-3xl cursor-help flex-1 min-h-[220px] transition-colors ${isDark ? 'bg-[#080808] border-white/10' : 'bg-white border-slate-100 shadow-xl'}`}
              onMouseMove={(e) => handleMouseMove(e, 'Total Resonance (Reach)', 'reach', current.metrics.reach)}
              onMouseLeave={() => setComparison(null)}
            >
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
                 <div className="w-[180px] md:w-[300px] h-[180px] md:h-[300px] border border-dashed border-cyan-500 rounded-full animate-spin-slow" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className={`text-[7px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em] mb-3 md:mb-6 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Aggregate Impact</span>
                {/* Fixed line-height and padding to prevent slicing */}
                <h3 className={`text-4xl md:text-8xl font-heading font-black italic tracking-tighter leading-tight pb-2 mb-2 md:mb-4 group-hover:text-cyan-500 transition-colors duration-1000 select-none ${isDark ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600'}`}>
                  <CountUp key={`reach-${selectedId}`} end={current.metrics.reach / 1000} suffix="K+" />
                </h3>
                <div className="w-16 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mt-2 md:mt-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
               <div 
                 className={`rounded-[1.2rem] md:rounded-[2rem] border p-5 md:p-8 flex flex-col items-center justify-center text-center group transition-all cursor-help ${isDark ? 'bg-[#080808] border-white/10 hover:border-cyan-500/30 hover:bg-[#0a0a0a]' : 'bg-white border-slate-100 hover:border-cyan-500/20 hover:shadow-lg'}`}
                 onMouseMove={(e) => handleMouseMove(e, 'Ambassadors', 'ambassadors', current.metrics.ambassadors)}
                 onMouseLeave={() => setComparison(null)}
               >
                  <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-cyan-500/5 flex items-center justify-center text-cyan-500/40 mb-2 md:mb-4 group-hover:text-cyan-500 transition-colors">
                    <Users size={16} />
                  </div>
                  <span className={`text-[7px] md:text-[9px] font-black uppercase tracking-widest mb-1 md:mb-2 ${isDark ? 'text-zinc-600 group-hover:text-zinc-400' : 'text-slate-400 group-hover:text-slate-600'}`}>Ambassadors</span>
                  {/* Fixed line-height and padding */}
                  <p className={`text-2xl md:text-4xl font-heading font-black italic pb-1 leading-tight group-hover:text-cyan-500 transition-colors ${isDark ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600'}`}>
                    <CountUp key={`ambassadors-${selectedId}`} end={current.metrics.ambassadors} />
                  </p>
               </div>
               <div 
                 className={`rounded-[1.2rem] md:rounded-[2rem] border p-5 md:p-8 flex flex-col items-center justify-center text-center group transition-all cursor-help ${isDark ? 'bg-[#080808] border-white/10 hover:border-cyan-500/30 hover:bg-[#0a0a0a]' : 'bg-white border-slate-100 hover:border-cyan-500/20 hover:shadow-lg'}`}
                 onMouseMove={(e) => handleMouseMove(e, 'Participants', 'participants', current.metrics.participants)}
                 onMouseLeave={() => setComparison(null)}
               >
                  <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-cyan-500/5 flex items-center justify-center text-cyan-500/40 mb-2 md:mb-4 group-hover:text-cyan-500 transition-colors">
                    <Target size={16} />
                  </div>
                  <span className={`text-[7px] md:text-[9px] font-black uppercase tracking-widest mb-1 md:mb-2 ${isDark ? 'text-zinc-600 group-hover:text-zinc-400' : 'text-slate-400 group-hover:text-slate-600'}`}>Participants</span>
                  {/* Fixed line-height and padding */}
                  <p className={`text-2xl md:text-4xl font-heading font-black italic pb-1 leading-tight group-hover:text-cyan-500 transition-colors ${isDark ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600'}`}>
                    <CountUp key={`participants-${selectedId}`} end={current.metrics.participants} />
                  </p>
               </div>
            </div>
          </div>
          <div className={`lg:col-span-7 rounded-[1.5rem] md:rounded-[2.5rem] border p-6 md:p-12 shadow-3xl relative overflow-hidden flex flex-col h-full order-1 lg:order-2 transition-colors ${isDark ? 'bg-[#080808] border-white/10' : 'bg-white border-slate-100 shadow-xl'}`}>
            <div className="flex justify-between items-center mb-6 md:mb-10">
               <div className="flex items-center gap-3 md:gap-6">
                  <div className="p-2.5 md:p-4 bg-cyan-500/5 rounded-lg md:rounded-2xl border border-cyan-500/10 shadow-[0_0_20px_rgba(0,247,255,0.05)]">
                     <Pulse className="text-cyan-500 animate-pulse w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className={`text-lg md:text-2xl font-heading font-black uppercase italic tracking-tight leading-none mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Demographic Scan</h4>
                    <p className={`text-[7px] md:text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>Active System State</p>
                  </div>
               </div>
            </div>
            <div className="mb-6 md:mb-10">
              <div className={`flex justify-between items-center mb-4 md:mb-6 pb-2 md:pb-4 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] ${isDark ? 'text-white' : 'text-slate-800'}`}>Geographic Dispersion</span>
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
                       <span className={`text-[7px] md:text-[10px] font-bold uppercase tracking-widest transition-colors truncate ${isDark ? 'text-zinc-600 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'}`}>{div.label}</span>
                       <span className={`text-sm md:text-xl font-heading font-black italic text-cyan-500/60 group-hover:text-cyan-500 transition-colors ${!isDark && 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600'}`}>
                          <CountUp key={`geo-${div.key}-${selectedId}`} end={current.demographics[div.key] as number} suffix="%" />
                       </span>
                    </div>
                    <div className={`h-1 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                       <div className={`h-full transition-all duration-[1s] ease-out ${i === 0 ? 'bg-cyan-500 shadow-[0_0_12px_#00f7ff]' : 'bg-slate-300'}`} style={{ width: isUpdating ? '0%' : `${current.demographics[div.key]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6 md:mb-10">
              <div className={`flex justify-between items-center mb-4 md:mb-6 pb-2 md:pb-4 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] ${isDark ? 'text-white' : 'text-slate-800'}`}>Academic Distribution</span>
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
                    className={`p-2.5 md:p-4 rounded-lg md:rounded-2xl border group transition-all flex flex-col items-center cursor-help ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-cyan-500/20' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-md hover:border-cyan-500/10'}`}
                    onMouseMove={(e) => handleMouseMove(e, `${edu.label} Level`, edu.key, current.demographics[edu.key] as number)}
                    onMouseLeave={() => setComparison(null)}
                  >
                    <div className={`mb-1 md:mb-2 transition-colors ${isDark ? 'text-zinc-700 group-hover:text-cyan-500' : 'text-slate-400 group-hover:text-cyan-600'}`}>{edu.icon}</div>
                    <span className={`text-[6px] md:text-[8px] font-black uppercase mb-0.5 md:mb-2 text-center tracking-widest ${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>{edu.label}</span>
                    <p className={`text-lg md:text-2xl font-heading font-black italic transition-colors leading-none ${isDark ? 'text-white group-hover:text-cyan-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600'}`}>
                      <CountUp key={`edu-${edu.key}-${selectedId}`} end={current.demographics[edu.key] as number} suffix="%" />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`flex flex-col md:flex-row items-center gap-5 md:gap-8 pt-5 md:pt-8 border-t mt-auto ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
               <div className={`p-5 md:p-8 rounded-[1.2rem] md:rounded-[2rem] border flex flex-col items-center justify-center w-full md:w-auto md:min-w-[200px] shadow-3xl relative group overflow-hidden ${isDark ? 'bg-[#111] border-white/10' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="text-center relative z-10">
                     <p className="text-[7px] md:text-[9px] font-black text-cyan-500/60 uppercase tracking-[0.3em] mb-1 md:mb-2">Target Cluster</p>
                     <p className="text-2xl md:text-4xl font-heading font-black italic text-white tracking-tighter leading-none">{current.demographics.ageRange}</p>
                  </div>
               </div>
               <div className="flex-1 text-center md:text-left">
                  <p className={`text-[10px] md:text-sm italic font-light leading-relaxed mb-4 md:mb-0 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>High resonance peak within the <span className={`${isDark ? 'text-white' : 'text-slate-900'} font-bold italic`}>{current.demographics.ageRange}</span> window.</p>
                  <button onClick={onDownload} className="px-5 py-2.5 bg-white text-black rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-200">Get Portfolio <Download size={12} /></button>
               </div>
            </div>
          </div>
        </div>
      </div>
      <DataComparisonPopup data={comparison} isDark={isDark} />
    </div>
  );
};

const DepartmentsSection: React.FC<{ navigate: (path: string) => void; isDark: boolean }> = ({ navigate, isDark }) => {
  return (
    <section id={NavSection.Architecture} className={`py-16 md:py-32 px-5 md:px-6 relative overflow-hidden border-t transition-colors duration-500 ${isDark ? 'bg-[#050505] border-white/5' : 'bg-white border-black/5'}`}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12 md:mb-24">
          <h2 className="text-cyan-500 text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-3 md:mb-4">Architecture</h2>
          <h3 className={`text-3xl md:text-5xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Structural <span className={isDark ? 'text-white/40' : 'text-slate-300'}>Pillars</span></h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {DEPARTMENT_LIST.map((dept, i) => (
            <ScrollReveal key={i} delay={i * 100} className="h-full">
               <DepartmentCard dept={dept} navigate={navigate} isDark={isDark} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersSection: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const partners = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className={`py-16 md:py-32 overflow-hidden border-t relative transition-colors duration-500 ${isDark ? 'bg-black border-white/5' : 'bg-slate-50 border-black/5'}`}>
       <ScrollReveal className="text-center mb-16 md:mb-24">
          <h2 className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Ecosystem Network</h2>
          <h3 className={`text-2xl md:text-4xl font-heading font-bold uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Strategic Allies</h3>
       </ScrollReveal>
       
       <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 py-8 items-start">
             {partners.map((partner, i) => (
                <div key={i} className="flex flex-col items-center gap-6 md:gap-10 transition-all duration-700 group shrink-0">
                   <div className={`w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden border-2 p-3 md:p-6 transition-all duration-500 shadow-2xl flex items-center justify-center ${isDark ? 'bg-zinc-900 border-white/20 shadow-cyan-500/10' : 'bg-white border-slate-200 shadow-slate-200'}`}>
                      <img src={partner.imageUrl} alt={partner.name} className="w-full h-full object-contain rounded-full brightness-110 contrast-110" />
                   </div>
                   <span className={`text-[10px] md:text-[14px] font-heading font-black uppercase tracking-[0.15em] text-center px-4 transition-colors whitespace-normal max-w-[140px] md:max-w-[240px] leading-tight ${isDark ? 'text-white group-hover:text-cyan-500' : 'text-slate-900 group-hover:text-cyan-600'}`}>
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

const HomeView: React.FC<{ navigate: (path: string) => void; handleDownload: () => void; isDark: boolean }> = ({ navigate, handleDownload, isDark }) => {
  return (
    <>
      <section id={NavSection.Home} className="relative min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20 px-5 overflow-hidden group/hero">
        <div className="absolute inset-0 z-0 overflow-hidden">
           {/* Fixed: Use object-center to keep focus, and adjust gradient opacity for Light Mode readability */}
           <img src={HERO_IMAGE_URL} className={`w-full h-full object-cover object-center transition-all duration-[3000ms] group-hover/hero:scale-105 ${isDark ? 'grayscale brightness-[0.2]' : 'grayscale-0 brightness-100'}`} alt="Hero Backdrop" />
           <div className={`absolute inset-0 bg-gradient-to-b transition-all duration-1000 ${isDark ? 'from-[#030303] via-transparent to-[#030303] opacity-90' : 'from-white/95 via-white/50 to-white/95 opacity-100'}`} />
        </div>
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <ScrollReveal>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2.5 glass rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-10 ${isDark ? 'text-cyan-500 border-cyan-500/20' : 'text-cyan-700 border-cyan-600/30'} shadow-cyan`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isDark ? 'bg-cyan-500' : 'bg-cyan-600'}`} /> For a Fortunate Future
            </div>
            {/* Fixed: Adjusted line-height and added padding to prevent text slicing */}
            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] font-heading font-black uppercase leading-[0.9] mb-6 md:mb-8 tracking-tighter w-full px-2 py-4">
              <span className={`italic ${isDark ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700'}`}>Manifest</span> <br />
              <span className={`italic ${isDark ? 'text-[#00f7ff]' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-gradient-x'}`}>Tomorrow.</span>
            </h1>
            {/* Fixed: Darker text color and heavier font weight for Light Mode readability */}
            <p className={`text-sm md:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed ${isDark ? 'font-light text-zinc-300' : 'font-medium text-slate-800'} px-2 mx-auto`}>Established May 26, 2022. We manufacture a generation of accomplished individuals through rigorous skill elevation.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3.5 md:gap-5 w-full max-w-xs sm:max-w-none mx-auto px-4">
              <button onClick={() => navigate('#history')} className="px-7 py-3.5 md:px-10 md:py-5 bg-cyan-500 hover:bg-white text-black font-black uppercase tracking-widest transition-all rounded-lg md:rounded-full flex items-center justify-center gap-2.5 md:gap-3 text-xs md:text-base group active:scale-95 shadow-xl min-w-[150px]">About Us <Rocket size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" /></button>
              {/* Fixed: Removed mix-blend-difference and added explicit light/dark styles for visibility */}
              <button 
                onClick={handleDownload} 
                className={`px-7 py-3.5 md:px-10 md:py-5 font-black uppercase tracking-widest transition-all rounded-lg md:rounded-full flex items-center justify-center gap-2.5 md:gap-3 text-xs md:text-base active:scale-95 min-w-[150px] ${isDark ? 'glass hover:bg-white/10 text-white border border-white/10' : 'bg-transparent border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'}`}
              >
                Portfolio PDF <Download size={18} className="shrink-0" />
              </button>
            </div>
          </ScrollReveal>
        </div>
        <style>{`
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
          }
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </section>

      <section id={NavSection.History} className={`py-16 md:py-32 px-5 relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-white/[0.01] border-white/5' : 'bg-white border-black/5'}`}>
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <ScrollReveal className="text-center mb-10 md:mb-24">
             <h2 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-cyan-500 mb-3 md:mb-6 block">Vision-Action Convergence</h2>
             <h3 className={`text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>The First Step</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
             <ScrollReveal className="text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-6 md:space-y-10">
                   <div>
                      <h4 className={`text-2xl md:text-5xl font-heading font-black italic uppercase mb-4 md:mb-6 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>May 26, 2022. <br/><span className="text-cyan-500">The Initiation.</span></h4>
                      <div className={`space-y-4 md:space-y-5 text-sm md:text-lg lg:text-xl font-light leading-relaxed ${isDark ? 'text-zinc-500' : 'text-slate-600'}`}>
                        <p>Forte-FY began with a singular focus: bridging the gap between raw talent and professional execution. Founded in Dhaka, we established a sanctuary where learning is intentional.</p>
                        <p>We believe that youth empowerment requires more than recognition—it requires consistent investment in systemic skill-building. Our mission is to manufacture a generation of accomplished individuals through rigorous skill elevation.</p>
                      </div>
                   </div>
                   <div className="border-l-2 md:border-l-3 border-cyan-500 pl-6 lg:pl-10 relative text-left">
                      <Quote className="absolute -top-6 -left-4 w-10 h-10 md:w-12 md:h-12 text-cyan-500/5" />
                      <p className={`text-sm md:text-xl italic font-medium leading-relaxed ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>"We don't just build skills; we manufacture community and resilient character."</p>
                      <p className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500 mt-4 md:mt-6">— FOUNDERS' COLLECTIVE</p>
                   </div>
                </div>
             </ScrollReveal>
             <ScrollReveal className="relative flex justify-center w-full order-1 lg:order-2" delay={200}>
                <div className={`w-full max-w-[400px] lg:max-w-none aspect-square rounded-2xl md:rounded-[3rem] overflow-hidden relative group shadow-xl ${isDark ? 'glass border-white/5' : 'bg-white border-slate-100'}`}>
                   <img src="https://i.postimg.cc/Nf2dQJwn/IMG_7751.jpg" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1500ms]" alt="Founding moment" />
                   <div className="absolute inset-0 bg-cyan-500/5 group-hover:opacity-0 transition-opacity" />
                </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      <section id={NavSection.Initiatives} className={`py-16 md:py-32 px-5 flex flex-col items-center transition-colors duration-500 ${isDark ? 'bg-white/[0.01]' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
          <ScrollReveal className="text-center mb-10 md:mb-24">
            <h2 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-cyan-500 mb-3 md:mb-6 block">Strategic Progression</h2>
            <h3 className={`text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>The Archive</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 w-full">
            {FORTE_EVENTS.map((event, idx) => (
              <ScrollReveal key={event.id} className={`delay-${idx * 150}`}>
                <div className={`group relative rounded-xl md:rounded-[2.5rem] overflow-hidden transition-all duration-700 flex flex-col items-center shadow-lg hover:-translate-y-1.5 h-full ${isDark ? 'glass hover:border-cyan-500/30' : 'bg-white border-slate-100 shadow-slate-200/50 hover:shadow-xl'}`}>
                  <div className="w-full aspect-[16/10] relative overflow-hidden bg-black">
                     <img src={event.image} className="w-full h-full object-cover grayscale brightness-50 blur-[0.5px] transition-all duration-[1000ms] group-hover:grayscale-0 group-hover:brightness-100 group-hover:blur-0 group-hover:scale-105" alt={event.name} />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-6 md:p-10 flex flex-col items-center text-center flex-1">
                    <div className="mb-4 md:mb-6">
                      <h4 className="text-cyan-500 font-black text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.4em] mb-1.5 md:mb-3 block">{event.tagline}</h4>
                      <h3 className={`text-xl md:text-3xl font-heading font-black uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.name}</h3>
                    </div>
                    <p className={`text-xs md:text-base font-light leading-relaxed mb-6 md:mb-8 max-w-xl ${isDark ? 'text-zinc-500' : 'text-slate-600'}`}>{event.description}</p>
                    <div className="mt-auto w-8 md:w-10 h-0.5 bg-cyan-500/20 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id={NavSection.Analysis} className="py-0 relative w-full overflow-hidden">
        <NeuralNexusCommand onNav={navigate} onDownload={handleDownload} isDark={isDark} />
      </section>

      <DepartmentsSection navigate={navigate} isDark={isDark} />

      <section id={NavSection.HallOfFame} className={`py-16 md:py-32 px-5 relative overflow-hidden border-t transition-colors duration-500 ${isDark ? 'border-white/5' : 'border-black/5 bg-white'}`}>
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <ScrollReveal className="text-center mb-10 md:mb-24">
            <h2 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-cyan-500 mb-3 md:mb-6 block">Resonant Figures</h2>
            <h3 className={`text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>The Apex Circle</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 w-full">
             {HALL_OF_FAME.map((member, i) => (
               <ScrollReveal key={i} className={`delay-${i * 100}`}>
                 <div className="group relative flex flex-col items-center text-center h-full">
                   <div className={`w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden p-1 mb-4 md:mb-8 transition-all duration-700 shadow-lg active:scale-95 shrink-0 mx-auto ${isDark ? 'border border-white/5 group-hover:border-cyan-500/50' : 'border border-slate-200 group-hover:border-cyan-500/30'}`}>
                     <img src={member.image} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={member.name} />
                   </div>
                   <h4 className={`text-sm md:text-xl font-heading font-black uppercase mb-1 italic tracking-tight group-hover:text-cyan-400 transition-colors leading-tight px-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{member.name}</h4>
                   <p className="text-cyan-500 font-black uppercase text-[6px] md:text-[8px] tracking-[0.1em] md:tracking-[0.2em] mb-2 md:mb-6 leading-none">{member.role}</p>
                   <div className="max-w-[150px] md:max-w-[240px] flex-1 block mx-auto">
                     <Quote size={12} className="text-cyan-500/10 mb-2 md:mb-3 mx-auto group-hover:text-cyan-500/40 transition-colors" />
                     <p className={`text-[10px] md:text-sm font-light leading-relaxed italic transition-colors ${isDark ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-slate-500 group-hover:text-slate-700'}`}>"{member.impact}"</p>
                   </div>
                 </div>
               </ScrollReveal>
             ))}
          </div>
        </div>
      </section>

      <InteractiveArchive isDark={isDark} />

      {/* --- CORPORATE SPONSORS SECTION --- */}
      <section className={`py-16 md:py-32 px-5 relative overflow-hidden border-t border-cyan-500/10 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
          <ScrollReveal className="text-center mb-12 md:mb-24">
            <h2 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] text-cyan-500 mb-4 md:mb-6">Global Synergy</h2>
            <h3 className={`text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Strategic <span className={isDark ? 'text-white/40' : 'text-slate-400'}>Sponsors</span></h3>
            <p className={`text-sm md:text-lg font-light leading-relaxed max-w-3xl mx-auto italic ${isDark ? 'text-zinc-500' : 'text-slate-600'}`}>Partnering with corporate leaders to deliver institutional excellence and youth empowerment.</p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-4xl">
            {SPONSORS.map((sponsor, i) => (
              <ScrollReveal key={i} delay={i * 200}>
                <div className={`group relative rounded-2xl md:rounded-[3rem] p-8 md:p-12 overflow-hidden border transition-all duration-700 shadow-2xl flex flex-col items-center ${isDark ? 'glass border-white/5 hover:border-cyan-500/40' : 'bg-white border-slate-100 hover:border-cyan-500/20'}`}>
                   <div className="h-24 md:h-36 w-full flex items-center justify-center mb-8 relative z-10 group-hover:scale-105 transition-transform duration-700">
                      <img src={sponsor.imageUrl} alt={sponsor.name} className="h-full w-auto object-contain drop-shadow-[0_0_20px_rgba(0,247,255,0.2)]" />
                   </div>
                   <div className="text-center relative z-10">
                      <h4 className={`text-xl md:text-3xl font-heading font-black uppercase italic transition-colors ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-cyan-600'}`}>{sponsor.name}</h4>
                      <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-2 ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>Core Institutional Partner</p>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & SOCIAL SECTION --- */}
      <section id={NavSection.Contact} className={`py-16 md:py-32 px-5 relative overflow-hidden border-t transition-colors duration-500 ${isDark ? 'bg-black border-white/5' : 'bg-white border-black/5'}`}>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center w-full">
          <ScrollReveal>
            <h2 className={`text-4xl sm:text-6xl md:text-8xl font-heading font-black uppercase italic mb-12 md:mb-24 leading-[0.8] tracking-tighter text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Connect <br /> <span className="text-cyan-500 not-italic">Nexus.</span></h2>
          </ScrollReveal>

          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">
              <ScrollReveal delay={100}>
                <h4 className="text-[9px] md:text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-6 md:mb-8">Direct Outreach</h4>
                <div className="flex flex-col gap-5 md:gap-6 items-center md:items-start">
                  <a href="mailto:fortefy.org@gmail.com" className={`group flex items-center gap-4 transition-colors ${isDark ? 'text-white hover:text-cyan-400' : 'text-slate-800 hover:text-cyan-600'}`}>
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all shrink-0 ${isDark ? 'bg-white/5 border-white/10 group-hover:bg-cyan-500 group-hover:text-black' : 'bg-slate-100 border-slate-200 group-hover:bg-cyan-500 group-hover:text-white'}`}>
                      <Mail size={16} />
                    </div>
                    <span className="text-[11px] md:text-sm font-bold uppercase tracking-widest truncate max-w-[200px] sm:max-w-none">fortefy.org@gmail.com</span>
                  </a>
                  <a href="tel:01974362254" className={`group flex items-center gap-4 transition-colors ${isDark ? 'text-white hover:text-cyan-400' : 'text-slate-800 hover:text-cyan-600'}`}>
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all shrink-0 ${isDark ? 'bg-white/5 border-white/10 group-hover:bg-cyan-500 group-hover:text-black' : 'bg-slate-100 border-slate-200 group-hover:bg-cyan-500 group-hover:text-white'}`}>
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
                     <a key={i} href={social.url} target="_blank" rel="noreferrer" className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border flex items-center justify-center transition-all hover:scale-105 ${isDark ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-black hover:bg-cyan-500' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-white hover:bg-cyan-500'}`} aria-label={social.label}>
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
      <PartnersSection isDark={isDark} />
    </>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'departments' | 'detail'>('home');
  const [currentDeptId, setCurrentDeptId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Global Theme State with Persistence
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forte_theme_preference');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('forte_theme_preference', JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (path: string) => {
    setIsMenuOpen(false);
    if (path.startsWith('/departments/')) {
      const id = path.split('/')[2];
      setCurrentDeptId(id);
      setCurrentView('detail');
      window.scrollTo(0, 0);
    } else if (path === '/departments') {
      setCurrentView('departments');
      window.scrollTo(0, 0);
    } else if (path.startsWith('#')) {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
           const el = document.getElementById(path.substring(1));
           if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
         const el = document.getElementById(path.substring(1));
         if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setCurrentView('home');
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
      if (dept) return <DepartmentDetailView dept={dept} navigate={navigate} isDark={isDark} setIsDark={setIsDark} />;
    }
    return <HomeView navigate={navigate} handleDownload={handleDownloadPortfolio} isDark={isDark} />;
  };

  return (
    <div className={`min-h-screen text-center selection:bg-cyan-500 w-full flex flex-col transition-colors duration-500 ${isDark ? 'bg-[#030303] text-white selection:text-black' : 'bg-white text-slate-900 selection:text-white'}`}>
      {/* Conditionally render Global Nav only on Home and Department List views */}
      {currentView !== 'detail' && (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 md:h-20 flex items-center px-4 md:px-0 ${scrolled ? (isDark ? 'bg-black/95 backdrop-blur-xl border-b border-cyan-500/10' : 'bg-white/95 backdrop-blur-xl border-b border-slate-200') : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 lg:px-10 w-full flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => navigate('/')}>
              <div className={`w-8 h-8 md:w-10 md:h-10 border rounded-full flex items-center justify-center transition-transform group-hover:rotate-180 duration-1000 ${isDark ? 'border-cyan-500/50' : 'border-cyan-500'}`}>
                <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_#00f7ff]" />
              </div>
              <span className={`font-heading font-black text-sm md:text-xl tracking-tighter uppercase italic group-hover:text-cyan-400 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Forte-FY</span>
            </div>

            <div className="hidden lg:flex items-center gap-10">
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full transition-all ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={() => navigate('/')} 
                className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${currentView === 'home' ? 'text-cyan-500' : (isDark ? 'text-zinc-500 hover:text-white' : 'text-slate-500 hover:text-black')}`}
              >
                Nexus
              </button>
              <button 
                onClick={() => navigate('/departments')} 
                className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${currentView === 'departments' ? 'text-cyan-500' : (isDark ? 'text-zinc-500 hover:text-white' : 'text-slate-500 hover:text-black')}`}
              >
                Departments
              </button>
              <button onClick={handleDownloadPortfolio} className="px-6 py-2.5 bg-cyan-500 text-black hover:bg-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-2">Portfolio <Download size={14} /></button>
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full transition-all ${isDark ? 'text-yellow-400' : 'text-slate-600'}`}>
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className={`p-2 z-50 rounded-full transition-colors ${isDark ? 'text-white active:bg-white/5' : 'text-black active:bg-slate-100'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1 w-full">
        {renderContent()}
      </main>

      {/* Conditionally render Global Footer only on Home and Department List views */}
      {currentView !== 'detail' && (
        <footer className={`py-12 md:py-16 px-5 relative flex flex-col items-center border-t transition-colors duration-500 ${isDark ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
          <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
            <div className="flex flex-col items-center gap-6 md:gap-8 group cursor-pointer" onClick={() => navigate('/')}>
              <div className={`w-10 h-10 md:w-12 md:h-12 border-2 rounded-full flex items-center justify-center p-1 group-hover:rotate-180 transition-transform duration-1000 ${isDark ? 'border-cyan-500/50' : 'border-cyan-500'}`}>
                <div className="w-2 h-2 md:w-4 md:h-4 bg-cyan-500 rounded-full animate-pulse" />
              </div>
              <div className="text-center">
                <p className={`font-heading font-black text-xl md:text-2xl uppercase italic tracking-tighter leading-none group-hover:text-cyan-400 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Forte-FY</p>
                <p className={`text-[7px] md:text-[8px] font-black uppercase tracking-[0.5em] mt-2 ${isDark ? 'text-zinc-700' : 'text-slate-400'}`}>Fortunate Future Initiative</p>
              </div>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-8 items-center text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] mt-10 text-center ${isDark ? 'text-zinc-800' : 'text-slate-400'}`}>
               <span>Est. May 26, 2022</span>
               <span className={`hidden sm:block w-1 h-1 rounded-full ${isDark ? 'bg-zinc-900' : 'bg-slate-300'}`} />
               <span>Dhaka, Bangladesh</span>
               <span className={`hidden sm:block w-1 h-1 rounded-full ${isDark ? 'bg-zinc-900' : 'bg-slate-300'}`} />
               <span>Systems Nominal</span>
            </div>
          </div>
        </footer>
      )}

      {currentView !== 'detail' && isMenuOpen && (
        <div className={`fixed inset-0 z-[70] backdrop-blur-3xl flex flex-col p-6 sm:p-12 animate-fade-in text-center overflow-y-auto ${isDark ? 'bg-black/98 text-white' : 'bg-white/98 text-slate-900'}`}>
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 border border-cyan-500/50 rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
               </div>
               <span className="font-heading font-black text-lg uppercase italic tracking-tighter text-cyan-500">Forte-FY</span>
            </div>
            <div className="flex items-center gap-4">
               <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full transition-all ${isDark ? 'bg-white/10 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}>
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
               </button>
               <button onClick={() => setIsMenuOpen(false)} className="p-2 active:bg-white/5 rounded-full text-cyan-500 transition-colors"><X size={28}/></button>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-center flex-1 justify-center py-4">
             <button onClick={() => navigate('/')} className={`text-3xl sm:text-4xl font-heading font-black uppercase italic tracking-tighter transition-all ${currentView === 'home' ? 'text-cyan-500' : (isDark ? 'text-white' : 'text-slate-900')}`}>Nexus</button>
             <button onClick={() => navigate('/departments')} className={`text-3xl sm:text-4xl font-heading font-black uppercase italic tracking-tighter transition-all ${currentView === 'departments' ? 'text-cyan-500' : (isDark ? 'text-white' : 'text-slate-900')}`}>Departments</button>
          </div>
          <div className="mt-10 pb-6">
            <button onClick={handleDownloadPortfolio} className="w-full py-5 bg-cyan-500 text-black rounded-xl font-heading font-black uppercase italic tracking-tighter text-lg sm:text-xl active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3">Get Portfolio <Download size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
