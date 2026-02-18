
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { 
  ArrowLeft, Rocket, Telescope, Atom, Star, Zap, Users, 
  ChevronDown, Award, Radio, ArrowUpRight, Crosshair, Globe, Sparkles
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  onBack: () => void;
  isDark: boolean;
}

// --- SUB-COMPONENTS ---

const MagneticButton: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className = "" }) => {
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

const OrbitStat: React.FC<{ label: string; value: string; icon: any; index: number }> = ({ label, value, icon: Icon, index }) => {
  return (
    <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center group perspective-1000">
      {/* Orbital Rings */}
      <div className={`absolute inset-0 rounded-full border border-dashed border-[#00f7ff]/30 animate-spin-slow`} style={{ animationDuration: `${25 + index * 5}s` }} />
      <div className={`absolute inset-4 rounded-full border border-[#d946ef]/30 animate-spin-reverse`} style={{ animationDuration: `${20 + index * 5}s` }} />
      
      {/* Core */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center bg-[#130f25]/90 backdrop-blur-md w-32 h-32 rounded-full border border-white/10 shadow-[0_0_40px_rgba(217,70,239,0.2)] group-hover:scale-110 transition-transform duration-500 group-hover:border-[#00f7ff]/50 group-hover:shadow-[0_0_60px_rgba(0,247,255,0.4)]">
         <Icon size={28} className="text-[#ffd700] mb-2 group-hover:animate-bounce drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
         <h3 className="text-2xl font-heading font-black text-white">{value}</h3>
         <p className="text-[9px] uppercase tracking-widest text-[#00f7ff]">{label}</p>
      </div>

      {/* Satellite */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-3 h-3 bg-[#00f7ff] rounded-full shadow-[0_0_15px_#00f7ff] animate-orbit`} style={{ animationDuration: `${25 + index * 5}s` }} />
    </div>
  );
};

// --- MAIN PAGE ---

export const CosmicQuest: React.FC<EventPageProps> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'cosmic-quest');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // 1. Hero Entrance
        const tl = gsap.timeline();
        tl.fromTo(".hero-bg-layer", { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 2, ease: "power2.out" })
          .fromTo(".hero-planet", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)" }, "-=1.5")
          .fromTo(".hero-astronaut", { x: 100, opacity: 0, rotation: 15 }, { x: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "power3.out" }, "-=1.2")
          .fromTo(".hero-title-char", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: "back.out(1.7)" }, "-=1")
          .fromTo(".scroll-indicator", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

        // 2. Floating Animations (Continuous)
        gsap.to(".hero-astronaut", { y: -20, rotation: 5, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".hero-planet", { rotation: 3, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });

        // 3. Rocket Scroll Progress - PHYSICALLY MOVING
        if (rocketRef.current) {
            gsap.to(rocketRef.current, {
                top: "100%", 
                ease: "none",
                scrollTrigger: {
                    trigger: ".mission-timeline",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1 // Smooth scrubbing
                }
            });
        }

        // 4. Reveal Animations
        gsap.utils.toArray('.reveal-up').forEach((el: any) => {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: el, start: "top 85%" } }
            );
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Calculate normalized mouse position (-1 to 1)
    const x = (clientX / width) * 2 - 1;
    const y = (clientY / height) * 2 - 1;

    // Apply Parallax to different layers
    gsap.to(".layer-stars-back", { x: x * 10, y: y * 10, duration: 1, ease: "power2.out" });
    gsap.to(".layer-stars-front", { x: x * 20, y: y * 20, duration: 1, ease: "power2.out" });
    gsap.to(".hero-title-group", { x: x * 30, y: y * 30, duration: 1, ease: "power2.out" });
    gsap.to(".hero-planet", { x: x * 15, y: y * 15, duration: 1.2, ease: "power2.out" }); // Planet moves slower
    gsap.to(".hero-astronaut", { x: x * 40, y: y * 40, duration: 1.5, ease: "power2.out" }); // Astronaut moves faster (closer)
  };

  if (!event) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#070510] text-white selection:bg-[#00f7ff] selection:text-black overflow-x-hidden font-sans">
      
      {/* NAVIGATION */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference flex justify-between items-center">
        <MagneticButton onClick={onBack} className="flex items-center gap-3 text-white hover:text-[#00f7ff] transition-colors backdrop-blur-md px-6 py-3 rounded-full border border-white/20 bg-white/5">
          <ArrowLeft size={20} />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Abort Mission</span>
        </MagneticButton>
        <div className="hidden md:flex items-center gap-4">
            <span className="text-[10px] font-mono text-[#00f7ff] animate-pulse">SYSTEM: ONLINE</span>
            <div className="w-2 h-2 rounded-full bg-[#00f7ff] shadow-[0_0_10px_#00f7ff]" />
        </div>
      </div>

      {/* HERO SECTION - PARALLAX INTERACTIVE */}
      <section 
        ref={heroRef} 
        onMouseMove={handleHeroMouseMove}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-1000"
      >
         {/* Layer 0: Deep Space Background */}
         <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2D1B69] via-[#0B0014] to-[#000000]" />
         
         {/* Layer 1: Distant Stars (Slow) */}
         <div className="layer-stars-back absolute inset-0 z-10 opacity-60">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0s' }} />
            <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
            {[...Array(30)].map((_, i) => (
                <div key={i} className="absolute w-[2px] h-[2px] bg-white rounded-full" style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, opacity: Math.random() }} />
            ))}
         </div>

         {/* Layer 2: Nebula Clouds */}
         <div className="absolute inset-0 z-10 opacity-30 mix-blend-screen pointer-events-none">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d946ef] rounded-full blur-[150px] animate-pulse-slow" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00f7ff] rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
         </div>

         {/* Layer 3: Main Content (Planets & Text) */}
         <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none">
            
            {/* The Central Planet */}
            <div className="hero-planet absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] z-10 opacity-80">
               {/* Planet Body */}
               <div className="w-full h-full rounded-full bg-gradient-to-br from-[#4c1d95] via-[#2e1065] to-black shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8),0_0_100px_rgba(139,92,246,0.3)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-overlay" />
                  {/* Planet Rings/Atmosphere */}
                  <div className="absolute -inset-4 rounded-full border border-[#00f7ff]/20 animate-spin-slow" />
                  <div className="absolute -inset-10 rounded-full border border-[#d946ef]/10 animate-spin-reverse" />
               </div>
            </div>

            {/* Astronaut Floater */}
            <div className="hero-astronaut absolute top-[20%] right-[10%] md:top-[25%] md:right-[15%] z-30 w-32 h-32 md:w-48 md:h-48">
               {/* Simple SVG Astronaut Representation for reliability */}
               <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(0,247,255,0.4)]">
                  <g fill="none" stroke="#fff" strokeWidth="2">
                     <path d="M50 20 C50 20 70 25 70 45 C70 65 60 70 50 70 C40 70 30 65 30 45 C30 25 50 20 50 20 Z" fill="#000" />
                     <path d="M35 45 Q50 55 65 45" stroke="#00f7ff" strokeWidth="2" />
                     <circle cx="50" cy="45" r="35" stroke="#fff" strokeWidth="3" />
                     <rect x="40" y="70" width="20" height="20" rx="5" fill="#fff" />
                     <path d="M30 60 L10 50 M70 60 L90 50" stroke="#fff" strokeWidth="3" />
                  </g>
               </svg>
            </div>

            {/* Title Text Group */}
            <div className="hero-title-group relative z-40 text-center flex flex-col items-center">
               <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#00f7ff]/30 bg-[#00f7ff]/10 text-[#00f7ff] mb-6 backdrop-blur-md hero-title-char">
                  <Sparkles size={14} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Mission Status: Launched</span>
               </div>

               <h1 className="text-6xl md:text-[8rem] font-heading font-black uppercase italic tracking-tighter leading-[0.8] mb-6 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                  <span className="block hero-title-char">COSMIC</span>
                  <span className="block hero-title-char text-transparent bg-clip-text bg-gradient-to-r from-[#00f7ff] via-[#d946ef] to-[#ffd700]">QUEST</span>
               </h1>

               <p className="hero-title-char text-lg md:text-2xl font-light text-zinc-300 max-w-xl leading-relaxed mix-blend-screen px-4 drop-shadow-md">
                  "Embark on an extraordinary journey to the edge of knowledge."
               </p>
            </div>
         </div>

         {/* Scroll Indicator */}
         <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-30">
            <span className="text-[9px] uppercase tracking-widest text-[#00f7ff]">Initialize Descent</span>
            <ChevronDown className="text-white animate-bounce" />
         </div>
      </section>

      {/* MISSION BRIEFING (ABOUT) */}
      <section className="py-32 px-6 relative z-10 bg-[#070510] border-t border-[#00f7ff]/10">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="reveal-up relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-[#00f7ff] to-[#d946ef] rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
               <div className="relative p-8 md:p-12 rounded-3xl bg-[#0d091f] border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-4 mb-8">
                     <Atom size={40} className="text-[#00f7ff] animate-spin-slow" style={{ animationDuration: '15s' }} />
                     <h3 className="text-xl font-heading font-black uppercase italic tracking-tight text-white">Transmission Incoming...</h3>
                  </div>
                  <p className="text-lg font-light text-zinc-300 leading-relaxed text-justify mb-6">
                     Are you ready to embark on an extraordinary cosmic journey? Join us for the exhilarating "Cosmic Quest" event organised by Forte-FY, where we explore the wonders of the universe and challenge your knowledge and creativity!
                  </p>
                  <p className="text-lg font-light text-zinc-300 leading-relaxed text-justify">
                     Get ready to unleash your astronomical prowess and win exciting prizes! We didn't just teach space; we brought the cosmos to the classroom.
                  </p>
               </div>
            </div>
            
            <div className="reveal-up text-center md:text-left pl-0 md:pl-10">
               <h2 className="text-5xl md:text-7xl font-heading font-black uppercase text-white mb-8 leading-[0.9]">
                  Explore the <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#00f7ff]">Unknown.</span>
               </h2>
               <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                  {["Astronomy", "Physics", "Creativity", "Innovation"].map((tag, i) => (
                     <div key={i} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-[#00f7ff]/50 hover:text-[#00f7ff] transition-all cursor-default">
                        {tag}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* MISSION TELEMETRY (STATS) - ORBIT STYLE */}
      <section className="py-32 relative overflow-hidden bg-[#05000a]">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f7ff]/50 to-transparent" />
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h2 className="reveal-up text-4xl font-heading font-black uppercase italic mb-24 text-white">Mission <span className="text-[#00f7ff]">Telemetry</span></h2>
            
            <div className="flex flex-wrap justify-center gap-16 lg:gap-32">
               <div className="reveal-up">
                  <OrbitStat label="Mission Reach" value={event.metrics.reachLabel} icon={Telescope} index={0} />
               </div>
               <div className="reveal-up">
                  <OrbitStat label="Cadets" value={event.metrics.participants.toString()} icon={Users} index={1} />
               </div>
               <div className="reveal-up">
                  <OrbitStat label="Ambassadors" value={event.metrics.ambassadors.toString()} icon={Star} index={2} />
               </div>
            </div>
         </div>
      </section>

      {/* MISSION TIMELINE (ROCKET SCROLL) */}
      <section className="py-32 px-6 mission-timeline relative bg-[#070510]">
         <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
               {/* Rocket Follower - Starts at top, triggered by scroll */}
               <div ref={rocketRef} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center z-20 text-[#00f7ff] drop-shadow-[0_0_20px_#00f7ff] transition-transform duration-75" style={{ top: '0%' }}>
                  <Rocket size={32} className="rotate-180 fill-black" />
               </div>
            </div>

            <div className="space-y-32 relative z-10">
               {[
                  { title: "Cosmic Olympiad", icon: Award, desc: "A rigorous test of astronomical knowledge challenging young minds to push their limits." },
                  { title: "Sky Observation", icon: Telescope, desc: "Direct observation of celestial bodies using advanced telescopes under guided supervision." },
                  { title: "Space Workshops", icon: Users, desc: "Interactive sessions on rocketry, astrophysics, and the future of space travel." },
                  { title: "Cosmic Quiz", icon: Zap, desc: "Rapid-fire trivia rounds on space history, phenomena, and scientific breakthroughs." }
               ].map((item, i) => (
                  <div key={i} className={`reveal-up flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                     <div className={`w-14 h-14 rounded-full border-2 border-[#d946ef] bg-[#050014] z-10 flex items-center justify-center text-white shadow-[0_0_20px_rgba(217,70,239,0.5)] shrink-0 ${i % 2 !== 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                        <item.icon size={24} />
                     </div>
                     <div className="flex-1 p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#00f7ff]/30 hover:bg-white/[0.04] transition-all w-full text-center md:text-left group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                           <item.icon size={80} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase text-white mb-3 group-hover:text-[#00f7ff] transition-colors">{item.title}</h3>
                        <p className="text-zinc-400 font-light text-sm leading-relaxed">{item.desc}</p>
                     </div>
                     <div className="flex-1 hidden md:block" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* AMBASSADOR RECRUITMENT (DOSSIER) */}
      <section className="py-32 px-6 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f7ff]/5 rounded-full blur-[120px] pointer-events-none" />
         
         <div className="max-w-4xl mx-auto relative z-10">
            <div className="reveal-up p-1 rounded-[2.5rem] bg-gradient-to-br from-[#00f7ff] via-[#d946ef] to-[#4c1d95]">
               <div className="bg-[#080410] rounded-[2.4rem] p-8 md:p-20 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none" />
                  
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#00f7ff]/10 border border-[#00f7ff]/30 text-[#00f7ff] mb-10 animate-pulse">
                     <Radio size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Incoming Transmission</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-white mb-8">
                     Ambassador <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f7ff] to-[#d946ef]">Recruitment.</span>
                  </h2>
                  
                  <p className="text-lg md:text-xl font-light text-zinc-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                     Are you passionate about spreading the cosmic enthusiasm to your fellow students? Become an Event Ambassador for the Cosmic Quest event! As a representative, you will play a vital role in promoting the event and inspiring others.
                  </p>

                  <MagneticButton 
                     onClick={() => window.open('https://forms.google.com', '_blank')}
                     className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-[#00f7ff] transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)] group"
                  >
                     <span>Accept Mission</span>
                     <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </MagneticButton>
               </div>
            </div>
         </div>
      </section>

      {/* PARTNERS */}
      <section className="py-24 border-t border-white/5 relative z-10 bg-[#030005]">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#d946ef] mb-16">Allied Science Divisions</h3>
            <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-500">
               {[...PARTNER_LOGOS].filter(p => p.name.includes('Science') || p.name.includes('Astro') || p.name.includes('Club')).slice(0,10).map((p, i) => (
                  <div key={i} className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 p-5 bg-white/[0.02] hover:border-[#00f7ff] hover:bg-[#00f7ff]/10 hover:shadow-[0_0_30px_rgba(0,247,255,0.2)] transition-all duration-300 group cursor-pointer grayscale hover:grayscale-0">
                     <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 25s linear infinite; }
        @keyframes orbit { from { transform: rotate(0deg) translateX(5rem) rotate(0deg); } to { transform: rotate(360deg) translateX(5rem) rotate(-360deg); } }
        .animate-orbit { animation: orbit linear infinite; }
      `}</style>

    </div>
  );
};
