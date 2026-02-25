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

      {/* Description & Categories */}
      <section className="py-32 px-6 md:px-24 relative z-10">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24 reveal-up">
               <h2 className="text-4xl md:text-6xl font-heading font-black uppercase italic mb-8">Dual <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Expression</span></h2>
               <p className="text-xl md:text-2xl font-light text-slate-600 leading-relaxed max-w-4xl mx-auto">
                  {event.description} <br/>
                  A celebration of static beauty, captured through the lens and crafted by the hand.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { title: "Photography", desc: "Capture the world through your lens. Show us your perspective, composition, and mastery of light.", icon: Camera, color: "from-rose-100 to-pink-100", iconColor: "text-rose-600" },
                  { title: "Digital Art", desc: "Unleash your imagination on a digital canvas. Create stunning visuals using modern tools.", icon: Layers, color: "from-pink-100 to-purple-100", iconColor: "text-pink-600" },
                  { title: "Sketching", desc: "Return to the roots of art. Express your creativity through traditional sketching and drawing techniques.", icon: Brush, color: "from-purple-100 to-indigo-100", iconColor: "text-purple-600" }
               ].map((cat, i) => (
                  <div key={i} className="reveal-up group p-10 rounded-[2.5rem] bg-white border border-slate-200 hover:border-rose-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden cursor-pointer">
                     <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} rounded-full blur-[40px] opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                     <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                        <cat.icon size={32} className={cat.iconColor} />
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">{cat.title}</h3>
                     <p className="text-slate-600 font-light leading-relaxed">{cat.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Interactive Metrics - 3D Tilt Cards */}
      <section className="metrics-section py-32 px-6 relative bg-white">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-50 rounded-full blur-[120px] pointer-events-none" />
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20 reveal-up">
               <h2 className="text-4xl md:text-5xl font-heading font-black uppercase italic text-slate-900 mb-4">Event <span className="text-rose-500">Impact</span></h2>
               <p className="text-slate-500 font-light">The scale of our creative community.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
               {[
                  { val: event.metrics.reachLabel, label: "Visual Impressions", icon: Zap, color: "text-amber-500", glow: "bg-amber-100" },
                  { val: event.metrics.participants, label: "Artists Exhibited", icon: Layers, color: "text-rose-500", glow: "bg-rose-100" },
                  { val: event.metrics.ambassadors, label: "Curators", icon: Maximize2, color: "text-pink-500", glow: "bg-pink-100" },
               ].map((stat, i) => (
                  <div 
                     key={i} 
                     className="metric-card group p-12 rounded-[3rem] bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden"
                     onMouseMove={handleMouseMove}
                     onMouseLeave={handleMouseLeave}
                     style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                  >
                     <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${stat.glow} rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                     <div style={{ transform: 'translateZ(50px)' }}>
                        <stat.icon size={48} className={`mb-8 mx-auto ${stat.color} drop-shadow-sm`} />
                        <h3 className="text-6xl lg:text-7xl font-heading font-black italic mb-4 text-slate-900 drop-shadow-sm">{stat.val}</h3>
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">{stat.label}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-32 px-6 bg-slate-50 relative overflow-hidden border-t border-slate-200">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-up">
               <div>
                  <h2 className="text-4xl md:text-5xl font-heading font-black uppercase italic text-slate-900 mb-4">Curated <span className="text-rose-500">Gallery</span></h2>
                  <p className="text-slate-500 font-light max-w-xl">A glimpse into the masterpieces created by our talented participants in previous editions.</p>
               </div>
               <button className="mt-8 md:mt-0 px-8 py-4 rounded-full border border-slate-300 text-slate-900 font-bold uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white transition-colors shadow-sm">
                  View Full Archive
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2, 3].map((item) => (
                  <div key={item} className="reveal-up group relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-200 cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500">
                     <img src={`https://picsum.photos/seed/art${item}/800/1000`} alt={`Artwork ${item}`} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                        <span className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-2">Photography</span>
                        <h4 className="text-white text-2xl font-bold mb-1">Urban Symphony</h4>
                        <p className="text-slate-300 text-sm">By Alex Chen</p>
                     </div>
                  </div>
               ))}
            </div>
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