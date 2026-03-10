import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LEADERS = [
  { 
    name: "Nabil Ahmad", 
    role: "Founder & President", 
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Visionary leader driving the core mission of Forte-FY. Nabil establishes the strategic direction, ensuring that every initiative aligns with our commitment to excellence and youth empowerment. His approach combines rigorous analytical thinking with a profound dedication to community building, setting the standard for corporate governance within our organization.",
  },
  { 
    name: "Muminoor Nahin", 
    role: "Co-founder & Vice President", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Strategic mind shaping the future and expanding our reach. Muminoor bridges the gap between ambitious vision and operational reality, fostering key partnerships and growth. With a keen eye for sustainable development, he oversees the execution of our most critical long-term projects, ensuring Forte-FY remains at the forefront of innovation.",
  }
];

const DEPARTMENT_HEADS = [
  { 
    name: "Kashfia Anjum Rahman", 
    role: "Head of Human Resources", 
    image: "https://i.postimg.cc/W1HSq4Tn/Whats-App-Image-2026-01-31-at-9-57-06-PM.jpg?auto=format&fit=crop&q=80", 
    bio: "Cultivating talent, fostering growth, and building a resilient, high-performing corporate culture. Kashfia ensures that our most valuable asset—our people—are supported, developed, and aligned with our overarching corporate mission.",
  },
  { 
    name: "Arpita Das Richi", 
    role: "Head of Public Relations", 
    image: "https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg?auto=format&fit=crop&q=80", 
    bio: "Building strategic bridges and amplifying our corporate voice across global networks and media. Arpita crafts our public narrative, managing stakeholder relationships and ensuring our brand's integrity remains uncompromised in the public eye.",
  },
  { 
    name: "Mahima Anjum Rahman", 
    role: "Head of IT", 
    image: "https://i.postimg.cc/Dwc7w14B/IMG-20260302-224634-jpg.jpg", 
    bio: "Architecting our digital infrastructure and maintaining our technological edge in a fast-paced ecosystem. Mahima leads the development of our internal systems, ensuring data security, operational efficiency, and seamless digital integration.",
  },
  { 
    name: "ASM Abdullah", 
    role: "Head of Operations", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Executing with precision, efficiency, and operational excellence to ensure seamless day-to-day functions. Abdullah translates high-level strategy into actionable operational protocols, driving performance across all organizational tiers.",
  },
];

export const PanelPage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Cinematic Hero Animation (Slow fade & blur reveal)
      gsap.from(".hero-cinematic", {
        opacity: 0,
        filter: "blur(10px)",
        scale: 1.02,
        duration: 2,
        stagger: 0.3,
        ease: "power2.out",
        delay: 0.2
      });

      // 2. Profile Blocks Animation (Elegant fade up)
      gsap.utils.toArray<HTMLElement>('.profile-block').forEach((block) => {
        const img = block.querySelector('img');
        const content = block.querySelectorAll('.fade-up');

        const blockTl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          }
        });

        blockTl.from(img, { 
          opacity: 0, 
          scale: 1.05, 
          duration: 1.5, 
          ease: "power2.out" 
        })
        .from(content, { 
          opacity: 0, 
          y: 20, 
          duration: 1, 
          stagger: 0.15, 
          ease: "power2.out" 
        }, "-=1");
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);

  // --- THEME: OBSIDIAN & GOLD (Dark) / PLATINUM & GOLD (Light) ---
  const bg = isDark ? "bg-[#050505]" : "bg-[#FAFAFA]";
  const text = isDark ? "text-[#FAFAFA]" : "text-[#050505]";
  const muted = isDark ? "text-[#A1A1AA]" : "text-[#52525B]";
  const borderLine = isDark ? "border-[#27272A]" : "border-[#E4E4E7]";
  
  // Accent Colors
  const accentPrimary = isDark ? "text-[#D4AF37]" : "text-[#B8860B]";

  return (
    <div ref={containerRef} className={`min-h-screen ${bg} ${text} transition-colors duration-700 pb-32`}>
      
      {/* Injecting Custom Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}} />

      {/* --- HIGH-END EDITORIAL SPLIT HERO SECTION --- */}
      <section className="relative min-h-screen w-full flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
        
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Typography */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1">
            <p className={`hero-cinematic text-xs md:text-sm font-montserrat font-semibold uppercase tracking-[0.4em] ${accentPrimary} mb-8`}>
              Legislative Body
            </p>
            
            <h1 className="hero-cinematic text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-playfair leading-[1.05] tracking-tight flex flex-col items-start mb-8">
              <span className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                Executive
              </span>
              <span className={`italic font-medium ${isDark ? 'text-[#D4AF37]' : 'text-[#B8860B]'} -mt-2 md:-mt-4`}>
                Leadership.
              </span>
            </h1>
            
            <div className={`hero-cinematic w-16 h-[2px] ${isDark ? 'bg-[#D4AF37]' : 'bg-[#B8860B]'} mb-10`} />
            
            <p className={`hero-cinematic text-lg md:text-xl font-lato ${isDark ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed max-w-lg font-light`}>
              Guiding Forte-FY with strategic vision, operational excellence, and an unwavering commitment to our core mission.
            </p>
          </div>

          {/* Right Side: Elegant Image */}
          <div className="hero-cinematic w-full flex justify-center lg:justify-end order-1 lg:order-2">
            <div className={`w-full max-w-[400px] lg:max-w-[500px] aspect-[3/4] overflow-hidden rounded-sm ${isDark ? 'bg-[#18181B]' : 'bg-[#E4E4E7]'} relative shadow-2xl`}>
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" 
                alt="Modern Architecture" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Subtle overlay to blend with theme */}
              <div className={`absolute inset-0 ${isDark ? 'bg-black/20' : 'bg-white/10'}`} />
            </div>
          </div>

        </div>
      </section>

      {/* --- FOUNDERS SECTION --- */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mt-20">
        <div className={`mb-24 border-b ${borderLine} pb-8 hero-cinematic flex items-center justify-center`}>
          <h3 className="text-3xl md:text-4xl font-playfair font-semibold tracking-tight">The Founders</h3>
        </div>

        <div className="flex flex-col gap-32">
          {LEADERS.map((leader, index) => (
            <ProfileBlock 
              key={index} 
              person={leader} 
              index={index} 
              isDark={isDark} 
              accentPrimary={accentPrimary}
              borderLine={borderLine}
              muted={muted}
            />
          ))}
        </div>
      </section>

      {/* --- DEPARTMENT HEADS SECTION --- */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mt-40">
        <div className={`mb-24 border-b ${borderLine} pb-8 hero-cinematic flex items-center justify-center`}>
          <h3 className="text-3xl md:text-4xl font-playfair font-semibold tracking-tight">Department Heads</h3>
        </div>

        <div className="flex flex-col gap-32">
          {DEPARTMENT_HEADS.map((head, index) => (
            <ProfileBlock 
              key={index} 
              person={head} 
              index={index} 
              isDark={isDark}
              accentPrimary={accentPrimary}
              borderLine={borderLine}
              muted={muted}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

// Reusable Profile Block Component
const ProfileBlock = ({ person, index, isDark, accentPrimary, borderLine, muted }: any) => {
  return (
    <div className={`profile-block flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}>
      
      {/* Image Container */}
      <div className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[380px] shrink-0">
        <div className={`w-full aspect-[4/5] overflow-hidden rounded-sm ${isDark ? 'bg-[#18181B]' : 'bg-[#E4E4E7]'} relative shadow-xl`}>
          <img 
            src={person.image} 
            alt={person.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-center w-full">
        <div className="fade-up mb-6">
          <p className={`text-xs md:text-sm font-montserrat font-semibold uppercase tracking-[0.2em] ${accentPrimary}`}>{person.role}</p>
        </div>
        
        <h2 className="fade-up text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold tracking-tight mb-8">
          {person.name}
        </h2>
        
        {/* Bio Section */}
        <div className={`fade-up pl-6 border-l-[1px] ${borderLine} mb-10`}>
          <p className={`text-lg md:text-xl font-lato ${muted} leading-relaxed font-light max-w-3xl`}>
            {person.bio}
          </p>
        </div>
        
        {/* SOCIAL MEDIA BUTTONS */}
        <div className={`flex flex-wrap items-center gap-4 pt-6 fade-up`}>
          <a href="#" className={`group flex items-center gap-3 px-6 py-3 rounded-full border ${borderLine} ${isDark ? 'hover:bg-white hover:text-black text-zinc-300' : 'hover:bg-black hover:text-white text-zinc-700'} transition-all duration-300`}>
            <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-montserrat font-semibold uppercase tracking-widest">LinkedIn</span>
          </a>
          <a href="#" className={`group flex items-center gap-3 px-6 py-3 rounded-full border ${borderLine} ${isDark ? 'hover:bg-white hover:text-black text-zinc-300' : 'hover:bg-black hover:text-white text-zinc-700'} transition-all duration-300`}>
            <Mail size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-montserrat font-semibold uppercase tracking-widest">Contact</span>
          </a>
        </div>
      </div>

    </div>
  );
};
