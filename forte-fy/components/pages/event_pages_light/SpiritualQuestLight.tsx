import React, { useLayoutEffect, useRef } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { ArrowLeft, Moon, MapPin, Calendar, Quote, Sun } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_EVENTS = [
    { day: "Day 01", title: "The Intention", desc: "Setting goals for the holy month." },
    { day: "Day 10", title: "Reflections", desc: "Community discussion circle." },
    { day: "Day 15", title: "Grand Iftar", desc: "Breaking bread together." },
    { day: "Day 27", title: "Night of Power", desc: "Collective prayer and peace." },
];

export const SpiritualQuestLight: React.FC<{ onBack: () => void; isDark: boolean; setIsDark: (val: boolean) => void }> = ({ onBack, isDark, setIsDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'spiritual-quest');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.to(".hero-bg", { yPercent: 20, ease: "none", scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true } });
        gsap.utils.toArray('.reveal-up').forEach((el: any) => {
            gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
        });
        gsap.fromTo(".timeline-line", { height: 0 }, { height: "100%", ease: "none", scrollTrigger: { trigger: ".timeline-container", start: "top center", end: "bottom center", scrub: 0.5 } });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fffaf0] text-slate-800 selection:bg-amber-500 selection:text-white font-sans overflow-x-hidden">
      
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #d97706 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center">
        <button onClick={onBack} className="group flex items-center gap-3 text-slate-700 hover:text-amber-600 transition-colors bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-amber-100 shadow-sm pointer-events-auto">
          <ArrowLeft size={20} />
          <span className="text-xs font-bold uppercase tracking-[0.3em] hidden sm:block">Back</span>
        </button>

        <button 
          onClick={() => setIsDark(!isDark)} 
          className="pointer-events-auto p-3 rounded-full bg-white/80 backdrop-blur-md border border-amber-100 text-amber-600 hover:text-amber-800 hover:border-amber-300 transition-all shadow-md group"
        >
           {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <section className="hero-section relative h-[80vh] flex items-center justify-center overflow-hidden bg-amber-50">
         <div className="hero-bg absolute inset-0">
            <SmartImage src={event.image} className="w-full h-full object-cover opacity-20 sepia-[0.2]" alt={event.name} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fffaf0] via-transparent to-[#fffaf0]" />
         </div>
         <div className="relative z-10 text-center p-6">
            <div className="reveal-up flex justify-center mb-10">
               <div className="w-24 h-24 rounded-full border border-amber-200 flex items-center justify-center bg-white shadow-2xl">
                  <Moon size={44} className="text-amber-600 fill-amber-600/10" />
               </div>
            </div>
            <h1 className="reveal-up text-5xl md:text-8xl font-heading font-black uppercase italic tracking-tight text-slate-900 mb-6 leading-tight">
               The Spiritual <span className="text-amber-600">Quest.</span>
            </h1>
            <p className="reveal-up text-xl md:text-2xl font-serif italic text-slate-500 max-w-2xl mx-auto">
               "{event.tagline}"
            </p>
         </div>
      </section>

      <section className="py-24 px-6 md:px-24 max-w-5xl mx-auto text-center">
         <div className="reveal-up mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-amber-600 mb-8">Mission Brief</h2>
            <p className="text-lg md:text-2xl font-light leading-relaxed text-slate-600 italic">
               {event.description}
            </p>
         </div>
         <div className="reveal-up grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-amber-100 p-10 rounded-[3rem] shadow-xl">
            <div className="text-left">
               <h3 className="text-xl font-bold uppercase text-amber-700 mb-4">Values</h3>
               <p className="text-sm leading-relaxed text-slate-500">
                  Creating spaces for reflection, ethics, and community leadership through the principles of empathy and service.
               </p>
            </div>
            <div className="text-right flex flex-col justify-center">
               <div className="flex justify-end gap-10">
                  <div>
                     <span className="block text-4xl font-heading font-black text-slate-900">{event.metrics.participants}</span>
                     <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Participants</span>
                  </div>
                  <div>
                     <span className="block text-4xl font-heading font-black text-slate-900">{event.metrics.reachLabel}</span>
                     <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Reach</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 px-6 md:px-24 timeline-container relative bg-white border-y border-amber-50">
         <div className="text-center mb-20 reveal-up">
            <h2 className="text-3xl font-heading font-black uppercase italic text-slate-900 tracking-tighter">Event <span className="text-amber-600">Progression</span></h2>
         </div>
         <div className="max-w-3xl mx-auto relative pl-8 md:pl-0">
            <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-px bg-amber-200 -translate-x-1/2">
               <div className="timeline-line absolute top-0 left-0 w-full bg-amber-500 shadow-[0_0_10px_#fbbf24]" />
            </div>
            <div className="space-y-16">
               {TIMELINE_EVENTS.map((item, i) => (
                  <div key={i} className={`reveal-up relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                     <div className={`md:w-1/2 flex ${i % 2 === 0 ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'} pl-16 md:pl-0 w-full`}>
                        <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 w-full md:max-w-xs relative hover:shadow-lg transition-all">
                           <span className="text-xs font-black uppercase tracking-widest text-amber-600 block mb-2">{item.day}</span>
                           <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                           <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                     <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-amber-500 bg-white z-10" />
                     <div className="hidden md:block md:w-1/2" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      <footer className="py-24 px-6 text-center">
         <h3 className="text-xs font-black uppercase tracking-[0.4em] text-amber-700 mb-12">Allied Foundations</h3>
         <div className="flex flex-wrap justify-center gap-10 grayscale opacity-40">
             {[...PARTNER_LOGOS].slice(0, 6).map((p, i) => (
                <div key={i} className="w-20 h-20 flex items-center justify-center p-4">
                   <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain" />
                </div>
             ))}
         </div>
      </footer>
    </div>
  );
};