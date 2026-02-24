
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { 
  ArrowLeft, Rocket, Telescope, Atom, Star, Zap, Users, 
  ChevronDown, Award, Radio, ArrowUpRight, Crosshair, Globe
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  onBack: () => void;
  isDark: boolean;
}

// --- SUB-COMPONENTS (LIGHT) ---

const StarfieldLight = () => {
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
      ctx.fillStyle = 'rgba(248, 250, 255, 0.2)';
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
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
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
    <div className="absolute inset-0 z-0 bg-[#f8faff]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8faff]/50 to-[#f8faff]" />
    </div>
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

  if (!event) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f8faff] text-slate-900 selection:bg-indigo-600 selection:text-white overflow-x-hidden font-sans">
      
      {/* HERO SECTION - TRAVELING UNIVERSE */}
      <section 
        className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#f8faff]"
      >
         {/* Traveling Stars Animation */}
         <StarfieldLight />

         <div className="relative z-10 text-center flex flex-col items-center pointer-events-none w-full max-w-6xl">
               <h1 
                 className="text-6xl md:text-[9rem] lg:text-[11rem] font-heading font-black uppercase tracking-tighter leading-[0.9] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-900 drop-shadow-sm w-full"
               >
                  COSMIC<br/>QUEST
               </h1>

               <p className="text-lg md:text-2xl font-light text-slate-600 max-w-xl leading-relaxed px-4">
                  "Commence an extraordinary expedition to the frontiers of knowledge."
               </p>
         </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="py-32 px-6 bg-[#f8faff] relative z-10">
         <div className="max-w-6xl mx-auto">
            <div className="reveal-up-l text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-slate-900 mb-6 leading-[1.1]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Cosmic Quest</span> <br/>
                  An Epic Online Astronomy Event
               </h2>
               <p className="text-lg md:text-xl font-light text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Cosmic Quest represents Forte-FY's premier astronomical initiative, meticulously engineered to cultivate scientific inquiry and intellectual rigor among emerging scholars. Uniting students from Class 6 to 12 (including HSC Batch 22), the event establishes a dynamic nexus where empirical knowledge intersects with creative innovation.
               </p>
               <p className="text-lg md:text-xl font-light text-slate-600 max-w-4xl mx-auto leading-relaxed mt-4">
                  This inter-institutional academic competition synthesizes scientific principles, imaginative exploration, and leadership development — presenting participants with an unparalleled opportunity to validate their astronomical comprehension while vying for distinguished recognition.
               </p>
            </div>

            {/* Vision & Categories - Bento Grid Style */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-32">
               {/* Event Vision - Spans 8 columns */}
               <div className="reveal-up-l lg:col-span-8 p-1 rounded-3xl bg-gradient-to-br from-indigo-100 to-transparent hover:from-indigo-200 transition-colors duration-500 group">
                  <div className="h-full bg-white rounded-[1.4rem] p-8 md:p-12 relative overflow-hidden shadow-sm">
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100 transition-colors duration-700" />
                     
                     <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                           <Globe size={28} className="text-indigo-600" />
                        </div>
                        <h3 className="text-3xl font-heading font-black uppercase tracking-tight text-slate-900">Strategic Vision</h3>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {[
                           { title: "Scientific Inquiry", desc: "Cultivating profound curiosity and methodological thinking among students." },
                           { title: "Space Education", desc: "Promoting advanced astronomical concepts and celestial mechanics." },
                           { title: "Analytical Rigor", desc: "Developing critical thinking and innovative problem-solving capabilities." },
                           { title: "Academic Nexus", desc: "Building a vibrant, cross-institutional community of young scholars." }
                        ].map((item, i) => (
                           <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1">
                              <h4 className="text-slate-900 font-bold mb-2 flex items-center gap-2">
                                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                 {item.title}
                              </h4>
                              <p className="text-slate-500 font-light text-sm">{item.desc}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Event Categories - Spans 4 columns */}
               <div className="reveal-up-l lg:col-span-4 p-1 rounded-3xl bg-gradient-to-bl from-fuchsia-100 to-transparent hover:from-fuchsia-200 transition-colors duration-500 group">
                  <div className="h-full bg-white rounded-[1.4rem] p-8 md:p-10 relative overflow-hidden flex flex-col shadow-sm">
                     <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-fuchsia-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-fuchsia-100 transition-colors duration-700" />
                     
                     <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="p-3 rounded-xl bg-fuchsia-50 border border-fuchsia-100">
                           <Users size={28} className="text-fuchsia-600" />
                        </div>
                        <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-slate-900">Academic Divisions</h3>
                     </div>
                     
                     <p className="text-slate-500 font-light text-sm mb-8 relative z-10 flex-grow">
                        Participants are categorized into two distinct academic divisions to ensure equitable and age-appropriate intellectual challenges.
                     </p>
                     
                     <div className="space-y-4 relative z-10">
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-300 transition-colors group/cat">
                           <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-slate-900 uppercase tracking-wider text-sm">Primary</span>
                              <span className="text-indigo-600 font-mono text-xs font-bold bg-indigo-50 px-2 py-1 rounded">Class 6–8</span>
                           </div>
                        </div>
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-fuchsia-300 transition-colors group/cat">
                           <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-slate-900 uppercase tracking-wider text-sm">Secondary</span>
                              <span className="text-fuchsia-600 font-mono text-xs font-bold bg-fuchsia-50 px-2 py-1 rounded">Class 9–12</span>
                           </div>
                           <p className="text-[10px] text-slate-400 mt-2">* Includes HSC Batch 22</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Event Segments */}
            <div className="reveal-up-l mb-20">
               <div className="flex items-center gap-4 mb-12 justify-center">
                  <Crosshair size={32} className="text-slate-900" />
                  <h3 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-slate-900 text-center">Event Segments</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors group shadow-md">
                     <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-6 border border-indigo-200 group-hover:scale-110 transition-transform">
                        <span className="text-xl font-black text-indigo-600">1</span>
                     </div>
                     <h4 className="text-xl font-bold text-slate-900 uppercase mb-4">Astro Quiz</h4>
                     <p className="text-slate-600 font-light text-sm mb-4">A 25-minute competitive quiz featuring 25 carefully curated questions covering:</p>
                     <ul className="space-y-2 mb-4 text-sm text-slate-700 font-light">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Basic Astronomy Concepts</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Simple Mathematical Applications</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Foundational Ideas of General Relativity</li>
                     </ul>
                     <p className="text-xs text-slate-500 italic">Tests logic, speed, and conceptual clarity. Tie-breaking by submission time.</p>
                  </div>

                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-fuchsia-300 transition-colors group shadow-md">
                     <div className="w-12 h-12 rounded-full bg-fuchsia-100 flex items-center justify-center mb-6 border border-fuchsia-200 group-hover:scale-110 transition-transform">
                        <span className="text-xl font-black text-fuchsia-600">2</span>
                     </div>
                     <h4 className="text-xl font-bold text-slate-900 uppercase mb-4">Astro Movie Quiz</h4>
                     <p className="text-slate-600 font-light text-sm mb-4">A unique and engaging quiz focused on iconic space-themed films such as:</p>
                     <ul className="space-y-2 mb-4 text-sm text-slate-700 font-light">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-600" /> Interstellar</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-600" /> The Martian</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-600" /> First Man</li>
                     </ul>
                     <p className="text-xs text-slate-500 italic">Blends cinematic storytelling with scientific understanding and analytical observation.</p>
                  </div>

                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-colors group shadow-md">
                     <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-6 border border-amber-200 group-hover:scale-110 transition-transform">
                        <span className="text-xl font-black text-amber-600">3</span>
                     </div>
                     <h4 className="text-xl font-bold text-slate-900 uppercase mb-4">Astro Article Writing</h4>
                     <p className="text-slate-600 font-light text-sm mb-4">A creative writing competition where participants craft a 300–450 word article (English or Bangla) on any space-related topic — from galaxies to celestial phenomena.</p>
                     <p className="text-xs text-slate-500 italic">Celebrates originality, depth of research, and the ability to communicate complex ideas.</p>
                  </div>
               </div>
            </div>

            {/* Recognition & Rewards */}
            <div className="reveal-up-l p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800 shadow-2xl text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
               <Award size={48} className="text-amber-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
               <h3 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-white mb-6">Recognition & Rewards</h3>
               <p className="text-indigo-100 font-light mb-10 max-w-2xl mx-auto">Forte-FY strongly believes in recognising excellence. All dedicated participants and ambassadors receive official certification and recognition.</p>
               
               <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
                  <div className="flex flex-col items-center">
                     <span className="text-4xl mb-2">🥈</span>
                     <span className="text-white font-bold uppercase tracking-wider mb-1">2nd Prize</span>
                     <span className="text-indigo-300 font-mono">2,500 BDT</span>
                     <span className="text-xs text-indigo-200 mt-1">Crest + Certificate</span>
                  </div>
                  <div className="flex flex-col items-center scale-110 md:scale-125 mx-4 my-8 md:my-0 p-6 rounded-2xl bg-white/10 border border-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.15)] backdrop-blur-sm">
                     <span className="text-5xl mb-2">🥇</span>
                     <span className="text-white font-black uppercase tracking-widest mb-1 text-lg">1st Prize</span>
                     <span className="text-amber-400 font-mono font-bold text-xl">3,500 BDT</span>
                     <span className="text-xs text-indigo-100 mt-2">Crest + Certificate</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <span className="text-4xl mb-2">🥉</span>
                     <span className="text-white font-bold uppercase tracking-wider mb-1">3rd Prize</span>
                     <span className="text-fuchsia-300 font-mono">1,500 BDT</span>
                     <span className="text-xs text-indigo-200 mt-1">Crest + Certificate</span>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-[#f8faff] relative z-10">
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal-up-l p-10 bg-white rounded-3xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
               <Telescope size={40} className="mx-auto text-indigo-600 mb-4" />
               <h3 className="text-5xl font-heading font-black text-slate-900 mb-2">{event.metrics.reachLabel}</h3>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Reach</p>
            </div>
            <div className="reveal-up-l p-10 bg-white rounded-3xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
               <Users size={40} className="mx-auto text-indigo-600 mb-4" />
               <h3 className="text-5xl font-heading font-black text-slate-900 mb-2">{event.metrics.participants}</h3>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Cadets</p>
            </div>
            <div className="reveal-up-l p-10 bg-white rounded-3xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
               <Star size={40} className="mx-auto text-indigo-600 mb-4" />
               <h3 className="text-5xl font-heading font-black text-slate-900 mb-2">{event.metrics.ambassadors}</h3>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Ambassadors</p>
            </div>
         </div>
      </section>

      {/* TIMELINE */}
      <section className="py-32 px-6 mission-timeline-l relative bg-[#f8faff]">
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

            <button 
               onClick={() => window.open('https://forms.google.com', '_blank')}
               className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 font-black uppercase tracking-widest rounded-full hover:bg-indigo-50 transition-colors shadow-2xl"
            >
               <span>Accept Mission</span>
               <ArrowUpRight size={18} />
            </button>
         </div>
      </section>

      <section className="py-20 bg-[#f8faff] relative z-10">
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
