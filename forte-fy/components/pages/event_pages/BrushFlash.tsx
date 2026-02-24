
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

export const BrushFlash: React.FC<EventPageProps> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'brush-flash');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Split Reveal
        gsap.from(".split-left", { xPercent: -100, duration: 1.5, ease: "power3.out" });
        gsap.from(".split-right", { xPercent: 100, duration: 1.5, ease: "power3.out" });
        
        gsap.from(".hero-content", { opacity: 0, scale: 0.8, duration: 1, delay: 0.5, ease: "back.out(1.7)" });

        // Metric Cards Tilt Entrance
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
    <div ref={containerRef} className="min-h-screen bg-[#000] text-white overflow-x-hidden selection:bg-pink-500 selection:text-white">
      
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <button onClick={onBack} className="flex items-center gap-3 text-white hover:text-pink-400 transition-colors">
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Hero: Split Layout */}
      <section className="relative h-screen w-full flex overflow-hidden">
         {/* Left: Brush (Art) */}
         <div className="split-left w-1/2 h-full bg-[#050505] relative flex items-center justify-center border-r border-white/5">
            <div className="absolute inset-0 bg-pink-900/10 mix-blend-screen" />
            <Palette size={400} className="absolute text-pink-500/5 rotate-12" />
            <div className="relative z-10 text-right pr-4 md:pr-12 w-full">
               <h1 className="text-6xl md:text-9xl font-heading font-black uppercase italic tracking-tighter text-white">Brush</h1>
               <p className="text-xs font-bold uppercase tracking-[0.5em] text-pink-500">The Canvas</p>
            </div>
         </div>

         {/* Right: Flash (Photo) */}
         <div className="split-right w-1/2 h-full bg-[#080808] relative flex items-center justify-center">
            <div className="absolute inset-0 bg-rose-900/10 mix-blend-screen" />
            <Aperture size={400} className="absolute text-rose-500/5 -rotate-12" />
            <div className="relative z-10 text-left pl-4 md:pl-12 w-full">
               <h1 className="text-6xl md:text-9xl font-heading font-black uppercase italic tracking-tighter text-rose-500">& Flash</h1>
               <p className="text-xs font-bold uppercase tracking-[0.5em] text-white">The Lens</p>
            </div>
         </div>

         {/* Center Element */}
         <div className="hero-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-black flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.5)]">
               <span className="font-heading font-black text-2xl italic">{event.year}</span>
            </div>
         </div>
         
         <div className="absolute bottom-12 w-full text-center z-20">
            <p className="text-sm font-light uppercase tracking-widest text-white/60">{event.tagline}</p>
         </div>
      </section>

      {/* Description */}
      <section className="py-24 px-6 md:px-24 text-center max-w-4xl mx-auto">
         <h2 className="text-3xl font-heading font-black uppercase italic mb-8">Dual <span className="text-pink-500">Expression</span></h2>
         <p className="text-xl font-light text-zinc-300 leading-relaxed mb-12">
            {event.description} <br/>
            A celebration of static beauty, captured through the lens and crafted by the hand.
         </p>
         <div className="flex justify-center gap-4">
            <span className="px-4 py-2 border border-pink-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-pink-400">Photography</span>
            <span className="px-4 py-2 border border-rose-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-rose-400">Digital Art</span>
            <span className="px-4 py-2 border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">Sketching</span>
         </div>
      </section>

      {/* Interactive Metrics - 3D Tilt Cards */}
      <section className="metrics-section py-24 px-6 bg-white/[0.02]">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
               { val: event.metrics.reachLabel, label: "Visual Impressions", icon: Zap, color: "text-yellow-400" },
               { val: event.metrics.participants, label: "Artists Exhibited", icon: Layers, color: "text-pink-500" },
               { val: event.metrics.ambassadors, label: "Curators", icon: Maximize2, color: "text-rose-500" },
            ].map((stat, i) => (
               <div 
                  key={i} 
                  className="metric-card p-10 rounded-[2.5rem] bg-[#0c0c0c] border border-white/10 flex flex-col items-center justify-center text-center shadow-2xl"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ perspective: 1000 }}
               >
                  <stat.icon size={32} className={`mb-6 ${stat.color}`} />
                  <h3 className="text-6xl font-heading font-black italic mb-2">{stat.val}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{stat.label}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Partners Gallery */}
      <section className="py-24 px-6 md:px-24">
         <h3 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-pink-500 mb-16">Powered By</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {[...PARTNER_LOGOS].slice(0, 12).map((p, i) => (
               <div key={i} className="group w-24 h-24 grayscale hover:grayscale-0 transition-all duration-500 flex items-center justify-center p-4 border border-white/5 rounded-2xl hover:border-pink-500/30 hover:bg-pink-500/5">
                  <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain" />
               </div>
            ))}
         </div>
      </section>

    </div>
  );
};
