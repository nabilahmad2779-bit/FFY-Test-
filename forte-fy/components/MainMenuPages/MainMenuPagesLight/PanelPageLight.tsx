import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Magnetic Interaction Component ---
const MagneticItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.4;
    const y = (clientY - (top + height / 2)) * 0.4;
    gsap.to(ref.current, { x, y, duration: 0.5, ease: "power3.out" });
  };
  
  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
  };
  
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}>
      {children}
    </div>
  );
};

// --- Data ---
const LEADERS = [
  { 
    name: "Nabil Ahmad", 
    role: "Founder & President", 
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Visionary leader driving the core mission of Forte-FY. Nabil establishes the strategic direction, ensuring that every initiative aligns with our commitment to excellence and youth empowerment.",
  },
  { 
    name: "Muminoor Nahin", 
    role: "Co-founder & Vice President", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Strategic mind shaping the future and expanding our reach. Muminoor bridges the gap between ambitious vision and operational reality, fostering key partnerships and growth.",
  }
];

const DEPARTMENT_HEADS = [
  { 
    name: "Kashfia Anjum Rahman", 
    role: "Head of Human Resources", 
    image: "https://i.postimg.cc/W1HSq4Tn/Whats-App-Image-2026-01-31-at-9-57-06-PM.jpg?auto=format&fit=crop&q=80", 
    bio: "Cultivating talent, fostering growth, and building a resilient community.",
  },
  { 
    name: "Arpita Das Richi", 
    role: "Head of Public Relations", 
    image: "https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg?auto=format&fit=crop&q=80", 
    bio: "Building bridges and amplifying our voice across global networks.",
  },
  { 
    name: "Mahima Anjum Rahman", 
    role: "Head of IT", 
    image: "https://i.postimg.cc/Dwc7w14B/IMG-20260302-224634-jpg.jpg", 
    bio: "Architecting our digital infrastructure and technological edge.",
  },
  { 
    name: "ASM Abdullah", 
    role: "Head of Operations", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Executing with precision, efficiency, and operational excellence.",
  },
];

export const PanelPageLight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animation
      const tl = gsap.timeline();
      
      tl.to(".hero-overlay", {
        height: 0,
        duration: 1.5,
        ease: "expo.inOut"
      })
      .from(".hero-img", {
        scale: 1.2,
        duration: 2,
        ease: "power3.out"
      }, "-=1.5")
      .from(".hero-text-line", {
        y: "100%",
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out"
      }, "-=1.0")
      .from(".hero-fade", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");

      // 2. Hero Parallax on Scroll
      gsap.to(".hero-img", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 3. Featured Leaders Reveal
      gsap.utils.toArray<HTMLElement>('.leader-row').forEach((row) => {
        const imgContainer = row.querySelector('.leader-img-container');
        const img = row.querySelector('.leader-img');
        const textElems = row.querySelectorAll('.leader-text');

        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
          }
        });

        rowTl.from(imgContainer, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.5,
          ease: "expo.out"
        })
        .from(img, {
          scale: 1.3,
          duration: 1.5,
          ease: "expo.out"
        }, "-=1.5")
        .from(textElems, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=1.0");
      });

      // 4. Department Heads Grid Reveal
      gsap.from(".dept-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".dept-grid",
          start: "top 80%",
        }
      });

      // 5. Image Parallax inside Cards
      gsap.utils.toArray<HTMLElement>('.parallax-img-container').forEach((container) => {
        const img = container.querySelector('img');
        if (img) {
          gsap.to(img, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans selection:bg-slate-200 selection:text-black">
      
      {/* --- HERO SECTION --- */}
      <section className="hero-section relative h-screen w-full flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="hero-overlay absolute inset-0 bg-[#f8f9fa] z-10 origin-top" />
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop" 
            alt="Corporate Office" 
            className="hero-img w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-[#f8f9fa]/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="hero-fade flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-slate-400" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500">Legislative Body</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif leading-[0.9] tracking-tight">
              <div className="overflow-hidden pb-2"><div className="hero-text-line">Executive</div></div>
              <div className="overflow-hidden pb-2"><div className="hero-text-line italic text-slate-500">Leadership.</div></div>
            </h1>
          </div>
          
          <div className="hero-fade flex flex-col items-start md:items-end gap-6 pb-4">
            <p className="text-slate-500 max-w-xs md:text-right leading-relaxed">
              Guiding Forte-FY with strategic vision, operational excellence, and an unwavering commitment to our core mission.
            </p>
            <MagneticItem>
              <div className="w-16 h-16 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:text-black hover:border-black transition-colors cursor-pointer">
                <ArrowDown size={24} />
              </div>
            </MagneticItem>
          </div>
        </div>
      </section>

      {/* --- FEATURED LEADERS (President & VP) --- */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-32">
          {LEADERS.map((leader, index) => (
            <div key={index} className={`leader-row flex flex-col gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
              
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="leader-img-container parallax-img-container aspect-[4/5] w-full overflow-hidden bg-slate-200 relative group cursor-pointer">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="leader-img w-full h-[120%] -top-[10%] absolute object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Interactive Overlay */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <p className="leader-text text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">{leader.role}</p>
                <h2 className="leader-text text-5xl md:text-7xl font-serif mb-8">{leader.name}</h2>
                <p className="leader-text text-xl text-slate-600 leading-relaxed mb-12 max-w-lg">
                  {leader.bio}
                </p>
                
                <div className="leader-text flex items-center gap-6">
                  <MagneticItem>
                    <a href="#" className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                      <Linkedin size={18} />
                    </a>
                  </MagneticItem>
                  <MagneticItem>
                    <a href="#" className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                      <Mail size={18} />
                    </a>
                  </MagneticItem>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* --- DEPARTMENT HEADS GRID --- */}
      <section className="py-32 px-6 md:px-12 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h3 className="text-4xl md:text-6xl font-serif mb-4">Department Heads</h3>
              <div className="w-24 h-px bg-slate-300" />
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              The driving force behind our operations, ensuring excellence across every vertical.
            </p>
          </div>

          <div className="dept-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {DEPARTMENT_HEADS.map((head, index) => (
              <div key={index} className="dept-card group cursor-pointer">
                <div className="parallax-img-container aspect-[3/4] w-full overflow-hidden bg-slate-200 mb-6 relative">
                  <img 
                    src={head.image} 
                    alt={head.name} 
                    className="w-full h-[120%] -top-[10%] absolute object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Socials */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                      <Linkedin size={16} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                      <Mail size={16} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-serif mb-1 group-hover:text-black text-slate-800 transition-colors">{head.name}</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{head.role}</p>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{head.bio}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
