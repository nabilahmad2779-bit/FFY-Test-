import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PanelPageMobileLight } from './MobileMenuLight/PanelPageMobileLight';

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

export const PanelPageMobile: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isDark) return;
    window.scrollTo(0, 0);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Mobile Hero Animation
      gsap.fromTo(".mobile-hero-title", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(".mobile-hero-subtitle", 
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out", delay: 1 }
      );

      // Mobile Scroll Animations
      gsap.utils.toArray<HTMLElement>('.mobile-member-card').forEach((card) => {
        const img = card.querySelector('.mobile-member-img');
        const content = card.querySelector('.mobile-member-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });

        tl.fromTo(img, 
          { scale: 0.95, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
        .fromTo(content, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);

  if (!isDark) {
    return <PanelPageMobileLight />;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-[#F5F5F5] overflow-x-hidden relative pb-24">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-20%] w-[250px] h-[250px] rounded-full blur-[80px] opacity-20 bg-[#D4AF37] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[30%] right-[-20%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-10 bg-white animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
      `}} />

      {/* Mobile Hero Section */}
      <section className="min-h-[80vh] w-full flex flex-col items-center justify-center px-6 pt-24 pb-12 text-center relative z-10">
         <div className="absolute inset-0 z-0 overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
             alt="Hero Background" 
             className="w-full h-full object-cover opacity-30"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/90 via-[#030303]/70 to-[#030303]" />
         </div>

         <div className="relative z-10 w-full">
           <h1 className="mobile-hero-title font-cormorant font-semibold text-5xl leading-[1.1] tracking-tight mb-2">
             LEGISLATIVE
           </h1>
           <h1 className="mobile-hero-title font-cormorant font-bold italic text-5xl leading-[1.1] tracking-widest text-[#D4AF37]">
             BODY
           </h1>
           
           <div className="mobile-hero-subtitle mt-8">
              <div className="w-12 h-px bg-[#D4AF37] mx-auto mb-6 opacity-50" />
              <p className="font-outfit text-xs uppercase tracking-[0.3em] text-zinc-400 leading-relaxed font-medium px-4">
                Executive Leadership<br/>& Strategic Vision
              </p>
           </div>
         </div>
      </section>

      {/* Mobile Members List */}
      <section className="w-full px-4 py-12 flex flex-col gap-20 relative z-10">
        {MEMBERS.map((member, index) => (
          <div key={index} className="mobile-member-card flex flex-col w-full">
            
            {/* Image Container */}
            <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative mb-[-40px] z-0">
              <img 
                src={member.image} 
                alt={member.name}
                className="mobile-member-img w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-90" />
            </div>

            {/* Text Content */}
            <div className="mobile-member-content bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 pt-10 relative z-10 mx-4 shadow-xl backdrop-blur-md">
               <p className="font-outfit uppercase tracking-[0.2em] text-[#D4AF37] text-[10px] mb-3 font-medium text-center">
                 {member.role}
               </p>
               <h2 className="font-cormorant font-bold text-3xl mb-4 leading-tight text-center">
                 {member.name}
               </h2>
               <p className="font-outfit font-light text-zinc-400 leading-relaxed text-sm text-center">
                 {member.bio}
               </p>
            </div>

          </div>
        ))}
      </section>

      {/* Mobile Outro */}
      <section className="py-20 w-full flex items-center justify-center relative z-10">
         <div className="w-px h-16 bg-[#D4AF37] opacity-30" />
      </section>

    </div>
  );
};
