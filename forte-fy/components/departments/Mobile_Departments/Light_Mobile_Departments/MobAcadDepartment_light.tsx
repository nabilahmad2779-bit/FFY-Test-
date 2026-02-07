
import React, { useLayoutEffect, useRef } from 'react';
import { GraduationCap, Zap, Activity as Pulse, Star, ChevronLeft, BookOpen, Target, Award } from 'lucide-react';
import { gsap } from 'gsap';

export const MobAcadDepartment_light: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".acad-reveal", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pb-24 bg-white text-slate-900 transition-colors duration-500">
      <header className="p-6 flex items-center gap-4 border-b border-slate-100">
        <button onClick={onBack} className="p-2 rounded-full bg-cyan-50 text-cyan-600 shadow-sm">
          <ChevronLeft size={20} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Knowledge Forge</span>
      </header>

      <section className="px-6 py-12 text-center">
        <div className="acad-reveal mb-8 flex justify-center">
           <div className="w-20 h-20 rounded-[2rem] bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-md">
              <GraduationCap size={32} />
           </div>
        </div>
        <h1 className="acad-reveal text-5xl font-heading font-black uppercase italic tracking-tighter leading-none mb-6">Academic <br/><span className="text-cyan-600">Affairs.</span></h1>
        <p className="acad-reveal text-sm font-light text-slate-500">Elevating the curriculum of tomorrow's leaders.</p>
      </section>

      <section className="px-6 space-y-4">
         <div className="acad-reveal p-8 rounded-[2.5rem] border bg-slate-50 border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6 text-cyan-600">
               <Zap size={20} />
               <h3 className="text-sm font-black uppercase tracking-widest">Mission Core</h3>
            </div>
            <p className="text-lg font-light leading-relaxed italic text-slate-700">Designing high-impact skill-building workshops and competitive syllabi for flagship events.</p>
         </div>

         <div className="acad-reveal p-8 rounded-[2.5rem] border flex items-center gap-6 bg-slate-50 border-slate-200 shadow-sm">
            <div className="p-4 rounded-2xl bg-cyan-100 text-cyan-700"><Pulse size={24} /></div>
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
              <div key={idx} className="acad-reveal p-6 rounded-3xl border text-center bg-white border-slate-200 shadow-sm">
                 <item.i size={18} className="mx-auto mb-3 text-cyan-600" />
                 <p className="text-[9px] font-black uppercase tracking-widest">{item.l}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};
