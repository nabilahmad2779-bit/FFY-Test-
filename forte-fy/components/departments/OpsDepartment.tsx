
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { 
  ArrowLeft, Map, Package, Settings, Truck, ClipboardList,
  Target, BarChart3, ChevronRight, Clock,
  Shield, CheckCircle2, Quote, History, Briefcase, 
  Crosshair, Radio, CheckSquare, Layers, Construction, Box
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OpsHeader, OpsFooter } from '../../code/OpsHeaderFooter';

gsap.registerPlugin(ScrollTrigger);

interface DepartmentProps {
  dept: any;
  navigate: (path: string) => void;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

// --- UTILITY: GEAR COMPONENT ---
const Gear: React.FC<{ size: number; className?: string; speed?: number; reverse?: boolean }> = ({ size, className = "", speed = 10, reverse = false }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} animate-spin-linear`} 
    style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// --- COMPONENT: HERO OPERATIONS BACKGROUND (MECHANICAL & LOGISTICAL) ---
const HeroOperationsBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. BLUEPRINT GRID (Structural) */}
      <div 
        className={`absolute inset-0 opacity-10`}
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? '#FF8C00' : '#ea580c'} 1px, transparent 1px), 
            linear-gradient(90deg, ${isDark ? '#FF8C00' : '#ea580c'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* 2. ROTATING GEARS (The Engine) */}
      <div className={`absolute -top-20 -left-20 opacity-[0.05] ${isDark ? 'text-white' : 'text-black'}`}>
         <Gear size={400} speed={40} />
      </div>
      <div className={`absolute top-1/2 -right-32 -translate-y-1/2 opacity-[0.05] ${isDark ? 'text-white' : 'text-black'}`}>
         <Gear size={600} speed={60} reverse />
      </div>
      <div className={`absolute -bottom-32 left-1/4 opacity-[0.05] ${isDark ? 'text-white' : 'text-black'}`}>
         <Gear size={300} speed={30} />
      </div>

      {/* 3. SUPPLY CHAIN LINES (Logistics) */}
      {[20, 40, 60, 80].map((top, i) => (
        <div key={i} className="absolute w-full h-px overflow-hidden" style={{ top: `${top}%` }}>
           {/* Track */}
           <div className={`w-full h-full ${isDark ? 'bg-orange-500/10' : 'bg-orange-600/10'}`} />
           {/* Moving Packages */}
           <div 
             className={`absolute top-1/2 -translate-y-1/2 h-2 w-8 rounded-sm ${isDark ? 'bg-orange-500/40' : 'bg-orange-600/40'}`}
             style={{ 
               left: '-10%',
               animation: `supplyMove ${10 + i * 2}s linear infinite`,
               animationDelay: `${i}s`
             }} 
           />
           <div 
             className={`absolute top-1/2 -translate-y-1/2 h-2 w-8 rounded-sm ${isDark ? 'bg-orange-500/40' : 'bg-orange-600/40'}`}
             style={{ 
               left: '-10%',
               animation: `supplyMove ${10 + i * 2}s linear infinite`,
               animationDelay: `${i + 5}s`
             }} 
           />
        </div>
      ))}

      {/* 4. FLOATING LOGISTICS ICONS (Assets) */}
      {[Package, Truck, ClipboardList, Map, Shield, Clock].map((Icon, i) => (
        <div 
          key={i}
          className={`absolute p-3 rounded-lg border flex items-center justify-center animate-float-ops opacity-20 ${isDark ? 'border-orange-500 text-orange-500 bg-orange-500/5' : 'border-orange-700 text-orange-700 bg-orange-700/5'}`}
          style={{
             left: `${15 + (i * 15)}%`,
             top: `${20 + (i % 3) * 25}%`,
             animationDelay: `${i * 1.5}s`,
             animationDuration: `${8 + i}s`
          }}
        >
           <Icon size={24} />
        </div>
      ))}

      <style>{`
        @keyframes supplyMove { 
          0% { left: -10%; } 
          100% { left: 110%; } 
        }
        @keyframes float-ops { 
          0%, 100% { transform: translateY(0) rotate(0deg); } 
          50% { transform: translateY(-20px) rotate(5deg); } 
        }
        .animate-spin-linear { animation: spin-linear infinite linear; }
        @keyframes spin-linear { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// --- COMPONENT: 3D ID CARD ---
const OpsIDCard: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <div className="perspective-1000 w-full max-w-sm mx-auto" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
       <div 
         ref={cardRef}
         className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden border-2 shadow-2xl transition-all duration-300 ${isDark ? 'bg-[#1a1005] border-orange-500/30' : 'bg-white border-orange-900/10'}`}
         style={{ transformStyle: 'preserve-3d' }}
       >
          {/* Header Strip */}
          <div className="h-16 bg-[#FF8C00] w-full flex items-center justify-between px-6 relative z-10">
             <div className="flex items-center gap-2">
                <Shield className="text-white fill-white/20" size={24} />
                <span className="text-black font-black uppercase tracking-widest text-xs">Ops Command</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-white/20" />
          </div>

          {/* Photo Area */}
          <div className="p-6 relative z-10">
             <div className="w-full aspect-square bg-zinc-800 rounded-lg mb-6 overflow-hidden relative border border-orange-500/20">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                  alt="Director"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500" 
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-[#FF8C00] text-black text-[10px] font-bold uppercase">Authorized</div>
             </div>

             <h3 className={`text-2xl font-heading font-black uppercase italic mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Logistics Director</h3>
             <p className="text-[#FF8C00] text-xs font-bold uppercase tracking-widest mb-6">Head of Operations</p>

             <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-dashed border-gray-500/30 pb-2">
                   <span className={`text-[10px] uppercase ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Clearance</span>
                   <span className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Level 5 (Executive)</span>
                </div>
                <div className="flex justify-between items-center border-b border-dashed border-gray-500/30 pb-2">
                   <span className={`text-[10px] uppercase ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Dept ID</span>
                   <span className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>OPS-2026-HQ</span>
                </div>
             </div>
          </div>

          {/* Holographic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF8C00]/10 via-transparent to-transparent opacity-50 pointer-events-none z-20" />
          <div className="absolute bottom-4 right-6 w-12 h-12 border-2 border-[#FF8C00] rounded-full opacity-20 z-0" />
       </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const OpsDepartment: React.FC<DepartmentProps> = ({ dept, navigate, isDark, setIsDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax for Hero Text
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to(".parallax-content", { x: xPos, y: yPos, duration: 0.8, ease: "power2.out" });
    gsap.to(".parallax-bg", { x: xPos * -0.5, y: yPos * -0.5, duration: 1, ease: "power2.out" });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Sections
      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        gsap.fromTo(section, 
          { y: 50, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 85%" }
          }
        );
      });
      
      // Animate Timeline Line
      gsap.fromTo(".timeline-progress", 
         { height: 0 }, 
         { 
            height: "100%", ease: "none",
            scrollTrigger: { trigger: ".timeline-container", start: "top center", end: "bottom center", scrub: 0.5 }
         }
      );

    }, containerRef);
    return () => ctx.revert();
  }, [isDark]);

  const COLORS = {
    bg: isDark ? 'bg-[#0a0600]' : 'bg-[#fff8f0]', // Dark brown/black vs Warm white
    text: isDark ? 'text-orange-50' : 'text-slate-900',
    primary: '#FF8C00', // Dark Orange
    border: isDark ? 'border-[#FF8C00]/20' : 'border-orange-200',
    subText: isDark ? 'text-zinc-500' : 'text-slate-500',
    card: isDark ? 'bg-[#140a00]' : 'bg-white'
  };

  const TIMELINE = [
    { year: 'Jan 2026', title: 'Department Foundation', desc: 'Established centralized command for all logistical operations.' },
    { year: 'Feb 2026', title: 'Protocol Deployment', desc: 'Standardized inventory and venue management workflows.' },
    { year: 'Mar 2026', title: 'Resource Scaling', desc: 'Expanded asset database to support multi-venue events.' }
  ];

  return (
    <div ref={containerRef} className={`min-h-screen font-sans overflow-x-hidden ${COLORS.bg} ${COLORS.text} transition-colors duration-700 selection:bg-[#FF8C00] selection:text-black`}>
      <OpsHeader navigate={navigate} isDark={isDark} setIsDark={setIsDark} />

      {/* --- HERO SECTION: THE OPERATIONS FLOOR --- */}
      <section 
        className={`relative h-screen w-full flex items-center justify-center overflow-hidden border-b ${COLORS.border}`}
        onMouseMove={handleMouseMove}
      >
        <div className="parallax-bg absolute inset-0">
           <HeroOperationsBackground isDark={isDark} />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center text-center parallax-content pointer-events-none">
           <div className="mb-6 flex items-center gap-3 px-4 py-2 border-2 border-[#FF8C00] rounded-lg bg-[#FF8C00]/10 backdrop-blur-sm">
              <Settings className="animate-spin-slow text-[#FF8C00]" size={18} />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#FF8C00]">System Operational</span>
           </div>

           <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-heading font-black uppercase leading-[0.8] tracking-tighter mb-8 drop-shadow-2xl">
              <span className={`block ${isDark ? 'text-white' : 'text-slate-900'}`}>Department</span>
              <span className="block text-[#FF8C00]">Operations</span>
           </h1>

           <p className={`text-xl md:text-3xl font-light italic max-w-2xl mx-auto leading-relaxed ${COLORS.subText}`}>
              "The Engine of Execution. We build the stage upon which success performs."
           </p>

           <div className="mt-12 flex gap-4 pointer-events-auto">
               <button 
                  onClick={() => {
                     const el = document.getElementById('strategic-logistics');
                     if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-8 py-4 font-black uppercase tracking-widest text-sm rounded-lg hover:scale-105 transition-transform flex items-center gap-2 ${isDark ? 'bg-[#FF8C00] text-black hover:bg-white' : 'bg-orange-600 text-white hover:bg-orange-800'}`}
               >
                  View Logistics <ChevronRight size={16} />
               </button>
           </div>
        </div>
      </section>

      {/* --- SECTION 1: STRATEGIC LOGISTICS (Manifesto) --- */}
      <section id="strategic-logistics" className={`py-24 px-6 relative z-10 ${COLORS.bg}`}>
         <div className="max-w-5xl mx-auto text-center reveal-section">
            <div className="flex justify-center mb-8">
               <div className={`p-4 rounded-full ${isDark ? 'bg-[#FF8C00]/10 text-[#FF8C00]' : 'bg-orange-100 text-orange-600'}`}>
                  <Map size={32} />
               </div>
            </div>
            
            <h2 className={`text-3xl md:text-5xl font-heading font-black uppercase italic mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
               Strategic <span className="text-[#FF8C00]">Logistics</span>
            </h2>
            
            <p className={`text-lg md:text-xl font-light leading-relaxed ${COLORS.subText} mb-6`}>
               Operations is not merely about moving items; it is about the precise orchestration of time, space, and resources. We serve as the backbone of Forte-FY, ensuring that every event, project, and initiative is supported by a flawless logistical framework.
            </p>
            <p className={`text-lg md:text-xl font-light leading-relaxed ${COLORS.subText}`}>
               Our mandate is <strong>Zero Downtime</strong>. We anticipate bottlenecks before they form and engineer solutions that keep the organization moving forward.
            </p>
         </div>
      </section>

      {/* --- SECTION 2: DIRECTORATE (Profile) --- */}
      <section className={`py-24 px-6 relative z-10 border-y ${COLORS.border} ${isDark ? 'bg-[#0c0700]' : 'bg-orange-50/50'}`}>
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div className="reveal-section order-2 md:order-1">
               <OpsIDCard isDark={isDark} />
            </div>

            <div className="reveal-section order-1 md:order-2">
               <div className="flex items-center gap-4 mb-6 opacity-50">
                  <Quote size={40} className="text-[#FF8C00]" />
               </div>
               <blockquote className={`text-2xl md:text-4xl font-serif italic leading-snug mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  "Structure is the silent partner of creativity. Without a solid foundation, vision cannot be sustained. We provide that foundation."
               </blockquote>
               <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-[#FF8C00]" />
                  <span className={`text-xs font-black uppercase tracking-widest ${COLORS.subText}`}>Directive from Command</span>
               </div>
            </div>

         </div>
      </section>

      {/* --- SECTION 3: EXECUTION TIMELINE --- */}
      <section className="py-24 px-6 relative timeline-container">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 reveal-section">
               <h2 className={`text-3xl md:text-5xl font-heading font-black uppercase italic ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Execution <span className="text-[#FF8C00]">Timeline</span>
               </h2>
               <p className={`text-sm font-mono uppercase tracking-widest mt-2 ${COLORS.subText}`}>Departmental Milestones</p>
            </div>

            <div className="relative pl-8 md:pl-0">
               {/* Central Line */}
               <div className={`absolute left-[23px] md:left-1/2 top-0 bottom-0 w-1 ${isDark ? 'bg-zinc-800' : 'bg-slate-200'} -translate-x-1/2`}>
                  <div className="timeline-progress w-full bg-[#FF8C00] absolute top-0 left-0" />
               </div>

               <div className="space-y-16">
                  {TIMELINE.map((item, i) => (
                     <div key={i} className={`reveal-section relative flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        
                        {/* Date */}
                        <div className={`md:w-1/2 flex ${i % 2 === 0 ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'} pl-12 md:pl-0 w-full`}>
                           <div className={`px-4 py-2 border rounded-lg ${isDark ? 'bg-[#140a00] border-[#FF8C00]/30 text-[#FF8C00]' : 'bg-white border-orange-200 text-orange-600'} text-sm font-bold font-mono`}>
                              {item.year}
                           </div>
                        </div>

                        {/* Node */}
                        <div className={`absolute left-[23px] md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 ${isDark ? 'bg-black border-[#FF8C00]' : 'bg-white border-orange-500'} z-10 shadow-[0_0_15px_rgba(255,140,0,0.5)]`} />

                        {/* Content */}
                        <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} pl-12 md:pl-0 w-full`}>
                           <h3 className={`text-xl font-heading font-black uppercase mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                           <p className={`text-sm ${COLORS.subText}`}>{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* --- SECTION 4: OPERATIONAL CAPABILITIES --- */}
      <section className={`py-24 relative border-t ${COLORS.border} ${isDark ? 'bg-[#0c0700]' : 'bg-orange-50/20'}`}>
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal-section">
               <h2 className={`text-3xl md:text-5xl font-heading font-black uppercase italic ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Operational <span className="text-[#FF8C00]">Capabilities</span>
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { title: "Supply Chain", icon: Truck, desc: "End-to-end management of material flow and vendor relations." },
                 { title: "Asset Control", icon: Box, desc: "Rigorous inventory tracking, safeguarding, and auditing." },
                 { title: "Risk Mitigation", icon: Shield, desc: "Contingency planning and real-time problem resolution." },
                 { title: "Resource Allocation", icon: BarChart3, desc: "Optimized distribution of financial and physical capital." },
                 { title: "Field Command", icon: Radio, desc: "On-site coordination and synchronous communication networks." },
                 { title: "Quality Audit", icon: ClipboardList, desc: "Systematic review of all operational deliverables." }
               ].map((item, i) => (
                 <div 
                   key={i} 
                   className={`reveal-section group p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-[#140a00] border-white/5 hover:border-[#FF8C00]' : 'bg-white border-slate-200 hover:border-orange-500 hover:shadow-lg'}`}
                 >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${isDark ? 'bg-[#FF8C00]/10 text-[#FF8C00]' : 'bg-orange-100 text-orange-600'}`}>
                       <item.icon size={24} />
                    </div>
                    <h3 className={`text-lg font-heading font-black uppercase mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                    <p className={`text-sm font-light ${COLORS.subText}`}>{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- SECTION 5: RECRUITMENT --- */}
      <section className={`py-32 px-6 border-t ${COLORS.border} relative overflow-hidden`}>
         <div className="max-w-4xl mx-auto text-center relative z-10 reveal-section">
            <div className="inline-flex items-center gap-2 mb-8">
               <Construction className="text-[#FF8C00] animate-bounce" size={24} />
               <span className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>Recruitment Active</span>
            </div>
            
            <h2 className={`text-5xl md:text-7xl font-heading font-black uppercase italic tracking-tighter mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
               Join the <span className="text-[#FF8C00]">Unit.</span>
            </h2>
            
            <p className={`text-lg md:text-xl font-light mb-12 ${COLORS.subText}`}>
               We need organized, disciplined individuals who thrive in dynamic environments. If you can manage complexity and deliver results, apply now.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button 
                  onClick={() => window.open('https://forms.google.com', '_blank')}
                  className={`px-10 py-5 font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-all shadow-xl flex items-center gap-3 ${isDark ? 'bg-[#FF8C00] text-black hover:bg-white' : 'bg-orange-600 text-white hover:bg-orange-800'}`}
               >
                  Apply : Operations <ChevronRight size={18} />
               </button>
            </div>
         </div>
      </section>

      <OpsFooter />
    </div>
  );
};

export default OpsDepartment;
