
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

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: {x: number, y: number, z: number, pz: number}[] = [];
    const numStars = 800;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000,
        pz: 0
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 5, 16, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach(star => {
        star.pz = star.z;
        star.z -= 10;
        
        if (star.z < 1) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = 2000;
          star.pz = 2000;
        }

        const x = cx + (star.x / star.z) * 800;
        const y = cy + (star.y / star.z) * 800;
        const px = cx + (star.x / star.pz) * 800;
        const py = cy + (star.y / star.pz) * 800;

        const size = Math.max(0.1, (1 - star.z / 2000) * 3);
        const opacity = 1 - star.z / 2000;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = size;
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#070510]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070510]/50 to-[#070510]" />
    </div>
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
        // 1. Rocket Scroll Progress - PHYSICALLY MOVING
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

        // 2. Reveal Animations
        gsap.utils.toArray('.reveal-up').forEach((el: any) => {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: el, start: "top 85%" } }
            );
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#070510] text-white selection:bg-[#00f7ff] selection:text-black overflow-x-hidden font-sans">
      
      {/* HERO SECTION - TRAVELING UNIVERSE */}
      <section 
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#070510]"
      >
         {/* Traveling Stars Animation */}
         <Starfield />

         {/* Back Button */}
         <div className="absolute top-24 left-6 md:left-10 z-30">
            <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-[#00f7ff] transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
               <ArrowLeft size={16} />
               <span className="text-[10px] font-black uppercase tracking-widest">Back to Archive</span>
            </button>
         </div>

         {/* Main Content */}
         <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none">
            {/* Title Text Group */}
            <div className="text-center flex flex-col items-center w-full max-w-6xl px-4">
               <h1 
                 className="text-6xl md:text-[9rem] lg:text-[11rem] font-heading font-black uppercase tracking-tighter leading-[0.9] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e0f2fe] to-[#00f7ff] drop-shadow-[0_0_40px_rgba(0,247,255,0.4)] w-full"
               >
                  COSMIC<br/>QUEST
               </h1>

               <p className="text-lg md:text-2xl font-light text-zinc-300 max-w-xl leading-relaxed px-4 drop-shadow-md">
                  "Commence an extraordinary expedition to the frontiers of knowledge."
               </p>
            </div>
         </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="py-32 px-6 relative z-10 bg-[#070510]">
         <div className="max-w-6xl mx-auto">
            <div className="reveal-up text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-white mb-6 leading-[1.1]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f7ff] to-[#d946ef]">Cosmic Quest</span> <br/>
                  An Epic Online Astronomy Event
               </h2>
               <p className="text-lg md:text-xl font-light text-zinc-300 max-w-4xl mx-auto leading-relaxed">
                  Cosmic Quest represents Forte-FY's premier astronomical initiative, meticulously engineered to cultivate scientific inquiry and intellectual rigor among emerging scholars. Uniting students from Class 6 to 12 (including HSC Batch 22), the event establishes a dynamic nexus where empirical knowledge intersects with creative innovation.
               </p>
               <p className="text-lg md:text-xl font-light text-zinc-300 max-w-4xl mx-auto leading-relaxed mt-4">
                  This inter-institutional academic competition synthesizes scientific principles, imaginative exploration, and leadership development — presenting participants with an unparalleled opportunity to validate their astronomical comprehension while vying for distinguished recognition.
               </p>
            </div>

            {/* Vision & Categories - Bento Grid Style */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-32">
               {/* Event Vision - Spans 8 columns */}
               <div className="reveal-up lg:col-span-8 p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent hover:from-[#00f7ff]/30 transition-colors duration-500 group">
                  <div className="h-full bg-[#0a0718] rounded-[1.4rem] p-8 md:p-12 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f7ff]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#00f7ff]/10 transition-colors duration-700" />
                     
                     <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="p-3 rounded-xl bg-[#00f7ff]/10 border border-[#00f7ff]/20">
                           <Globe size={28} className="text-[#00f7ff]" />
                        </div>
                        <h3 className="text-3xl font-heading font-black uppercase tracking-tight text-white">Strategic Vision</h3>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {[
                           { title: "Scientific Inquiry", desc: "Cultivating profound curiosity and methodological thinking among students." },
                           { title: "Space Education", desc: "Promoting advanced astronomical concepts and celestial mechanics." },
                           { title: "Analytical Rigor", desc: "Developing critical thinking and innovative problem-solving capabilities." },
                           { title: "Academic Nexus", desc: "Building a vibrant, cross-institutional community of young scholars." }
                        ].map((item, i) => (
                           <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#00f7ff]/30 transition-all duration-300 transform hover:-translate-y-1">
                              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                 <span className="w-1.5 h-1.5 rounded-full bg-[#00f7ff]" />
                                 {item.title}
                              </h4>
                              <p className="text-zinc-400 font-light text-sm">{item.desc}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Event Categories - Spans 4 columns */}
               <div className="reveal-up lg:col-span-4 p-1 rounded-3xl bg-gradient-to-bl from-white/10 to-transparent hover:from-[#d946ef]/30 transition-colors duration-500 group">
                  <div className="h-full bg-[#0a0718] rounded-[1.4rem] p-8 md:p-10 relative overflow-hidden flex flex-col">
                     <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#d946ef]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-[#d946ef]/10 transition-colors duration-700" />
                     
                     <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="p-3 rounded-xl bg-[#d946ef]/10 border border-[#d946ef]/20">
                           <Users size={28} className="text-[#d946ef]" />
                        </div>
                        <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-white">Academic Divisions</h3>
                     </div>
                     
                     <p className="text-zinc-400 font-light text-sm mb-8 relative z-10 flex-grow">
                        Participants are categorized into two distinct academic divisions to ensure equitable and age-appropriate intellectual challenges.
                     </p>
                     
                     <div className="space-y-4 relative z-10">
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-[#00f7ff]/40 transition-colors group/cat">
                           <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-white uppercase tracking-wider text-sm">Primary</span>
                              <span className="text-[#00f7ff] font-mono text-xs font-bold bg-[#00f7ff]/10 px-2 py-1 rounded">Class 6–8</span>
                           </div>
                        </div>
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-[#d946ef]/40 transition-colors group/cat">
                           <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-white uppercase tracking-wider text-sm">Secondary</span>
                              <span className="text-[#d946ef] font-mono text-xs font-bold bg-[#d946ef]/10 px-2 py-1 rounded">Class 9–12</span>
                           </div>
                           <p className="text-[10px] text-zinc-500 mt-2">* Includes HSC Batch 22</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Event Segments */}
            <div className="reveal-up mb-20">
               <div className="flex items-center gap-4 mb-12 justify-center">
                  <Crosshair size={32} className="text-white" />
                  <h3 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-white text-center">Event Segments</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[#00f7ff]/30 transition-colors group">
                     <div className="w-12 h-12 rounded-full bg-[#00f7ff]/10 flex items-center justify-center mb-6 border border-[#00f7ff]/20 group-hover:scale-110 transition-transform">
                        <span className="text-xl font-black text-[#00f7ff]">1</span>
                     </div>
                     <h4 className="text-xl font-bold text-white uppercase mb-4">Astro Quiz</h4>
                     <p className="text-zinc-400 font-light text-sm mb-4">A 25-minute competitive quiz featuring 25 carefully curated questions covering:</p>
                     <ul className="space-y-2 mb-4 text-sm text-zinc-300 font-light">
                        <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#00f7ff]" /> Basic Astronomy Concepts</li>
                        <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#00f7ff]" /> Simple Mathematical Applications</li>
                        <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#00f7ff]" /> Foundational Ideas of General Relativity</li>
                     </ul>
                     <p className="text-xs text-zinc-500 italic">Tests logic, speed, and conceptual clarity. Tie-breaking by submission time.</p>
                  </div>

                  <div className="p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[#d946ef]/30 transition-colors group">
                     <div className="w-12 h-12 rounded-full bg-[#d946ef]/10 flex items-center justify-center mb-6 border border-[#d946ef]/20 group-hover:scale-110 transition-transform">
                        <span className="text-xl font-black text-[#d946ef]">2</span>
                     </div>
                     <h4 className="text-xl font-bold text-white uppercase mb-4">Astro Movie Quiz</h4>
                     <p className="text-zinc-400 font-light text-sm mb-4">A unique and engaging quiz focused on iconic space-themed films such as:</p>
                     <ul className="space-y-2 mb-4 text-sm text-zinc-300 font-light">
                        <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#d946ef]" /> Interstellar</li>
                        <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#d946ef]" /> The Martian</li>
                        <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#d946ef]" /> First Man</li>
                     </ul>
                     <p className="text-xs text-zinc-500 italic">Blends cinematic storytelling with scientific understanding and analytical observation.</p>
                  </div>

                  <div className="p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[#ffd700]/30 transition-colors group">
                     <div className="w-12 h-12 rounded-full bg-[#ffd700]/10 flex items-center justify-center mb-6 border border-[#ffd700]/20 group-hover:scale-110 transition-transform">
                        <span className="text-xl font-black text-[#ffd700]">3</span>
                     </div>
                     <h4 className="text-xl font-bold text-white uppercase mb-4">Astro Article Writing</h4>
                     <p className="text-zinc-400 font-light text-sm mb-4">A creative writing competition where participants craft a 300–450 word article (English or Bangla) on any space-related topic — from galaxies to celestial phenomena.</p>
                     <p className="text-xs text-zinc-500 italic">Celebrates originality, depth of research, and the ability to communicate complex ideas.</p>
                  </div>
               </div>
            </div>

            {/* Recognition & Rewards */}
            <div className="reveal-up p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#0d091f] to-[#1a103c] border border-white/10 shadow-2xl text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
               <Award size={48} className="text-[#ffd700] mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
               <h3 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-white mb-6">Recognition & Rewards</h3>
               <p className="text-zinc-300 font-light mb-10 max-w-2xl mx-auto">Forte-FY strongly believes in recognising excellence. All dedicated participants and ambassadors receive official certification and recognition.</p>
               
               <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
                  <div className="flex flex-col items-center">
                     <span className="text-4xl mb-2">🥈</span>
                     <span className="text-white font-bold uppercase tracking-wider mb-1">2nd Prize</span>
                     <span className="text-[#00f7ff] font-mono">2,500 BDT</span>
                     <span className="text-xs text-zinc-400 mt-1">Crest + Certificate</span>
                  </div>
                  <div className="flex flex-col items-center scale-110 md:scale-125 mx-4 my-8 md:my-0 p-6 rounded-2xl bg-white/5 border border-[#ffd700]/30 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                     <span className="text-5xl mb-2">🥇</span>
                     <span className="text-white font-black uppercase tracking-widest mb-1 text-lg">1st Prize</span>
                     <span className="text-[#ffd700] font-mono font-bold text-xl">3,500 BDT</span>
                     <span className="text-xs text-zinc-300 mt-2">Crest + Certificate</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <span className="text-4xl mb-2">🥉</span>
                     <span className="text-white font-bold uppercase tracking-wider mb-1">3rd Prize</span>
                     <span className="text-[#d946ef] font-mono">1,500 BDT</span>
                     <span className="text-xs text-zinc-400 mt-1">Crest + Certificate</span>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* MISSION TELEMETRY (STATS) - ORBIT STYLE */}
      <section className="py-32 relative overflow-hidden bg-[#070510]">
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

                  <button 
                     onClick={() => window.open('https://forms.google.com', '_blank')}
                     className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-[#00f7ff] transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)] group"
                  >
                     <span>Accept Mission</span>
                     <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* PARTNERS */}
      <section className="py-24 relative z-10 bg-[#070510]">
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
