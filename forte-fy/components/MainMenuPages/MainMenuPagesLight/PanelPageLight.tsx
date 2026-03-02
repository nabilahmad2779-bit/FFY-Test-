import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles, Zap, Anchor, Target, Activity, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { 
    name: "Nabil Ahmad", 
    role: "Founder and President", 
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Visionary leader driving the core mission of Forte-FY.",
    initials: "NA",
    icon: <Sparkles size={48} />
  },
  { 
    name: "Muminoor Nahin", 
    role: "Co-founder and Vice President", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Strategic mind shaping the future and expanding our reach.",
    initials: "MN",
    icon: <Globe size={48} />
  },
  { 
    name: "Kashfia Anjum Rahman", 
    role: "Head of Human Resources", 
    image: "https://i.postimg.cc/W1HSq4Tn/Whats-App-Image-2026-01-31-at-9-57-06-PM.jpg?auto=format&fit=crop&q=80", 
    bio: "Cultivating talent, fostering growth, and building community.",
    initials: "KR",
    icon: <Activity size={48} />
  },
  { 
    name: "Arpita Das Richi", 
    role: "Head of Public Relations", 
    image: "https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg?auto=format&fit=crop&q=80", 
    bio: "Building bridges and amplifying our voice across networks.",
    initials: "AR",
    icon: <Zap size={48} />
  },
  { 
    name: "Mahima Anjum Rahman", 
    role: "Head of IT", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80", 
    bio: "Architecting our digital infrastructure and technological edge.",
    initials: "MR",
    icon: <Target size={48} />
  },
  { 
    name: "ASM Abdullah", 
    role: "Head of Operations", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Executing with precision, efficiency, and operational excellence.",
    initials: "AA",
    icon: <Anchor size={48} />
  },
];

export const PanelPageLight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 0. Hero Entrance
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.from(".hero-title-char", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out"
      })
      .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .from(".scroll-indicator", {
        scaleY: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3");

      // 1. Hero Parallax Exit
      gsap.to(".hero-content-light", {
        yPercent: -30,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        scrollTrigger: {
          trigger: ".hero-section-light",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // 2. Panel Animations
      const panels = gsap.utils.toArray('.panel-card-light');
      panels.forEach((panel: any, i) => {
        const content = panel.querySelectorAll('.panel-content');
        const img = panel.querySelector('img');
        
        // Entrance: Content fades in
        gsap.fromTo(content,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 60%",
              end: "bottom 60%",
              toggleActions: "play reverse play reverse"
            }
          }
        );

        // Image Parallax (Internal movement)
        if (img) {
          gsap.fromTo(img,
            { scale: 1.2, yPercent: -10 },
            {
              scale: 1,
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "top top",
                scrub: true
              }
            }
          );
        }

        // Stacking Effect: Previous card scales down as next one covers it
        if (i < panels.length - 1) {
          gsap.to(panel, {
            scale: 0.95,
            filter: "blur(5px) brightness(0.9)",
            borderRadius: "2rem",
            scrollTrigger: {
              trigger: panels[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden font-sans selection:bg-[#0066cc] selection:text-white">
      
      {/* Hero Section */}
      <section className="hero-section-light h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-100 rounded-full blur-[120px] pointer-events-none opacity-60" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-multiply" />
        
        <div className="hero-content-light text-center z-10 w-full max-w-7xl relative flex flex-col items-center justify-center h-full">
          <span className="hero-subtitle text-sm md:text-base font-mono font-bold uppercase tracking-[0.5em] text-[#0066cc] mb-6 block">
            The Leadership
          </span>
          
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-[10rem] font-heading font-black uppercase italic tracking-tighter leading-[0.85] text-slate-900/10 flex justify-center">
              {"VISIONARIES".split('').map((char, i) => (
                <span key={i} className="hero-title-char inline-block">{char}</span>
              ))}
            </h1>
            <h1 className="text-6xl md:text-[10rem] font-heading font-black uppercase italic tracking-tighter leading-[0.85] text-transparent [-webkit-text-stroke:1px_rgba(15,23,42,0.8)] absolute top-0 left-0 right-0 w-full pointer-events-none flex justify-center">
               {"VISIONARIES".split('').map((char, i) => (
                <span key={i} className="hero-title-char inline-block">{char}</span>
              ))}
            </h1>
          </div>
          
          <p className="hero-subtitle mt-8 text-lg md:text-2xl font-light text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Architecting the future of Forte-FY through precision, innovation, and unwavering dedication.
          </p>
          
          <div className="scroll-indicator absolute bottom-12 flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll to Explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-[#0066cc] to-transparent" />
          </div>
        </div>
      </section>

      {/* Panels Section - Sticky Stacking Layout */}
      <div className="panels-container-light relative w-full">
        {PANELS.map((panel, index) => (
          <div 
            key={index} 
            className="panel-card-light sticky top-0 h-screen w-full bg-slate-50 flex items-center justify-center overflow-hidden border-t border-slate-200"
            style={{ zIndex: index + 1 }}
          >
            {/* Background Ambience */}
            <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${
              index % 2 === 0 ? 'from-blue-50 to-indigo-50' : 'from-emerald-50 to-cyan-50'
            }`} />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-multiply" />

            <div className={`relative w-full max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full ${
              index % 2 === 1 ? 'md:direction-rtl' : ''
            }`}>
              
              {/* Text Content */}
              <div className={`panel-content flex flex-col justify-center ${index % 2 === 1 ? 'md:order-2 md:pl-12' : 'md:pr-12'}`}>
                
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black uppercase tracking-tighter leading-[0.9] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-blue-500">
                  {panel.name}
                </h2>

                <p className="text-xl md:text-2xl font-light italic text-[#0066cc] mb-6 drop-shadow-sm">
                  {panel.role}
                </p>

                <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed">
                  {panel.bio}
                </p>
              </div>

              {/* Visual Content */}
              <div className={`panel-content h-[50vh] md:h-[70vh] w-full relative group ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="w-full h-full relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl bg-white">
                  <img 
                    src={panel.image!} 
                    alt={panel.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-40" />
                  
                  {/* Decorative Elements */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#0066cc]" />
                       <div className="w-1.5 h-1.5 rounded-full bg-white" />
                       <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <ArrowUpRight className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
                
                {/* Floating Elements behind */}
                <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-slate-200 rounded-[2rem] hidden md:block" />
                <div className="absolute -z-20 top-20 -right-20 w-full h-full border border-slate-200 rounded-[2rem] opacity-50 hidden md:block" />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
