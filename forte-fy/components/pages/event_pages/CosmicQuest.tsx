import React, { useLayoutEffect, useRef } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { ArrowLeft, Rocket, Telescope, Atom, Orbit, Star, Zap, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  onBack: () => void;
  isDark: boolean;
}

export const CosmicQuest: React.FC<EventPageProps> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'cosmic-quest');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Hero Parallax
        gsap.to(".hero-stars", { y: -100, ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true } });
        
        // Element Reveals
        gsap.utils.toArray('.cosmic-reveal').forEach((el: any) => {
            gsap.fromTo(el, 
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } }
            );
        });

        // Floating Planets/Elements
        gsap.to(".planet-1", { rotation: 360, duration: 200, repeat: -1, ease: "linear" });
        gsap.fromTo(".nebula-glow", { opacity: 0.2 }, { opacity: 0.5, duration: 5, yoyo: true, repeat: -1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020205] text-white selection:bg-indigo-500 selection:text-white overflow-hidden font-sans">
      
      {/* Dynamic Starfield Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="hero-stars absolute inset-0" style={{ backgroundImage: 'radial-gradient(1px 1px at center, white 100%, transparent)', backgroundSize: '50px 50px', opacity: 0.3 }}></div>
         <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-indigo-900/20 blur-[150px] nebula-glow" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/20 blur-[150px] nebula-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="fixed top-0 left-0 w-full z-50 p-6">
        <button onClick={onBack} className="group flex items-center gap-3 text-white hover:text-indigo-400 transition-colors backdrop-blur-md px-4 py-2 rounded-full border border-white/10 bg-black/20">
          <ArrowLeft size={20} />
          <span className="text-xs font-black uppercase tracking-[0.3em] hidden sm:block">Abort Mission</span>
        </button>
      </div>

      {/* Hero */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10">
         <div className="cosmic-reveal mb-8 relative">
            <div className="planet-1 absolute -top-20 -right-20 w-40 h-40 border border-white/10 rounded-full" />
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-indigo-500/50 bg-indigo-950/30 text-indigo-300 mb-6 backdrop-blur-lg shadow-[0_0_20px_rgba(99,102,241,0.3)]">
               <Rocket size={16} className="animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Mission Log: {event.year}</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-heading font-black uppercase italic tracking-tighter leading-[0.8] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-200 to-indigo-900 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">
               Cosmic <br/>Quest.
            </h1>
         </div>
         <p className="cosmic-reveal text-xl md:text-2xl font-light text-indigo-200 max-w-2xl leading-relaxed mix-blend-screen">
            "{event.tagline}"
         </p>
      </section>

      {/* Stats Dashboard */}
      <section className="py-24 px-6 relative z-10">
         <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[
                  { label: "Mission Reach", value: event.metrics.reachLabel, icon: Telescope, col: "md:col-span-2" },
                  { label: "Cadets", value: event.metrics.participants, icon: Users, col: "md:col-span-1" },
                  { label: "Ambassadors", value: event.metrics.ambassadors, icon: Star, col: "md:col-span-1" },
               ].map((stat, i) => (
                  <div key={i} className={`cosmic-reveal p-8 rounded-3xl border border-indigo-500/20 bg-indigo-950/10 backdrop-blur-sm ${stat.col} flex flex-col justify-between group hover:border-indigo-500/50 transition-all duration-500`}>
                     <div className="flex justify-between items-start mb-8">
                        <stat.icon size={24} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                     </div>
                     <div>
                        <h3 className="text-5xl font-heading font-black italic text-white mb-2">{stat.value}</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">{stat.label}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Intel / Description */}
      <section className="py-24 px-6 md:px-24 relative z-10">
         <div className="max-w-4xl mx-auto text-center cosmic-reveal">
            <Atom size={64} className="mx-auto text-indigo-500 mb-8 animate-spin-slow" style={{ animationDuration: '10s' }} />
            <h2 className="text-3xl font-heading font-black uppercase italic mb-8">Data Analysis</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed text-indigo-100/80 mb-12">
               {event.description} <br/><br/>
               We engineered an immersive experience bridging entertainment and education. From astronomy olympiads to night sky observations, Cosmic Quest pushed the boundaries of youth scientific engagement.
            </p>
            
            {/* Segments */}
            <div className="flex flex-wrap justify-center gap-4">
               {['Olympiad', 'Sky Observation', 'Workshops', 'Cosmic Quiz'].map((s, i) => (
                  <div key={i} className="px-6 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 uppercase font-bold tracking-wider text-xs hover:bg-indigo-500/20 transition-colors cursor-default">
                     {s}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Science Partners */}
      <section className="py-24 border-t border-indigo-500/10 relative z-10">
         <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-16">Allied Science Divisions</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
               {/* Filter for Science Clubs roughly */}
               {[...PARTNER_LOGOS].filter(p => p.name.includes('Science') || p.name.includes('Astro') || p.name.includes('Club')).slice(0,10).map((p, i) => (
                  <div key={i} className="cosmic-reveal w-24 h-24 rounded-full border border-indigo-500/20 p-4 bg-black/40 hover:border-indigo-400 hover:shadow-[0_0_20px_indigo] transition-all duration-300 group">
                     <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                  </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
};