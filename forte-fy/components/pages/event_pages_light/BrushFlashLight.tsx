import React, { useLayoutEffect, useRef } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { ArrowLeft, Brush, Camera, Zap, Layers, Maximize2, Aperture, Palette } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  onBack: () => void;
  isDark: boolean;
}

export const BrushFlashLight: React.FC<EventPageProps> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'brush-flash');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".split-left", { xPercent: -100, duration: 1.5, ease: "power3.out" });
        gsap.from(".split-right", { xPercent: 100, duration: 1.5, ease: "power3.out" });
        gsap.from(".hero-content", { opacity: 0, scale: 0.8, duration: 1, delay: 0.5, ease: "back.out(1.7)" });
        gsap.from(".metric-card", {
            y: 100, opacity: 0, rotationX: 45, stagger: 0.1, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: ".metrics-section", start: "top 80%" }
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    gsap.to(currentTarget, { rotationY: x, rotationX: -y, ease: "power2.out", duration: 0.5 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotationY: 0, rotationX: 0, ease: "power2.out", duration: 0.5 });
  };

  if (!event) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-rose-500 selection:text-white">
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <button onClick={onBack} className="flex items-center gap-3 text-white hover:text-rose-400 transition-colors">
          <ArrowLeft size={24} />
        </button>
      </div>

      <section className="relative h-screen w-full flex overflow-hidden">
         <div className="split-left w-1/2 h-full bg-white relative flex items-center justify-center border-r border-slate-100">
            <div className="absolute inset-0 bg-rose-500/5 mix-blend-multiply" />
            <Palette size={400} className="absolute text-rose-500/5 rotate-12" />
            <div className="relative z-10 text-right pr-4 md:pr-12 w-full">
               <h1 className="text-6xl md:text-9xl font-heading font-black uppercase italic tracking-tighter text-slate-900">Brush</h1>
               <p className="text-xs font-bold uppercase tracking-[0.5em] text-rose-600">The Canvas</p>
            </div>
         </div>
         <div className="split-right w-1/2 h-full bg-slate-100 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-rose-600/5 mix-blend-multiply" />
            <Aperture size={400} className="absolute text-rose-600/5 -rotate-12" />
            <div className="relative z-10 text-left pl-4 md:pl-12 w-full">
               <h1 className="text-6xl md:text-9xl font-heading font-black uppercase italic tracking-tighter text-rose-600">& Flash</h1>
               <p className="text-xs font-bold uppercase tracking-[0.5em] text-slate-700">The Lens</p>
            </div>
         </div>
         <div className="hero-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-rose-600 bg-white flex items-center justify-center shadow-xl">
               <span className="font-heading font-black text-2xl italic text-rose-600">{event.year}</span>
            </div>
         </div>
         <div className="absolute bottom-12 w-full text-center z-20">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{event.tagline}</p>
         </div>
      </section>

      <section className="py-24 px-6 md:px-24 text-center max-w-4xl mx-auto">
         <h2 className="text-3xl font-heading font-black uppercase italic mb-8">Dual <span className="text-rose-600">Expression</span></h2>
         <p className="text-xl font-light text-slate-600 leading-relaxed mb-12">
            {event.description} <br/>
            A celebration of static beauty, captured through the lens and crafted by the hand.
         </p>
         <div className="flex justify-center gap-4">
            <span className="px-4 py-2 border border-rose-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-white">Photography</span>
            <span className="px-4 py-2 border border-rose-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-white">Digital Art</span>
            <span className="px-4 py-2 border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-white">Sketching</span>
         </div>
      </section>

      <section className="metrics-section py-24 px-6 bg-slate-100">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
               { val: event.metrics.reachLabel, label: "Visual Impressions", icon: Zap, color: "text-amber-500" },
               { val: event.metrics.participants, label: "Artists Exhibited", icon: Layers, color: "text-rose-600" },
               { val: event.metrics.ambassadors, label: "Curators", icon: Maximize2, color: "text-rose-500" },
            ].map((stat, i) => (
               <div key={i} className="metric-card p-10 rounded-[2.5rem] bg-white border border-slate-200 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-500" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: 1000 }}>
                  <stat.icon size={32} className={`mb-6 ${stat.color}`} />
                  <h3 className="text-6xl font-heading font-black italic mb-2 text-slate-900">{stat.val}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
               </div>
            ))}
         </div>
      </section>

      <footer className="py-24 px-6 md:px-24 border-t border-slate-200 bg-white">
         <h3 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-rose-600 mb-16">Institutional Partners</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {[...PARTNER_LOGOS].slice(0, 12).map((p, i) => (
               <div key={i} className="group w-24 h-24 grayscale hover:grayscale-0 transition-all duration-500 flex items-center justify-center p-4 border border-slate-100 rounded-2xl hover:border-rose-200 hover:bg-rose-50/50">
                  <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain" />
               </div>
            ))}
         </div>
      </footer>
    </div>
  );
};