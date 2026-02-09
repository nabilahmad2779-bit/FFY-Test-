
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { 
  ArrowLeft, Map, Package, Settings, Truck, ClipboardList,
  Target, BarChart3, ChevronRight, Clock, ChevronDown,
  Shield, CheckCircle2, Quote, History, Briefcase, 
  Crosshair, Radio, CheckSquare, Layers, Construction, Box, ListChecks, GraduationCap,
  Cpu, Link, Zap, Anchor, Activity, ScanLine, Grid
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

// Reuse Hero Background from Dark Mode but force light logic
const HeroOperationsBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className={`absolute inset-0 opacity-10`}
        style={{
          backgroundImage: `
            linear-gradient(#ea580c 1px, transparent 1px), 
            linear-gradient(90deg, #ea580c 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <style>{`
        .animate-spin-linear { animation: spin-linear infinite linear; }
        @keyframes spin-linear { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// --- COMPONENT: CAPABILITY STRIP (Light) ---
const CapabilityStripLight: React.FC<{ 
  item: any; 
  isActive: boolean; 
  onHover: () => void; 
}> = ({ item, isActive, onHover }) => {
  return (
    <div 
      className={`relative h-[400px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden border-r border-slate-200 bg-white ${isActive ? 'flex-[3]' : 'flex-1 group hover:bg-orange-50'}`}
      onMouseEnter={onHover}
    >
       <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="rotate-90 whitespace-nowrap flex items-center gap-4">
             <item.icon size={20} className="text-orange-600" />
             <span className="text-sm font-black uppercase tracking-widest text-slate-400">{item.title}</span>
          </div>
       </div>
       <div className={`absolute inset-0 p-8 flex flex-col justify-end transition-all duration-500 delay-100 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <item.icon size={200} className="text-orange-600" />
          </div>
          <div className="relative z-10">
             <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6 text-white">
                <item.icon size={24} />
             </div>
             <h3 className="text-3xl font-heading font-black uppercase italic mb-4 text-slate-900">{item.title}</h3>
             <p className="text-sm md:text-base font-light leading-relaxed max-w-md text-slate-600">
                {item.desc}
             </p>
          </div>
       </div>
       <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-orange-600 transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-full'}`} />
    </div>
  );
};

// --- COMPONENT: TACTICAL LOGISTICS MODULE (Light Mode) ---
const LogisticsModuleLight: React.FC<{ 
  title: string; 
  content: string; 
  index: number; 
  icon: any;
}> = ({ title, content, index, icon: Icon }) => (
  <div className="group relative p-8 border transition-all duration-500 hover:-translate-y-1 bg-white border-orange-100 hover:border-orange-400 hover:shadow-xl rounded-sm">
     {/* Corner Accents */}
     <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors border-orange-300" />
     <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors border-orange-300" />
     
     <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
           <Icon size={24} />
        </div>
        <span className="text-[4rem] font-heading font-black leading-[0.5] opacity-5 group-hover:opacity-10 transition-opacity text-slate-900">0{index + 1}</span>
     </div>
     
     <h3 className="text-xl font-heading font-black uppercase mb-4 tracking-tight text-slate-900">
        {title}
     </h3>
     <p className="text-sm leading-relaxed text-slate-600 group-hover:text-slate-800 transition-colors">
        {content}
     </p>

     {/* Scanning Line */}
     <div className="absolute bottom-0 left-0 h-[2px] w-full bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </div>
);

// --- MAIN COMPONENT ---
const Ops_Light: React.FC<DepartmentProps> = ({ dept, navigate, isDark, setIsDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCapIndex, setActiveCapIndex] = useState(0);

  // Parallax for Hero Background
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    gsap.to(".parallax-bg", { x: xPos * -0.5, y: yPos * -0.5, duration: 1, ease: "power2.out" });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(".ops-title-reveal", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" });
      gsap.fromTo(".ops-line-reveal", { width: 0, opacity: 0 }, { width: "70%", opacity: 1, duration: 1.5, delay: 0.5, ease: "expo.out" });

      // Sections
      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        gsap.fromTo(section, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 85%" } });
      });

      // Rotations
      gsap.to(".logistics-gear", { rotation: 360, duration: 20, repeat: -1, ease: "linear" });
      gsap.to(".target-ring", { rotation: 360, duration: 60, repeat: -1, ease: "linear" });
      gsap.to(".target-ring-rev", { rotation: -360, duration: 40, repeat: -1, ease: "linear" });

    }, containerRef);
    setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => ctx.revert();
  }, []);

  const CAPABILITIES = [
    { title: "Supply Chain", icon: Truck, desc: "End-to-end management of material flow and vendor relations." },
    { title: "Asset Control", icon: Box, desc: "Rigorous inventory tracking, safeguarding, and auditing of organizational materials." },
    { title: "Risk Mitigation", icon: Shield, desc: "Advanced contingency planning and real-time problem resolution." },
    { title: "Resource Allocation", icon: BarChart3, desc: "Data-driven distribution of financial and physical capital." },
    { title: "Field Command", icon: Radio, desc: "On-site coordination centers and synchronous communication networks." },
    { title: "Quality Audit", icon: ClipboardList, desc: "Systematic review of operational deliverables." }
  ];

  return (
    <div ref={containerRef} className="min-h-screen font-sans overflow-x-hidden bg-[#fff8f0] text-slate-900 transition-colors duration-700 selection:bg-[#FF8C00] selection:text-black">
      <OpsHeader navigate={navigate} isDark={isDark} setIsDark={setIsDark} />

      {/* HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-orange-200" onMouseMove={handleMouseMove}>
        <div className="parallax-bg absolute inset-0">
           <HeroOperationsBackground isDark={false} />
        </div>
        <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center text-center pointer-events-none">
           <h1 className="flex flex-col items-center justify-center font-heading font-black uppercase tracking-tighter leading-[0.85] mb-2 drop-shadow-sm">
              <span className="ops-title-reveal text-xl md:text-3xl tracking-[0.5em] mb-4 font-mono font-bold text-slate-400">DEPARTMENT OF</span>
              <span className="ops-title-reveal text-6xl md:text-8xl lg:text-9xl text-[#FF8C00] relative">
                OPERATIONS
              </span>
           </h1>
        </div>

        {/* --- NEW HERO FOOTER HUD (Light) --- */}
        <div className="absolute bottom-0 left-0 w-full px-6 py-6 border-t border-orange-200 flex justify-between items-end backdrop-blur-sm z-20 pointer-events-none">
            <div className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-widest text-slate-400">
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" /> SYSTEM NOMINAL</span>
               <span>ID: OPS-HQ-01</span>
            </div>
            
            <div className="hidden md:flex flex-col items-center gap-2 animate-bounce">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-600">Scroll to Initialize</span>
                <ChevronDown size={16} className="text-orange-600" />
            </div>

            <div className="flex gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                <span className="hidden md:inline">Logistics</span>
                <span className="hidden md:inline">///</span>
                <span>Strategy</span>
                <span className="hidden md:inline">///</span>
                <span>Execution</span>
            </div>
        </div>
      </section>

      {/* STRATEGIC LOGISTICS (Tactical Grid Light) */}
      <section id="strategic-logistics" className="py-32 px-6 relative z-10 bg-[#fff8f0]">
         <div className="max-w-7xl mx-auto">
            <div className="reveal-section mb-20 text-center">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 border-orange-200 text-orange-600 bg-orange-50">
                  <Grid size={16} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Tactical Array</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-slate-900">
                  Strategic <span className="text-[#FF8C00]">Logistics</span>
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="reveal-section">
                   <LogisticsModuleLight 
                      index={0}
                      title="Execution Backbone" 
                      icon={Activity}
                      content="While ideas are envisioned across departments, Operations ensures execution. We are the engine that turns strategy into tangible reality."
                   />
                </div>
                <div className="reveal-section md:translate-y-12">
                   <LogisticsModuleLight 
                      index={1}
                      title="Structural Genesis" 
                      icon={Box}
                      content="Formed to bring rigid structure to chaos. We manage workflows, coordinate teams, and maintain the internal systems that keep the organization breathing."
                   />
                </div>
                <div className="reveal-section">
                   <LogisticsModuleLight 
                      index={2}
                      title="Unified Ecosystem" 
                      icon={Link}
                      content="Working closely with HR, PR, Academics, and IT to ensure friction-free project lifecycles. We handle the behind-the-scenes work that unifies Forte-FY."
                   />
                </div>
            </div>
         </div>
      </section>

      {/* DIRECTORATE (Command Profile Light) */}
      <section className="py-32 px-6 relative z-10 border-y border-orange-200 bg-orange-50/50 overflow-hidden">
         <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at center, #fb923c 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
         
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Image Side */}
            <div className="reveal-section order-1 lg:order-1 flex justify-center">
               <div className="relative">
                  {/* Decorative Rotating Rings */}
                  <div className="absolute inset-[-20%] border border-dashed rounded-full animate-spin-slow border-orange-400/30" style={{ animationDuration: '30s' }} />
                  <div className="absolute inset-[-10%] border rounded-full animate-pulse border-orange-400/50" />
                  
                  {/* Hexagon Clip Path Image */}
                  <div className="w-64 h-64 md:w-80 md:h-80 relative" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                     <img 
                       src="https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg?auto=format&fit=crop&q=80" 
                       alt="Arpita Das Richi" 
                       className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent mix-blend-overlay" />
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 -right-4 px-6 py-2 rounded-lg border backdrop-blur-md shadow-xl bg-white/90 border-orange-500 text-orange-600">
                     <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 size={12} /> Clearance: Lvl 5
                     </span>
                  </div>
               </div>
            </div>

            {/* Text Side */}
            <div className="reveal-section order-2 lg:order-2">
               <div className="flex flex-col gap-2 mb-8">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">// Directorate Profile</span>
                  <h2 className="text-5xl md:text-7xl font-heading font-black uppercase italic tracking-tighter leading-none text-slate-900">
                     Arpita <br/> Das Richi
                  </h2>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Head of Operations</p>
               </div>

               <div className="pl-6 border-l-4 border-orange-500">
                  <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-6 text-slate-700">
                     "Ideas and passion drive Forte-FY, but execution gives them power. The Operations Department exists to turn plans into action."
                  </p>
                  <Quote size={32} className="text-orange-400/40" />
               </div>
            </div>
         </div>
      </section>

      {/* CAPABILITIES (Sliding Deck Light) */}
      <section className="py-32 relative bg-white">
         <div className="max-w-7xl mx-auto px-6 mb-16 reveal-section text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-slate-900">
               Operational <span className="text-[#FF8C00]">Capabilities</span>
            </h2>
            <p className="text-sm font-mono uppercase tracking-widest mt-2 text-slate-500">Tactical Inventory</p>
         </div>
         <div className="reveal-section flex flex-col md:flex-row h-[800px] md:h-[500px] w-full border-y border-orange-100">
            {CAPABILITIES.map((cap, i) => (
               <CapabilityStripLight 
                  key={i} 
                  item={cap} 
                  isActive={activeCapIndex === i} 
                  onHover={() => setActiveCapIndex(i)} 
               />
            ))}
         </div>
      </section>

      {/* RECRUITMENT (Target Lock Light) */}
      <section className="py-40 px-6 border-t border-orange-200 relative overflow-hidden flex flex-col items-center justify-center text-center bg-[#fff8f0]">
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
            <div className="target-ring w-[600px] h-[600px] border border-dashed rounded-full border-orange-600" />
            <div className="target-ring-rev absolute w-[450px] h-[450px] border-[2px] border-dotted rounded-full border-orange-600" />
            <div className="absolute w-[300px] h-[300px] border rounded-full animate-pulse border-orange-600" />
            <Crosshair size={50} className="text-orange-600 absolute" />
         </div>

         <div className="relative z-10 max-w-4xl w-full">
            <div className="reveal-section mb-12">
               <h2 className="text-6xl md:text-9xl font-heading font-black uppercase italic tracking-tighter leading-none mb-6 text-slate-900">
                  Join the <span className="text-[#FF8C00]">Hunt.</span>
               </h2>
               <p className="text-lg md:text-2xl font-light text-slate-500">
                  The Department of Operations is recruiting. Precision required.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-left">
               <div className="reveal-section p-8 border-l-4 border-orange-600 bg-orange-50">
                  <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-900">
                     <Target size={16} className="text-orange-600" /> Mission Profile
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                     <li>• Organizers & Planners</li>
                     <li>• Problem Solvers</li>
                     <li>• Behind-the-scenes Architects</li>
                  </ul>
               </div>
               <div className="reveal-section p-8 border-r-4 border-orange-600 text-right bg-orange-50">
                  <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center justify-end gap-2 text-slate-900">
                     Intel Acquired <GraduationCap size={16} className="text-orange-600" />
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                     <li>Project Execution •</li>
                     <li>Workflow Management •</li>
                     <li>Leadership Skills •</li>
                  </ul>
               </div>
            </div>

            <button 
               onClick={() => window.open('https://forms.google.com', '_blank')}
               className="reveal-section group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-black uppercase tracking-[0.3em] text-white transition-all duration-300 bg-orange-600 rounded-sm hover:bg-orange-700 shadow-xl"
            >
               <span className="relative z-10 flex items-center gap-4">
                  Initialize Application <ChevronRight className="group-hover:translate-x-1 transition-transform" />
               </span>
            </button>
         </div>
      </section>

      <OpsFooter />
    </div>
  );
};

export default Ops_Light;
