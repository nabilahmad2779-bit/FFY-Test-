
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Code, Terminal, Cpu, Layout, Globe, Database, ChevronLeft, Zap, Box } from 'lucide-react';
import { gsap } from 'gsap';

export const MobITDepartment: React.FC<{ onBack: () => void; isDark: boolean }> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = {
    bg: isDark ? "bg-[#020202]" : "bg-slate-50",
    text: isDark ? "text-white" : "text-slate-900",
    accent: "#00f7ff",
    card: isDark ? "bg-black/40 border-white/5" : "bg-white border-slate-200"
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".it-reveal", { scale: 0.9, opacity: 0, stagger: 0.1, duration: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`min-h-screen pb-24 ${theme.bg} ${theme.text} transition-colors duration-500`}>
      <header className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full bg-cyan-500/10 text-cyan-500">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </header>

      <section className="px-6 py-8">
        <div className="it-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 mb-6">
          <Terminal size={12} />
          <span className="text-[10px] font-mono uppercase tracking-widest">Root Access Granted</span>
        </div>
        <h1 className="it-reveal text-5xl font-heading font-black uppercase italic tracking-tighter leading-[0.85] mb-8">System <br/><span className="text-cyan-500">Architects.</span></h1>
        <p className="it-reveal text-sm font-mono opacity-50">Initializing core logic and digital frameworks...</p>
      </section>

      <section className="px-6 space-y-4">
        <div className={`it-reveal p-8 rounded-3xl border backdrop-blur-xl relative overflow-hidden ${theme.card}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500"><Cpu size={24} /></div>
            <div className="text-right">
              <p className="text-[9px] font-mono opacity-40 uppercase">Load Balance</p>
              <p className="text-xs font-mono text-green-500">OPTIMAL</p>
            </div>
          </div>
          <h3 className="text-xl font-bold uppercase mb-4">Technical Backbone</h3>
          <p className="text-sm font-light leading-relaxed opacity-70">Architecting digital solutions for 10,000+ registrations with 100% server uptime.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { l: "React", i: Layout },
            { l: "Nodes", i: Database },
            { l: "Security", i: Cpu },
            { l: "Web", i: Globe }
          ].map((item, idx) => (
            <div key={idx} className={`it-reveal p-6 rounded-3xl border ${theme.card} flex flex-col items-center text-center`}>
              <item.i size={20} className="text-cyan-500 mb-3" />
              <p className="text-[10px] font-black uppercase tracking-widest">{item.l}</p>
            </div>
          ))}
        </div>

        <div className={`it-reveal p-8 rounded-3xl border flex items-center justify-between ${theme.card}`}>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
             <span className="text-xs font-mono uppercase">Syncing Repository...</span>
          </div>
          <Zap size={16} className="text-cyan-500" />
        </div>
      </section>
    </div>
  );
};
