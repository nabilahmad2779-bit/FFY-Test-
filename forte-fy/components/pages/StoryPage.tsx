
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Target, Users, Calendar, Flag, Sparkles } from 'lucide-react';
import { StoryPageLight } from '../MainMenuPages/MainMenuPagesLight/StoryPageLight';

gsap.registerPlugin(ScrollTrigger);

export const StoryPage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isDark || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Parallax & Reveal
      gsap.from(".story-hero-img", {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        ease: "power2.out"
      });
      
      gsap.from(".story-hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
      });

      // 2. Text Reveals (Scroll Triggered)
      const textElements = gsap.utils.toArray<HTMLElement>('.reveal-text');
      textElements.forEach((text) => {
        gsap.fromTo(text, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 3. Image Parallax
      const images = gsap.utils.toArray<HTMLElement>('.parallax-img');
      images.forEach((img) => {
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // 4. Horizontal Scroll for Founding Members
      const membersSection = document.querySelector('.members-scroll-section');
      if (membersSection) {
         const membersWrapper = document.querySelector('.members-wrapper');
         if (membersWrapper) {
            gsap.to(membersWrapper, {
               x: () => -(membersWrapper.scrollWidth - window.innerWidth),
               ease: "none",
               scrollTrigger: {
                  trigger: membersSection,
                  pin: true,
                  scrub: 1,
                  end: () => "+=" + (membersWrapper.scrollWidth - window.innerWidth),
                  invalidateOnRefresh: true
               }
            });
         }
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);

  if (!isDark) {
    return <StoryPageLight />;
  }

  const FOUNDING_MEMBERS = [
    "Sadra Raihan",
    "Sajjad Hussein Salman",
    "Zahin A. Adib",
    "Mahdi Hasan Tanzim"
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#1a1a1a] text-slate-200 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920" 
            alt="Corporate Vision" 
            className="story-hero-img w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-[#1a1a1a]/40 to-[#1a1a1a]" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="story-hero-text mb-6 flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-cyan-500" />
             <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.4em]">Est. May 26, 2022</span>
             <div className="h-px w-12 bg-cyan-500" />
          </div>
          
          <h1 className="story-hero-text text-6xl md:text-9xl font-serif font-black uppercase tracking-tighter leading-none text-white mb-8">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Story</span>
          </h1>
          
          <p className="story-hero-text text-xl md:text-3xl font-light text-slate-300 italic max-w-3xl mx-auto leading-relaxed">
            "Fortify for a fortunate future."
          </p>
        </div>
      </section>

      {/* 2. THE GENESIS (Text Heavy + Visual Heavy) */}
      <section className="py-32 px-6 relative">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-12">
               <div className="reveal-text">
                  <span className="text-cyan-500 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">The Genesis</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-8">
                     A Vision Born on <br/><span className="italic text-slate-400">May 26, 2022</span>
                  </h2>
                  <div className="w-24 h-1 bg-cyan-500 mb-8" />
               </div>
               
               <div className="reveal-text space-y-6 text-lg md:text-xl text-slate-300 font-light leading-relaxed text-justify">
                  <p>
                     It began not as a grand enterprise, but as a shared conviction. In the quiet determination of a late spring evening, a seed was planted—a belief that structure, integrity, and community could be woven together to create something enduring.
                  </p>
                  <p>
                     <strong className="text-white">Forte-FY</strong> was established to be more than just an organization; it was conceived as a fortress of opportunity. We recognized a gap in how potential was being nurtured, seeing a need for a platform that didn't just promise growth but engineered it through discipline and strategic foresight.
                  </p>
                  <p>
                     From our very first meeting, the goal was clear: to build a legacy that would outlast us, grounded in the principle that a fortunate future is not found, but fortified through deliberate action today.
                  </p>
               </div>
            </div>
            
            <div className="order-1 lg:order-2 relative h-[80vh] w-full overflow-hidden rounded-none lg:rounded-l-[4rem]">
               <div className="absolute inset-0 bg-cyan-900/20 z-10 mix-blend-overlay" />
               <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000" 
                  alt="The Beginning" 
                  className="parallax-img w-full h-[120%] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
               />
            </div>
         </div>
      </section>

      {/* 3. MISSION STATEMENT (Centered, Impactful) */}
      <section className="py-40 px-6 bg-[#151515] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
         
         <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="reveal-text mb-12 flex justify-center">
               <div className="w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Target size={32} />
               </div>
            </div>
            
            <h2 className="reveal-text text-3xl md:text-5xl font-serif font-light text-white leading-snug mb-12">
               "Our mission is to empower individuals by providing a structured environment where <span className="text-cyan-400 italic font-bold">talent meets opportunity</span>, fostering a culture of excellence, integrity, and continuous growth."
            </h2>
            
            <div className="reveal-text flex flex-col md:flex-row items-center justify-center gap-12 mt-20">
               <div className="flex flex-col items-center gap-4">
                  <span className="text-6xl font-black text-slate-700">01</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-cyan-500">Empower</span>
               </div>
               <div className="w-px h-16 bg-slate-800 hidden md:block" />
               <div className="flex flex-col items-center gap-4">
                  <span className="text-6xl font-black text-slate-700">02</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-cyan-500">Structure</span>
               </div>
               <div className="w-px h-16 bg-slate-800 hidden md:block" />
               <div className="flex flex-col items-center gap-4">
                  <span className="text-6xl font-black text-slate-700">03</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-cyan-500">Excel</span>
               </div>
            </div>
         </div>
      </section>

      {/* 4. THE FOUNDERS (Magazine Layout) */}
      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto mb-24">
            <span className="text-cyan-500 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Leadership</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white uppercase">The Architects</h2>
         </div>

         <div className="max-w-7xl mx-auto space-y-32">
            {/* Founder 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
               <div className="lg:col-span-5 relative group">
                  <div className="absolute -inset-4 border border-cyan-500/20 rounded-none group-hover:scale-105 transition-transform duration-700" />
                  <div className="aspect-[3/4] overflow-hidden bg-slate-800 relative">
                     <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000" 
                        alt="Nabil Ahmed" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                     />
                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                        <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Founder</span>
                     </div>
                  </div>
               </div>
               <div className="lg:col-span-7 space-y-8 reveal-text">
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-white">Nabil Ahmed</h3>
                  <p className="text-xl text-slate-300 font-light leading-relaxed border-l-2 border-cyan-500/50 pl-8">
                     As the visionary behind Forte-FY, Nabil Ahmed established the organization with a singular focus: to create a legacy of structured growth. His leadership is defined by a relentless pursuit of excellence and a deep commitment to the values that form our foundation.
                  </p>
                  <div className="pt-8">
                     <Quote className="text-cyan-500/40 mb-4" size={40} />
                     <p className="text-2xl font-serif italic text-white">
                        "We do not just build teams; we build the future leaders who will shape tomorrow."
                     </p>
                  </div>
               </div>
            </div>

            {/* Founder 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
               <div className="lg:col-span-7 order-2 lg:order-1 space-y-8 reveal-text text-right">
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-white">Mominur Nahin</h3>
                  <p className="text-xl text-slate-300 font-light leading-relaxed border-r-2 border-cyan-500/50 pr-8">
                     Co-founder Mominur Nahin brings strategic depth and operational foresight to Forte-FY. His role has been pivotal in translating our vision into actionable reality, ensuring that every initiative we undertake is executed with precision and purpose.
                  </p>
                  <div className="pt-8 flex flex-col items-end">
                     <Quote className="text-cyan-500/40 mb-4" size={40} />
                     <p className="text-2xl font-serif italic text-white">
                        "Success is not an accident. It is the result of preparation, hard work, and learning from failure."
                     </p>
                  </div>
               </div>
               <div className="lg:col-span-5 order-1 lg:order-2 relative group">
                  <div className="absolute -inset-4 border border-cyan-500/20 rounded-none group-hover:scale-105 transition-transform duration-700" />
                  <div className="aspect-[3/4] overflow-hidden bg-slate-800 relative">
                     <img 
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=1000" 
                        alt="Mominur Nahin" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                     />
                     <div className="absolute bottom-0 right-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent text-right">
                        <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Co-Founder</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. FOUNDING MEMBERS (Horizontal Scroll) */}
      <section className="members-scroll-section h-screen bg-[#111] flex items-center overflow-hidden relative border-t border-white/5">
         <div className="absolute top-12 left-12 z-20">
            <span className="text-cyan-500 text-sm font-bold uppercase tracking-[0.2em] mb-2 block">The Pillars</span>
            <h2 className="text-4xl font-serif font-bold text-white uppercase">Founding Members</h2>
         </div>
         
         <div className="members-wrapper flex items-center pl-[10vw] pr-[10vw] gap-24">
            {FOUNDING_MEMBERS.map((member, i) => (
               <div key={i} className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] group">
                  <div className="aspect-[4/5] overflow-hidden bg-slate-800 relative mb-8 border border-white/10">
                     <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay z-10" />
                     <img 
                        src={`https://picsum.photos/seed/founder${i}/600/800`} 
                        alt={member} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                     />
                     <div className="absolute top-4 right-4 text-6xl font-black text-white/5 z-0">
                        0{i + 1}
                     </div>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{member}</h3>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Founding Member</span>
               </div>
            ))}
            
            {/* End Card */}
            <div className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] flex flex-col justify-center items-start pl-12 border-l border-white/10 h-[60vh]">
               <h3 className="text-5xl font-serif font-bold text-white mb-6">Join the <br/><span className="text-cyan-400">Legacy</span></h3>
               <p className="text-slate-400 text-lg mb-8 max-w-md">
                  Our story is still being written. Every new member adds a new chapter to our history.
               </p>
               <button className="px-8 py-4 border border-cyan-500 text-cyan-400 uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all duration-300">
                  Become a Member
               </button>
            </div>
         </div>
      </section>

      {/* 6. FOOTER MOTTO */}
      <section className="py-40 px-6 bg-[#1a1a1a] text-center">
         <div className="reveal-text">
            <Sparkles className="text-cyan-500 mx-auto mb-8 animate-pulse" size={48} />
            <h2 className="text-4xl md:text-7xl font-serif font-black uppercase tracking-tight text-white mb-6">
               "Fortify for a <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Fortunate Future</span>"
            </h2>
            <p className="text-slate-500 text-sm uppercase tracking-[0.4em]">The Forte-FY Promise</p>
         </div>
      </section>

    </div>
  );
};

