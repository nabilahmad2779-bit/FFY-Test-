import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MEMBERS = [
  { 
    name: "Nabil Ahmad", 
    role: "Founder & President", 
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Nabil Ahmad is the visionary founder and President of Forte-FY, leading the organization with a strong commitment to social impact and youth empowerment. With a mindset driven by innovation and purpose, he established Forte-FY to create meaningful opportunities for underprivileged communities. His leadership reflects a balance of strategic thinking and deep empathy, inspiring others to work toward sustainable change. Under his guidance, Forte-FY continues to grow as a platform for learning, service, and transformation.",
  },
  { 
    name: "Muminoor Rahman Nahin", 
    role: "Co-Founder & Vice President", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "As the Co-Founder and Vice President of Forte-FY, Muminoor Rahman Nahin plays a crucial role in shaping the organization’s vision and operations. Known for his dedication and collaborative spirit, he has been instrumental in building a strong foundation for the team. His ability to coordinate, support, and execute initiatives ensures that Forte-FY’s projects are both effective and impactful. He stands as a reliable pillar behind the organization’s continued success.",
  },
  { 
    name: "Kashfia Anjum Rahman", 
    role: "Head of Human Resources", 
    image: "https://i.postimg.cc/W1HSq4Tn/Whats-App-Image-2026-01-31-at-9-57-06-PM.jpg?auto=format&fit=crop&q=80", 
    bio: "Kashfia Anjum Rahman leads the Human Resources department with clarity, discipline, and a strong sense of responsibility. As one of the core members of Forte-FY, she has played a vital role in shaping the organization’s internal structure and team culture. Her straightforward approach and commitment to efficiency ensure that the organization maintains a professional and productive environment. She is dedicated to building a cohesive and motivated team.",
  },
  { 
    name: "Arpita Das Ritchi", 
    role: "Head of Operations", 
    image: "https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg?auto=format&fit=crop&q=80", 
    bio: "Arpita Das Ritchi serves as the Head of Operations, overseeing the execution of Forte-FY’s initiatives with precision and care. Her role involves transforming ideas into action, ensuring that every project runs smoothly and achieves its intended impact. With strong organizational skills and a proactive mindset, she plays a key role in maintaining the effectiveness and consistency of the organization’s work on the ground.",
  },
  { 
    name: "Mahima Anjum Rahman", 
    role: "Head of Information Technology", 
    image: "https://i.postimg.cc/Dwc7w14B/IMG-20260302-224634-jpg.jpg", 
    bio: "Mahima Anjum Rahman leads the Information Technology department, bringing creativity and technical insight to Forte-FY’s digital presence. She is responsible for managing and enhancing the organization’s technological infrastructure and visual communication. Her innovative thinking and attention to detail help strengthen Forte-FY’s identity and outreach in the digital space, making the organization more accessible and engaging.",
  },
  { 
    name: "A S M Abdullah", 
    role: "Head of Public Relations", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "A S M Abdullah heads the Public Relations department, representing Forte-FY with confidence and clarity. He is responsible for managing communication, building relationships, and promoting the organization’s vision to a wider audience. With strong interpersonal skills and a strategic approach to outreach, he ensures that Forte-FY’s message reaches and resonates with the community effectively.",
  }
];

// Helper component to split text into characters for animation while preserving word wrapping
const AnimatedText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <span className={`flex flex-wrap justify-center ${className}`}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.3em] overflow-hidden pb-2">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="char inline-block opacity-0 translate-y-[100%]">
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export const PanelPageLight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Text Animation (Character by Character)
      gsap.to(".char", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.03,
        ease: "expo.out",
        delay: 0.2
      });

      gsap.fromTo(".hero-fade", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 1.2 }
      );

      // 2. Vertical Scroll Animations for Members
      gsap.utils.toArray<HTMLElement>('.member-row').forEach((row) => {
        const imgContainer = row.querySelector('.img-container');
        const img = row.querySelector('.member-img');
        const textElements = row.querySelectorAll('.member-text');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          }
        });

        // Image container reveal
        tl.fromTo(imgContainer, 
          { scale: 0.9, opacity: 0, filter: "blur(10px)", y: 50 },
          { scale: 1, opacity: 1, filter: "blur(0px)", y: 0, duration: 1.5, ease: "power3.out" }
        )
        // Text reveal
        .fromTo(textElements, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
          "-=1"
        );

        // Image Parallax Effect
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // 3. Hero Parallax
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] transition-colors duration-700 overflow-x-hidden relative">
      {/* Dynamic Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 bg-[#B8860B] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 bg-black animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      {/* Injecting Custom Fonts: Cormorant Garamond (Elegant Serif) & Outfit (Modern Sans) */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
      `}} />

      {/* --- HERO SECTION --- */}
      <section className="hero-section min-h-screen w-full flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center relative z-10 overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0 z-0 overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
             alt="Hero Background" 
             className="hero-bg w-full h-[120%] object-cover opacity-30 -top-[10%]"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF8]/90 via-[#FDFCF8]/60 to-[#FDFCF8]" />
         </div>

         <h1 className="flex flex-col items-center justify-center w-full relative z-10">
           <AnimatedText text="LEGISLATIVE" className="font-cormorant font-semibold text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] leading-[1.1] tracking-tight" />
           <AnimatedText text="BODY" className="font-cormorant font-bold italic text-4xl md:text-6xl lg:text-7xl xl:text-[8rem] leading-[1.1] tracking-widest text-[#B8860B] mt-2 md:mt-4" />
         </h1>
         
         <div className="hero-fade mt-12 max-w-2xl mx-auto relative z-10">
            <p className="font-outfit text-sm md:text-base uppercase tracking-[0.3em] text-zinc-600 leading-relaxed font-medium">
              Executive Leadership & Strategic Vision
            </p>
         </div>
      </section>

      {/* --- VERTICAL SCROLL SECTION --- */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 flex flex-col gap-32 md:gap-48">
        {MEMBERS.map((member, index) => (
          <div key={index} className={`member-row flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 lg:gap-32`}>
            
            {/* Image Container */}
            <div className="w-full md:w-1/2 flex justify-center">
               <div className="img-container w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl relative">
                 <img 
                   src={member.image} 
                   alt={member.name}
                   className="member-img absolute top-[-10%] left-0 w-full h-[120%] object-cover" 
                   referrerPolicy="no-referrer"
                 />
               </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left relative z-10">
               <p className="member-text font-outfit uppercase tracking-[0.2em] text-[#B8860B] text-xs md:text-sm mb-6 font-medium">
                 {member.role}
               </p>
               <h2 className="member-text font-cormorant font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 leading-tight">
                 {member.name}
               </h2>
               <p className="member-text font-outfit font-light text-zinc-600 leading-relaxed text-base md:text-lg max-w-xl mx-auto md:mx-0">
                 {member.bio}
               </p>
            </div>

          </div>
        ))}
      </section>

      {/* --- OUTRO SECTION --- */}
      <section className="py-32 w-full flex items-center justify-center">
         <div className="text-center hero-fade">
            <div className="w-1 h-16 mx-auto text-[#B8860B] mb-8 opacity-50" style={{ backgroundColor: 'currentColor' }} />
         </div>
      </section>

    </div>
  );
};
