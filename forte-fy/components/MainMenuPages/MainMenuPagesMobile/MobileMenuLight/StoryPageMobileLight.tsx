import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

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

export const StoryPageMobileLight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

  const bgClass = "bg-[#f0f0f5]";
  const textClass = "text-slate-900";
  const accentColor = "text-cyan-700"; 

  return (
    <div ref={containerRef} className={`min-h-screen ${bgClass} ${textClass} overflow-x-hidden relative font-body pb-24 selection:bg-cyan-200 selection:text-slate-900`}>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover grayscale opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-[#f0f0f5]" />
        </div>
        <div className="relative z-10 w-full fade-up">
          <h1 className="text-3xl font-heading font-medium tracking-wide leading-tight mb-6">
            The Genesis of <br/><span className={accentColor}>Forte-FY</span>
          </h1>
          <p className="text-xs font-body font-light leading-relaxed opacity-80 max-w-sm mx-auto text-slate-700">
            A curated exhibition of our organizational history, structural evolution, and the collective pursuit of societal advancement.
          </p>
        </div>
      </section>

      {/* 2. Problem & Solution */}
      <section className="py-24 px-6 relative z-10">
        <div className="w-full text-left fade-up mb-12">
          <h2 className="text-xl font-heading font-medium mb-6">The Systemic Gap</h2>
          <div className="space-y-6 text-xs font-body leading-loose opacity-90 text-slate-700">
            <p>
              We observed a critical inefficiency within our societal framework: immense youth potential remaining dormant due to a lack of professional, structured platforms. The desire to contribute existed, but the infrastructure to channel that energy effectively did not.
            </p>
            <p>
              Simultaneously, communities faced systemic challenges—educational disparities and resource scarcity—that required organized, sustained intervention rather than sporadic charity. Forte-FY was established to bridge this gap, functioning as a professional conduit between youth capability and societal necessity.
            </p>
            <p className="text-cyan-700 mt-8 font-medium">
              To date, we have mobilized over <span className="counter-val font-bold text-slate-900" data-target="500">0</span> active volunteers, executing <span className="counter-val font-bold text-slate-900" data-target="25">0</span>+ strategic initiatives that have directly impacted <span className="counter-val font-bold text-slate-900" data-target="15000">0</span>+ lives across various communities.
            </p>
          </div>
        </div>
        <div className="w-full fade-up">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-xl">
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" alt="The Reality" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
      </section>

      {/* 3. Origin Story */}
      <section className="py-24 px-6 relative z-10">
        <div className="w-full fade-up mb-12">
          <div className="aspect-square rounded-[2rem] overflow-hidden relative shadow-xl">
            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049&auto=format&fit=crop" alt="Origin" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
        <div className="w-full text-right fade-up">
          <h2 className="text-xl font-heading font-medium mb-6">Where It All Began</h2>
          <p className="text-xs font-body leading-loose opacity-90 text-justify text-slate-700">
            Forte-FY was not conceptualized in a corporate boardroom. It originated from strategic dialogues among a core group of students who recognized that disciplined execution and limited resources could still generate profound, scalable impact. In the early days, our meetings were held in cramped rooms, fueled by ambition and a shared frustration with the status quo. We debated, we planned, and we dreamed of a platform that would not just host events, but cultivate leaders. Every obstacle we faced was a lesson in resilience, teaching us to navigate the complexities of student engagement, resource management, and strategic planning. The spark wasn't just an idea; it was a relentless drive to challenge conventional youth organizations and redefine what a collective of dedicated individuals could achieve when united under a singular, professional vision.
          </p>
        </div>
      </section>

      {/* 4. Timeline */}
      <section className="py-24 pl-6 relative z-10">
        <div className="mb-10 fade-up pr-6">
          <h2 className="text-xl font-heading font-medium text-left">Organizational Evolution</h2>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar fade-up pr-6 snap-x snap-mandatory">
          {TIMELINE.map((item, i) => (
            <div key={i} className="min-w-[260px] flex-shrink-0 snap-start bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="h-px w-full bg-cyan-200 mb-6 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-600" />
              </div>
              <span className="text-cyan-700 font-body text-[10px] tracking-widest mb-3 block">{item.year}</span>
              <h3 className="text-base font-heading font-medium mb-3">{item.title}</h3>
              <p className="text-xs font-body leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The People */}
      <section className="py-24 px-6 relative z-10">
        <div className="text-left mb-12 fade-up">
          <h2 className="text-xl font-heading font-medium mb-3">The Architects of Change</h2>
          <p className="text-xs font-body text-slate-600">The executive leadership and core committee driving our strategic operations.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {LEADERSHIP.map((person, i) => (
            <div key={i} className="fade-up bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="text-left px-1">
                <h4 className="text-sm font-heading font-medium mb-1">{person.name}</h4>
                <p className="text-[10px] font-body text-cyan-700">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="py-32 px-6 relative z-10 flex items-center justify-center text-center">
        <div className="w-full fade-up bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          <h2 className="text-2xl font-heading font-medium mb-6">Be Part of the Story</h2>
          <p className="text-xs font-body leading-loose text-slate-600 mb-10">
            Our journey is an ongoing narrative of impact, structure, and dedication. We invite you to contribute your expertise to our collective mission.
          </p>
          <Link to="/" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-slate-900 text-white font-body font-bold text-xs tracking-widest hover:bg-cyan-700 transition-colors">
            Join Us
          </Link>
        </div>
      </section>

    </div>
  );
};
