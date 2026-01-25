
import React, { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { 
  ArrowLeft, Star, Zap, Activity as Pulse, 
  Users, Shield, Heart, FileText, ArrowUpRight, 
  CheckCircle2, TrendingUp, Award 
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface DepartmentDetailViewProps {
  dept: any;
  navigate: (path: string) => void;
}

const DepartmentDetailView: React.FC<DepartmentDetailViewProps> = ({ dept, navigate }) => {
  const isHR = dept.id === 'hr';
  
  // -- HR SPECIFIC LOGIC --
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    if (!isHR || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.fromTo(heroTextRef.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
      );
      
      gsap.fromTo(heroTaglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power2.out" }
      );

      // What We Do Cards - Staggered Rise
      gsap.utils.toArray('.hr-card').forEach((card: any) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Responsibilities Timeline
      gsap.utils.toArray('.hr-step').forEach((step: any, i) => {
        gsap.fromTo(step,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
            }
          }
        );
      });
      
      // Counters Animation
      gsap.utils.toArray('.hr-counter').forEach((counter: any) => {
         const target = parseInt(counter.getAttribute('data-target') || '0');
         gsap.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
               trigger: counter,
               start: "top 85%",
            }
         });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isHR]);

  if (isHR) {
    const hrColor = "#bf00ff"; // Given HR color
    const hrColorSoft = "rgba(191, 0, 255, 0.1)";

    return (
      <div ref={containerRef} className="bg-[#030303] text-white min-h-screen font-sans selection:bg-[#bf00ff] selection:text-white">
        {/* Navigation */}
        <div className="fixed top-0 left-0 w-full z-50 p-6">
          <button 
            onClick={() => navigate('/departments')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium tracking-wide bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
          >
            <ArrowLeft size={16} />
            <span>Back to Departments</span>
          </button>
        </div>

        {/* 1. Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
          {/* Soft Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none opacity-20" style={{ backgroundColor: hrColor }}></div>
          
          <div className="relative z-10 text-center max-w-4xl">
            <h1 ref={heroTextRef} className="text-5xl md:text-8xl font-heading font-bold tracking-tight mb-6 leading-tight">
              Human <span style={{ color: hrColor }}>Resources</span>
            </h1>
            <p ref={heroTaglineRef} className="text-lg md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              Cultivating a culture of growth, integrity, and human potential. We build the foundation where talent thrives.
            </p>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
          </div>
        </section>

        {/* 2. What We Do */}
        <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Our Core Functions</h2>
            <div className="w-16 h-1 mx-auto rounded-full opacity-50" style={{ backgroundColor: hrColor }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Recruitment", desc: "Identifying and onboarding exceptional talent.", icon: Users },
              { title: "People Management", desc: "Nurturing relationships and fostering team cohesion.", icon: Heart },
              { title: "Culture", desc: "Building a supportive and high-performance environment.", icon: Star },
              { title: "Compliance", desc: "Ensuring ethical standards and policy alignment.", icon: Shield },
            ].map((item, i) => (
              <div key={i} className="hr-card bg-zinc-900/30 border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/50 transition-colors duration-500 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: hrColorSoft, color: hrColor }}>
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Our Responsibilities */}
        <section className="py-24 bg-zinc-900/20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Responsibilities</h2>
              <p className="text-zinc-400 max-w-xl">A structured approach to organizational excellence.</p>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-700 before:to-transparent">
              {[
                { step: "01", title: "Talent Acquisition", desc: "Strategic sourcing and rigorous vetting of potential candidates." },
                { step: "02", title: "Onboarding & Integration", desc: "Seamless transition programs for new members." },
                { step: "03", title: "Performance Development", desc: "Continuous feedback loops and skill enhancement workshops." },
                { step: "04", title: "Policy & Welfare", desc: "Maintaining institutional harmony and member well-being." },
              ].map((item, i) => (
                <div key={i} className="hr-step relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#030303] bg-zinc-800 group-hover:bg-[#bf00ff] transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#030303] z-10 relative left-0 md:left-auto"></div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 md:p-8 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-[#bf00ff]/30 transition-all duration-300">
                    <span className="text-xs font-bold opacity-50 tracking-widest mb-2 block" style={{ color: hrColor }}>PHASE {item.step}</span>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Culture & Values */}
        <section className="py-24 md:py-32 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
             <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">
               Built on <br/> <span style={{ color: hrColor }}>Trust.</span>
             </h2>
             <p className="text-zinc-400 text-lg leading-relaxed mb-8">
               We believe that an organization is only as strong as its people. Our culture is rooted in empathy, transparency, and the relentless pursuit of collective growth.
             </p>
             <div className="flex flex-wrap gap-3">
               {["Human-Centered", "Ethical", "Inclusive", "Professional"].map(tag => (
                 <span key={tag} className="px-4 py-2 rounded-full bg-white/5 text-sm font-medium hover:bg-[#bf00ff]/10 hover:text-[#bf00ff] transition-colors cursor-default border border-white/5">
                   {tag}
                 </span>
               ))}
             </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 hover:border-[#bf00ff]/20 transition-all group">
              <QuoteIcon className="mb-4 opacity-50 group-hover:text-[#bf00ff] transition-colors" />
              <p className="text-xl font-light italic text-zinc-300">"HR is the heartbeat of Forte-FY. We don't just manage people; we empower them to become their best selves."</p>
              <p className="mt-4 text-sm font-bold text-zinc-500 uppercase tracking-widest">– {dept.lead}</p>
            </div>
          </div>
        </section>

        {/* 5. Impact & Growth */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
               {[
                 { label: "Members Onboarded", target: 300, suffix: "+" },
                 { label: "Retention Rate", target: 95, suffix: "%" },
                 { label: "Trainings Conducted", target: 50, suffix: "+" },
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center">
                   <div className="text-5xl md:text-7xl font-heading font-bold mb-2 flex items-baseline">
                     <span className="hr-counter" data-target={stat.target}>0</span>
                     <span className="text-3xl md:text-5xl" style={{ color: hrColor }}>{stat.suffix}</span>
                   </div>
                   <p className="text-zinc-500 uppercase tracking-widest text-sm font-medium">{stat.label}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* 6. Call to Action */}
        <section className="py-32 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#bf00ff] via-transparent to-transparent"></div>
           <div className="relative z-10 max-w-2xl">
             <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to shape the future?</h2>
             <p className="text-zinc-400 mb-10 text-lg">Join the Human Resources department and be the architect of our community's success.</p>
             <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#bf00ff]/20">
               <span className="relative z-10 flex items-center gap-2">
                 Join HR Department <ArrowUpRight size={18} />
               </span>
               <div className="absolute inset-0 bg-[#bf00ff] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
               <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                 Join HR Department <ArrowUpRight size={18} />
               </span>
             </button>
           </div>
        </section>

      </div>
    );
  }

  // -- DEFAULT VIEW FOR OTHER DEPARTMENTS --
  return (
    <div className="pt-32 pb-32 animate-fade-in min-h-screen">
      <div className="max-w-6xl mx-auto px-5">
        <button 
          onClick={() => navigate('/departments')}
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-cyan-500 transition-colors mb-16"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Return to Nexus
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className={`w-28 h-28 md:w-40 md:h-40 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/5 flex items-center justify-center mb-10 border border-white/10 shadow-2xl ${dept.colorClass}`} style={{ color: dept.accent }}>
                {React.cloneElement(dept.icon as React.ReactElement<any>, { size: 64, className: "md:w-16 md:h-16" })}
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-black uppercase italic tracking-tighter leading-none mb-4">{dept.name}</h1>
              <p className="text-cyan-500 font-black uppercase text-[10px] md:text-[12px] tracking-[0.4em] mb-12">{dept.tagline}</p>
              
              <div className="glass p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Star size={100} className="text-white" />
                </div>
                <div className="relative z-10">
                   <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6">Department Head</h4>
                   <h3 className="text-2xl md:text-3xl font-heading font-black italic tracking-tight text-white mb-2">{dept.lead}</h3>
                   <div className="w-12 h-1 bg-cyan-500/30 rounded-full mt-6" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-12">
            <ScrollReveal delay={100}>
               <div className="bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] relative group hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center gap-6 mb-8">
                     <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500">
                        <Zap size={24} />
                     </div>
                     <h3 className="text-2xl md:text-4xl font-heading font-black uppercase italic tracking-tight text-white">Core Operations</h3>
                  </div>
                  <p className="text-zinc-500 text-lg md:text-2xl font-light leading-relaxed italic">
                    {dept.work}
                  </p>
               </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
               <div className="bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-transparent" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-8">
                       <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500">
                          <Pulse size={24} />
                       </div>
                       <h3 className="text-2xl md:text-4xl font-heading font-black uppercase italic tracking-tight text-white">Institutional Impact</h3>
                    </div>
                    <p className="text-zinc-300 text-lg md:text-2xl font-bold leading-relaxed mb-10">
                      {dept.impact}
                    </p>
                    <div className="flex flex-wrap gap-4">
                       <div className="px-5 py-2 glass rounded-full text-[9px] font-black text-cyan-500 uppercase tracking-widest border border-cyan-500/20">Metric Verified</div>
                       <div className="px-5 py-2 glass rounded-full text-[9px] font-black text-zinc-500 uppercase tracking-widest border border-white/5">System Sync: OK</div>
                    </div>
                  </div>
               </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={`w-8 h-8 ${className}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
  </svg>
);

export default DepartmentDetailView;
