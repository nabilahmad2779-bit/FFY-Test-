
import React, { useLayoutEffect, useRef } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { ArrowLeft, Moon, Star, MapPin, Calendar, Heart, Sun } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  onBack: () => void;
  isDark: boolean;
}

export const SpiritualQuest: React.FC<EventPageProps> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'spiritual-quest');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.to(".hero-bg", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
        });

        gsap.utils.toArray('.reveal-up').forEach((el: any) => {
            gsap.fromTo(el, 
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }
            );
        });

        // Timeline draw
        gsap.fromTo(".timeline-line", 
            { height: 0 },
            { height: "100%", ease: "none", scrollTrigger: { trigger: ".timeline-container", start: "top center", end: "bottom center", scrub: 0.5 } }
        );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  const TIMELINE_EVENTS = [
      { day: "Day 01", title: "The Intention", desc: "Setting goals for the holy month." },
      { day: "Day 10", title: "Reflections", desc: "Community discussion circle." },
      { day: "Day 15", title: "Grand Iftar", desc: "Breaking bread together." },
      { day: "Day 27", title: "Night of Power", desc: "Collective prayer and peace." },
  ];

  const THEME = {
      gold: "text-amber-400",
      goldBg: "bg-amber-400",
      border: "border-amber-500/20"
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050301] text-amber-50 selection:bg-amber-500 selection:text-black font-sans overflow-x-hidden">
      
      {/* Decorative Islamic Pattern Overlay (CSS Pattern) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, ${isDark ? '#fbbf24' : '#000'} 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <button onClick={onBack} className="group flex items-center gap-3 text-white hover:text-amber-400 transition-colors">
          <ArrowLeft size={20} />
          <span className="text-xs font-bold uppercase tracking-[0.3em] hidden sm:block">Back</span>
        </button>
      </div>

      {/* Hero */}
      <section className="hero-section relative h-[90vh] flex items-center justify-center overflow-hidden">
         <div className="hero-bg absolute inset-0">
            <SmartImage src={event.image} className="w-full h-full object-cover opacity-50 sepia-[0.3]" alt={event.name} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050301] via-transparent to-[#050301]" />
            <div className="absolute inset-0 bg-[#050301]/40 mix-blend-multiply" />
         </div>
         
         <div className="relative z-10 text-center p-6">
            <div className="reveal-up flex justify-center mb-8">
               <div className={`w-20 h-20 rounded-full border border-amber-500/30 flex items-center justify-center bg-amber-900/20 backdrop-blur-md`}>
                  <Moon size={40} className="text-amber-400" />
               </div>
            </div>
            <h1 className="reveal-up text-5xl md:text-8xl font-heading font-black uppercase italic tracking-tight text-white mb-6 drop-shadow-lg">
               The Spiritual <span className="text-amber-400">Quest.</span>
            </h1>
            <p className="reveal-up text-xl md:text-2xl font-serif italic text-amber-100/80 max-w-2xl mx-auto">
               "{event.tagline}"
            </p>
         </div>
      </section>

      {/* Description & Quotes */}
      <section className="py-24 px-6 md:px-24 max-w-5xl mx-auto">
         <div className="reveal-up text-center mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-amber-500 mb-6">The Purpose</h2>
            <p className="text-lg md:text-2xl font-light leading-relaxed text-amber-100/70">
               {event.description}
            </p>
            <div className="w-16 h-1 bg-amber-500/50 mx-auto mt-8 rounded-full" />
         </div>
         
         <div className="reveal-up grid grid-cols-1 md:grid-cols-2 gap-8 bg-amber-900/5 border border-amber-500/10 p-8 rounded-2xl">
            <div>
               <h3 className="text-xl font-bold uppercase text-amber-400 mb-4">Why We Gathered</h3>
               <p className="text-sm leading-relaxed opacity-70">
                  To create a sanctuary of peace and reflection amidst the noise of modern life. We aimed to foster community resilience and ethical grounding during the holy month.
               </p>
            </div>
            <div className="text-right">
               <h3 className="text-xl font-bold uppercase text-amber-400 mb-4">The Impact</h3>
               <div className="flex justify-end gap-8">
                  <div>
                     <span className="block text-3xl font-heading font-black text-white">{event.metrics.participants}</span>
                     <span className="text-[10px] uppercase tracking-widest opacity-50">Souls Connected</span>
                  </div>
                  <div>
                     <span className="block text-3xl font-heading font-black text-white">{event.metrics.reachLabel}</span>
                     <span className="text-[10px] uppercase tracking-widest opacity-50">Reach</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Ramadan Timeline */}
      <section className="py-24 px-6 md:px-24 timeline-container relative">
         <div className="text-center mb-16 reveal-up">
            <h2 className="text-3xl font-heading font-black uppercase italic text-white">Journey Through <span className="text-amber-400">Ramadan</span></h2>
         </div>
         
         <div className="max-w-3xl mx-auto relative pl-8 md:pl-0">
            <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-px bg-amber-500/20 -translate-x-1/2">
               <div className="timeline-line absolute top-0 left-0 w-full bg-amber-500" />
            </div>

            <div className="space-y-16">
               {TIMELINE_EVENTS.map((item, i) => (
                  <div key={i} className={`reveal-up relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                     <div className={`md:w-1/2 flex ${i % 2 === 0 ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'} pl-16 md:pl-0 w-full`}>
                        <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-900/10 backdrop-blur-sm w-full md:max-w-xs relative">
                           <span className="absolute -left-12 md:left-auto md:right-full md:mr-8 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-widest text-amber-500 w-max rotate-0 md:-rotate-90 origin-center">{item.day}</span>
                           <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                           <p className="text-xs text-amber-200/60">{item.desc}</p>
                        </div>
                     </div>
                     <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-amber-500 bg-[#050301] z-10 shadow-[0_0_15px_#fbbf24]" />
                     <div className="hidden md:block md:w-1/2" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 px-6 border-t border-amber-500/10">
         <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-amber-600 mb-12">Community Partners</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60">
                {[...PARTNER_LOGOS].slice(0, 8).map((p, i) => (
                   <div key={i} className="w-20 h-20 rounded-full bg-white/5 border border-amber-500/20 p-4 grayscale hover:grayscale-0 transition-all duration-500">
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" />
                   </div>
                ))}
            </div>
         </div>
      </section>

    </div>
  );
};
