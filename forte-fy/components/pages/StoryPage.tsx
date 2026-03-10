import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const TIMELINE = [
  { year: "2022", title: "The Inception", text: "Forte-FY was founded with a singular vision: to channel youth potential into structured, impactful community service." },
  { year: "2023", title: "First Initiatives", text: "Launched our inaugural community education project, reaching over 500 underprivileged students in the first quarter." },
  { year: "2023", title: "Mobilization", text: "Initiated our first major volunteer recruitment drive, onboarding 200+ dedicated individuals across multiple campuses." },
  { year: "2024", title: "Strategic Alliances", text: "Formed key collaborations with established NGOs, expanding our operational capacity and resource pool." },
  { year: "2025", title: "Structural Expansion", text: "Evolved our internal architecture, establishing specialized departments to handle complex, nationwide projects." },
];

const LEADERSHIP = Array.from({ length: 8 }).map((_, i) => ({
  name: i === 0 ? "Nabil Ahmad" : i === 1 ? "Muminoor Nahin" : i === 2 ? "Sarah Khan" : i === 3 ? "David Chen" : `Executive ${i + 1}`,
  role: i === 0 ? "Founder & Director" : i === 1 ? "Co-Founder & Head of Ops" : "Core Committee",
  img: `https://picsum.photos/seed/museum${i}/600/800`
}));

export const StoryPage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up elements
      gsap.utils.toArray('.fade-up').forEach((elem: any) => {
        gsap.fromTo(elem,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
            }
          }
        );
      });

      // Counters integrated in text
      gsap.utils.toArray('.counter-val').forEach((elem: any) => {
        const target = parseInt(elem.getAttribute('data-target') || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 90%",
          },
          onUpdate: () => {
            elem.innerText = Math.floor(obj.val).toLocaleString();
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Theme Variables - Luxurious, Dark, Cinematic
  const bgClass = "bg-[#050505]";
  const textClass = "text-[#E0DCD3]";
  const accentColor = "text-[#B59A6D]"; // Muted Gold/Bronze

  return (
    <div ref={containerRef} className={`min-h-screen ${bgClass} ${textClass} overflow-x-hidden relative font-body selection:bg-[#B59A6D] selection:text-[#050505]`}>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover grayscale opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/60 to-[#050505]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto fade-up px-4">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-bold tracking-tighter leading-[0.85] mb-8">
            Architecting <br /> <span className={accentColor}>Tomorrow</span>
          </h1>
          <p className="text-xl md:text-2xl font-body font-light tracking-widest uppercase opacity-80">
            Systematic Elevation of Potential
          </p>
        </div>
      </section>

      {/* 2. Our Mission */}
      <section className="py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center fade-up">
          <span className="text-[#B59A6D] font-bold tracking-[0.5em] uppercase text-sm mb-6 block">Our Purpose</span>
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-12">The Mission</h2>
          <div className="space-y-8 text-xl md:text-2xl font-body leading-relaxed opacity-90 text-justify">
            <p>
              To bridge the critical gap between raw youth potential and professional execution. We exist to provide a structured, disciplined platform where ambition is not just encouraged but rigorously trained.
            </p>
            <p>
              Our mission is to manufacture a generation of accomplished individuals who are not only skilled but also resilient, ethical, and community-oriented. We replace sporadic charity with sustained, strategic intervention.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Our Vision */}
      <section className="py-32 px-6 md:px-12 relative z-10 bg-[#050505]/50">
        <div className="max-w-4xl mx-auto text-center fade-up">
          <span className="text-[#B59A6D] font-bold tracking-[0.5em] uppercase text-sm mb-6 block">Our Future</span>
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-12">The Vision</h2>
          <div className="space-y-8 text-xl md:text-2xl font-body leading-relaxed opacity-90 text-justify">
            <p>
              We envision a future where every young individual has access to the mentorship and resources necessary to actualize their potential. A society where leadership is defined by service and competence.
            </p>
            <p>
              Forte-FY aims to be the gold standard for youth organizations globally—a self-sustaining ecosystem of excellence that continuously produces leaders capable of navigating and shaping the complexities of the modern world.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Organizational Evolution (Horizontal Scroll) */}
      <section className="py-32 pl-6 md:pl-24 relative z-10">
        <div className="max-w-7xl mx-auto mb-16 fade-up pr-6 md:pr-24">
          <span className="text-[#B59A6D] font-bold tracking-[0.5em] uppercase text-sm mb-4 block">The Timeline</span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold">Organizational Evolution</h2>
        </div>
        
        <div className="flex overflow-x-auto gap-12 pb-16 hide-scrollbar fade-up pr-6 md:pr-24 snap-x snap-mandatory">
          {TIMELINE.map((item, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-start group">
              <div className="h-[2px] w-full bg-[#B59A6D]/20 mb-8 relative group-hover:bg-[#B59A6D] transition-colors duration-500">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#B59A6D] group-hover:scale-150 transition-transform duration-500" />
              </div>
              <span className="text-[#B59A6D] font-heading font-bold text-4xl mb-4 block opacity-50 group-hover:opacity-100 transition-opacity">{item.year}</span>
              <h3 className="text-2xl font-heading font-bold mb-4 text-white group-hover:text-[#B59A6D] transition-colors">{item.title}</h3>
              <p className="text-lg font-body leading-relaxed opacity-80 text-justify border-l-2 border-[#B59A6D]/20 pl-4 group-hover:border-[#B59A6D] transition-colors">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The People (Grid) */}
      <section className="py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-up">
            <span className="text-[#B59A6D] font-bold tracking-widest uppercase text-sm mb-4 block">Leadership</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">The Architects of Change</h2>
            <p className="text-lg font-body opacity-80 max-w-2xl mx-auto">The executive leadership and core committee driving our strategic operations.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {LEADERSHIP.map((person, i) => (
              <div key={i} className="fade-up group cursor-pointer">
                <div className="aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-6 relative shadow-lg border border-white/5">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out group-hover:scale-105" />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-heading font-bold mb-2 group-hover:text-[#B59A6D] transition-colors">{person.name}</h4>
                  <p className="text-sm font-body text-[#B59A6D] tracking-wide">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="py-40 px-6 md:px-12 relative z-10 flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto fade-up px-4">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">Be Part of the Story</h2>
          <p className="text-lg md:text-xl font-body leading-relaxed opacity-80 mb-12 max-w-2xl mx-auto">
            Our journey is an ongoing narrative of impact, structure, and dedication. We invite you to contribute your expertise to our collective mission.
          </p>
          <Link to="/" className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-[#E0DCD3] text-[#050505] font-body font-bold text-base tracking-widest hover:bg-[#B59A6D] hover:text-white transition-colors duration-500 shadow-xl">
            Join Us
          </Link>
        </div>
      </section>

    </div>
  );
};
