import React, { useLayoutEffect, useRef, useState } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../../components/SmartImage';
import { 
  ArrowLeft, Feather, Scroll, Palette, Camera, 
  BookOpen, Trophy, Users, Award, Quote, 
  Smartphone, Gavel, Layers, PenTool, Globe, Landmark,
  Zap, Star, Image as ImageIcon, ChevronRight, ChevronLeft, Sun, Moon
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

const GALLERY_ARTWORKS = [
  { title: "The Great Wave", category: "Classical Resonance", src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800" },
  { title: "Vermeer’s Gaze", category: "Portraiture Synthesis", src: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800" },
  { title: "Nocturnal Strategy", category: "Cinematic Realism", src: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=800" },
  { title: "Impressionist Dawn", category: "Color Theory", src: "https://images.unsplash.com/photo-1571115177098-24ec42ed2bb4?auto=format&fit=crop&q=80&w=800" },
  { title: "Surrealist Persistence", category: "Conceptual Art", src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=800" },
  { title: "The Wanderer", category: "Visual Narrative", src: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800" },
  { title: "Pointillist Sunday", category: "Digital Pixelation", src: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800" },
  { title: "Liberty’s Path", category: "Political Satire", src: "https://images.unsplash.com/photo-1576016770956-debb63d9df05?auto=format&fit=crop&q=80&w=800" },
  { title: "Classical Academia", category: "Structural Study", src: "https://images.unsplash.com/photo-1573148164257-801f057297e2?auto=format&fit=crop&q=80&w=800" }
];

const WINNERS_DATA = [
  { category: "Short-Story Writing", color: "#ad944b", winners: [ { name: "Anika Tabassum", rank: "1st", img: "https://picsum.photos/seed/ms1/200/200" }, { name: "Rahim Islam", rank: "2nd", img: "https://picsum.photos/seed/ms2/200/200" }, { name: "Sadia Rahman", rank: "3rd", img: "https://picsum.photos/seed/ms3/200/200" } ] },
  { category: "Lit Quiz (EN)", color: "#ad944b", winners: [ { name: "Fahim Shahriar", rank: "1st", img: "https://picsum.photos/seed/ms4/200/200" }, { name: "Nabila Ishrat", rank: "2nd", img: "https://picsum.photos/seed/ms5/200/200" }, { name: "Zarif Tajwar", rank: "3rd", img: "https://picsum.photos/seed/ms6/200/200" } ] },
  { category: "Lit Quiz (BN)", color: "#ad944b", winners: [ { name: "Tanvir Ahmed", rank: "1st", img: "https://picsum.photos/seed/ms7/200/200" }, { name: "Sumaiya Islam", rank: "2nd", img: "https://picsum.photos/seed/ms8/200/200" }, { name: "Rakib Hasan", rank: "3rd", img: "https://picsum.photos/seed/ms9/200/200" } ] },
  { category: "Book Review", color: "#ad944b", winners: [ { name: "Nabila Ishrat", rank: "1st", img: "https://picsum.photos/seed/ms10/200/200" }, { name: "Kazi Nabil", rank: "2nd", img: "https://picsum.photos/seed/ms11/200/200" }, { name: "Tasnim Mahi", rank: "3rd", img: "https://picsum.photos/seed/ms12/200/200" } ] },
  { category: "Alternative Sequel", color: "#ad944b", winners: [ { name: "Zarif Tajwar", rank: "1st", img: "https://picsum.photos/seed/ms13/200/200" }, { name: "Anika Tabassum", rank: "2nd", img: "https://picsum.photos/seed/ms14/200/200" }, { name: "Rafsan Jami", rank: "3rd", img: "https://picsum.photos/seed/ms15/200/200" } ] },
  { category: "Mobile Photography", color: "#ad944b", winners: [ { name: "Rafsan Jami", rank: "1st", img: "https://picsum.photos/seed/ms16/200/200" }, { name: "Samiul Haque", rank: "2nd", img: "https://picsum.photos/seed/ms17/200/200" }, { name: "Rifat Ahmed", rank: "3rd", img: "https://picsum.photos/seed/ms18/200/200" } ] },
  { category: "DSLR Photography", color: "#ad944b", winners: [ { name: "Kazi Nabil", rank: "1st", img: "https://picsum.photos/seed/ms19/200/200" }, { name: "Tasnim Mahi", rank: "2nd", img: "https://picsum.photos/seed/ms20/200/200" }, { name: "Fahim Shahriar", rank: "3rd", img: "https://picsum.photos/seed/ms21/200/200" } ] },
  { category: "Traditional Art", color: "#ad944b", winners: [ { name: "Sadia Rahman", rank: "1st", img: "https://picsum.photos/seed/ms22/200/200" }, { name: "Rahim Islam", rank: "2nd", img: "https://picsum.photos/seed/ms23/200/200" }, { name: "Anika Tabassum", rank: "3rd", img: "https://picsum.photos/seed/ms24/200/200" } ] },
  { category: "Digital Art", color: "#ad944b", winners: [ { name: "Samiul Haque", rank: "1st", img: "https://picsum.photos/seed/ms25/200/200" }, { name: "Rifat Ahmed", rank: "2nd", img: "https://picsum.photos/seed/ms26/200/200" }, { name: "Adnan Sami", rank: "3rd", img: "https://picsum.photos/seed/ms27/200/200" } ] },
  { category: "MemeCon", color: "#ad944b", winners: [ { name: "Adnan Sami", rank: "1st", img: "https://picsum.photos/seed/ms28/200/200" }, { name: "Rafsan Jami", rank: "2nd", img: "https://picsum.photos/seed/ms29/200/200" }, { name: "Zarif Tajwar", rank: "3rd", img: "https://picsum.photos/seed/ms30/200/200" } ] }
];

const AMBASSADORS = [
  { name: "Tasnim Mahi", campus: "Dhaka University", impact: "Peak Resonance", img: "https://picsum.photos/seed/amb1/200/200" },
  { name: "Fahim Shahriar", campus: "North South University", impact: "Network Catalyst", img: "https://picsum.photos/seed/amb2/200/200" },
  { name: "Kazi Nabil", campus: "BRAC University", impact: "Systemic Outreach", img: "https://picsum.photos/seed/amb3/200/200" },
  { name: "Sadia Rahman", campus: "IBA, DU", impact: "Creative Lead", img: "https://picsum.photos/seed/amb4/200/200" },
  { name: "Rafsan Jami", campus: "BUET", impact: "Technical Architect", img: "https://picsum.photos/seed/amb5/200/200" }
];

// --- HELPER COMPONENTS ---

const KineticShardBackground = ({ isDark }: { isDark: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shardCount = 25; // Reduced for mobile performance

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const shards = gsap.utils.toArray('.art-shard');
      shards.forEach((shard: any) => {
        gsap.to(shard, {
          x: "random(-50, 50)",
          y: "random(-50, 50)",
          rotation: "random(-40, 40)",
          duration: 12 + Math.random() * 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
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
    <div ref={containerRef} className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${'bg-[#fdfcfb]'}`}>
      <div className={`light-beam absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent ${'via-[#ad944b]/15'} to-transparent skew-x-[-25deg] z-10`} />
      
      <div className="absolute inset-0 opacity-[0.45] z-[1]">
        {Array.from({ length: shardCount }).map((_, i) => (
          <div 
            key={i}
            className={`art-shard absolute border ${'border-[#ad944b]/20'} shadow-[0_0_15px_rgba(173,148,75,0.1)]`}
            style={{
              width: `${Math.random() * 30 + 10}vw`,
              height: `${Math.random() * 30 + 10}vw`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              clipPath: i % 3 === 0 
                ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' 
                : i % 3 === 1 ? 'polygon(0% 25%, 100% 0%, 100% 75%, 0% 100%)' : 'polygon(50% 0%, 100% 100%, 0% 100%)',
              background: `linear-gradient(${Math.random() * 360}deg, ${'rgba(173, 148, 75, 0.3)'} 0%, transparent 90%)`,
              filter: 'blur(0.5px)',
              opacity: isDark ? 0.4 : 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const MosaicStoriesMobile_light: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const isDark = false;
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'mosaic-stories');
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeAmbassador, setActiveAmbassador] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveAmbassador((prev) => (prev + 1) % AMBASSADORS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 100);

    const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(".hero-meta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 });
        tl.fromTo(".hero-title-main", { y: 40, opacity: 0, letterSpacing: "0.8em" }, { y: 0, opacity: 1, letterSpacing: "0.2em", duration: 2 }, "-=1.2");
        tl.fromTo(".hero-title-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.5");

        gsap.utils.toArray('.reveal-block').forEach((block: any) => {
          gsap.fromTo(block, 
            { y: 40, opacity: 0 },
            { 
              y: 0, opacity: 1, duration: 1.2,
              scrollTrigger: { trigger: block, start: "top 85%" }
            }
          );
        });

        gsap.fromTo(".segment-card", 
          { y: 30, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: ".segments-grid", start: "top 80%" }
          }
        );

        gsap.utils.toArray('.segment-card').forEach((card: any) => {
          gsap.to(card, {
            boxShadow: "0 0 20px rgba(173,148,75,0.3)",
            borderColor: "rgba(173,148,75,0.8)",
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              start: "top center+=100",
              end: "bottom center-=100",
              toggleActions: "play reverse play reverse",
            }
          });
        });
        
        // Parallax for gallery images
        gsap.utils.toArray('.gallery-img-container').forEach((container: any) => {
            const img = container.querySelector('img');
            gsap.to(img, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  return (
    <div 
        ref={containerRef} 
        className={`min-h-screen ${'bg-[#fdfcfb] text-[#1a1a1a]'} font-literary selection:bg-[#ad944b] selection:text-black overflow-x-hidden transition-colors duration-500`}
    >
      <div 
        className={`fixed inset-0 pointer-events-none z-[99] opacity-[0.05] mix-blend-overlay ${'invert'}`}
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      {/* --- TOP NAV --- */}
      <div className="fixed top-0 left-0 w-full z-[110] px-6 py-8 flex justify-between items-center pointer-events-none">
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start pt-32 overflow-hidden">
         <KineticShardBackground isDark={isDark} />

         <div className="relative z-10 text-center flex flex-col items-center pb-16 px-4">
            <div className="hero-meta mb-8 flex items-center gap-4 opacity-80">
               <div className="h-px w-12 bg-[#ad944b]" />
               <span className="text-[9px] font-mosaic font-bold uppercase tracking-[0.6em] text-[#ad944b]">The Grand Anthology</span>
               <div className="h-px w-12 bg-[#ad944b]" />
            </div>

            <div className="relative py-8 px-2 overflow-visible flex flex-col items-center w-full">
               <span className="hero-meta text-[5vw] font-mosaic font-bold tracking-[1em] text-[#ad944b] mb-2 translate-x-1">THE</span>
               <h1 className="hero-title-main text-[16vw] font-mosaic font-bold leading-[1.0] tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-[#8e793e] via-[#ad944b] to-[#8e793e] drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] py-2 overflow-visible w-full text-center">
                  MOSAIC
               </h1>
               <h2 className={`hero-title-sub text-3xl font-mosaic font-bold ${'text-[#1a1a1a]'} uppercase tracking-[0.4em] drop-shadow-xl leading-none mt-2`}>
                  STORIES
               </h2>
            </div>

            <div className="hero-meta mt-12 max-w-[90%]">
               <p className={`text-xl font-literary italic ${'text-[#8e793e]'} font-medium leading-relaxed`}>
                  "{event.tagline}"
               </p>
               <div className="mt-12 flex justify-center opacity-40 animate-bounce">
                  <Scroll size={20} className="text-[#ad944b]" />
               </div>
            </div>
         </div>
      </section>

      {/* --- THE CURATORIAL SYNTHESIS --- */}
      <section className={`reveal-block py-24 px-6 border-t ${'border-[#ad944b]/20'} relative`}>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ad944b]/5 to-transparent pointer-events-none" />
         <div className="flex flex-col gap-16 relative z-10">
            
            <div className="text-center">
               <h2 className={`text-4xl font-mosaic font-bold ${'text-[#1a1a1a]'} uppercase tracking-tight leading-[1.1] mb-8`}>
                  The Curatorial <br/> <span className="text-[#ad944b] italic font-normal">Synthesis.</span>
               </h2>
            </div>

            <div className="relative w-full max-w-sm mx-auto group">
               <div className={`aspect-[4/5] p-2 ${'bg-white'} border border-[#ad944b]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-sm relative`}>
                  <SmartImage src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=800" alt="The Starry Night" className="w-full h-full object-cover transition-all duration-[2000ms] grayscale brightness-90 hover:grayscale-0 hover:brightness-100" />
                  <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#ad944b]/60" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#ad944b]/60" />
               </div>
               <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full border border-[#ad944b]/20 rounded-sm translate-x-2 translate-y-2 transition-transform duration-700" />
            </div>

            <div className={`text-lg font-literary ${'text-[#1a1a1a]/80'} leading-relaxed text-justify space-y-8 px-2`}>
               <div className="relative pt-6">
                  <Quote className="absolute -left-2 top-0 opacity-10 text-[#ad944b]" size={50} />
                  <p className="first-letter:text-6xl first-letter:font-mosaic first-letter:text-[#ad944b] first-letter:mr-3 first-letter:float-left first-letter:leading-none italic font-medium relative z-10">
                    “Great things are not done by impulse but by a series of small things brought together.” — Vincent Van Gogh.
                  </p>
               </div>
               <p>
                 Capturing the rich tapestry of creativity and storytelling, Forte-FY unveils "The Mosaic Stories", a symphony of artistic expressions poised to transcend conventional boundaries. This event stands as a profound illustration of the impactful synergy that emerges when diverse narratives converge into a singular mosaic of inspiration.
               </p>
            </div>
         </div>
      </section>

      {/* --- THE DECAGON OF EXPRESSION (SEGMENTS) --- */}
      <section className={`reveal-block py-24 px-6 ${'bg-[#f5f5f5]/80'} border-y ${'border-[#ad944b]/20'} backdrop-blur-md`}>
         <div className="text-center mb-16">
            <h2 className="text-[9px] font-mosaic font-bold uppercase tracking-[0.6em] text-[#ad944b] mb-6">The Decagon of Expression</h2>
            <h3 className={`text-4xl font-mosaic font-bold ${'text-[#1a1a1a]'} uppercase tracking-tighter leading-none`}>Event <br/>Segments</h3>
         </div>

         <div className="segments-grid grid grid-cols-2 gap-3">
            {SEGMENTS.map((segment, i) => (
               <div key={i} className={`segment-card group relative p-4 ${'bg-white border-[#ad944b]/20'} border hover:border-[#ad944b]/50 transition-all duration-500 shadow-xl overflow-hidden rounded-3xl flex flex-col items-center text-center`}>
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 rotate-12">
                     <segment.icon size={80} className="text-[#ad944b]" />
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                     <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${'bg-[#ad944b]/5'} text-[#ad944b] mb-3 border border-[#ad944b]/20 group-hover:scale-110 group-hover:bg-[#ad944b] ${'group-hover:text-white'} transition-all duration-300`}>
                        <segment.icon size={14} />
                     </div>
                     <h4 className={`text-xs font-mosaic font-bold ${'text-black'} uppercase tracking-wider mb-2 leading-tight group-hover:text-[#ad944b] transition-colors`}>
                        {segment.name}
                     </h4>
                     <p className={`text-[9px] font-literary italic ${'text-zinc-600 group-hover:text-zinc-800'} leading-relaxed transition-colors`}>
                        {segment.desc}
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* --- THE MASTERS & ARCHIVISTS --- */}
      <section className={`reveal-block py-24 px-6 border-t ${'border-[#ad944b]/20 bg-[#f5f5f5]/50'}`}>
         <div className="flex flex-col gap-16">
            {/* Masters */}
            <div>
               <div className="mb-10 text-center">
                  <h3 className={`text-4xl font-mosaic font-bold ${'text-black'} uppercase tracking-tight mb-4 leading-none`}>Masters of the <br/><span className="text-[#ad944b]">Magic.</span></h3>
                  <p className={`text-[9px] font-mosaic font-bold uppercase tracking-[0.3em] ${'text-zinc-600'}`}>The High Performance Laureate List</p>
               </div>

               {/* Tab switcher */}
               <div className={`${'bg-white'} rounded-sm p-4 border ${'border-[#ad944b]/30'} shadow-2xl mb-8`}>
                 <div className={`flex items-center justify-between p-3 rounded-sm ${'bg-slate-50 border-slate-100'} mb-6 border`}>
                    <button 
                       onClick={() => setActiveCategory(prev => prev === 0 ? WINNERS_DATA.length - 1 : prev - 1)}
                       className={`w-8 h-8 flex items-center justify-center rounded-full bg-[#ad944b]/10 text-[#ad944b] hover:bg-[#ad944b] ${'hover:text-white'} transition-colors`}
                    >
                       <ChevronLeft size={16} />
                    </button>
                    <div className="text-center">
                       <h4 className={`text-sm font-mosaic font-bold ${'text-slate-900'} uppercase tracking-widest`}>{WINNERS_DATA[activeCategory].category}</h4>
                       <p className={`text-[9px] font-literary italic ${'text-slate-500'} mt-0.5`}>Segment {activeCategory + 1} of {WINNERS_DATA.length}</p>
                    </div>
                    <button 
                       onClick={() => setActiveCategory(prev => (prev + 1) % WINNERS_DATA.length)}
                       className={`w-8 h-8 flex items-center justify-center rounded-full bg-[#ad944b]/10 text-[#ad944b] hover:bg-[#ad944b] ${'hover:text-white'} transition-colors`}
                    >
                       <ChevronRight size={16} />
                    </button>
                 </div>

                 <div className="space-y-3 min-h-[240px]">
                   {WINNERS_DATA[activeCategory].winners.map((winner, i) => (
                     <div
                       key={i}
                       className={`flex items-center gap-4 p-4 rounded-sm ${'bg-[#f8f8f8]'} border ${'border-[#ad944b]/20'}`}
                     >
                       <div className="relative">
                         <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#ad944b]">
                           <img src={winner.img} alt={winner.name} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all" />
                         </div>
                         <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold border border-[#ad944b]">
                           {i + 1}
                         </div>
                       </div>
                       <div className="flex-1">
                         <h4 className={`text-sm font-mosaic font-bold ${'text-black'} uppercase`}>{winner.name}</h4>
                         <div className="flex items-center gap-2 mt-0.5">
                           <Trophy size={11} className="text-[#ad944b]" />
                           <p className="text-[9px] font-mosaic font-bold uppercase tracking-widest opacity-60 text-[#ad944b]">{winner.rank} Place</p>
                         </div>
                       </div>
                       <ChevronRight size={14} className="opacity-30 text-[#ad944b]" />
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Archivists */}
            <div className={`${'bg-white border-[#ad944b]/20'} border p-8 rounded-sm shadow-2xl relative overflow-hidden`}>
               <div className="absolute top-0 right-0 p-6 opacity-[0.03] rotate-12">
                  <Star size={120} className="text-[#ad944b]" />
               </div>
               <div className="relative z-10">
                  <h3 className={`text-3xl font-mosaic font-bold ${'text-black'} uppercase tracking-tight mb-10`}>Best Campus <span className="text-[#ad944b]">Ambassadors.</span></h3>
                  
                  {/* 3D Carousel */}
                  <div className="relative h-[300px] w-full flex items-center justify-center perspective-[800px] overflow-hidden mt-8">
                     {AMBASSADORS.map((a, i) => {
                        const diff = (i - activeAmbassador + AMBASSADORS.length) % AMBASSADORS.length;
                        const offset = diff > Math.floor(AMBASSADORS.length / 2) ? diff - AMBASSADORS.length : diff;
                        
                        const z = Math.abs(offset) * -60;
                        const x = offset * 40; // percentage
                        const scale = 1 - Math.abs(offset) * 0.15;
                        const opacity = Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.4;
                        
                        return (
                           <div 
                              key={i}
                              className={`absolute w-[200px] p-4 rounded-xl border ${'bg-white/95 border-[#ad944b]/40'} shadow-2xl backdrop-blur-md transition-all duration-700 ease-out cursor-pointer flex flex-col items-center text-center`}
                              style={{
                                 transform: `translateX(${x}%) translateZ(${z}px) scale(${scale})`,
                                 zIndex: 100 - Math.abs(offset),
                                 opacity
                              }}
                              onClick={() => setActiveAmbassador(i)}
                           >
                              <div className="w-16 h-16 rounded-full border-2 border-[#ad944b] overflow-hidden mb-3 shadow-[0_0_10px_rgba(173,148,75,0.4)]">
                                 <img src={a.img} alt={a.name} className="w-full h-full object-cover" />
                              </div>
                              <h4 className={`text-sm font-mosaic font-bold ${'text-black'} uppercase tracking-widest mb-1`}>{a.name}</h4>
                              <p className={`text-[10px] font-literary italic ${'text-zinc-600'} mb-2`}>{a.campus}</p>
                              <div className="px-2 py-1 rounded-full bg-[#ad944b]/10 border border-[#ad944b]/20">
                                 <span className="text-[8px] font-mosaic font-bold text-[#ad944b] uppercase tracking-widest">{a.impact}</span>
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- THE GALLERY OF RESONANCE --- */}
      <section className="reveal-block py-24 px-6">
         <div className="flex flex-col items-center text-center mb-16 gap-6">
            <div className="flex items-center gap-3 text-[#ad944b]/60">
               <ImageIcon size={24} />
               <div className="h-px w-16 bg-[#ad944b]/30" />
               <span className="text-[9px] font-mosaic font-bold uppercase tracking-[0.4em]">Visual Archives</span>
            </div>
            <h2 className={`text-4xl font-mosaic font-bold ${'text-[#1a1a1a]'} uppercase tracking-tight leading-none`}>
               Gallery of <br/> <span className="text-[#ad944b]">Resonance.</span>
            </h2>
            <p className={`text-lg font-literary ${'text-zinc-600'} italic px-4`}>"Every brushstroke is a story, every pixel a memory."</p>
         </div>

         <div className="grid grid-cols-1 gap-6">
            {GALLERY_ARTWORKS.slice(0, 6).map((art, i) => (
              <div key={i} className={`group overflow-hidden rounded-sm border ${'border-[#ad944b]/20 bg-white'} flex flex-col shadow-lg`}>
                 <div className="gallery-img-container aspect-[4/3] overflow-hidden relative">
                    <img src={art.src} alt={art.title} className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover" />
                 </div>
                 <div className={`p-6 border-t ${'border-[#ad944b]/20'}`}>
                    <h4 className={`text-lg font-mosaic font-bold ${'text-black'} uppercase`}>{art.title}</h4>
                    <p className="text-[10px] font-mosaic font-bold text-[#ad944b] uppercase tracking-widest mt-1">{art.category}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* --- ALLIED GUILDS (PARTNERS) --- */}
      <section className={`reveal-block py-24 border-t ${'border-[#ad944b]/20 bg-[#f5f5f5]/50'} overflow-hidden`}>
         <div className="px-6 mb-16 text-center">
            <h3 className={`text-3xl font-mosaic font-bold ${'text-black'} uppercase tracking-tighter mb-4`}>Allied <span className="text-[#ad944b]">Guilds.</span></h3>
            <p className={`text-[9px] font-mosaic font-bold uppercase tracking-[0.4em] ${'text-zinc-500'}`}>The Global Collaborative Architecture</p>
         </div>
         <div className={`relative flex overflow-hidden border-y ${'border-[#ad944b]/10'} py-10`}>
            <div className="flex animate-marquee-legacy gap-12 whitespace-nowrap">
               {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((p, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                    <div className={`w-24 h-24 rounded-full border ${'border-[#ad944b]/20 bg-white'} flex items-center justify-center p-5 shadow-lg`}>
                       <img src={p.imageUrl} alt={p.name} className={`w-full h-full object-contain ${'grayscale-0 opacity-80'}`} />
                    </div>
                    <span className={`text-[8px] font-mosaic font-bold uppercase tracking-[0.2em] ${'text-zinc-500'}`}>{p.name}</span>
                  </div>
               ))}
            </div>
         </div>
         <style>{`
            @keyframes marquee-legacy { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
            .animate-marquee-legacy { display: flex; animation: marquee-legacy 40s linear infinite; width: max-content; }
         `}</style>
      </section>

      {/* --- FINAL CALL TO ARCHIVE --- */}
      <footer className={`py-32 border-t ${'border-[#ad944b]/20 bg-[#fdfcfb]'} flex flex-col items-center justify-center gap-16 relative z-10`}>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(173,148,75,0.05)_0%,transparent_60%)]" />
         <div className="text-center relative z-10 space-y-6 px-4">
            <h4 className={`text-6xl font-mosaic font-bold ${'text-zinc-200'} uppercase tracking-[0.05em] select-none leading-none`}>MCMXXII</h4>
            <div className="flex flex-col items-center gap-3">
               <p className="text-[9px] font-mosaic font-bold text-[#ad944b] uppercase tracking-[0.6em] text-center">Forte-FY Archival Registry</p>
               <div className="h-px w-16 bg-[#ad944b]/30" />
               <p className={`text-[8px] font-mosaic font-bold ${'text-zinc-400'} uppercase tracking-[0.3em] text-center`}>Folio Fig. 2024 • Mosaic Stories Edition</p>
            </div>
         </div>
         <button onClick={onBack} className={`group relative px-12 py-5 border ${'border-[#ad944b]/40'} rounded-sm overflow-hidden transition-all duration-500 shadow-xl bg-transparent`}>
            <div className="absolute inset-0 bg-[#ad944b] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <div className={`relative z-10 flex items-center gap-4 font-mosaic font-bold text-[10px] uppercase tracking-[0.4em] ${'text-[#8e793e]'} group-hover:text-black transition-colors duration-300`}>
               <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-500" />
               Return
            </div>
         </button>
      </footer>
    </div>
  );
};
