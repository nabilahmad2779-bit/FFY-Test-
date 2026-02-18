
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { 
  ArrowLeft, Rocket, Telescope, Atom, Star, Zap, Users, 
  ChevronDown, Award, Radio, ArrowUpRight, Crosshair
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  onBack: () => void;
  isDark: boolean;
}

// --- SUB-COMPONENTS (LIGHT) ---

const MagneticButtonLight: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className = "" }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(btnRef.current, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${className}`}
    >
      {children}
    </button>
  );
};

// --- MAIN PAGE ---

export const CosmicQuestLight: React.FC<EventPageProps> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'cosmic-quest');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Hero Entrance
        const tl = gsap.timeline();
        tl.fromTo(".hero-text-l", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" });
        
        // Reveal Animations
        gsap.utils.toArray('.reveal-up-l').forEach((el: any) => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: el, start: "top 85%" } });
        });

        // Rocket Scroll Logic
        if (rocketRef.current) {
            gsap.to(rocketRef.current, { 
                top: "100%", 
                ease: "none",
                scrollTrigger: {
                    trigger: ".mission-timeline-l",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1
                }
            });
        }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const x = (clientX / width) * 2 - 1;
    const y = (clientY / height) * 2 - 1;

    gsap.to(".hero-icon", { x: x * 20, y: y * 20, duration: 1, ease: "power2.out" });
    gsap.to(".hero-text-l", { x: x * 10, y: y * 10, duration: 1, ease: "power2.out" });
  };

  if (!event) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f8faff] text-slate-900 selection:bg-indigo-600 selection:text-white overflow-x-hidden font-sans">
      
      {/* NAVIGATION */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-slate-200">
        <MagneticButtonLight onClick={onBack} className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition-colors backdrop-blur-md px-6 py-3 rounded-full border border-slate-200 bg-white shadow-sm">
          <ArrowLeft size={20} />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Abort Mission</span>
        </MagneticButtonLight>
        <div className="flex items-center gap-2 text-indigo-600">
           <Radio size={16} className="animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Mission Control</span>
        </div>
      </div>

      {/* HERO */}
      <section 
        ref={heroRef} 
        onMouseMove={handleHeroMouseMove}
        className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-white"
      >
         <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         
         <div className="relative z-10 text-center flex flex-col items-center">
            <div className="hero-icon w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-indigo-100 to-white shadow-[0_20px_50px_rgba(99,102,241,0.2)] mb-8 flex items-center justify-center border border-indigo-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                <Rocket size={80} className="text-indigo-600 rotate-45" />
            </div>

            <div className="hero-text-l inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 mb-6">
               <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Mission Log: {event.year}</span>
            </div>

            <h1 className="hero-text-l text-7xl md:text-[9rem] font-heading font-black uppercase italic tracking-tighter leading-[0.8] mb-6 text-slate-900">
               Cosmic <br/> <span className="text-indigo-600">Quest.</span>
            </h1>

            <p className="hero-text-l text-lg md:text-2xl font-light text-slate-500 max-w-2xl leading-relaxed">
               "Embark on an extraordinary journey to the edge of knowledge."
            </p>
         </div>

         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <ChevronDown className="text-slate-900" />
         </div>
      </section>

      {/* BRIEFING */}
      <section className="py-32 px-6">
         <div className="max-w-4xl mx-auto text-center reveal-up-l">
            <Atom size={48} className="mx-auto text-indigo-600 mb-8 animate-spin-slow" style={{ animationDuration: '10s' }} />
            <h2 className="text-4xl font-heading font-black uppercase italic text-slate-900 mb-8">Mission <span className="text-indigo-600">Objectives</span></h2>
            <p className="text-xl font-light text-slate-600 leading-relaxed mb-12">
               {event.description} Organized by <strong className="text-slate-900">Forte-FY</strong>, this event was a fusion of science and spectacle, challenging students to look beyond the horizon.
            </p>
         </div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-indigo-50/50 border-y border-indigo-100">
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal-up-l p-10 bg-white rounded-3xl shadow-lg border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
               <Telescope size={40} className="mx-auto text-indigo-600 mb-4" />
               <h3 className="text-5xl font-heading font-black text-slate-900 mb-2">{event.metrics.reachLabel}</h3>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Reach</p>
            </div>
            <div className="reveal-up-l p-10 bg-white rounded-3xl shadow-lg border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
               <Users size={40} className="mx-auto text-indigo-600 mb-4" />
               <h3 className="text-5xl font-heading font-black text-slate-900 mb-2">{event.metrics.participants}</h3>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Cadets</p>
            </div>
            <div className="reveal-up-l p-10 bg-white rounded-3xl shadow-lg border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
               <Star size={40} className="mx-auto text-indigo-600 mb-4" />
               <h3 className="text-5xl font-heading font-black text-slate-900 mb-2">{event.metrics.ambassadors}</h3>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Ambassadors</p>
            </div>
         </div>
      </section>

      {/* TIMELINE */}
      <section className="py-32 px-6 mission-timeline-l relative bg-white">
         <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2">
               <div ref={rocketRef} className="absolute left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center z-20 text-indigo-600 drop-shadow-md">
                  <Rocket size={24} className="rotate-180" />
               </div>
            </div>

            <div className="space-y-24">
               {[
                  { title: "Cosmic Olympiad", icon: Award, desc: "A rigorous test of astronomical knowledge." },
                  { title: "Sky Observation", icon: Telescope, desc: "Direct observation using advanced telescopes." },
                  { title: "Space Workshops", icon: Users, desc: "Interactive sessions on rocketry." },
                  { title: "Cosmic Quiz", icon: Zap, desc: "Rapid-fire trivia rounds on space history." }
               ].map((item, i) => (
                  <div key={i} className={`reveal-up-l flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                     <div className={`w-14 h-14 rounded-full border-2 border-indigo-100 bg-white z-10 flex items-center justify-center text-indigo-600 shadow-lg shrink-0 ${i % 2 !== 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                        <item.icon size={24} />
                     </div>
                     <div className="flex-1 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm w-full text-center md:text-left hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold uppercase text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-500 font-light text-sm">{item.desc}</p>
                     </div>
                     <div className="flex-1 hidden md:block" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* RECRUITMENT */}
      <section className="py-32 px-6 relative bg-indigo-900 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
         
         <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white mb-8 animate-pulse">
               <Radio size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Incoming Transmission</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-white mb-6">
               Ambassador <br/> Recruitment.
            </h2>
            
            <p className="text-lg md:text-xl font-light text-indigo-200 mb-10 max-w-2xl mx-auto">
               Are you passionate about spreading cosmic enthusiasm? Join us as an Event Ambassador.
            </p>

            <MagneticButtonLight 
               onClick={() => window.open('https://forms.google.com', '_blank')}
               className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 font-black uppercase tracking-widest rounded-full hover:bg-indigo-50 transition-colors shadow-2xl"
            >
               <span>Accept Mission</span>
               <ArrowUpRight size={18} />
            </MagneticButtonLight>
         </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-12">Allied Science Divisions</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
               {[...PARTNER_LOGOS].filter(p => p.name.includes('Science') || p.name.includes('Astro') || p.name.includes('Club')).slice(0,10).map((p, i) => (
                  <div key={i} className="w-20 h-20 rounded-full border border-slate-200 p-4 bg-white shadow-sm hover:border-indigo-400 hover:shadow-lg transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer">
                     <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow linear infinite; }
      `}</style>
    </div>
  );
};
