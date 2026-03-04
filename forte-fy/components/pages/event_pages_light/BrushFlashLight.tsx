import React, { useLayoutEffect, useRef } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  isDark?: boolean;
  onBack?: () => void;
}

export const BrushFlashLight: React.FC<EventPageProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'brush-flash');

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();
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

      gsap.to(".text-fill", {
        backgroundPositionX: "0%",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
        }
      });

      // 3. Horizontal Scroll Section (Desktop Only)
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
    <div ref={containerRef} className="min-h-screen bg-stone-50 text-stone-900 overflow-x-hidden selection:bg-[#ff007f] selection:text-white font-sans transition-colors duration-500">
      
      {/* 1. FLASHY HERO SECTION (Split & Pin) */}
      <section className="hero-section h-screen w-full relative flex items-center justify-center overflow-hidden bg-stone-50">
         {/* Glowing Background Orb */}
         <div className="hero-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-to-tr from-[#ff007f]/30 via-[#00ffff]/20 to-[#f4d03f]/30 rounded-full blur-[100px] pointer-events-none" />

         {/* Full Screen Background Image */}
         <div className="hero-bg-img absolute inset-0 z-0">
            <img src="https://picsum.photos/seed/brushflashhero/1920/1080" alt="Exhibition Backdrop" className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-transparent to-stone-50" />
         </div>

         {/* Split Typography - Colorful & Flashy */}
         <h1 className="brush-text absolute z-30 text-[22vw] md:text-[14vw] font-black tracking-tighter text-[#f4d03f] mix-blend-screen pointer-events-none leading-none drop-shadow-[0_0_20px_rgba(244,208,63,0.8)] whitespace-nowrap">
            BRUSH
         </h1>
         <h1 className="flash-text absolute z-30 text-[22vw] md:text-[14vw] font-black tracking-tighter text-transparent [-webkit-text-stroke:2px_#ff007f] md:[-webkit-text-stroke:4px_#ff007f] mix-blend-screen pointer-events-none leading-none drop-shadow-[0_0_20px_rgba(255,0,127,0.8)] whitespace-nowrap">
            & FLASH
         </h1>

         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.5em] text-[#00ffff] font-bold animate-pulse z-40">
            Scroll to ignite
         </div>
      </section>

      {/* 2. OUR STORY SECTION (Compact & Unified) */}
      <section id="executive-summary" className="intro-section py-32 px-6 md:px-24 bg-stone-100 relative z-10 overflow-hidden min-h-[80vh] flex flex-col justify-center">
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
               <h2 className="text-xs font-black uppercase tracking-[0.5em] text-stone-900/40">The Narrative</h2>
            </div>

            <div className="flex flex-col gap-12">
               <h2 className="text-3xl md:text-6xl font-black leading-[1.1] tracking-tighter text-stone-800 uppercase text-center">
                  <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#1c1917_50%,#e7e5e4_50%)] bg-[length:200%_100%] bg-[position:100%_0]">A celebration of </span>
                  <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#ff007f_50%,#e7e5e4_50%)] bg-[length:200%_100%] bg-[position:100%_0]">raw talent </span>
                  <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#1c1917_50%,#e7e5e4_50%)] bg-[length:200%_100%] bg-[position:100%_0]">and </span>
                  <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#00ffff_50%,#e7e5e4_50%)] bg-[length:200%_100%] bg-[position:100%_0]">boundless </span>
                  <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#f4d03f_50%,#e7e5e4_50%)] bg-[length:200%_100%] bg-[position:100%_0]">creativity.</span>
               </h2>

               <div className="relative">
                  <div className="story-content space-y-8 max-w-4xl mx-auto text-center">
                     <p className="story-line text-lg md:text-2xl font-light leading-relaxed text-stone-600">
                        <span className="text-stone-900 font-bold">Brush & Flash</span> was born from a simple idea: bringing together the <span className="text-[#ff007f] italic font-medium">raw feel</span> of traditional art and the <span className="text-[#00ffff] italic font-medium">endless possibilities</span> of digital creativity. We wanted to create a welcoming space where young artists and photographers could just be themselves, share their work, and <span className="text-[#f4d03f] italic font-medium">grow together</span>.
                     </p>
                     <p className="story-line text-lg md:text-2xl font-light leading-relaxed text-stone-600">
                        It wasn't just about hosting an exhibition; it was about <span className="text-stone-900 font-bold">building a real community</span>. Every sketch, every digital stroke, and every snapped photo tells a <span className="text-stone-900 italic underline decoration-[#ff007f]/50 underline-offset-8 decoration-2">unique story</span>. We're incredibly proud of the amazing talent we've seen and the genuine connections made along the way.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. PERFORMANCE METRICS SECTION */}
      <section id="performance-metrics" className="metrics-section py-40 px-6 bg-stone-50 relative z-10 border-t border-stone-200 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
         <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="mb-20">
               <span className="text-[#f4d03f] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Section III</span>
               <h2 className="text-sm font-black uppercase tracking-[0.4em] text-stone-900/40">Performance Metrics</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {[
                  { val: event.metrics.reachLabel, label: "Visual Impressions", color: "text-[#f4d03f]" },
                  { val: event.metrics.participants, label: "Artists Exhibited", color: "text-[#ff007f]" },
                  { val: event.metrics.ambassadors, label: "Curators", color: "text-[#00ffff]" },
               ].map((stat, i) => (
                  <div key={i} className="metric-item flex flex-col items-center bg-white p-12 rounded-[3rem] border border-stone-200 shadow-2xl">
                     <h3 className={`text-6xl md:text-8xl font-black tracking-tighter mb-6 ${stat.color} drop-shadow-[0_0_20px_currentColor]`}>{stat.val}</h3>
                     <p className="text-sm font-black uppercase tracking-[0.3em] text-stone-700">{stat.label}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. STRUCTURAL MODALITIES SECTION (Responsive) */}
      <section id="structural-modalities" className="disciplines-section md:h-screen w-full overflow-hidden bg-stone-50 relative z-10 border-t border-stone-200">
         <div className="absolute top-12 left-12 z-50 text-stone-900 mix-blend-difference">
            <span className="text-[#ff007f] text-[10px] font-black uppercase tracking-[0.6em] mb-2 block">Section IV</span>
            <h2 className="text-sm font-black uppercase tracking-[0.4em]">Structural Modalities</h2>
         </div>

         {/* Marquee moved inside medium section */}
         <div className="absolute bottom-0 left-0 w-full bg-[#ff007f] py-3 overflow-hidden z-50 border-t-4 border-stone-900">
            <div className="marquee-inner flex gap-8 items-center w-[200%] font-black uppercase tracking-widest text-stone-900 text-xl">
               {[...Array(10)].map((_, i) => (
                  <React.Fragment key={i}>
                     <span>Digital Arts</span><span className="text-white">•</span>
                     <span>Sketching</span><span className="text-white">•</span>
                     <span>Photography</span><span className="text-white">•</span>
                  </React.Fragment>
               ))}
            </div>
         </div>
         
         <div className="disciplines-wrapper flex flex-col md:flex-row w-full md:w-[300vw] h-auto md:h-full">
            {DISCIPLINES.map((disc, idx) => (
               <div key={disc.id} className="w-full md:w-screen min-h-screen md:h-full flex items-center justify-center relative px-6 md:px-24 py-20 md:py-0">
                  <div className={`flex flex-col md:flex-row w-full max-w-6xl items-center justify-between gap-12 md:gap-24 z-10 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                     <div className="w-full md:w-1/2 text-center md:text-left">
                        <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] uppercase" style={{ color: disc.color }}>
                           {disc.title}
                        </h3>
                        <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-lg mx-auto md:mx-0">
                           {disc.description}
                        </p>
                     </div>
                     <div className={`w-full md:w-4/12 ${disc.aspect} overflow-hidden rounded-[2.5rem] border-2 shadow-2xl relative group`} style={{ borderColor: `${disc.color}80`, boxShadow: `0 0 50px ${disc.accent}` }}>
                        <img src={disc.imageUrl} alt={disc.title} className="disc-img w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 5. LAUREATES & LEADERSHIP SECTION */}
      <section id="laureates-leadership" className="winners-section py-24 px-6 bg-stone-100 relative z-10 border-t border-stone-200">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <span className="text-[#00ffff] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Section V</span>
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900 uppercase italic">The <span className="text-[#ff007f]">Apex</span> Circle</h2>
               <p className="text-stone-500 text-sm font-bold uppercase tracking-[0.5em] mt-4">Recognizing Excellence</p>
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
                  <div key={idx} className="bg-white rounded-3xl p-6 border border-stone-200 hover:border-stone-400 transition-all shadow-xl">
                     <h3 className="text-xl font-black uppercase italic mb-6 text-center" style={{ color: segment.color }}>{segment.category}</h3>
                     <div className="space-y-4">
                        {segment.winners.map((winner, i) => (
                           <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors">
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-stone-200">
                                 <img src={winner.img} alt={winner.name} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all" />
                              </div>
                              <div>
                                 <h4 className="text-sm font-bold text-stone-900 uppercase">{winner.name}</h4>
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
                  <div key={i} className="flex items-center gap-5 bg-white p-5 rounded-3xl border border-stone-200 transition-all hover:bg-stone-50 hover:border-stone-400 shadow-lg">
                     <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2" style={{ borderColor: leader.color }}>
                        <img src={leader.img} alt={leader.name} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all" />
                     </div>
                     <div className="text-left">
                        <h4 className="text-lg font-black text-stone-900 uppercase mb-0.5">{leader.name}</h4>
                        <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: leader.color }}>{leader.role}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. CURATED ARCHIVE SECTION */}
      <section id="curated-archive" className="py-32 px-6 bg-stone-100 relative z-10 border-t border-stone-200">
         <div className="max-w-7xl mx-auto">
            <div className="mb-24 flex flex-col items-center text-center">
               <span className="text-[#00ffff] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Section VI</span>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-stone-900 uppercase">Curated <span className="text-[#ff007f]">Archive</span></h2>
               <p className="text-[#00ffff] text-sm font-bold uppercase tracking-widest mt-6">Scroll to reveal</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
               {[1, 2, 3, 4, 5, 6].map((item, i) => (
                  <div key={item} className={`gallery-item group cursor-pointer ${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
                     <div className="w-full aspect-[3/4] overflow-hidden rounded-3xl border border-stone-300 shadow-2xl relative">
                        <img src={`https://picsum.photos/seed/minacc${item}/800/1000`} alt={`Gallery ${item}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

      {/* 7. INSTITUTIONAL SYNERGY SECTION */}
      <footer id="institutional-synergy" className="py-32 px-6 md:px-24 bg-stone-200 relative z-10 border-t border-stone-300">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <span className="text-[#f4d03f] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Section VII</span>
               <h2 className="text-sm font-black uppercase tracking-[0.4em] text-stone-900/40">Institutional Synergy</h2>
            </div>

            <div className="mb-32">
               <h3 className="text-center text-sm font-black uppercase tracking-[0.4em] text-stone-900/40 mb-20">Strategic Sponsors</h3>
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

            <h3 className="text-center text-sm font-black uppercase tracking-[0.4em] text-stone-900/40 mb-20">Institutional Partners</h3>
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
