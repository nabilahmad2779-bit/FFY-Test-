
import React, { useLayoutEffect, useRef } from 'react';
import { GraduationCap, Zap, Activity as Pulse, Star, ChevronLeft, BookOpen, Target, Award } from 'lucide-react';
import { gsap } from 'gsap';

export const MobAcadDepartment: React.FC<{ onBack: () => void; isDark: boolean }> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = {
    bg: isDark ? "bg-[#020202]" : "bg-white",
    text: isDark ? "text-white" : "text-slate-900",
    accent: "#00f7ff",
    card: isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200"
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".acad-reveal", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`min-h-screen pb-24 ${theme.bg} ${theme.text} transition-colors duration-500`}>
      <header className="p-6 flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-full bg-cyan-500/10 text-cyan-500">
          <ChevronLeft size={20} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Knowledge Forge</span>
      </header>

      <section className="px-6 py-12 text-center">
        <div className="acad-reveal mb-8 flex justify-center">
           <div className="w-20 h-20 rounded-[2rem] bg-cyan-500/10 flex items-center justify-center text-cyan-500 shadow-[0_0_30px_rgba(0,247,255,0.2)]">
              <GraduationCap size={32} />
           </div>
        </div>
        <h1 className="acad-reveal text-5xl font-heading font-black uppercase italic tracking-tighter leading-none mb-6">Academic <br/><span className="text-cyan-500">Affairs.</span></h1>
        <p className="acad-reveal text-sm font-light opacity-60">Elevating the curriculum of tomorrow's leaders.</p>
      </section>

      <section className="px-6 space-y-4">
         <div className={`acad-reveal p-8 rounded-[2.5rem] border ${theme.card}`}>
            <div className="flex items-center gap-4 mb-6 text-cyan-500">
               <Zap size={20} />
               <h3 className="text-sm font-black uppercase tracking-widest">Mission Core</h3>
            </div>
            <p className="text-lg font-light leading-relaxed italic opacity-80">Designing high-impact skill-building workshops and competitive syllabi for flagship events.</p>
         </div>

         <div className={`acad-reveal p-8 rounded-[2.5rem] border flex items-center gap-6 ${theme.card}`}>
            <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-500"><Pulse size={24} /></div>
            <div>
               <h4 className="text-2xl font-heading font-black italic">50+ Hours</h4>
               <p className="text-[10px] font-bold uppercase opacity-40">Educational Content</p>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4">
            {[
              { l: "Curriculum", i: BookOpen },
              { l: "Mentorship", i: Target },
              { l: "Credentials", i: Award },
              { l: "Excellence", i: Star }
            ].map((item, idx) => (
              <div key={idx} className={`acad-reveal p-6 rounded-3xl border text-center ${theme.card}`}>
                 <item.i size={18} className="mx-auto mb-3 text-cyan-500" />
                 <p className="text-[9px] font-black uppercase tracking-widest">{item.l}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};
