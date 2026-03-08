import React, { useLayoutEffect, useRef } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  isDark: boolean;
  onBack: () => void;
}

export const BrushFlash: React.FC<EventPageProps> = ({ isDark, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'brush-flash');

  useLayoutEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 100);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Scrubbed Explosion
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        }
      });

      heroTl.to(".brush-text", { x: "-40vw", y: "-20vh", rotation: -15, scale: 1.5, opacity: 0, filter: "blur(10px)", ease: "power1.inOut" }, 0)
            .to(".flash-text", { x: "40vw", y: "20vh", rotation: 15, scale: 1.5, opacity: 0, filter: "blur(10px)", ease: "power1.inOut" }, 0)
            .to(".hero-bg-img", { scale: 1.2, opacity: 0.3, filter: "blur(10px)", ease: "power1.inOut" }, 0)
            .to(".hero-bg-glow", { scale: 3, opacity: 0, ease: "power1.inOut" }, 0);

      // 2. Intro Clip-Path & Text Fill Reveal
      gsap.from(".intro-section", {
        clipPath: "inset(20% 20% 20% 20% round 100px)",
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        }
      });

      // Interactive Text Color Reveal
      const textFillTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      
      textFillTl.to(".interactive-text-span", {
        backgroundPosition: "0% 50%",
        stagger: 0.1,
        ease: "none"
      });

      // Count Up Animation
      gsap.utils.toArray('.count-up').forEach((el: any) => {
        const target = parseInt(el.getAttribute('data-value'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        
        gsap.fromTo(el, 
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.5,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "restart none none reverse",
            },
            onUpdate: function() {
              const val = Math.ceil(this.targets()[0].innerText);
              el.innerText = val.toLocaleString() + suffix;
            }
          }
        );
      });

      // 3. Horizontal Scroll Section (Desktop Only)
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        gsap.to(".disciplines-wrapper", {
          xPercent: -66.666, // Move 2 out of 3 panels to the left
          ease: "none",
          scrollTrigger: {
            trigger: ".disciplines-section",
            start: "top top",
            end: "+=300%", // Pin for 3 screen heights
            pin: true,
            scrub: 1,
          }
        });

        // Parallax images inside horizontal scroll
        gsap.utils.toArray('.disc-img').forEach((img: any) => {
           gsap.to(img, {
              rotation: 15,
              scale: 1.2,
              ease: "none",
              scrollTrigger: {
                 trigger: ".disciplines-section",
                 start: "top top",
                 end: "+=300%",
                 scrub: 1
              }
           });
        });
      });

      // 4. Gallery Extreme Parallax
      gsap.utils.toArray('.gallery-item').forEach((item: any, i) => {
         gsap.fromTo(item, 
            { y: 200, opacity: 0, scale: 0.8, rotation: i % 2 === 0 ? 10 : -10 },
            { 
               y: 0, opacity: 1, scale: 1, rotation: 0, 
               scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  end: "top 40%",
                  scrub: 1
               }
            }
         );
      });

      // 5. Metrics 3D Flip
      gsap.from(".metric-item", {
        y: 150,
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% 0%",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".metrics-section",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      });

      // Executive Summary / Our Story Animation
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#executive-summary",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      storyTl.from(".story-line", {
        y: 60,
        opacity: 0,
        rotateX: -20,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out"
      })
      .from(".story-accent-line", {
        scaleX: 0,
        duration: 1,
        ease: "power3.inOut"
      }, "-=1");

      // Floating interactive elements in Story section
      gsap.to(".story-float", {
        y: "random(-40, 40)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 6. Marquee Scroll Velocity
      gsap.to(".marquee-inner", {
         xPercent: -50,
         ease: "none",
         scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5
         }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  const DISCIPLINES = [
    {
      id: 'traditional-art',
      title: 'Traditional Art',
      description: 'The traditional art segment focuses on the fundamental principles of sketching and drawing, emphasizing technical proficiency and classical aesthetics.',
      imageUrl: 'https://picsum.photos/seed/sketch3/800/800',
      color: '#f4d03f',
      accent: 'rgba(244,208,63,0.2)',
      aspect: 'aspect-square'
    },
    {
      id: 'digital-art',
      title: 'Digital Arts',
      description: 'The digital arts segment explores the intersection of technology and creativity, utilizing modern software to push the boundaries of visual storytelling.',
      imageUrl: 'https://picsum.photos/seed/digital3/800/800',
      color: '#00ffff',
      accent: 'rgba(0,255,255,0.2)',
      aspect: 'aspect-square'
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'The photography segment is dedicated to the art of capturing light and perspective, showcasing the power of a single moment frozen in time.',
      imageUrl: 'https://picsum.photos/seed/photo3/800/800',
      color: '#ff007f',
      accent: 'rgba(255,0,127,0.2)',
      aspect: 'aspect-square'
    }
  ];

  return (
    <div ref={containerRef} className={`min-h-screen ${isDark ? 'bg-[#050505] text-[#e5e5e5]' : 'bg-[#f8f8f8] text-[#1a1a1a]'} overflow-x-hidden selection:bg-[#ff007f] selection:text-white font-sans transition-colors duration-500`}>
      
      {/* Back Button */}
      <div className="fixed top-0 left-0 w-full z-[110] px-8 py-10 md:px-12 md:py-12 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-6 text-[#ff007f]/60 hover:text-[#ff007f] transition-all pointer-events-auto"
        >
          <div className="p-3 border-2 border-[#ff007f]/30 group-hover:border-[#ff007f] rounded-full transition-all bg-black/60 backdrop-blur-xl shadow-[0_0_20px_rgba(255,0,127,0.3)]">
            <ArrowLeft size={22} className="text-[#ff007f]" />
          </div>
          <span className="text-[12px] font-black uppercase tracking-[0.6em] hidden sm:block translate-y-0.5">Archive</span>
        </button>
      </div>

      {/* 1. FLASHY HERO SECTION (Split & Pin) */}
      <section className={`hero-section h-screen w-full relative flex items-center justify-center overflow-hidden ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
         {/* Glowing Background Orb */}
         <div className="hero-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-to-tr from-[#ff007f]/30 via-[#00ffff]/20 to-[#f4d03f]/30 rounded-full blur-[100px] pointer-events-none" />

         {/* Full Screen Background Image */}
         <div className="hero-bg-img absolute inset-0 z-0">
            <img src="https://picsum.photos/seed/brushflashhero/1920/1080" alt="Exhibition Backdrop" className={`w-full h-full object-cover ${isDark ? 'opacity-60' : 'opacity-40'}`} referrerPolicy="no-referrer" />
            <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-[#050505]/80 via-transparent to-[#050505]' : 'from-white/80 via-transparent to-white'}`} />
         </div>

         {/* Split Typography - Colorful & Flashy */}
         <h1 className="brush-text absolute z-30 text-[22vw] md:text-[14vw] font-black tracking-tighter text-[#f4d03f] mix-blend-screen pointer-events-none leading-none drop-shadow-[0_0_20px_rgba(244,208,63,0.8)]">
            BRUSH
         </h1>
         <h1 className="flash-text absolute z-30 text-[22vw] md:text-[14vw] font-black tracking-tighter text-transparent [-webkit-text-stroke:2px_#ff007f] md:[-webkit-text-stroke:4px_#ff007f] mix-blend-screen pointer-events-none leading-none drop-shadow-[0_0_20px_rgba(255,0,127,0.8)]">
            & FLASH
         </h1>

         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.5em] text-[#00ffff] font-bold animate-pulse z-40">
            Scroll to ignite
         </div>

         {/* Marquee strip moved to Hero Bottom */}
         <div className="absolute bottom-0 left-0 w-full bg-[#ff007f] py-3 overflow-hidden z-50 border-t-4 border-black">
            <div className="marquee-inner flex gap-8 items-center w-[200%] font-black uppercase tracking-widest text-black text-xl">
               {[...Array(10)].map((_, i) => (
                  <React.Fragment key={i}>
                     <span>Digital Arts</span><span className="text-white">•</span>
                     <span>Sketching</span><span className="text-white">•</span>
                     <span>Photography</span><span className="text-white">•</span>
                  </React.Fragment>
               ))}
            </div>
         </div>
      </section>

      {/* 2. OUR STORY SECTION (Compact & Unified) */}
      <section id="executive-summary" className={`intro-section py-32 px-6 md:px-24 ${isDark ? 'bg-[#080808]' : 'bg-[#f0f0f0]'} relative z-10 overflow-hidden min-h-[80vh] flex flex-col justify-center`}>
         {/* Hyper-Interactive Background Elements */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="story-float absolute top-[10%] left-[5%] w-32 h-32 bg-[#ff007f]/10 rounded-full blur-3xl" />
            <div className="story-float absolute bottom-[15%] right-[10%] w-64 h-64 bg-[#00ffff]/10 rounded-full blur-3xl" />
         </div>

         <div className="max-w-5xl mx-auto relative z-10 w-full">
            <div className="flex flex-col items-center text-center mb-16">
               <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-8 bg-[#ff007f]" />
                  <span className="text-[#ff007f] text-[10px] font-black uppercase tracking-[0.8em]">Section II</span>
                  <div className="h-px w-8 bg-[#ff007f]" />
               </div>
               <h2 className={`text-xs font-black uppercase tracking-[0.5em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>The Narrative</h2>
            </div>

            <div className="flex flex-col gap-12">
               <h2 className={`text-3xl md:text-6xl font-black leading-[1.1] tracking-tighter ${isDark ? 'text-zinc-800' : 'text-zinc-300'} uppercase text-center`}>
                  <span className={`interactive-text-span bg-clip-text text-transparent ${isDark ? 'bg-[linear-gradient(to_right,#ffffff_50%,#333333_50%)]' : 'bg-[linear-gradient(to_right,#1a1a1a_50%,#cccccc_50%)]'} bg-[length:200%_100%] bg-[position:100%_0]`}>A celebration of </span>
                  <span className={`interactive-text-span bg-clip-text text-transparent ${isDark ? 'bg-[linear-gradient(to_right,#ff007f_50%,#333333_50%)]' : 'bg-[linear-gradient(to_right,#ff007f_50%,#cccccc_50%)]'} bg-[length:200%_100%] bg-[position:100%_0]`}>raw talent </span>
                  <span className={`interactive-text-span bg-clip-text text-transparent ${isDark ? 'bg-[linear-gradient(to_right,#ffffff_50%,#333333_50%)]' : 'bg-[linear-gradient(to_right,#1a1a1a_50%,#cccccc_50%)]'} bg-[length:200%_100%] bg-[position:100%_0]`}>and </span>
                  <span className={`interactive-text-span bg-clip-text text-transparent ${isDark ? 'bg-[linear-gradient(to_right,#00ffff_50%,#333333_50%)]' : 'bg-[linear-gradient(to_right,#00ffff_50%,#cccccc_50%)]'} bg-[length:200%_100%] bg-[position:100%_0]`}>boundless </span>
                  <span className={`interactive-text-span bg-clip-text text-transparent ${isDark ? 'bg-[linear-gradient(to_right,#f4d03f_50%,#333333_50%)]' : 'bg-[linear-gradient(to_right,#f4d03f_50%,#cccccc_50%)]'} bg-[length:200%_100%] bg-[position:100%_0]`}>creativity.</span>
               </h2>

               <div className="relative">
                  <div className="story-content space-y-8 max-w-4xl mx-auto text-center">
                     <p className={`story-line text-lg md:text-2xl font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <span className={`${isDark ? 'text-white' : 'text-black'} font-bold`}>Brush & Flash</span> was born from a simple idea: bringing together the <span className="text-[#ff007f] italic font-medium">raw feel</span> of traditional art and the <span className="text-[#00ffff] italic font-medium">endless possibilities</span> of digital creativity. We wanted to create a welcoming space where young artists and photographers could just be themselves, share their work, and <span className="text-[#f4d03f] italic font-medium">grow together</span>.
                     </p>
                     <p className={`story-line text-lg md:text-2xl font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        It wasn't just about hosting an exhibition; it was about <span className={`${isDark ? 'text-white' : 'text-black'} font-bold`}>building a real community</span>. Every sketch, every digital stroke, and every snapped photo tells a <span className={`${isDark ? 'text-white' : 'text-black'} italic underline decoration-[#ff007f]/50 underline-offset-8 decoration-2`}>unique story</span>. We're incredibly proud of the amazing talent we've seen and the genuine connections made along the way.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. PERFORMANCE METRICS SECTION */}
      <section id="performance-metrics" className={`metrics-section py-40 px-6 ${isDark ? 'bg-[#050505]' : 'bg-white'} relative z-10 border-t ${isDark ? 'border-white/10' : 'border-black/10'} overflow-hidden`}>
         <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] ${isDark ? 'opacity-10' : 'opacity-5'}`} />
         <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="mb-20">
               <span className="text-[#f4d03f] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Section III</span>
               <h2 className={`text-sm font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>Performance Metrics</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {[
                  { val: event.metrics.reachLabel, label: "Visual Impressions", color: "text-[#f4d03f]" },
                  { val: event.metrics.participants, label: "Artists Exhibited", color: "text-[#ff007f]" },
                  { val: event.metrics.ambassadors, label: "Curators", color: "text-[#00ffff]" },
               ].map((stat, i) => {
                  const numVal = parseInt(String(stat.val).replace(/\D/g, ''), 10) || 0;
                  const suffix = String(stat.val).replace(/[0-9]/g, '');
                  return (
                     <div key={i} className={`metric-item flex flex-col items-center ${isDark ? 'bg-[#111]' : 'bg-[#f0f0f0]'} p-12 rounded-[3rem] border ${isDark ? 'border-white/5' : 'border-black/5'} shadow-2xl`}>
                        <h3 className={`text-6xl md:text-8xl font-black tracking-tighter mb-6 ${stat.color} drop-shadow-[0_0_20px_currentColor]`}>
                           <span className="count-up" data-value={numVal} data-suffix={suffix}>0</span>
                        </h3>
                        <p className={`text-sm font-black uppercase tracking-[0.3em] ${isDark ? 'text-white/70' : 'text-black/70'}`}>{stat.label}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* 4. STRUCTURAL MODALITIES SECTION */}
      <section id="structural-modalities" className={`disciplines-section md:h-screen w-full overflow-hidden ${isDark ? 'bg-[#050505]' : 'bg-white'} relative z-10 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
         <div className={`absolute top-12 left-12 z-50 ${isDark ? 'text-white' : 'text-black'} mix-blend-difference`}>
            <span className="text-[#ff007f] text-[10px] font-black uppercase tracking-[0.6em] mb-2 block">Section IV</span>
            <h2 className="text-sm font-black uppercase tracking-[0.4em]">Structural Modalities</h2>
         </div>
         
         <div className="disciplines-wrapper flex flex-col md:flex-row w-full md:w-[300vw] h-auto md:h-full">
            {DISCIPLINES.map((disc, idx) => (
               <div key={disc.id} className="w-full md:w-screen min-h-screen md:h-full flex items-center justify-center relative px-6 md:px-24 py-20 md:py-0">
                  <div className={`flex flex-col md:flex-row w-full max-w-6xl items-center justify-between gap-12 md:gap-24 z-10 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                     <div className="w-full md:w-1/2 text-center md:text-left">
                        <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] uppercase" style={{ color: disc.color }}>
                           {disc.title}
                        </h3>
                        <p className={`text-lg md:text-xl ${isDark ? 'text-zinc-300' : 'text-zinc-600'} font-light leading-relaxed max-w-lg mx-auto md:mx-0`}>
                           {disc.description}
                        </p>
                     </div>
                     <div className={`w-full md:w-4/12 ${disc.aspect} overflow-hidden rounded-[2.5rem] border-2 shadow-2xl relative group`} style={{ borderColor: `${disc.color}80`, boxShadow: `0 0 50px ${disc.accent}` }}>
                        {/* Signature Badge */}
                        {disc.id === 'traditional-art' && (
                           <div className="absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#f4d03f] text-[#f4d03f] text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                              Signature Discipline
                           </div>
                        )}
                        <img src={disc.imageUrl} alt={disc.title} className="disc-img w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000" referrerPolicy="no-referrer" />
                        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black/40' : 'bg-gradient-to-t from-black/20'} to-transparent`} />
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 5. LAUREATES & LEADERSHIP SECTION */}
      <section id="laureates-leadership" className={`winners-section py-24 px-6 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'} relative z-10 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <span className="text-[#00ffff] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Section V</span>
               <h2 className={`text-4xl md:text-6xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-black'} uppercase italic`}>The <span className="text-[#ff007f]">Apex</span> Circle</h2>
               <p className={`${isDark ? 'text-zinc-500' : 'text-zinc-400'} text-sm font-bold uppercase tracking-[0.5em] mt-4`}>Recognizing Excellence</p>
            </div>

            {/* Segment Winners - Compact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
               {[
                  { 
                     category: "Traditional Art", 
                     color: "#f4d03f",
                     winners: [
                        { name: "Abrar Zahin", rank: "1st Position", img: "https://picsum.photos/seed/winner1/400/400" },
                        { name: "Samiul Haque", rank: "2nd Position", img: "https://picsum.photos/seed/winner4/400/400" },
                        { name: "Rifat Ahmed", rank: "3rd Position", img: "https://picsum.photos/seed/winner5/400/400" },
                     ]
                  },
                  { 
                     category: "Digital Arts", 
                     color: "#00ffff",
                     winners: [
                        { name: "Nafis Fuad", rank: "1st Position", img: "https://picsum.photos/seed/winner2/400/400" },
                        { name: "Zayed Khan", rank: "2nd Position", img: "https://picsum.photos/seed/winner6/400/400" },
                        { name: "Tanvir Hasan", rank: "3rd Position", img: "https://picsum.photos/seed/winner7/400/400" },
                     ]
                  },
                  { 
                     category: "Photography", 
                     color: "#ff007f",
                     winners: [
                        { name: "Samiul Islam", rank: "1st Position", img: "https://picsum.photos/seed/winner3/400/400" },
                        { name: "Mahir Faisal", rank: "2nd Position", img: "https://picsum.photos/seed/winner8/400/400" },
                        { name: "Adnan Sami", rank: "3rd Position", img: "https://picsum.photos/seed/winner9/400/400" },
                     ]
                  }
               ].map((segment, idx) => (
                  <div key={idx} className={`${isDark ? 'bg-[#111]' : 'bg-white'} rounded-3xl p-6 border ${isDark ? 'border-white/5' : 'border-black/5'} hover:border-white/20 transition-all shadow-xl`}>
                     <h3 className="text-xl font-black uppercase italic mb-6 text-center" style={{ color: segment.color }}>{segment.category}</h3>
                     <div className="space-y-4">
                        {segment.winners.map((winner, i) => (
                           <div key={i} className={`flex items-center gap-4 p-3 rounded-2xl ${isDark ? 'bg-black/50' : 'bg-[#f8f8f8]'} border ${isDark ? 'border-white/5' : 'border-black/5'} hover:bg-white/5 transition-colors`}>
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10">
                                 <img src={winner.img} alt={winner.name} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all" />
                              </div>
                              <div>
                                 <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'} uppercase`}>{winner.name}</h4>
                                 <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: segment.color }}>{winner.rank}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>

            {/* Leadership Recognition - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
               {[
                  { name: "Tasnim Mahi", role: "Best Campus Ambassador", img: "https://i.postimg.cc/MpCtwTRz/485146929-652411014185940-2123160853129889170-n-(1).jpg", color: "#00ffff" },
                  { name: "Durrah Mehnaz Arshi", role: "Best Coordinator", img: "https://i.postimg.cc/gkwTb1Qd/1000206343.jpg", color: "#ff007f" },
               ].map((leader, i) => (
                  <div key={i} className={`flex items-center gap-5 ${isDark ? 'bg-zinc-900/40 backdrop-blur-md' : 'bg-white'} p-6 rounded-[2rem] border ${isDark ? 'border-white/10' : 'border-black/5'} shadow-2xl relative overflow-hidden group`}>
                     {/* Glassy Background Effect */}
                     <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500`} style={{ backgroundColor: leader.color }} />
                     
                     {/* Decorative Blob */}
                     <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full blur-2xl opacity-20" style={{ backgroundColor: leader.color }} />

                     <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 relative z-10 shadow-lg" style={{ borderColor: leader.color }}>
                        <img src={leader.img} alt={leader.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                     </div>
                     <div className="text-left relative z-10">
                        <h4 className={`text-lg font-black ${isDark ? 'text-white' : 'text-black'} uppercase mb-1 tracking-tight`}>{leader.name}</h4>
                        <div className="flex items-center gap-2">
                           <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: leader.color }} />
                           <p className="text-[10px] font-bold uppercase tracking-widest opacity-80" style={{ color: leader.color }}>{leader.role}</p>
                        </div>
                     </div>
                     <Trophy className="absolute right-6 bottom-6 opacity-10 rotate-12" size={40} style={{ color: leader.color }} />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. CURATED ARCHIVE SECTION */}
      <section id="curated-archive" className={`py-32 px-6 ${isDark ? 'bg-[#111111]' : 'bg-white'} relative z-10 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
         <div className="max-w-7xl mx-auto">
            <div className="mb-24 flex flex-col items-center text-center">
               <span className="text-[#00ffff] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Section VI</span>
               <h2 className={`text-5xl md:text-7xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-black'} uppercase`}>Curated <span className="text-[#ff007f]">Archive</span></h2>
               <p className="text-[#00ffff] text-sm font-bold uppercase tracking-widest mt-6">Scroll to reveal</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
               {[1, 2, 3, 4, 5, 6].map((item, i) => (
                  <div key={item} className={`gallery-item group cursor-pointer ${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
                     <div className={`w-full aspect-[3/4] overflow-hidden rounded-3xl border ${isDark ? 'border-white/10' : 'border-black/10'} shadow-2xl relative`}>
                        <img src={`https://picsum.photos/seed/minacc${item}/800/1000`} alt={`Gallery ${item}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black/80' : 'from-black/60'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                           <h4 className="text-2xl font-black text-white uppercase">Artwork {item}</h4>
                           <span className="text-sm font-bold text-[#f4d03f] uppercase tracking-widest">View Details</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Metrics section removed from here as it was moved up */}

      {/* 7. INSTITUTIONAL SYNERGY SECTION */}
      <footer id="institutional-synergy" className={`py-32 px-6 md:px-24 ${isDark ? 'bg-[#050505]' : 'bg-[#f8f8f8]'} relative z-10 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <span className="text-[#f4d03f] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Section VII</span>
               <h2 className={`text-sm font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>Institutional Synergy</h2>
            </div>

            <div className="mb-32">
               <h3 className={`text-center text-sm font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/40' : 'text-black/40'} mb-20`}>Strategic Sponsors</h3>
               <div className="flex flex-wrap justify-center gap-16 md:gap-32 items-center">
                  {[
                     { name: 'Nagad', url: 'https://i.postimg.cc/pTXrrLWm/images.png' },
                     { name: 'Valiant 360 Solution', url: 'https://via.placeholder.com/400x160/000000/00f7ff?text=Valiant+360+Solution' }
                  ].map((s, i) => (
                     <div key={i} className="h-20 md:h-32 group transition-all duration-500 hover:scale-110">
                        <img src={s.url} alt={s.name} className="h-full w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
                     </div>
                  ))}
               </div>
            </div>

            <h3 className={`text-center text-sm font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/40' : 'text-black/40'} mb-20`}>Institutional Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center justify-items-center opacity-50">
               {[...PARTNER_LOGOS].slice(0, 12).map((p, i) => (
                  <div key={i} className="w-24 h-24 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 flex items-center justify-center p-4 hover:scale-110">
                     <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain" />
                  </div>
               ))}
            </div>
         </div>
      </footer>

    </div>
  );
};
