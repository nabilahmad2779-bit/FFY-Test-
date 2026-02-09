
import React, { useLayoutEffect, useRef } from 'react';
import { Briefcase, Settings, Map, Truck, ClipboardList, ChevronLeft, Package, Shield, Zap } from 'lucide-react';
import { gsap } from 'gsap';

export const MobOpsDepartment: React.FC<{ onBack: () => void; isDark: boolean }> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = {
    bg: isDark ? "bg-[#0a0600]" : "bg-[#fff8f0]",
    text: isDark ? "text-orange-50" : "text-slate-900",
    accent: "#FF8C00",
    card: isDark ? "bg-[#140a00] border-orange-500/20" : "bg-white border-orange-200"
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ops-reveal", { x: -30, opacity: 0, stagger: 0.1, duration: 0.8 });
      gsap.to(".ops-gear", { rotation: 360, duration: 10, repeat: -1, ease: "linear" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`min-h-screen pb-24 ${theme.bg} ${theme.text} transition-colors duration-500`}>
      <header className="p-6 flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-full bg-orange-500/10 text-orange-500">
          <ChevronLeft size={20} />
        </button>
        <Settings className="ops-gear text-orange-500" size={20} />
      </header>

      <section className="px-6 py-12">
        <h1 className="ops-reveal text-5xl font-heading font-black uppercase italic tracking-tighter leading-[0.85] mb-6">Dept. <br/><span className="text-orange-500">Operations.</span></h1>
        <p className="ops-reveal text-lg font-light italic opacity-70">"The Engine of Execution. We build the stage for success."</p>
      </section>

      <section className="px-6 space-y-6">
        <div className={`ops-reveal p-8 rounded-[2.5rem] border relative overflow-hidden ${theme.card}`}>
          <div className="flex items-center gap-4 mb-6">
             <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Briefcase size={28} />
             </div>
             <div>
                <h3 className="font-bold text-lg uppercase leading-none">Logistics Hub</h3>
                <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mt-1">Real-time Coordination</p>
             </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
             {[Truck, Package, Map].map((Icon, idx) => (
                <div key={idx} className="aspect-square rounded-xl bg-orange-500/5 flex items-center justify-center text-orange-500/40">
                   <Icon size={20} />
                </div>
             ))}
          </div>
        </div>

        <div className="space-y-4">
           {[
             { t: "Supply Chain", d: "End-to-end material management.", i: Truck },
             { t: "Risk Control", d: "Zero-downtime contingency plans.", i: Shield },
             { t: "Field Ops", d: "Synchronous communication grids.", i: Zap }
           ].map((cap, i) => (
             <div key={i} className={`ops-reveal flex items-center gap-6 p-6 rounded-3xl border ${theme.card}`}>
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500"><cap.i size={20} /></div>
                <div>
                   <h4 className="font-bold text-sm uppercase">{cap.t}</h4>
                   <p className="text-[10px] opacity-50">{cap.d}</p>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};
