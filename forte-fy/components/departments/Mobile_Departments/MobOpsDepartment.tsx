
import React, { useLayoutEffect, useRef, useState } from 'react';
import { 
  Briefcase, Settings, Map, Truck, ChevronLeft, Package, Shield, Zap,
  User, Quote, Target, ChevronDown, CheckCircle2, ArrowUpRight, ScanLine, Lock, Activity,
  BarChart3, Radio, ClipboardList, Box
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: HERO OPERATIONS BACKGROUND (MOBILE) ---
const MobHeroOperationsBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Lines */}
      <div 
        className={`absolute inset-0 opacity-[0.15] animate-grid-scroll`}
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? '#FF8C00' : '#ea580c'} 1px, transparent 1px), 
            linear-gradient(90deg, ${isDark ? '#FF8C00' : '#ea580c'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Large Ambient Gears - Opacity 0.12 */}
      <div className={`absolute -top-20 -right-20 opacity-[0.12] ${isDark ? 'text-[#FF8C00]' : 'text-orange-600'}`}>
         <Settings size={300} className="animate-spin-slow-gear" />
      </div>
      <div className={`absolute top-1/2 -left-20 -translate-y-1/2 opacity-[0.12] ${isDark ? 'text-[#FF8C00]' : 'text-orange-600'}`}>
         <Settings size={250} className="animate-spin-reverse-gear" />
      </div>
      <div className={`absolute -bottom-32 right-0 opacity-[0.12] ${isDark ? 'text-[#FF8C00]' : 'text-orange-600'}`}>
         <Settings size={350} className="animate-spin-slow-gear" style={{ animationDuration: '80s' }} />
      </div>
      
      <style>{`
        .animate-grid-scroll { animation: grid-scroll 20s linear infinite; }
        @keyframes grid-scroll { 
          0% { background-position: 0 0; } 
          100% { background-position: 40px 40px; } 
        }
        
        .animate-spin-slow-gear { animation: spin 60s linear infinite; }
        .animate-spin-reverse-gear { animation: spin 50s linear infinite reverse; }
        
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export const MobOpsDepartment: React.FC<{ onBack: () => void; isDark: boolean }> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const theme = {
    bg: isDark ? "bg-[#0a0600]" : "bg-[#fff8f0]",
    text: isDark ? "text-orange-50" : "text-slate-900",
    accent: "#FF8C00",
    card: isDark ? "bg-[#140a00] border-orange-500/20" : "bg-white border-orange-200"
  };

  const CAPABILITIES = [
    { title: "Supply Chain", icon: Truck, desc: "End-to-end management of material flow and vendor relations." },
    { title: "Asset Control", icon: Box, desc: "Rigorous inventory tracking, safeguarding, and auditing." },
    { title: "Risk Mitigation", icon: Shield, desc: "Advanced contingency planning and real-time problem resolution." },
    { title: "Resource Allocation", icon: BarChart3, desc: "Data-driven distribution of financial and physical capital." },
    { title: "Field Command", icon: Radio, desc: "On-site coordination centers and synchronous communication." },
    { title: "Quality Audit", icon: ClipboardList, desc: "Systematic review of all operational deliverables." }
  ];

  const ROLES = [
    {
      id: "intern",
      title: "Operations Intern",
      status: "RECRUITING",
      available: true,
      duration: "1 Month",
      desc: "An immersive entry-level role designed to introduce candidates to the high-pressure, high-reward world of event management and organizational logistics. You will be the hands and feet of our ground execution.",
      reqs: ["Strong organizational skills", "Resilience under pressure", "Team-oriented attitude"],
      perks: ["Real-world event experience", "Direct mentorship", "Certificate of Internship"]
    },
    {
      id: "senior",
      title: "Senior Associate",
      status: "STANDBY",
      available: false,
      desc: "A leadership role responsible for overseeing specific logistical sectors and mentoring junior associates. This position requires prior experience and proven leadership capability.",
      reqs: ["1+ year experience", "Team leadership", "Conflict resolution"],
      perks: ["Leadership authority", "Strategy influence", "Executive networking"]
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ops-reveal", { y: 30, opacity: 0, stagger: 0.1, duration: 0.8 });
      gsap.to(".ops-gear", { rotation: 360, duration: 10, repeat: -1, ease: "linear" });
      
      // Add scroll triggers for new sections
      gsap.utils.toArray('.scroll-reveal-section').forEach((el: any) => {
        gsap.from(el, {
          y: 40, 
          opacity: 0, 
          duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`min-h-screen pb-24 ${theme.bg} ${theme.text} transition-colors duration-500 font-sans overflow-x-hidden`}>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center gap-4 bg-[#0a0600]/80 backdrop-blur-md border-b border-orange-500/10">
        <button onClick={onBack} className="p-2 rounded-full bg-orange-500/10 text-orange-500">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2 text-orange-500">
           <Settings className="ops-gear" size={18} />
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Ops Division</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <MobHeroOperationsBackground isDark={true} />
        <div className="relative z-10">
           <h1 className="ops-reveal text-6xl font-heading font-black uppercase italic tracking-tighter leading-[0.85] mb-6 drop-shadow-xl">
              Dept. <br/><span className="text-orange-500">Operations.</span>
           </h1>
           <div className="ops-reveal w-16 h-1 bg-orange-500 mb-6 rounded-full" />
           <p className="ops-reveal text-lg font-light italic opacity-80 leading-relaxed max-w-xs">
              "The Engine of Execution. We build the stage for success."
           </p>
        </div>
      </section>

      {/* DIRECTORATE PROFILE */}
      <section className="px-6 py-12 border-t border-orange-500/10 bg-[#0c0800] scroll-reveal-section">
         <div className="flex items-center gap-3 mb-6">
            <User size={16} className="text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Directorate Profile</span>
         </div>
         
         <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-orange-500/20 mb-8 grayscale">
            <img 
               src="https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg?auto=format&fit=crop&q=80" 
               alt="Director" 
               className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-orange-500 text-[10px] font-mono font-bold uppercase">
               IMG_REF_2024
            </div>
         </div>

         <h2 className="text-4xl font-heading font-black uppercase leading-none mb-4 text-white">Arpita Das Richi</h2>
         
         <div className="p-6 border-l-2 border-orange-500 bg-white/5 mb-8">
            <Quote className="text-orange-500 mb-2" size={20} />
            <p className="text-sm font-light italic leading-relaxed text-zinc-300">
               "Operations is the heartbeat of Forte-FY. We turn abstract strategy into kinetic reality through relentless precision."
            </p>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-white/10 rounded-xl bg-white/5">
               <span className="block text-[8px] font-bold uppercase tracking-widest text-orange-500 mb-1">Clearance</span>
               <span className="text-sm font-bold text-white">Level 5 Omega</span>
            </div>
            <div className="p-4 border border-white/10 rounded-xl bg-white/5">
               <span className="block text-[8px] font-bold uppercase tracking-widest text-orange-500 mb-1">Status</span>
               <span className="text-sm font-bold text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Active
               </span>
            </div>
         </div>
      </section>

      {/* DEPARTMENT MANDATE */}
      <section className="px-6 py-12 border-t border-orange-500/10 scroll-reveal-section">
         <div className="flex items-center gap-3 mb-6">
            <Target className="text-orange-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Mandate</span>
         </div>
         <h2 className="text-4xl font-heading font-black uppercase tracking-tighter leading-[0.9] text-white mb-8">
            The Structural <br/> <span className="text-orange-500">Backbone.</span>
         </h2>
         <div className="p-6 border-l-2 border-orange-500/50 bg-white/5 rounded-r-xl">
            <h3 className="text-sm font-bold uppercase mb-3 text-white">Foundation Philosophy</h3>
            <p className="text-sm font-light leading-relaxed text-zinc-400">
               The Operations Department serves as the physiological nervous system of Forte-FY. Founded on the axiom that <strong className="text-white">'Vision requires Structure,'</strong> we bridge the gap between ideation and execution.
            </p>
         </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="px-6 py-12 scroll-reveal-section">
        <div className="text-center mb-8">
           <h2 className="text-3xl font-heading font-black uppercase italic text-white">Operational <span className="text-orange-500">Capabilities</span></h2>
           <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-2">Tactical Inventory</p>
        </div>

        <div className="space-y-4">
           {CAPABILITIES.map((cap, i) => (
             <div key={i} className={`flex items-center gap-6 p-6 rounded-3xl border ${theme.card}`}>
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500"><cap.icon size={20} /></div>
                <div>
                   <h4 className="font-bold text-sm uppercase text-white">{cap.title}</h4>
                   <p className="text-[10px] opacity-50 text-zinc-400">{cap.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* OPS LEDGER (RECRUITMENT) */}
      <section className="px-6 py-12 border-t border-orange-500/10 bg-[#0c0800] scroll-reveal-section">
         <div className="text-center mb-10">
            <div className="inline-block p-3 rounded-full mb-4 border border-orange-500/20 bg-orange-500/10 text-orange-500">
               <Briefcase size={24} />
            </div>
            <h2 className="text-4xl font-heading font-black uppercase italic tracking-tighter text-white">
               The Ops <span className="text-orange-500">Ledger.</span>
            </h2>
            <p className="text-xs font-serif italic text-zinc-500 mt-2">"Architects of action required."</p>
         </div>

         <div className="space-y-4">
            {ROLES.map((role) => (
               <div key={role.id} className="group border border-white/5 rounded-xl overflow-hidden bg-[#0a0a0a]">
                  <div 
                    onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                    className="flex items-center justify-between px-6 py-5 cursor-pointer"
                  >
                     <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500"><Activity size={16} /></div>
                        <div>
                           <h3 className="text-base font-bold text-white">{role.title}</h3>
                           <div className={`flex items-center gap-2 mt-1 text-[8px] font-black uppercase tracking-wider ${role.available ? 'text-green-500' : 'text-zinc-600'}`}>
                              {role.available ? <ScanLine size={8} /> : <Lock size={8} />}
                              {role.status}
                           </div>
                        </div>
                     </div>
                     <ChevronDown size={16} className={`text-zinc-500 transition-transform ${expandedRole === role.id ? 'rotate-180' : ''}`} />
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ${expandedRole === role.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                     <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-[#0f0f0f]">
                        <p className="text-xs text-zinc-300 font-serif leading-relaxed mb-6">{role.desc}</p>
                        
                        <div className="grid grid-cols-1 gap-4 mb-6">
                           <div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2">Requirements</h4>
                              <ul className="space-y-1">
                                 {role.reqs.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[10px] text-zinc-400">
                                       <div className="mt-1 w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                                       {r}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2">Perks</h4>
                              <ul className="space-y-1">
                                 {role.perks.map((p, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[10px] text-zinc-400">
                                       <CheckCircle2 size={10} className="mt-0.5 text-green-500 shrink-0" />
                                       {p}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>

                        {role.available ? (
                           <button 
                              onClick={() => window.open('https://forms.google.com', '_blank')}
                              className="w-full py-3 rounded-lg bg-orange-500 text-black font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors"
                           >
                              Apply Now <ArrowUpRight size={12} />
                           </button>
                        ) : (
                           <div className="w-full py-3 rounded-lg border border-white/10 text-zinc-600 font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                              <Lock size={12} /> Position Locked
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
};
