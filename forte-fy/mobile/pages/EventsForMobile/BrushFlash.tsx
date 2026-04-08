import React, { useLayoutEffect, useRef, useState } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import { Globe, Users, MapPin, Calendar, Trophy, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  isDark: boolean;
  onBack: () => void;
}

export const BrushFlashMobile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const isDark = true;
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'brush-flash');
  const [activeCategory, setActiveCategory] = useState(0);

  useLayoutEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 100);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {

      // ─── 1. HERO SCRUBBED EXPLOSION (identical to PC) ───
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        }
      });

      heroTl
        .to(".brush-text",   { x: "-40vw", y: "-20vh", rotation: -15, scale: 1.5, opacity: 0, filter: "blur(10px)", ease: "power1.inOut" }, 0)
        .to(".flash-text",   { x: "40vw",  y: "20vh",  rotation:  15, scale: 1.5, opacity: 0, filter: "blur(10px)", ease: "power1.inOut" }, 0)
        .to(".hero-bg-img",  { scale: 1.2, opacity: 0.3, filter: "blur(10px)", ease: "power1.inOut" }, 0)
        .to(".hero-bg-glow", { scale: 3,   opacity: 0, ease: "power1.inOut" }, 0);

      // ─── 2. INTRO CLIP-PATH & TEXT FILL REVEAL ───
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

      // ─── 3. HORIZONTAL SCROLL DISCIPLINES (identical logic to PC) ───
      const horizontalScrollTween = gsap.to(".disciplines-wrapper", {
        xPercent: -66.666,
        ease: "none",
        scrollTrigger: {
          trigger: ".disciplines-section",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      // Parallax images inside horizontal scroll (identical to PC)
      gsap.utils.toArray('.disc-img').forEach((img: any) => {
        gsap.to(img, {
          rotation: 15,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: ".disciplines-section",
            start: "top top",
            end: "+=300%",
            scrub: 1,
          }
        });
      });

      // Text Parallax in Horizontal Scroll
      gsap.utils.toArray('.disc-text').forEach((text: any) => {
        gsap.fromTo(text, 
          { x: 100, opacity: 0 },
          {
            x: 0, opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              containerAnimation: horizontalScrollTween,
              start: "left center",
              end: "center center",
              scrub: 1,
            }
          }
        );
      });

      // ─── 4. GALLERY EXTREME PARALLAX (identical to PC) ───
      gsap.utils.toArray('.gallery-item').forEach((item: any, i) => {
        gsap.fromTo(item,
          { y: 200, opacity: 0, scale: 0.8, rotation: i % 2 === 0 ? 10 : -10 },
          {
            y: 0, opacity: 1, scale: 1, rotation: 0,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );
      });

      // ─── 5. METRICS 3D FLIP (identical to PC) ───
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

      // ─── 6. EXECUTIVE SUMMARY / OUR STORY (identical to PC) ───
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#executive-summary",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      storyTl
        .from(".story-line", {
          y: 60,
          opacity: 0,
          rotateX: -20,
          stagger: 0.15,
          duration: 1.2,
          ease: "expo.out",
        })
        .from(".story-accent-line", {
          scaleX: 0,
          duration: 1,
          ease: "power3.inOut",
        }, "-=1");

      // Floating interactive elements in Story section (identical to PC)
      gsap.to(".story-float", {
        y: "random(-40, 40)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ─── 7. MARQUEE SCROLL VELOCITY (identical to PC) ───
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
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
      aspect: 'aspect-square',
    },
    {
      id: 'digital-art',
      title: 'Digital Arts',
      description: 'The digital arts segment explores the intersection of technology and creativity, utilizing modern software to push the boundaries of visual storytelling.',
      imageUrl: 'https://picsum.photos/seed/digital3/800/800',
      color: '#00ffff',
      accent: 'rgba(0,255,255,0.2)',
      aspect: 'aspect-square',
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'The photography segment is dedicated to the art of capturing light and perspective, showcasing the power of a single moment frozen in time.',
      imageUrl: 'https://picsum.photos/seed/photo3/800/800',
      color: '#ff007f',
      accent: 'rgba(255,0,127,0.2)',
      aspect: 'aspect-square',
    },
  ];

  const WINNERS = [
    {
      category: "Traditional Art",
      color: "#f4d03f",
      winners: [
        { name: "Abrar Zahin",  rank: "1st", img: "https://picsum.photos/seed/winner1/200/200" },
        { name: "Samiul Haque", rank: "2nd", img: "https://picsum.photos/seed/winner4/200/200" },
        { name: "Rifat Ahmed",  rank: "3rd", img: "https://picsum.photos/seed/winner5/200/200" },
      ]
    },
    {
      category: "Digital Arts",
      color: "#00ffff",
      winners: [
        { name: "Nafis Fuad",   rank: "1st", img: "https://picsum.photos/seed/winner2/200/200" },
        { name: "Zayed Khan",   rank: "2nd", img: "https://picsum.photos/seed/winner6/200/200" },
        { name: "Tanvir Hasan", rank: "3rd", img: "https://picsum.photos/seed/winner7/200/200" },
      ]
    },
    {
      category: "Photography",
      color: "#ff007f",
      winners: [
        { name: "Samiul Islam", rank: "1st", img: "https://picsum.photos/seed/winner3/200/200" },
        { name: "Mahir Faisal", rank: "2nd", img: "https://picsum.photos/seed/winner8/200/200" },
        { name: "Adnan Sami",   rank: "3rd", img: "https://picsum.photos/seed/winner9/200/200" },
      ]
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${'bg-[#050505] text-[#e5e5e5]'} overflow-x-hidden selection:bg-[#ff007f] selection:text-white font-sans transition-colors duration-500 [&::-webkit-scrollbar]:hidden`}
    >

      {/* ════════════════════════════════════════
          1. HERO — identical markup to PC
      ════════════════════════════════════════ */}
      <section className={`hero-section h-screen w-full relative flex items-center justify-center overflow-hidden ${'bg-[#050505]'}`}>
        {/* Glowing Background Orb */}
        <div className={`hero-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-gradient-to-tr from-[#ff007f]/30 ${'via-[#00ffff]/20'} to-[#f4d03f]/30 rounded-full blur-[80px] pointer-events-none`} />

        {/* Full Screen Background Image */}
        <div className="hero-bg-img absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/brushflashhero/1080/1920"
            alt="Exhibition Backdrop"
            className={`w-full h-full object-cover ${'opacity-60'}`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${'from-[#050505]/80 via-transparent to-[#050505]'}`} />
        </div>

        {/* Split Typography — same class names as PC so GSAP targets identically */}
        <h1 className={`brush-text absolute z-30 text-[22vw] font-black tracking-tighter ${'text-[#f4d03f] mix-blend-screen'} pointer-events-none leading-none drop-shadow-[0_0_20px_rgba(244,208,63,0.8)]`}>
          BRUSH
        </h1>
        <h1 className={`flash-text absolute z-30 text-[22vw] font-black tracking-tighter text-transparent ${'[-webkit-text-stroke:2px_#ff007f] mix-blend-screen'} pointer-events-none leading-none drop-shadow-[0_0_20px_rgba(255,0,127,0.8)]`}>
          &amp; FLASH
        </h1>
        {/* Marquee strip moved to Hero Bottom */}
        <div className="absolute bottom-0 left-0 w-full bg-[#ff007f] py-3 overflow-hidden z-50 border-t-4 border-black">
          <div className="marquee-inner flex gap-8 items-center w-[200%] font-black uppercase tracking-widest text-black text-base">
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

      {/* ════════════════════════════════════════
          2. OUR STORY — identical to PC (clip-path + text-fill)
      ════════════════════════════════════════ */}
      <section
        id="executive-summary"
        className={`intro-section py-24 px-6 ${'bg-[#080808]'} relative z-10 overflow-hidden min-h-[80vh] flex flex-col justify-center`}
        style={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      >
        {/* Floating blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="story-float absolute top-[10%] left-[5%] w-32 h-32 bg-[#ff007f]/10 rounded-full blur-3xl" />
          <div className={`story-float absolute bottom-[15%] right-[10%] w-48 h-48 ${'bg-[#00ffff]/10'} rounded-full blur-3xl`} />
        </div>

        <div className="max-w-lg mx-auto relative z-10 w-full">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-8 bg-[#ff007f]" />
              <span className="text-[#ff007f] text-[10px] font-black uppercase tracking-[0.8em]">Section II</span>
              <div className="h-px w-8 bg-[#ff007f]" />
            </div>
            <h2 className={`text-xs font-black uppercase tracking-[0.5em] ${'text-white/40'}`}>The Narrative</h2>
          </div>

          <div className="flex flex-col gap-10">
            {/* Text-fill headline — Interactive Scroll Gradient */}
            <h2 className={`text-3xl font-black leading-[1.1] tracking-tighter uppercase text-center ${'text-zinc-800'}`}>
              <span className={`interactive-text-span bg-clip-text text-transparent ${'bg-[linear-gradient(to_right,#ffffff_50%,#333333_50%)]'} bg-[length:200%_100%] bg-[position:100%_0]`}>A celebration of </span>
              <span className={`interactive-text-span bg-clip-text text-transparent ${'bg-[linear-gradient(to_right,#ff007f_50%,#333333_50%)]'} bg-[length:200%_100%] bg-[position:100%_0]`}>raw talent </span>
              <span className={`interactive-text-span bg-clip-text text-transparent ${'bg-[linear-gradient(to_right,#ffffff_50%,#333333_50%)]'} bg-[length:200%_100%] bg-[position:100%_0]`}>and </span>
              <span className={`interactive-text-span bg-clip-text text-transparent ${'bg-[linear-gradient(to_right,#00ffff_50%,#333333_50%)]'} bg-[length:200%_100%] bg-[position:100%_0]`}>boundless </span>
              <span className={`interactive-text-span bg-clip-text text-transparent ${'bg-[linear-gradient(to_right,#f4d03f_50%,#333333_50%)]'} bg-[length:200%_100%] bg-[position:100%_0]`}>creativity.</span>
            </h2>

            <div className="story-content space-y-6 text-center">
              <p className={`story-line text-base font-light leading-relaxed ${'text-zinc-400'}`}>
                <span className={`${'text-white'} font-bold`}>Brush &amp; Flash</span> was born from a simple idea: bringing together the <span className="text-[#ff007f] italic font-medium">raw feel</span> of traditional art and the <span className={`${'text-[#00ffff]'} italic font-medium`}>endless possibilities</span> of digital creativity. We wanted to create a welcoming space where young artists and photographers could just be themselves, share their work, and <span className="text-[#f4d03f] italic font-medium">grow together</span>.
              </p>
              <p className={`story-line text-base font-light leading-relaxed ${'text-zinc-400'}`}>
                It wasn't just about hosting an exhibition; it was about <span className={`${'text-white'} font-bold`}>building a real community</span>. Every sketch, every digital stroke, and every snapped photo tells a <span className={`${'text-white'} italic underline decoration-[#ff007f]/50 underline-offset-8 decoration-2`}>unique story</span>. We're incredibly proud of the amazing talent we've seen and the genuine connections made along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. PERFORMANCE METRICS — 3-D flip (identical to PC)
      ════════════════════════════════════════ */}
      <section
        id="performance-metrics"
        className={`metrics-section py-32 px-6 ${'bg-[#050505]'} relative z-10 border-t ${'border-white/10'} overflow-hidden`}
      >
        <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] ${'opacity-10'}`} />
        <div className="max-w-lg mx-auto text-center relative z-10">
          <div className="mb-16">
            <span className="text-[#f4d03f] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Section III</span>
            <h2 className={`text-sm font-black uppercase tracking-[0.4em] ${'text-white/40'}`}>Performance Metrics</h2>
          </div>

          {/* Compact Grid for Mobile */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: event.metrics.reachLabel,   label: "Impressions", color: "text-[#f4d03f]" },
              { val: event.metrics.participants,  label: "Artists",  color: "text-[#ff007f]" },
              { val: event.metrics.ambassadors,   label: "Curators",           color: "text-[#00ffff]" },
            ].map((stat, i) => {
              // Parse value and suffix (e.g., "86k+" -> val: 86, suffix: "k+")
              const numVal = parseInt(String(stat.val).replace(/\D/g, ''), 10) || 0;
              const suffix = String(stat.val).replace(/[0-9]/g, '');
              
              return (
                <div
                  key={i}
                  className={`metric-item flex flex-col items-center justify-center ${'bg-[#111]'} p-4 rounded-2xl border ${'border-white/5'} shadow-lg`}
                >
                  <h3 className={`text-2xl md:text-3xl font-black tracking-tighter mb-1 ${stat.color} drop-shadow-md`}>
                    <span className="count-up" data-value={numVal} data-suffix={suffix}>0</span>
                  </h3>
                  <p className={`text-[8px] font-black uppercase tracking-widest ${'text-white/60'}`}>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. DISCIPLINES — horizontal scroll pin (identical to PC)
      ════════════════════════════════════════ */}
      <section
        className={`disciplines-section h-[100dvh] w-full overflow-hidden ${'bg-[#050505]'} relative z-10 border-t ${'border-white/10'}`}
      >
        {/* Section header */}
        <div className={`absolute top-8 left-6 z-50 ${'text-white'} mix-blend-difference pointer-events-none`}>
          <span className="text-[#ff007f] text-[10px] font-black uppercase tracking-[0.6em] mb-1 block">Section IV</span>
          <h2 className="text-xs font-black uppercase tracking-[0.4em]">Structural Modalities</h2>
        </div>

        {/* Horizontal wrapper — same class & structure as PC */}
        <div className="disciplines-wrapper flex w-[300vw] h-full">
          {DISCIPLINES.map((disc, idx) => (
            <div
              key={disc.id}
              className="w-[100vw] h-full flex items-center justify-center relative px-6 pt-24 pb-20"
            >
              {/* Enhanced Panel Content */}
              <div className={`flex flex-col items-center justify-center w-full max-w-sm gap-6 z-10 ${idx % 2 !== 0 ? 'flex-col-reverse' : ''}`}>
                
                {/* Text Block */}
                <div className="disc-text w-full text-center relative">
                  {disc.id === 'traditional-art' && (
                     <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#f4d03f]/20 border border-[#f4d03f]/50 text-[#f4d03f] text-[9px] font-black uppercase tracking-widest animate-pulse">
                        Signature Discipline
                     </div>
                  )}
                  <h3
                    className="text-4xl md:text-5xl font-black tracking-tighter mb-3 uppercase drop-shadow-xl"
                    style={{ color: disc.color }}
                  >
                    {disc.title}
                  </h3>
                  <p className={`text-sm ${'text-zinc-300'} font-medium leading-relaxed max-w-[90%] mx-auto`}>
                    {disc.description}
                  </p>
                </div>

                {/* Image Card */}
                <div
                  className={`w-full ${disc.aspect} overflow-hidden rounded-[2.5rem] border-2 shadow-[0_0_30px_rgba(0,0,0,0.3)] relative group`}
                  style={{ borderColor: `${disc.color}`, boxShadow: `0 0 40px ${disc.accent}` }}
                >
                  <img
                    src={disc.imageUrl}
                    alt={disc.title}
                    className="disc-img w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${'from-black/80 via-black/20'} to-transparent`} />
                  
                  {/* Floating Badge inside image */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                     <div className="h-1 w-12 rounded-full" style={{ backgroundColor: disc.color }} />
                     <Trophy size={20} style={{ color: disc.color }} className="drop-shadow-md" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. LAUREATES & LEADERSHIP
      ════════════════════════════════════════ */}
      <section
        id="laureates-leadership"
        className={`py-24 px-6 ${'bg-[#0a0a0a]'} relative z-10 border-t ${'border-white/10'}`}
      >
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-14">
            <span className={`${'text-[#00ffff]'} text-[10px] font-black uppercase tracking-[0.6em] mb-4 block`}>Section V</span>
            <h2 className={`text-4xl font-black tracking-tighter ${'text-white'} uppercase italic`}>
              The <span className="text-[#ff007f]">Apex</span> Circle
            </h2>
            <p className={`${'text-zinc-500'} text-xs font-bold uppercase tracking-[0.5em] mt-3`}>Recognizing Excellence</p>
          </div>

          {/* Tab switcher */}
          <div className={`${'bg-[#111]'} rounded-[2rem] p-4 border ${'border-white/5'} shadow-2xl mb-10`}>
            <div className="flex p-1 rounded-xl bg-black/5 mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
              {WINNERS.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${activeCategory === idx ? 'bg-white text-black shadow-md' : 'text-gray-500'}`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            <div className="space-y-3 min-h-[260px]">
              {WINNERS[activeCategory].winners.map((winner, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-2xl ${'bg-black/50'} border ${'border-white/5'}`}
                >
                  <div className="relative">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2" style={{ borderColor: WINNERS[activeCategory].color }}>
                      <img src={winner.img} alt={winner.name} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold border border-white/20">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-bold ${'text-white'} uppercase`}>{winner.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Trophy size={11} style={{ color: WINNERS[activeCategory].color }} />
                      <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">{winner.rank} Place</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="opacity-30" />
                </div>
              ))}
            </div>
          </div>

          {/* Leadership cards - Enhanced */}
          <div className="grid grid-cols-1 gap-5">
            {[
              { name: "Tasnim Mahi",        role: "Best Campus Ambassador", img: "https://i.postimg.cc/MpCtwTRz/485146929-652411014185940-2123160853129889170-n-(1).jpg", color: "#00ffff" },
              { name: "Durrah Mehnaz Arshi", role: "Best Coordinator",       img: "https://i.postimg.cc/gkwTb1Qd/1000206343.jpg", color: "#ff007f" },
            ].map((leader, i) => (
              <div
                key={i}
                className={`flex items-center gap-5 ${'bg-zinc-900/40 backdrop-blur-md'} p-6 rounded-[2rem] border ${'border-white/10'} shadow-2xl relative overflow-hidden group`}
              >
                {/* Glassy Background Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500`} style={{ backgroundColor: leader.color }} />
                
                {/* Decorative Blob */}
                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full blur-2xl opacity-20" style={{ backgroundColor: leader.color }} />

                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 relative z-10 shadow-lg" style={{ borderColor: leader.color }}>
                  <img src={leader.img} alt={leader.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                
                <div className="text-left relative z-10">
                  <h4 className={`text-lg font-black ${'text-white'} uppercase mb-1 tracking-tight`}>{leader.name}</h4>
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

      {/* ════════════════════════════════════════
          6. CURATED ARCHIVE — gallery extreme parallax (identical to PC)
      ════════════════════════════════════════ */}
      <section
        id="curated-archive"
        className={`py-28 px-6 ${'bg-[#111111]'} relative z-10 border-t ${'border-white/10'}`}
      >
        <div className="max-w-lg mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className={`${'text-[#00ffff]'} text-[10px] font-black uppercase tracking-[0.6em] mb-4 block`}>Section VI</span>
            <h2 className={`text-4xl font-black tracking-tighter ${'text-white'} uppercase`}>
              Curated <span className="text-[#ff007f]">Archive</span>
            </h2>
            <p className={`${'text-[#00ffff]'} text-xs font-bold uppercase tracking-widest mt-4`}>Scroll to reveal</p>
          </div>

          {/* 2-col grid, odd items offset — gallery-item class for GSAP extreme parallax */}
          <div className="grid grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5, 6].map((item, i) => (
              <div
                key={item}
                className={`gallery-item group cursor-pointer ${i % 2 !== 0 ? 'mt-12' : ''}`}
              >
                <div className={`w-full aspect-[3/4] overflow-hidden rounded-3xl border ${'border-white/10'} shadow-2xl relative`}>
                  <img
                    src={`https://picsum.photos/seed/minacc${item}/400/600`}
                    alt={`Gallery ${item}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${'from-black/80'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <h4 className="text-base font-black text-white uppercase">Artwork {item}</h4>
                    <span className="text-xs font-bold text-[#f4d03f] uppercase tracking-widest">View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          7. INSTITUTIONAL SYNERGY
      ════════════════════════════════════════ */}
      <footer
        id="institutional-synergy"
        className={`py-28 px-6 ${'bg-[#050505]'} relative z-10 border-t ${'border-white/10'}`}
      >
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#f4d03f] text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Section VII</span>
            <h2 className={`text-xs font-black uppercase tracking-[0.4em] ${'text-white/40'}`}>Institutional Synergy</h2>
          </div>

          {/* Strategic sponsors */}
          <div className="mb-20">
            <h3 className={`text-center text-xs font-black uppercase tracking-[0.4em] ${'text-white/40'} mb-12`}>Strategic Sponsors</h3>
            <div className="flex justify-center gap-10 items-center flex-wrap">
              {[
                { name: 'Nagad',               url: 'https://i.postimg.cc/pTXrrLWm/images.png' },
                { name: 'Valiant 360 Solution', url: 'https://via.placeholder.com/400x160/000000/00f7ff?text=Valiant+360+Solution' },
              ].map((s, i) => (
                <div key={i} className="h-16 transition-all duration-500 hover:scale-110">
                  <img src={s.url} alt={s.name} className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                </div>
              ))}
            </div>
          </div>

          {/* Institutional partners */}
          <h3 className={`text-center text-xs font-black uppercase tracking-[0.4em] ${'text-white/40'} mb-12`}>Institutional Partners</h3>
          <div className="grid grid-cols-4 gap-6 items-center justify-items-center opacity-50">
            {[...PARTNER_LOGOS].slice(0, 8).map((p, i) => (
              <div key={i} className="w-14 h-14 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 flex items-center justify-center p-2">
                <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};
