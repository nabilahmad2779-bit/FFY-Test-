import React, { useLayoutEffect, useRef } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { 
  ArrowLeft, Feather, Scroll, Palette, Camera, 
  BookOpen, Trophy, Users, Award, Quote, 
  Smartphone, Gavel, Layers, PenTool, Globe, Landmark,
  Zap, Star, Image as ImageIcon, ChevronRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  onBack: () => void;
  isDark: boolean;
}

// --- DATA ---

const SEGMENTS = [
  { name: "Short-Story Writing", icon: Feather, desc: "Crafting narratives that transcend time and space." },
  { name: "Literature Quiz (EN)", icon: Globe, desc: "Testing global literary proficiency and depth." },
  { name: "Literature Quiz (BN)", icon: Landmark, desc: "Celebrating the rich heritage of Bengali letters." },
  { name: "Book Review", icon: Scroll, desc: "Critical synthesis of the written and printed word." },
  { name: "Alternative Sequel", icon: PenTool, desc: "Expanding the horizons of established fan-fiction." },
  { name: "Mobile Photography", icon: Smartphone, desc: "Capturing life through a portable modern lens." },
  { name: "DSLR Photography", icon: Camera, desc: "High-fidelity visual storytelling and perspective." },
  { name: "Traditional Art", icon: Palette, desc: "The timeless dance of pigment and tactile canvas." },
  { name: "Digital Art", icon: Layers, desc: "Pixels morphed into modern visionary masterworks." },
  { name: "MemeCon", icon: Gavel, desc: "The art of satirical digital resonance and wit." }
];

const WINNERS = [
  { rank: "01", name: "Rafsan Jami", category: "Traditional Art", award: "Grand Synthesis Prize" },
  { rank: "02", name: "Anika Tabassum", category: "Short Story", award: "Narrative Excellence" },
  { rank: "03", name: "Zarif Tajwar", category: "Digital Art", award: "Visionary Pixel" },
  { rank: "04", name: "Nabila Ishrat", category: "Book Review", award: "Critical Merit" },
];

const AMBASSADORS = [
  { name: "Tasnim Mahi", campus: "Dhaka University", impact: "Peak Resonance" },
  { name: "Fahim Shahriar", campus: "North South University", impact: "Network Catalyst" },
  { name: "Kazi Nabil", campus: "BRAC University", impact: "Systemic Outreach" },
];

// --- HELPER COMPONENTS ---

const KineticShardBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shardCount = 45;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const shards = gsap.utils.toArray('.art-shard');
      shards.forEach((shard: any) => {
        gsap.to(shard, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          rotation: "random(-40, 40)",
          duration: 12 + Math.random() * 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        gsap.to(shard, {
          opacity: 0.8,
          duration: 3 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      });

      gsap.to(".light-beam", {
        x: "400%",
        duration: 4,
        repeat: -1,
        ease: "power2.inOut",
        repeatDelay: 1.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      <div className="light-beam absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#ad944b]/30 to-transparent skew-x-[-25deg] z-10" />
      
      {/* BACKGROUND WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
        <h2 className="text-[20vw] font-mosaic font-bold text-white whitespace-nowrap transform -rotate-[45deg] tracking-[0.2em]">
          ARCHIVE REGISTRY
        </h2>
      </div>

      <div className="absolute inset-0 opacity-[0.45]">
        {Array.from({ length: shardCount }).map((_, i) => (
          <div 
            key={i}
            className="art-shard absolute border border-[#ad944b]/40 shadow-[0_0_15px_rgba(173,148,75,0.1)]"
            style={{
              width: `${Math.random() * 25 + 5}vw`,
              height: `${Math.random() * 25 + 5}vw`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              clipPath: i % 3 === 0 
                ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' 
                : i % 3 === 1 ? 'polygon(0% 25%, 100% 0%, 100% 75%, 0% 100%)' : 'polygon(50% 0%, 100% 100%, 0% 100%)',
              background: `linear-gradient(${Math.random() * 360}deg, rgba(173, 148, 75, 0.7) 0%, transparent 90%)`,
              filter: 'blur(0.5px)',
              opacity: 0.4
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const MosaicStories: React.FC<EventPageProps> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'mosaic-stories');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Hero Sequence
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(".hero-meta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 });
        tl.fromTo(".hero-title-main", { y: 80, opacity: 0, letterSpacing: "1.2em" }, { y: 0, opacity: 1, letterSpacing: "0.4em", duration: 2 }, "-=1.2");
        tl.fromTo(".hero-title-sub", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.5");

        // Universal Scroll Reveals
        gsap.utils.toArray('.reveal-block').forEach((block: any) => {
          gsap.fromTo(block, 
            { y: 60, opacity: 0 },
            { 
              y: 0, opacity: 1, duration: 1.5,
              scrollTrigger: { trigger: block, start: "top 90%" }
            }
          );
        });

        // Segment Grid Stagger
        gsap.fromTo(".segment-card", 
          { y: 40, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power3.out",
            scrollTrigger: { trigger: ".segments-grid", start: "top 80%" }
          }
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  return (
    <div 
        ref={containerRef} 
        className="min-h-screen bg-[#050505] text-[#f9f6f0] font-literary selection:bg-[#ad944b] selection:text-black overflow-x-hidden"
    >
      {/* NOISE OVERLAY */}
      <div 
        className="fixed inset-0 pointer-events-none z-[99] opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      {/* --- TOP NAV --- */}
      <div className="fixed top-0 left-0 w-full z-[100] px-8 py-6 md:px-12 md:py-8 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-6 text-[#ad944b]/60 hover:text-[#ad944b] transition-all pointer-events-auto"
        >
          <div className="p-2.5 border-2 border-[#ad944b]/30 group-hover:border-[#ad944b] rounded-full transition-all bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(173,148,75,0.2)]">
            <ArrowLeft size={20} className="text-[#ad944b]" />
          </div>
          <span className="text-[11px] font-mosaic font-bold uppercase tracking-[0.6em] hidden sm:block translate-y-0.5">Archive</span>
        </button>
        {/* Right side logo removed as requested */}
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
         <KineticShardBackground />

         <div className="relative z-10 text-center flex flex-col items-center">
            <div className="hero-meta mb-14 flex items-center gap-8 opacity-60">
               <div className="h-px w-20 bg-[#ad944b]" />
               <span className="text-[11px] font-mosaic font-bold uppercase tracking-[0.8em] text-[#ad944b]">The Grand Anthology</span>
               <div className="h-px w-20 bg-[#ad944b]" />
            </div>

            <div className="relative py-12 px-8 overflow-visible flex flex-col items-center">
               {/* INCREASED SIZE AND MOVED CLOSER */}
               <span className="hero-meta text-[4vw] md:text-[2.5vw] font-mosaic font-bold tracking-[1.4em] text-[#ad944b] mb-2 translate-x-1">THE</span>
               
               <h1 className="hero-title-main text-[14vw] md:text-[11vw] font-mosaic font-bold leading-[1.0] tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-b from-[#8e793e] via-[#ad944b] to-[#8e793e] drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] py-4 overflow-visible">
                  MOSAIC
               </h1>
               
               <h2 className="hero-title-sub text-4xl md:text-8xl font-mosaic font-bold text-[#f9f6f0] uppercase tracking-[0.5em] drop-shadow-2xl leading-none mt-1">
                  STORIES
               </h2>
            </div>

            <div className="hero-meta mt-20 max-w-2xl">
               <p className="text-2xl md:text-3xl font-literary italic text-[#ad944b]/90 font-medium leading-relaxed px-4">
                  "{event.tagline}"
               </p>
               <div className="mt-16 flex justify-center opacity-30 animate-bounce">
                  <Scroll size={24} className="text-[#ad944b]" />
               </div>
            </div>
         </div>
      </section>

      {/* --- THE CURATORIAL SYNTHESIS (ABOUT & WHY) --- */}
      <section className="reveal-block py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#ad944b]/10 relative">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#ad944b]/5 to-transparent pointer-events-none" />
         
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start relative z-10">
            <div className="lg:col-span-5">
               <div className="sticky top-32 group">
                  <div className="aspect-[4/5] p-3 bg-[#0a0a0a] border border-[#ad944b]/20 shadow-[0_40px_100px_rgba(0,0,0,1)] overflow-hidden rounded-sm relative">
                     {/* REPLACED WITH VAN GOGH - STARRY NIGHT */}
                     <SmartImage src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=1200" alt="The Starry Night" className="w-full h-full object-cover transition-all duration-[3000ms] grayscale brightness-75 hover:grayscale-0 hover:brightness-100" />
                     <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[#ad944b]/40" />
                     <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#ad944b]/40" />
                  </div>
                  <div className="absolute -z-10 -bottom-10 -left-10 w-full h-full border border-[#ad944b]/10 rounded-sm translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000" />
               </div>
            </div>
            
            <div className="lg:col-span-7">
               <h2 className="text-5xl md:text-8xl font-mosaic font-bold text-[#f9f6f0] uppercase tracking-tight leading-[0.9] mb-16">
                  The Curatorial <br/> <span className="text-[#ad944b] italic font-normal">Synthesis.</span>
               </h2>
               
               <div className="text-2xl md:text-3xl font-literary text-[#f9f6f0]/80 leading-relaxed text-justify space-y-12">
                  <div className="relative">
                     <Quote className="absolute -left-14 -top-8 opacity-10 text-[#ad944b]" size={80} />
                     <p className="first-letter:text-9xl first-letter:font-mosaic first-letter:text-[#ad944b] first-letter:mr-6 first-letter:float-left first-letter:leading-none italic font-medium">
                       “Great things are not done by impulse but by a series of small things brought together.” — Vincent Van Gogh.
                     </p>
                  </div>
                  <p>
                    Capturing the rich tapestry of creativity and storytelling, Forte-FY unveils "The Mosaic Stories", a symphony of artistic expressions poised to transcend conventional boundaries. This event stands as a profound illustration of the impactful synergy that emerges when diverse narratives converge into a singular mosaic of inspiration.
                  </p>
                  <p>
                    In the spirit of fostering creativity, our ten dynamic segments serve as canvases for you to paint the chapters of your story. The Mosaic Stories is not just an event; it is a celebration of the myriad threads that bind our collective imagination. Your narrative awaits its place in this evolving mosaic of art and literature.
                  </p>
                  <div className="flex items-center gap-8 pt-16 border-t border-[#ad944b]/10">
                     <div className="w-12 h-12 rounded-full border border-[#ad944b]/30 flex items-center justify-center">
                        <Award size={24} className="text-[#ad944b]" />
                     </div>
                     <span className="text-xs font-mosaic font-bold uppercase tracking-[0.5em] text-[#ad944b]">The Curatorial Collective</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- THE DECAGON OF EXPRESSION (SEGMENTS) --- */}
      <section className="reveal-block py-48 px-6 bg-[#080808]/50 border-y border-[#ad944b]/10 backdrop-blur-sm">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
               <h2 className="text-[11px] font-mosaic font-bold uppercase tracking-[0.8em] text-[#ad944b] mb-10">The Decagon of Expression</h2>
               <h3 className="text-5xl md:text-9xl font-mosaic font-bold text-[#f9f6f0] uppercase tracking-tighter">Event Segments</h3>
            </div>

            <div className="segments-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
               {SEGMENTS.map((segment, i) => (
                  <div key={i} className="segment-card group relative p-10 bg-black border border-[#ad944b]/10 hover:border-[#ad944b]/50 transition-all duration-700 shadow-2xl overflow-hidden rounded-sm cursor-default flex flex-col h-[380px]">
                     <div className="absolute -right-12 -bottom-12 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-1000 rotate-12">
                        <segment.icon size={250} className="text-[#ad944b]" />
                     </div>
                     <div className="relative z-10 flex flex-col h-full">
                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#ad944b]/10 text-[#ad944b] mb-12 border border-[#ad944b]/20 group-hover:scale-110 group-hover:bg-[#ad944b] group-hover:text-black transition-all duration-500">
                           <segment.icon size={28} />
                        </div>
                        <h4 className="text-2xl md:text-2xl font-mosaic font-bold text-white uppercase tracking-wider mb-6 leading-tight group-hover:text-[#ad944b] transition-colors">
                           {segment.name}
                        </h4>
                        <p className="text-sm font-literary italic text-zinc-500 leading-relaxed group-hover:text-zinc-200 transition-colors mb-8">
                           {segment.desc}
                        </p>
                        <div className="mt-auto h-[1px] w-12 bg-[#ad944b]/40 group-hover:w-full transition-all duration-1000" />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- THE GALLERY OF RESONANCE (ARTS & PHOTOS) --- */}
      <section className="reveal-block py-48 px-6 md:px-12 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
               <h2 className="text-5xl md:text-8xl font-mosaic font-bold text-[#f9f6f0] uppercase tracking-tight leading-none mb-8">
                  Gallery of <br/> <span className="text-[#ad944b]">Resonance.</span>
               </h2>
               <p className="text-xl font-literary text-zinc-500 italic">"Every brushstroke is a story, every pixel a memory."</p>
            </div>
            <div className="flex items-center gap-4 text-[#ad944b]/40 mb-4">
               <ImageIcon size={40} />
               <div className="h-px w-32 bg-[#ad944b]/20" />
               <span className="text-[10px] font-mosaic font-bold uppercase tracking-[0.4em]">Visual Archives</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch">
            <div className="md:col-span-8 group overflow-hidden rounded-sm border border-[#ad944b]/10 bg-black">
               {/* REPLACED WITH THE GREAT WAVE OFF KANAGAWA */}
               <SmartImage src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800" alt="The Great Wave" className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-[3000ms]" />
               <div className="p-8 border-t border-[#ad944b]/10">
                  <h4 className="text-xl font-mosaic font-bold text-white uppercase">The Great Wave of Creation</h4>
                  <p className="text-xs font-mosaic font-bold text-[#ad944b] uppercase tracking-widest mt-2">Classical Resilience Showcase</p>
               </div>
            </div>
            <div className="md:col-span-4 space-y-8">
               <div className="group overflow-hidden rounded-sm border border-[#ad944b]/10 bg-black">
                  {/* REPLACED WITH GIRL WITH A PEARL EARRING */}
                  <SmartImage src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800" alt="Girl with a Pearl Earring" className="w-full h-[240px] object-cover group-hover:scale-110 transition-transform duration-[3000ms]" />
                  <div className="p-6 border-t border-[#ad944b]/10">
                     <h4 className="text-lg font-mosaic font-bold text-white uppercase">Vermeer’s Gaze</h4>
                     <p className="text-[9px] font-mosaic font-bold text-[#ad944b] uppercase tracking-widest mt-1">Portraiture Synthesis</p>
                  </div>
               </div>
               <div className="group overflow-hidden rounded-sm border border-[#ad944b]/10 bg-black">
                  {/* REPLACED WITH THE NIGHT WATCH - REMBRANDT */}
                  <SmartImage src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=800" alt="The Night Watch" className="w-full h-[240px] object-cover group-hover:scale-110 transition-transform duration-[3000ms]" />
                  <div className="p-6 border-t border-[#ad944b]/10">
                     <h4 className="text-lg font-mosaic font-bold text-white uppercase">Nocturnal Strategy</h4>
                     <p className="text-[9px] font-mosaic font-bold text-[#ad944b] uppercase tracking-widest mt-1">Cinematic Realism</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- THE MASTERS & ARCHIVISTS (WINNERS & AMBASSADORS) --- */}
      <section className="reveal-block py-48 px-6 border-t border-[#ad944b]/10 bg-black/40">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            
            <div className="lg:col-span-7">
               <div className="mb-24">
                  <h3 className="text-5xl md:text-7xl font-mosaic font-bold text-white uppercase tracking-tight mb-6 leading-none">Masters of the <span className="text-[#ad944b]">Mosaic.</span></h3>
                  <p className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] font-mosaic font-bold pl-1">The High Performance Laureate List</p>
               </div>
               
               <div className="space-y-6">
                  {WINNERS.map((l, i) => (
                     <div key={i} className="group flex items-center justify-between p-12 border border-[#ad944b]/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-1 bg-[#ad944b] scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom" />
                        <div className="flex items-center gap-12">
                           <span className="text-6xl font-mosaic font-bold text-zinc-900 group-hover:text-[#ad944b]/20 transition-colors duration-1000">{l.rank}</span>
                           <div>
                              <h4 className="text-3xl md:text-4xl font-mosaic font-bold text-white group-hover:text-[#ad944b] transition-colors duration-500">{l.name}</h4>
                              <p className="text-xs font-mosaic font-bold text-zinc-500 uppercase tracking-[0.3em] mt-2 group-hover:text-zinc-300 transition-colors">{l.category}</p>
                           </div>
                        </div>
                        <div className="text-right hidden sm:block">
                           <div className="px-5 py-2 border border-[#ad944b]/30 rounded-full">
                              <span className="text-[9px] font-mosaic font-bold text-[#ad944b] uppercase tracking-[0.4em]">{l.award}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-5 bg-[#0a0a0a] border border-[#ad944b]/10 p-12 md:p-20 rounded-sm shadow-[0_50px_100px_rgba(0,0,0,1)] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                  <Star size={200} className="text-[#ad944b]" />
               </div>
               <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-mosaic font-bold text-white uppercase tracking-tight mb-16">The <span className="text-[#ad944b]">Archivists.</span></h3>
                  <div className="space-y-14">
                     {AMBASSADORS.map((a, i) => (
                        <div key={i} className="flex flex-col gap-4 group">
                           <div className="flex items-center gap-6">
                              <div className="w-3 h-3 rounded-full bg-[#ad944b] shadow-[0_0_20px_rgba(173,148,75,1)] animate-pulse" />
                              <h4 className="text-2xl font-mosaic font-bold text-white uppercase tracking-widest group-hover:text-[#ad944b] transition-colors">{a.name}</h4>
                           </div>
                           <div className="pl-9 border-l border-[#ad944b]/20 ml-[5px]">
                              <p className="text-sm font-literary italic text-zinc-500 group-hover:text-zinc-300 transition-colors">{a.campus} • {a.impact}</p>
                           </div>
                        </div>
                     ))}
                     <div className="pt-16 border-t border-[#ad944b]/10 mt-8">
                        <p className="text-[10px] font-mosaic font-bold uppercase tracking-[0.5em] text-zinc-700">Official Campus Liaison Network • 321 Total</p>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* --- ALLIED GUILDS (PARTNERS) --- */}
      <section className="reveal-block py-48 border-t border-[#ad944b]/10 overflow-hidden bg-black/40">
         <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
            <h3 className="text-4xl md:text-6xl font-mosaic font-bold text-white uppercase tracking-tighter mb-6">Allied <span className="text-[#ad944b]">Guilds.</span></h3>
            <p className="text-[10px] font-mosaic font-bold uppercase tracking-[0.6em] text-zinc-600">The Global Collaborative Architecture</p>
         </div>
         
         <div className="relative flex overflow-hidden border-y border-[#ad944b]/5 py-16">
            <div className="flex animate-marquee-legacy gap-24 whitespace-nowrap">
               {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((p, i) => (
                  <div key={i} className="flex flex-col items-center gap-8 group">
                    <div className="w-32 h-32 md:w-56 md:h-56 rounded-full border border-[#ad944b]/10 flex items-center justify-center p-10 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#ad944b]/40 transition-all duration-1000 shadow-2xl relative overflow-hidden">
                       <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-tr from-[#ad944b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    <span className="text-[10px] font-mosaic font-bold uppercase tracking-[0.3em] text-zinc-600 group-hover:text-[#ad944b] transition-colors">{p.name}</span>
                  </div>
               ))}
            </div>
         </div>
         <style>{`
            @keyframes marquee-legacy { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
            .animate-marquee-legacy { display: flex; animation: marquee-legacy 80s linear infinite; width: max-content; }
            .animate-marquee-legacy:hover { animation-play-state: paused; }
         `}</style>
      </section>

      {/* --- FINAL CALL TO ARCHIVE --- */}
      <footer className="py-48 border-t border-[#ad944b]/10 flex flex-col items-center justify-center bg-[#050505] gap-20 relative z-10">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(173,148,75,0.05)_0%,transparent_60%)]" />
         
         <div className="text-center relative z-10 space-y-8">
            <h4 className="text-7xl md:text-[10rem] font-mosaic font-bold text-zinc-950 uppercase tracking-[0.1em] select-none leading-none">MCMXXII</h4>
            <div className="flex flex-col items-center gap-4">
               <p className="text-[11px] font-mosaic font-bold text-[#ad944b] uppercase tracking-[0.8em]">Forte-FY Archival Registry</p>
               <div className="h-px w-24 bg-[#ad944b]/20" />
               <p className="text-[10px] font-mosaic font-bold text-zinc-800 uppercase tracking-[0.4em]">Folio Fig. 2024 • Mosaic Stories Edition</p>
            </div>
         </div>

         <button 
            onClick={onBack}
            className="group relative px-20 py-8 border border-[#ad944b]/20 rounded-sm overflow-hidden transition-all duration-700 hover:border-[#ad944b] shadow-2xl"
         >
            <div className="absolute inset-0 bg-[#ad944b] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <div className="relative z-10 flex items-center gap-8 font-mosaic font-bold text-xs uppercase tracking-[0.5em] group-hover:text-black transition-colors duration-500">
               <ArrowLeft size={20} className="group-hover:-translate-x-4 transition-transform duration-700" />
               Return to the Nexus
            </div>
         </button>
      </footer>
    </div>
  );
};
