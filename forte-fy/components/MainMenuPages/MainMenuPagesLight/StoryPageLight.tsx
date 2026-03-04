import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Target, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const StoryPageLight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

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
  }, []);

  const FOUNDING_MEMBERS = [
    "Sadra Raihan",
    "Sajjad Hussein Salman",
    "Zahin A. Adib",
    "Mahdi Hasan Tanzim"
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f5f5f0] text-stone-800 font-sans selection:bg-amber-500 selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920" 
            alt="Corporate Vision" 
            className="story-hero-img w-full h-full object-cover opacity-20 sepia"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f0]/80 via-[#f5f5f0]/40 to-[#f5f5f0]" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="story-hero-text mb-6 flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-amber-600" />
             <span className="text-amber-700 text-xs font-bold uppercase tracking-[0.4em]">Est. May 26, 2022</span>
             <div className="h-px w-12 bg-amber-600" />
          </div>
          
          <h1 className="story-hero-text text-6xl md:text-9xl font-serif font-black uppercase tracking-tighter leading-none text-stone-900 mb-8">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Story</span>
          </h1>
          
          <p className="story-hero-text text-xl md:text-3xl font-light text-stone-600 italic max-w-3xl mx-auto leading-relaxed">
            "Fortify for a fortunate future."
          </p>
        </div>
      </section>

      {/* 2. THE GENESIS (Text Heavy + Visual Heavy) */}
      <section className="py-32 px-6 relative">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-12">
               <div className="reveal-text">
                  <span className="text-amber-600 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">The Genesis</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 leading-tight mb-8">
                     A Vision Born on <br/><span className="italic text-stone-500">May 26, 2022</span>
                  </h2>
                  <div className="w-24 h-1 bg-amber-600 mb-8" />
               </div>
               
               <div className="reveal-text space-y-6 text-lg md:text-xl text-stone-600 font-light leading-relaxed text-justify">
                  <p>
                     It began not as a grand enterprise, but as a shared conviction. In the quiet determination of a late spring evening, a seed was planted—a belief that structure, integrity, and community could be woven together to create something enduring.
                  </p>
                  <p>
                     <strong className="text-stone-900">Forte-FY</strong> was established to be more than just an organization; it was conceived as a fortress of opportunity. We recognized a gap in how potential was being nurtured, seeing a need for a platform that didn't just promise growth but engineered it through discipline and strategic foresight.
                  </p>
                  <p>
                     From our very first meeting, the goal was clear: to build a legacy that would outlast us, grounded in the principle that a fortunate future is not found, but fortified through deliberate action today.
                  </p>
               </div>
            </div>
            
            <div className="order-1 lg:order-2 relative h-[80vh] w-full overflow-hidden rounded-none lg:rounded-l-[4rem] shadow-2xl">
               <div className="absolute inset-0 bg-amber-900/10 z-10 mix-blend-multiply" />
               <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000" 
                  alt="The Beginning" 
                  className="parallax-img w-full h-[120%] object-cover sepia-[0.3] hover:sepia-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
               />
            </div>
         </div>
      </section>

      {/* 3. MISSION STATEMENT (Centered, Impactful) */}
      <section className="py-40 px-6 bg-[#ebebe6] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
         
         <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="reveal-text mb-12 flex justify-center">
               <div className="w-16 h-16 rounded-full border border-amber-600/30 flex items-center justify-center text-amber-600">
                  <Target size={32} />
               </div>
            </div>
            
            <h2 className="reveal-text text-3xl md:text-5xl font-serif font-light text-stone-800 leading-snug mb-12">
               "Our mission is to empower individuals by providing a structured environment where <span className="text-amber-600 italic font-bold">talent meets opportunity</span>, fostering a culture of excellence, integrity, and continuous growth."
            </h2>
            
            <div className="reveal-text flex flex-col md:flex-row items-center justify-center gap-12 mt-20">
               <div className="flex flex-col items-center gap-4">
                  <span className="text-6xl font-black text-stone-300">01</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-amber-600">Empower</span>
               </div>
               <div className="w-px h-16 bg-stone-300 hidden md:block" />
               <div className="flex flex-col items-center gap-4">
                  <span className="text-6xl font-black text-stone-300">02</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-amber-600">Structure</span>
               </div>
               <div className="w-px h-16 bg-stone-300 hidden md:block" />
               <div className="flex flex-col items-center gap-4">
                  <span className="text-6xl font-black text-stone-300">03</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-amber-600">Excel</span>
               </div>
            </div>
         </div>
      </section>

      {/* 4. THE FOUNDERS (Magazine Layout) */}
      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto mb-24">
            <span className="text-amber-600 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Leadership</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 uppercase">The Architects</h2>
         </div>

         <div className="max-w-7xl mx-auto space-y-32">
            {/* Founder 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
               <div className="lg:col-span-5 relative group">
                  <div className="absolute -inset-4 border border-amber-600/20 rounded-none group-hover:scale-105 transition-transform duration-700" />
                  <div className="aspect-[3/4] overflow-hidden bg-stone-200 relative shadow-xl">
                     <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000" 
                        alt="Nabil Ahmed" 
                        className="w-full h-full object-cover sepia-[0.2] group-hover:sepia-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                     />
                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-stone-900/80 to-transparent">
                        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest">Founder</span>
                     </div>
                  </div>
               </div>
               <div className="lg:col-span-7 space-y-8 reveal-text">
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-stone-900">Nabil Ahmed</h3>
                  <p className="text-xl text-stone-600 font-light leading-relaxed border-l-2 border-amber-600/50 pl-8">
                     As the visionary behind Forte-FY, Nabil Ahmed established the organization with a singular focus: to create a legacy of structured growth. His leadership is defined by a relentless pursuit of excellence and a deep commitment to the values that form our foundation.
                  </p>
                  <div className="pt-8">
                     <Quote className="text-amber-600/40 mb-4" size={40} />
                     <p className="text-2xl font-serif italic text-stone-800">
                        "We do not just build teams; we build the future leaders who will shape tomorrow."
                     </p>
                  </div>
               </div>
            </div>

            {/* Founder 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
               <div className="lg:col-span-7 order-2 lg:order-1 space-y-8 reveal-text text-right">
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-stone-900">Mominur Nahin</h3>
                  <p className="text-xl text-stone-600 font-light leading-relaxed border-r-2 border-amber-600/50 pr-8">
                     Co-founder Mominur Nahin brings strategic depth and operational foresight to Forte-FY. His role has been pivotal in translating our vision into actionable reality, ensuring that every initiative we undertake is executed with precision and purpose.
                  </p>
                  <div className="pt-8 flex flex-col items-end">
                     <Quote className="text-amber-600/40 mb-4" size={40} />
                     <p className="text-2xl font-serif italic text-stone-800">
                        "Success is not an accident. It is the result of preparation, hard work, and learning from failure."
                     </p>
                  </div>
               </div>
               <div className="lg:col-span-5 order-1 lg:order-2 relative group">
                  <div className="absolute -inset-4 border border-amber-600/20 rounded-none group-hover:scale-105 transition-transform duration-700" />
                  <div className="aspect-[3/4] overflow-hidden bg-stone-200 relative shadow-xl">
                     <img 
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=1000" 
                        alt="Mominur Nahin" 
                        className="w-full h-full object-cover sepia-[0.2] group-hover:sepia-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                     />
                     <div className="absolute bottom-0 right-0 w-full p-6 bg-gradient-to-t from-stone-900/80 to-transparent text-right">
                        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest">Co-Founder</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. FOUNDING MEMBERS (Horizontal Scroll) */}
      <section className="members-scroll-section h-screen bg-[#ebebe6] flex items-center overflow-hidden relative border-t border-stone-300">
         <div className="absolute top-12 left-12 z-20">
            <span className="text-amber-600 text-sm font-bold uppercase tracking-[0.2em] mb-2 block">The Pillars</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900 uppercase">Founding Members</h2>
         </div>
         
         <div className="members-wrapper flex items-center pl-[10vw] pr-[10vw] gap-24">
            {FOUNDING_MEMBERS.map((member, i) => (
               <div key={i} className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] group">
                  <div className="aspect-[4/5] overflow-hidden bg-stone-200 relative mb-8 border border-stone-300 shadow-lg">
                     <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply z-10" />
                     <img 
                        src={`https://picsum.photos/seed/founder${i}/600/800`} 
                        alt={member} 
                        className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 scale-110 group-hover:scale-100 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                     />
                     <div className="absolute top-4 right-4 text-6xl font-black text-stone-900/10 z-0">
                        0{i + 1}
                     </div>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors">{member}</h3>
                  <span className="text-xs font-mono uppercase tracking-widest text-stone-500">Founding Member</span>
               </div>
            ))}
            
            {/* End Card */}
            <div className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] flex flex-col justify-center items-start pl-12 border-l border-stone-300 h-[60vh]">
               <h3 className="text-5xl font-serif font-bold text-stone-900 mb-6">Join the <br/><span className="text-amber-600">Legacy</span></h3>
               <p className="text-stone-600 text-lg mb-8 max-w-md">
                  Our story is still being written. Every new member adds a new chapter to our history.
               </p>
               <button className="px-8 py-4 border border-amber-600 text-amber-700 uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all duration-300">
                  Become a Member
               </button>
            </div>
         </div>
      </section>

      {/* 6. FOOTER MOTTO */}
      <section className="py-40 px-6 bg-[#f5f5f0] text-center">
         <div className="reveal-text">
            <Sparkles className="text-amber-600 mx-auto mb-8 animate-pulse" size={48} />
            <h2 className="text-4xl md:text-7xl font-serif font-black uppercase tracking-tight text-stone-900 mb-6">
               "Fortify for a <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Fortunate Future</span>"
            </h2>
            <p className="text-stone-500 text-sm uppercase tracking-[0.4em]">The Forte-FY Promise</p>
         </div>
      </section>

    </div>
  );
};
