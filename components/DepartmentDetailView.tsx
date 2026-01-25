
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { 
  ArrowLeft, Star, Zap, Activity as Pulse, 
  Users, Shield, Heart, ArrowUpRight, 
  Sun, Moon,
  Target, Quote
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface DepartmentDetailViewProps {
  dept: any;
  navigate: (path: string) => void;
}

// --- SUB-COMPONENTS ---

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.15 });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none mix-blend-difference z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none mix-blend-difference z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out hidden md:block" />
    </>
  );
};

const DepartmentDetailView: React.FC<DepartmentDetailViewProps> = ({ dept, navigate }) => {
  const isHR = dept.id === 'hr';
  
  // -- HR SPECIFIC LOGIC --
  const [isDark, setIsDark] = useState(true);
  const [showNav, setShowNav] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollY = useRef(0);

  // Smart Nav Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations
  useLayoutEffect(() => {
    if (!isHR) return;

    const ctx = gsap.context(() => {
      // Hero Text Reveal
      gsap.fromTo(".hr-hero-text", 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", stagger: 0.1 }
      );

      // Section Titles Reveal
      gsap.utils.toArray('.reveal-text').forEach((text: any) => {
        gsap.fromTo(text, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
            }
          }
        );
      });

      // Floating Animation for Profile Image
      gsap.to(".profile-float", {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Rotating border for profile
      gsap.to(".profile-rotate", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isHR, isDark]);


  if (isHR) {
    const theme = {
      bg: isDark ? "bg-[#050505]" : "bg-[#f8f9fa]",
      text: isDark ? "text-white" : "text-zinc-900",
      subText: isDark ? "text-zinc-500" : "text-zinc-600",
      lightText: isDark ? "text-zinc-400" : "text-zinc-500",
      // Dark mode: dark overlay. Light mode: white overlay.
      heroOverlay: isDark ? "from-black/90 via-black/40 to-[#050505]" : "from-white/95 via-white/60 to-[#f8f9fa]",
      // Dark mode: White text. Light mode: Dark text.
      heroTextGradient: isDark ? "from-white to-white/50" : "from-zinc-900 to-zinc-500",
      // Content gradients
      contentGradient: isDark ? "from-[#050505] via-[#1a0520] to-[#050505]" : "from-[#f8f9fa] via-[#f3e8ff] to-[#f8f9fa]",
      // Cards
      cardBg: isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-zinc-200 shadow-xl shadow-purple-500/5",
      cardHoverBorder: isDark ? "hover:border-[#bf00ff]/20" : "hover:border-[#bf00ff]/40",
      cardHoverBg: isDark ? "hover:bg-white/5" : "hover:bg-purple-50/50",
      metricTextHover: isDark ? "group-hover:from-white" : "group-hover:from-zinc-900",
      metricTextBase: isDark ? "text-transparent bg-clip-text bg-gradient-to-b from-[#bf00ff] to-transparent" : "text-transparent bg-clip-text bg-gradient-to-b from-[#bf00ff] to-[#d8b4fe]",
      ctaBg: isDark ? "bg-white/5 border-[#bf00ff]/30 text-white" : "bg-white border-[#bf00ff]/20 text-zinc-900 shadow-lg",
      quoteText: isDark ? "text-zinc-200" : "text-zinc-700",
      navColor: isDark ? "text-white mix-blend-difference" : "text-zinc-900",
      navBtnHover: "hover:text-[#bf00ff]",
      border: isDark ? "border-[#bf00ff]/10" : "border-[#bf00ff]/20",
      profileBorder: isDark ? "border-[#bf00ff]/20" : "border-[#bf00ff]/30",
    };

    return (
      <>
        <CustomCursor />
        
        <div 
          ref={containerRef} 
          className={`min-h-screen font-sans selection:bg-[#bf00ff] selection:text-white overflow-x-hidden ${theme.bg} ${theme.text} transition-colors duration-700`}
        >
          {/* Smart Navigation */}
          <div className={`fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center transition-transform duration-500 ${showNav ? 'translate-y-0' : '-translate-y-full'} ${theme.navColor}`}>
            <button 
              onClick={() => navigate('/departments')}
              className={`flex items-center gap-3 ${theme.navBtnHover} transition-colors text-xs font-bold tracking-[0.2em] uppercase group`}
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Nexus</span>
            </button>

            <div className="flex items-center gap-6">
               <button onClick={() => setIsDark(!isDark)} className={`${theme.navBtnHover} transition-colors`}>
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
               </button>
            </div>
          </div>

          {/* 1. HERO SECTION */}
          <section className={`relative h-screen w-full flex items-center justify-center overflow-hidden ${isDark ? 'bg-black' : 'bg-white'} transition-colors duration-700`}>
            <div className="absolute inset-0 z-0">
              <video 
                ref={videoRef}
                autoPlay 
                muted
                loop 
                playsInline
                className="w-full h-full object-cover grayscale transition-opacity duration-700"
                style={{ opacity: isDark ? 0.4 : 0.15 }}
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-network-connection-complex-lines-2735-large.mp4" type="video/mp4" />
              </video>
              <div className={`absolute inset-0 bg-gradient-to-b ${theme.heroOverlay} transition-colors duration-700`} />
              
              {/* Pulse Effect - Very Dim */}
              <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#bf00ff] rounded-full blur-[160px] animate-pulse pointer-events-none transition-opacity duration-700 ${isDark ? 'opacity-[0.008]' : 'opacity-[0.02]'}`}
                style={{ animationDuration: '8s' }}
              />
              <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#bf00ff] rounded-full blur-[120px] animate-pulse pointer-events-none transition-opacity duration-700 ${isDark ? 'opacity-[0.005]' : 'opacity-[0.015]'}`}
                style={{ animationDuration: '6s' }}
              />
            </div>

            <div className={`relative z-10 text-center px-4 w-full max-w-[90vw] ${theme.text}`}>
              <h1 className={`hr-hero-text text-[12vw] md:text-[13vw] font-heading font-black leading-[0.8] tracking-tighter w-full ${isDark ? 'text-white' : 'text-zinc-900'} transition-colors duration-700`}>
                HUMAN
              </h1>
              <h1 className={`hr-hero-text text-[12vw] md:text-[13vw] font-heading font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${theme.heroTextGradient} w-full transition-all duration-700`}>
                RESOURCES
              </h1>
              
              <div className="flex flex-col items-center mt-12 gap-4">
                 <p className={`text-xs md:text-sm font-mono tracking-[0.5em] uppercase ${theme.subText} transition-colors duration-700`}>
                    The Architecture of Potential
                 </p>
                 <div className="w-px h-24 bg-[#bf00ff] animate-pulse" style={{ animationDuration: '4s' }} />
              </div>
            </div>
          </section>

          {/* GRADIENT BACKGROUND WRAPPER FOR REST OF PAGE */}
          <div className={`relative bg-gradient-to-b ${theme.contentGradient} transition-colors duration-700`}>
            
            {/* 2. RE-DESIGNED LEADERSHIP SECTION */}
            <section className={`py-32 px-6 relative z-10 border-t border-b ${theme.border} overflow-hidden`}>
               <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                  
                  {/* Styled Section Header */}
                  <div className="reveal-text mb-20 flex flex-col items-center">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-8 md:w-16 bg-[#bf00ff]/40" />
                        <h2 className="text-xl md:text-2xl font-heading font-bold text-[#bf00ff] uppercase tracking-[0.2em]">Department Head's message</h2>
                        <div className="h-px w-8 md:w-16 bg-[#bf00ff]/40" />
                     </div>
                     <p className={`text-[10px] font-mono uppercase tracking-widest ${theme.subText}`}>Leadership Insight</p>
                  </div>

                  {/* Circular Profile Image with Animations */}
                  <div className="reveal-text profile-float relative mb-16 group cursor-pointer">
                     <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-[#bf00ff] to-transparent shadow-[0_0_40px_rgba(191,0,255,0.2)] group-hover:shadow-[0_0_60px_rgba(191,0,255,0.4)] transition-all duration-700 relative z-10 ${isDark ? 'shadow-black/50' : 'shadow-purple-200'}`}>
                        <div className={`w-full h-full rounded-full overflow-hidden ${isDark ? 'bg-black' : 'bg-white'} relative transition-colors duration-700`}>
                          <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                            alt="Kashfia Anjum" 
                            className="w-full h-full object-cover object-top rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                          />
                        </div>
                     </div>
                     
                     {/* Decorative Quote Sign */}
                     <div className="absolute -top-2 -right-2 md:top-0 md:right-0 w-12 h-12 md:w-16 md:h-16 bg-[#bf00ff] rounded-full flex items-center justify-center text-black shadow-lg z-20 group-hover:rotate-12 transition-transform duration-500">
                        <Quote size={24} className="md:w-8 md:h-8 fill-current" />
                     </div>

                     {/* Orbiting Elements */}
                     <div className={`absolute inset-[-20px] rounded-full border border-dashed profile-rotate pointer-events-none ${theme.profileBorder}`} />
                     <div className={`absolute inset-[-40px] rounded-full border pointer-events-none ${isDark ? 'border-white/5' : 'border-black/5'}`} />
                  </div>
                  
                  <div className="space-y-8">
                     <h3 className={`reveal-text text-5xl md:text-7xl font-heading font-black uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-white via-[#bf00ff]/50 to-white' : 'from-zinc-900 via-[#bf00ff] to-zinc-900'}`}>
                        Kashfia Anjum
                     </h3>
                     <div className="reveal-text max-w-3xl mx-auto relative">
                        <div className="absolute -left-8 -top-8 text-[#bf00ff]/10">
                           <Quote size={64} />
                        </div>
                        <p className={`text-xl md:text-3xl font-heading font-light leading-relaxed ${theme.quoteText} relative z-10 transition-colors duration-700`}>
                          "HR isn't about policing policies; it's about <span className="text-[#bf00ff] font-bold">unlocking human potential</span>. We create the soil where the seeds of leadership can sprout."
                        </p>
                     </div>
                     <div className="reveal-text w-16 h-1 bg-gradient-to-r from-transparent via-[#bf00ff] to-transparent mx-auto mt-12" />
                     <p className="reveal-text text-xs font-bold tracking-[0.3em] uppercase text-[#bf00ff]/80">Head of Human Resources</p>
                  </div>
               </div>
            </section>

            {/* 3. KEY METRICS */}
            <section className="py-32 px-6 relative z-10">
               <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                     <div className={`reveal-text group p-8 rounded-3xl ${theme.cardHoverBg} transition-colors duration-500 border border-transparent ${theme.cardHoverBorder}`}>
                        <h2 className={`text-7xl md:text-[10rem] font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-[#bf00ff] to-transparent mb-2 leading-[0.8] ${theme.metricTextHover} group-hover:to-[#bf00ff] transition-all duration-500`}>1500+</h2>
                        <div className="h-px w-full bg-gradient-to-r from-[#bf00ff] to-transparent mb-6 opacity-30" />
                        <p className={`text-2xl font-heading font-bold uppercase tracking-wide ${theme.text} mb-2`}>Recruitments</p>
                        <p className={`text-sm font-mono ${theme.lightText} max-w-sm`}>Rigorous vetting processes ensuring only the most dedicated talent enters the ecosystem.</p>
                     </div>
                     <div className={`reveal-text group p-8 rounded-3xl ${theme.cardHoverBg} transition-colors duration-500 border border-transparent ${theme.cardHoverBorder} text-right md:text-left md:ml-auto`}>
                        <h2 className={`text-7xl md:text-[10rem] font-heading font-black text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white to-white/10' : 'from-zinc-900 to-zinc-900/10'} mb-2 leading-[0.8] group-hover:text-[#bf00ff] transition-all duration-500`}>50+</h2>
                        <div className="h-px w-full bg-gradient-to-l from-[#bf00ff] to-transparent mb-6 opacity-30" />
                        <p className={`text-2xl font-heading font-bold uppercase tracking-wide ${theme.text} mb-2 ml-auto md:ml-0`}>Sessions</p>
                        <p className={`text-sm font-mono ${theme.lightText} max-w-sm ml-auto md:ml-0`}>Comprehensive skill-development modules delivered to internal teams.</p>
                     </div>
                  </div>
               </div>
            </section>

            {/* 4. INTERACTIVE RESPONSIBILITIES */}
            <section className="py-32 px-6 relative z-10">
               <div className="max-w-6xl mx-auto">
                  <div className="mb-24 text-center">
                     <h2 className={`reveal-text text-5xl md:text-6xl font-heading font-black uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white to-white/40' : 'from-zinc-900 to-zinc-400'}`}>Operational Matrix</h2>
                     <div className="w-24 h-1.5 bg-[#bf00ff] mx-auto rounded-full" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[
                       { title: "Talent Acquisition", desc: "Strategic sourcing of high-potential candidates.", icon: <Users size={32} /> },
                       { title: "Performance Mgmt", desc: "Continuous feedback loops and growth tracking.", icon: <Target size={32} /> },
                       { title: "Conflict Resolution", desc: "Maintaining institutional harmony and ethics.", icon: <Shield size={32} /> },
                       { title: "Culture & Welfare", desc: "Building a supportive environment for all members.", icon: <Heart size={32} /> }
                     ].map((item, i) => (
                       <div key={i} className={`reveal-text group relative p-10 md:p-14 ${theme.cardBg} ${theme.cardHoverBorder} rounded-[2rem] ${theme.cardHoverBg} transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(191,0,255,0.3)]`}>
                          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 group-hover:text-[#bf00ff] transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                             {item.icon}
                          </div>
                          <div className="relative z-10">
                             <h3 className={`text-2xl md:text-3xl font-heading font-black uppercase mb-4 ${isDark ? 'group-hover:text-white' : 'group-hover:text-zinc-900'} transition-colors`}>{item.title}</h3>
                             <p className={`text-base font-light ${theme.lightText} ${isDark ? 'group-hover:text-zinc-200' : 'group-hover:text-zinc-700'} transition-colors leading-relaxed`}>
                                {item.desc}
                             </p>
                             <div className="mt-8 flex items-center gap-2 text-[#bf00ff] text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                <span>Learn More</span>
                                <ArrowUpRight size={14} />
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* 5. IMMERSIVE CTA */}
            <section className="h-[80vh] flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 z-0">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-[#bf00ff] rounded-full blur-[250px] opacity-[0.1]" />
               </div>

               <div className="relative z-10 text-center px-4">
                  <h2 className={`reveal-text text-6xl md:text-9xl font-heading font-black mb-12 uppercase tracking-tighter ${theme.text} mix-blend-overlay`}>
                     Shape The<br/>Future
                  </h2>
                  
                  <a 
                     href="https://forms.google.com" 
                     target="_blank" 
                     rel="noreferrer"
                     className={`reveal-text group relative inline-flex items-center gap-4 px-12 py-6 ${theme.ctaBg} rounded-full overflow-hidden hover:bg-[#bf00ff] transition-all duration-500 hover:shadow-[0_0_50px_rgba(191,0,255,0.5)] active:scale-95`}
                  >
                     <span className={`relative z-10 font-heading font-bold uppercase tracking-widest ${theme.text} ${isDark ? 'group-hover:text-black' : 'group-hover:text-white'} transition-colors text-sm md:text-base`}>
                        Open Recruitment Form
                     </span>
                     <ArrowUpRight className={`relative z-10 w-5 h-5 ${theme.text} ${isDark ? 'group-hover:text-black' : 'group-hover:text-white'} transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 duration-300`} />
                  </a>
               </div>
            </section>

          </div>
        </div>
      </>
    );
  }

  // -- DEFAULT VIEW FOR OTHER DEPARTMENTS (Legacy) --
  return (
    <div className="pt-32 pb-32 animate-fade-in min-h-screen text-center">
      <div className="max-w-6xl mx-auto px-5">
        <button 
          onClick={() => navigate('/departments')}
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-cyan-500 transition-colors mb-16 mx-auto"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Return to Nexus
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className={`w-28 h-28 md:w-40 md:h-40 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/5 flex items-center justify-center mb-10 border border-white/10 shadow-2xl ${dept.colorClass} mx-auto`} style={{ color: dept.accent }}>
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
                   <div className="w-12 h-1 bg-cyan-500/30 rounded-full mt-6 mx-auto" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-12">
            <ScrollReveal delay={100}>
               <div className="bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] relative group hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center gap-6 mb-8 justify-center lg:justify-start">
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
                    <div className="flex items-center gap-6 mb-8 justify-center lg:justify-start">
                       <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500">
                          <Pulse size={24} />
                       </div>
                       <h3 className="text-2xl md:text-4xl font-heading font-black uppercase italic tracking-tight text-white">Institutional Impact</h3>
                    </div>
                    <p className="text-zinc-300 text-lg md:text-2xl font-bold leading-relaxed mb-10">
                      {dept.impact}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
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

export default DepartmentDetailView;
