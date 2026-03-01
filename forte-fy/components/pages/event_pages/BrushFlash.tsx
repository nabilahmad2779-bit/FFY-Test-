import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  isDark: boolean;
}

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };
    
    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={ref} className="inline-block cursor-pointer">{children}</div>;
};

const AnimatedNumber = ({ value }: { value: string | number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const numStr = value.toString();
    const num = parseInt(numStr.replace(/[^0-9]/g, ''));
    const suffix = numStr.replace(/[0-9]/g, '');
    
    if (isNaN(num)) {
      el.innerText = numStr;
      return;
    }

    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: num,
      duration: 2.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
      onUpdate: () => {
        el.innerText = Math.round(obj.val).toLocaleString() + suffix;
      }
    });
  }, [value]);

  return <span ref={ref}>0</span>;
};

export const BrushFlash: React.FC<EventPageProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'brush-flash');

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      
      // Smooth fade ups
      gsap.utils.toArray('.fade-up').forEach((el: any) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        });
      });

      // Hero Image Parallax
      gsap.to('.hero-img', {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  const winners = [
    { category: "Photography", images: ["https://picsum.photos/seed/p1/800/1000", "https://picsum.photos/seed/p2/800/1000", "https://picsum.photos/seed/p3/800/1000"] },
    { category: "Digital Art", images: ["https://picsum.photos/seed/d1/800/1000", "https://picsum.photos/seed/d2/800/1000", "https://picsum.photos/seed/d3/800/1000"] },
    { category: "Sketching", images: ["https://picsum.photos/seed/s1/800/1000", "https://picsum.photos/seed/s2/800/1000", "https://picsum.photos/seed/s3/800/1000"] }
  ];

  const ambassadors = [
    { name: "Elena Rostova", role: "Lead Curator", img: "https://picsum.photos/seed/amb1/400/400" },
    { name: "Marcus Chen", role: "Photography Head", img: "https://picsum.photos/seed/amb2/400/400" },
    { name: "Sarah Jenkins", role: "Digital Arts", img: "https://picsum.photos/seed/amb3/400/400" },
    { name: "David Alaba", role: "Sketching Master", img: "https://picsum.photos/seed/amb4/400/400" }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans selection:bg-white selection:text-black">
      
      {/* 1. HERO SECTION (Single Image, Continuous Flow) */}
      <section className="hero-container relative w-full h-[90vh] md:h-screen overflow-hidden px-4 md:px-8 pt-4 md:pt-8">
         <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden">
            <img 
               src="https://picsum.photos/seed/brushflashmain/1920/1080" 
               alt="Brush and Flash Exhibition" 
               className="hero-img absolute inset-0 w-full h-[120%] object-cover -top-[10%]" 
               referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <h1 className="text-[15vw] md:text-[12vw] font-light tracking-tighter text-white leading-none mix-blend-overlay">
                  BRUSH
               </h1>
               <h1 className="text-[15vw] md:text-[12vw] font-light tracking-tighter text-white leading-none mix-blend-overlay">
                  & FLASH
               </h1>
            </div>

            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
               <p className="text-sm md:text-base font-light uppercase tracking-widest text-white/80">Exhibition {event.year}</p>
            </div>
         </div>
      </section>

      {/* 2. INTRO & METRICS (Interactive Numbers) */}
      <section className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
         <div className="fade-up max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-white mb-12">
               A celebration of static beauty, captured through the lens and crafted by the hand.
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
               {event.description}
            </p>
         </div>

         <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 border-t border-white/10 pt-16">
            {[
               { val: event.metrics.reachLabel, label: "Visual Impressions" },
               { val: event.metrics.participants, label: "Artists Exhibited" },
               { val: event.metrics.ambassadors, label: "Curators" },
            ].map((stat, i) => (
               <div key={i} className="fade-up flex flex-col items-start">
                  <Magnetic>
                     <h3 className="text-6xl md:text-8xl font-light tracking-tighter text-white mb-4 transition-colors hover:text-[#f4d03f]">
                        <AnimatedNumber value={stat.val} />
                     </h3>
                  </Magnetic>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">{stat.label}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 3. WINNING MASTERPIECES (Hyper Interactive Flex Grid) */}
      <section className="py-32 px-4 md:px-8">
         <div className="max-w-7xl mx-auto mb-20 fade-up">
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white">Winning Masterpieces</h2>
            <p className="text-zinc-500 mt-4 text-lg font-light">The pinnacle of artistic expression across three mediums.</p>
         </div>

         <div className="flex flex-col gap-32 max-w-[100rem] mx-auto">
            {winners.map((segment, idx) => (
               <div key={idx} className="fade-up flex flex-col gap-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 px-4">
                     <h3 className="text-2xl md:text-4xl font-light text-white">{segment.category}</h3>
                     <span className="text-sm uppercase tracking-widest text-zinc-500">Top 3</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row h-[60vh] md:h-[70vh] gap-4 w-full">
                     {segment.images.map((img, i) => (
                        <div key={i} className="group relative flex-1 hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer bg-zinc-900">
                           <img 
                              src={img} 
                              alt={`${segment.category} Winner ${i + 1}`} 
                              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700" 
                              referrerPolicy="no-referrer" 
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           
                           <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                                    {i + 1}
                                 </div>
                                 <h4 className="text-xl md:text-2xl font-light text-white">Masterpiece {i + 1}</h4>
                              </div>
                           </div>
                           
                           <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                              <ArrowUpRight className="text-white" size={20} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 4. BEST AMBASSADORS (Interactive Hover Reveal) */}
      <section className="py-32 px-6 md:px-24 max-w-7xl mx-auto border-t border-white/10">
         <div className="fade-up mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white">The Curators</h2>
            <p className="text-zinc-500 mt-4 text-lg font-light">The visionaries behind the exhibition.</p>
         </div>

         <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {ambassadors.map((ambassador, i) => (
               <Magnetic key={i}>
                  <div className="fade-up group relative flex flex-col items-center">
                     <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border border-white/10 transition-transform duration-500 group-hover:scale-105 group-hover:border-white/30">
                        <img 
                           src={ambassador.img} 
                           alt={ambassador.name} 
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                           referrerPolicy="no-referrer" 
                        />
                     </div>
                     <h4 className="text-xl font-light text-white group-hover:text-[#f4d03f] transition-colors">{ambassador.name}</h4>
                     <p className="text-sm uppercase tracking-widest text-zinc-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">{ambassador.role}</p>
                  </div>
               </Magnetic>
            ))}
         </div>
      </section>

      {/* 5. PARTNERS */}
      <footer className="py-32 px-6 md:px-24 border-t border-white/10">
         <div className="max-w-7xl mx-auto">
            <h3 className="text-center text-xs font-medium uppercase tracking-[0.3em] text-zinc-600 mb-20">Institutional Partners</h3>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40">
               {[...PARTNER_LOGOS].slice(0, 6).map((p, i) => (
                  <div key={i} className="w-20 h-20 md:w-24 md:h-24 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                     <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain" />
                  </div>
               ))}
            </div>
         </div>
      </footer>

    </div>
  );
};
