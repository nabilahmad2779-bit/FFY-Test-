
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PanelPageLight } from '../MainMenuPages/MainMenuPagesLight/PanelPageLight';

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { name: "Nabil Ahmad", role: "Founder and President", image: "https://picsum.photos/seed/nabil/800/1000", bio: "Visionary leader driving the core mission of Forte-FY." },
  { name: "Muminoor Nahin", role: "Co-founder and Vice President", image: "https://picsum.photos/seed/nahin/800/1000", bio: "Strategic mind shaping the future and expanding our reach." },
  { name: "Kashfia Anjum Rahman", role: "Head of Human Resources", image: "https://picsum.photos/seed/kashfia/800/1000", bio: "Cultivating talent, fostering growth, and building community." },
  { name: "Arpira Das Richi", role: "Head of Public Relations", image: "https://picsum.photos/seed/arpira/800/1000", bio: "Building bridges and amplifying our voice across networks." },
  { name: "Mahima Anjum Rahman", role: "Head of IT", image: "https://picsum.photos/seed/mahima/800/1000", bio: "Architecting our digital infrastructure and technological edge." },
  { name: "ASM Abdullah", role: "Head of Operations", image: "https://picsum.photos/seed/abdullah/800/1000", bio: "Executing with precision, efficiency, and operational excellence." },
];

export const PanelPage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isDark || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Animation
      gsap.to(".hero-content-dark", {
        y: -150,
        opacity: 0,
        scale: 0.9,
        scrollTrigger: {
          trigger: ".hero-section-dark",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      // 2. Desktop Pinned Gallery
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      
      if (isDesktop) {
        // Pin the right side images
        ScrollTrigger.create({
          trigger: ".panels-container-dark",
          start: "top top",
          end: "bottom bottom",
          pin: ".right-gallery-dark",
        });

        // Sync images with text scroll
        const texts = gsap.utils.toArray('.panel-text-block-dark');
        const images = gsap.utils.toArray('.panel-img-wrapper-dark');

        texts.forEach((text: any, i) => {
          // Highlight active text
          ScrollTrigger.create({
            trigger: text,
            start: "top center",
            end: "bottom center",
            toggleClass: { targets: text, className: "active" },
          });

          // Reveal corresponding image
          if (i > 0) {
            gsap.fromTo(images[i] as Element, 
              { clipPath: "inset(100% 0% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                scrollTrigger: {
                  trigger: text,
                  start: "top center",
                  end: "bottom center",
                  scrub: true,
                }
              }
            );
          }
          
          // Image Parallax inside wrapper
          const img = (images[i] as Element).querySelector('img');
          gsap.fromTo(img, 
            { scale: 1.2, yPercent: -10 },
            {
              scale: 1,
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: text,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        });
      } else {
        // Mobile Parallax
        gsap.utils.toArray('.mobile-panel-dark').forEach((panel: any) => {
          const img = panel.querySelector('img');
          gsap.to(img, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);

  if (!isDark) {
    return <PanelPageLight />;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-white overflow-hidden font-sans selection:bg-[#00f7ff] selection:text-black">
      
      {/* Hero Section */}
      <section className="hero-section-dark h-screen flex flex-col items-center justify-center relative px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,247,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="hero-content-dark text-center z-10 w-full max-w-5xl">
          <span className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-[#00f7ff] mb-6 block">
            Executive Board
          </span>
          <h1 className="text-6xl md:text-[10rem] font-heading font-black uppercase italic tracking-tighter leading-[0.85] text-white">
            The <span className="text-transparent [-webkit-text-stroke:2px_#00f7ff] md:[-webkit-text-stroke:4px_#00f7ff]">Visionaries</span>
          </h1>
          <p className="mt-8 text-lg md:text-2xl font-light text-zinc-400 max-w-2xl mx-auto">
            Meet the minds driving Forte-FY's mission to manufacture a generation of accomplished individuals.
          </p>
          <div className="mt-16 animate-bounce">
            <div className="w-px h-16 bg-white/20 mx-auto" />
          </div>
        </div>
      </section>

      {/* Panels Section (Desktop Pinned, Mobile Stacked) */}
      <section className="panels-container-dark relative w-full max-w-7xl mx-auto px-6 pb-32">
        
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full relative">
          
          {/* Left Side: Scrolling Text */}
          <div className="w-1/2 pr-16 pb-[50vh]">
            {PANELS.map((panel, index) => (
              <div key={index} className="panel-text-block-dark h-screen flex flex-col justify-center opacity-30 transition-opacity duration-500 [&.active]:opacity-100">
                <span className="text-lg font-mono font-bold text-zinc-600 mb-6">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <h2 className="text-5xl lg:text-7xl font-heading font-black uppercase tracking-tighter leading-none mb-4 text-white">
                  {panel.name}
                </h2>
                <p className="text-2xl font-light italic text-[#00f7ff] mb-6">
                  {panel.role}
                </p>
                <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
                  {panel.bio}
                </p>
                <div className="mt-12 flex items-center gap-4 cursor-pointer group w-fit">
                  <div className="w-12 h-px bg-white/20 group-hover:bg-[#00f7ff] group-hover:w-20 transition-all duration-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-[#00f7ff] transition-colors">View Profile</span>
                  <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-[#00f7ff] transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Pinned Images */}
          <div className="right-gallery-dark w-1/2 h-screen flex items-center justify-center sticky top-0">
            <div className="w-full max-w-md aspect-[3/4] relative rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,247,255,0.1)] border border-white/5">
              {PANELS.map((panel, index) => (
                <div 
                  key={index} 
                  className="panel-img-wrapper-dark absolute inset-0 w-full h-full overflow-hidden"
                  style={{ zIndex: index }}
                >
                  <img 
                    src={panel.image} 
                    alt={panel.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-24">
          {PANELS.map((panel, index) => (
            <div key={index} className="mobile-panel-dark flex flex-col">
              <span className="text-sm font-mono font-bold text-zinc-600 mb-4">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl mb-8 border border-white/5">
                <div className="absolute inset-[-20%] w-[140%] h-[140%]">
                  <img 
                    src={panel.image} 
                    alt={panel.name} 
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h2 className="text-4xl font-heading font-black uppercase tracking-tighter leading-none mb-2 text-white">
                {panel.name}
              </h2>
              <p className="text-xl font-light italic text-[#00f7ff] mb-4">
                {panel.role}
              </p>
              <p className="text-base text-zinc-400 leading-relaxed">
                {panel.bio}
              </p>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
