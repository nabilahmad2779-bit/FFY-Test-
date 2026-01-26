
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { 
  ArrowLeft, Sun, Moon,
  Globe, Megaphone, MessageSquare, Users,
  Share2, Zap, ArrowUpRight, PenTool, Handshake, Award
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DepartmentProps {
  dept: any;
  navigate: (path: string) => void;
}

// --- UTILITY COMPONENTS ---

const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const animate = (currentTime: number) => {
             if (!startTime) startTime = currentTime;
             const progress = currentTime - startTime;
             // Ease Out Quart
             const ease = (x: number): number => 1 - Math.pow(1 - x, 4);
             
             if (progress < duration) {
                setCount(Math.floor(end * ease(progress / duration)));
                requestAnimationFrame(animate);
             } else {
                setCount(end);
             }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      }, { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);
  return <span ref={nodeRef}>{count}{suffix}</span>;
};

// --- MAIN COMPONENT ---

const PRDepartment: React.FC<DepartmentProps> = ({ navigate }) => {
  const [isDark, setIsDark] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Scroll & Nav Logic
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
    const ctx = gsap.context(() => {
      // Hero Text Reveal
      gsap.fromTo(".hero-text-anim", 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.1 }
      );

      // Standard Reveal
      gsap.utils.toArray('.reveal-block').forEach((block: any) => {
        gsap.fromTo(block,
          { y: 40, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 0.8, 
            scrollTrigger: { trigger: block, start: "top 90%" } 
          }
        );
      });
      
      // List Stagger
      gsap.fromTo(".stagger-item",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: "#list-container", start: "top 85%" } }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Content Data
  const PR_STORY = [
    {
      title: "The Narrative Begins",
      year: "Est. 2023",
      icon: <PenTool className="w-5 h-5" />,
      content: "Forte-FY's story needed a voice. The PR department was established to craft, curate, and communicate our mission to the world, turning events into movements."
    },
    {
      title: "Building Bridges",
      year: "Expansion",
      icon: <Handshake className="w-5 h-5" />,
      content: "We shifted focus to strategic partnerships, connecting with 30+ clubs and organizations. PR became the handshake of Forte-FY, fostering collaboration over competition."
    },
    {
      title: "Global Presence",
      year: "Today",
      icon: <Globe className="w-5 h-5" />,
      content: "Today, we manage a comprehensive brand ecosystem. From corporate sponsorships with Nagad to nationwide campus ambassadorships, we ensure Forte-FY is seen and heard."
    }
  ];

  const PR_METRICS = [
    { label: "Total Reach", value: 250, suffix: "K+", icon: Globe },
    { label: "Partner Clubs", value: 32, suffix: "", icon: Users },
    { label: "Media Features", value: 15, suffix: "+", icon: Megaphone },
    { label: "Sponsorships", value: 12, suffix: "", icon: Share2 },
    { label: "Brand Mentions", value: 5000, suffix: "+", icon: MessageSquare },
  ];

  const PR_QUALITIES = [
    "Exceptional verbal and written communication skills to articulate the organization's vision clearly.",
    "Ability to network and build professional relationships with external partners and sponsors.",
    "Strategic thinking to manage brand reputation and handle public-facing scenarios.",
    "Proficiency in social media management and digital storytelling.",
    "Confidence in public speaking and representing Forte-FY at official functions."
  ];

  const theme = {
    bg: isDark ? "bg-[#050000]" : "bg-[#fffafa]",
    text: isDark ? "text-white" : "text-slate-900",
    subText: isDark ? "text-zinc-500" : "text-slate-500",
    paragraphText: isDark ? "text-zinc-300" : "text-slate-700",
    accent: "#ef4444", // Red-500
    heroOverlay: isDark ? "from-black/90 via-black/50 to-[#050000]" : "from-white/95 via-white/60 to-[#fffafa]",
    heroTextGradient: "from-white to-red-600",
    contentGradient: isDark ? "from-[#050000] via-[#1a0505] to-[#050000]" : "from-[#fffafa] via-red-50 to-[#fffafa]",
    navColor: isDark ? "text-white mix-blend-difference" : "text-red-800",
    border: isDark ? "border-red-500/10" : "border-red-500/20",
  };

  return (
    <div ref={containerRef} className={`min-h-screen font-sans selection:bg-red-500 selection:text-white overflow-x-hidden ${theme.bg} ${theme.text} transition-colors duration-700`}>
      
      {/* --- NAVIGATION --- */}
      <div className={`fixed top-0 left-0 w-full z-[60] p-6 flex justify-between items-center transition-transform duration-500 ${showNav ? 'translate-y-0' : '-translate-y-full'} ${theme.navColor}`}>
        <button onClick={() => navigate('/departments')} className="flex items-center gap-3 hover:text-red-500 transition-colors text-xs font-bold tracking-[0.2em] uppercase group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /><span>Nexus</span>
        </button>
        <button onClick={() => setIsDark(!isDark)} className="hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-500/10">
           {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* --- HERO SECTION (Restored Layout, New Theme) --- */}
      <section className={`relative h-screen w-full flex items-center justify-center overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
         <div className="absolute inset-0 z-0">
            {/* Soft Ambient Background - No Radars */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-red-600 rounded-full blur-[150px] opacity-10 animate-pulse`} style={{ animationDuration: '8s' }} />
            <div className={`absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-orange-500 rounded-full blur-[120px] opacity-5 animate-pulse`} style={{ animationDuration: '10s' }} />
            <div className={`absolute inset-0 bg-gradient-to-b ${theme.heroOverlay}`} />
         </div>

         <div className="relative z-10 text-center px-4 w-full max-w-[90vw]">
            <h1 className="hero-text-anim text-[12vw] md:text-[13vw] font-heading font-black leading-[0.8] tracking-tighter w-full text-transparent bg-clip-text bg-gradient-to-b from-white via-red-100 to-red-600">
               PUBLIC
            </h1>
            <h1 className="hero-text-anim text-[12vw] md:text-[13vw] font-heading font-black leading-[0.8] tracking-tighter w-full text-white mix-blend-difference">
               RELATIONS
            </h1>
            <div className="flex flex-col items-center mt-12 gap-4">
               <p className={`text-xs md:text-sm font-mono tracking-[0.3em] uppercase ${theme.subText}`}>
                  Strategize. Communicate. Connect.
               </p>
               <div className="w-px h-24 bg-red-500 opacity-50" />
            </div>
         </div>
      </section>

      <div className={`relative bg-gradient-to-b ${theme.contentGradient}`}>
         
         {/* --- LEADERSHIP SECTION --- */}
         <section className={`py-20 md:py-32 px-6 relative z-10 border-t ${theme.border}`}>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
               <div className="flex-1 text-center md:text-right order-2 md:order-1 reveal-block">
                  <h3 className="text-4xl md:text-6xl font-heading font-black uppercase italic leading-none mb-4">Director of <br/><span className="text-red-500">Communications</span></h3>
                  <p className="text-lg md:text-xl font-light italic text-zinc-400 mb-8">"PR is the art of storytelling. We don't just broadcast information; we build relationships that define the future of Forte-FY."</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-red-500/30 rounded-full bg-red-500/5">
                     <Megaphone size={14} className="text-red-500" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Official Spokesperson</span>
                  </div>
               </div>
               
               <div className="relative order-1 md:order-2 reveal-block">
                  {/* Clean, Professional Frame */}
                  <div className="w-64 h-64 md:w-80 md:h-80 relative">
                     <div className="absolute inset-0 border-2 border-red-500/20 rounded-full translate-x-4 translate-y-4" />
                     <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border-4 border-red-500/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80" alt="PR Head" className="w-full h-full object-cover" />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* --- EVOLUTION / STORY --- */}
         <section className={`py-20 md:py-32 px-6 relative z-10 border-t ${theme.border}`}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 border-b border-red-500/10 pb-8 reveal-block">
                  <h2 className="text-5xl md:text-8xl font-heading font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">Our<br/>Journey</h2>
                  <div className="mt-6 md:mt-0 flex items-center gap-3">
                     <div className="w-12 h-0.5 bg-red-500" />
                     <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Strategic Timeline</span>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PR_STORY.map((item, i) => (
                     <div key={i} className="reveal-block p-8 bg-white/[0.02] border border-white/5 hover:border-red-500/30 transition-all duration-500 group rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                           <span className="text-sm font-black uppercase tracking-widest text-zinc-600 group-hover:text-red-500 transition-colors">{item.year}</span>
                           <div className="p-3 bg-red-500/10 rounded-full text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">{item.icon}</div>
                        </div>
                        <h3 className="text-2xl font-bold uppercase mb-4 text-white">{item.title}</h3>
                        <p className="text-zinc-400 font-light leading-relaxed">{item.content}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* --- METRICS --- */}
         <section className="py-20 md:py-32 px-6 relative z-10">
             <div className="max-w-7xl mx-auto relative z-20">
                <div className="text-center mb-20 reveal-block">
                   <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-white mb-4">Engagement & Reach</h2>
                   <div className="w-24 h-1 bg-red-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                   {PR_METRICS.map((item, i) => (
                      <div key={i} className="reveal-block flex flex-col items-center justify-center p-6 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-red-500/40 transition-all group">
                         <div className="mb-4 text-zinc-500 group-hover:text-red-500 transition-colors">
                            {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
                         </div>
                         <h3 className="text-3xl md:text-5xl font-heading font-black text-white mb-2">
                            <CountUp end={item.value} suffix={item.suffix} />
                         </h3>
                         <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{item.label}</p>
                      </div>
                   ))}
                </div>
             </div>
         </section>

         {/* --- RECRUITMENT --- */}
         <section className="py-24 md:py-32 px-6 border-t border-red-500/10 bg-black/40 relative">
             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="reveal-block">
                   <h2 className="text-5xl md:text-7xl font-heading font-black uppercase italic leading-none mb-8 text-white">Join the <br/><span className="text-red-500">Narrative</span></h2>
                   <div className="p-8 border border-white/10 bg-white/5 rounded-2xl mb-8">
                      <h3 className="text-xl font-bold text-white uppercase mb-4 flex items-center gap-3">
                         <Zap className="text-red-500" size={20} /> PR Intern
                      </h3>
                      <p className="text-zinc-400 font-light mb-6">As a Public Relations Intern, you will be the face and voice of Forte-FY. You will manage external communications, foster relationships with partners, and ensure our brand resonates with integrity.</p>
                      <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-white hover:text-red-600 text-white font-black uppercase tracking-widest rounded-lg transition-all duration-300">
                         Apply Now <ArrowUpRight size={18} />
                      </a>
                   </div>
                </div>
                
                <div id="list-container" className="space-y-4">
                   <h3 className="text-lg font-bold uppercase text-zinc-500 mb-6 tracking-widest flex items-center gap-2">
                      <Award size={18} className="text-red-500" />
                      Required Qualities
                   </h3>
                   {PR_QUALITIES.map((q, i) => (
                      <div key={i} className="stagger-item flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                         <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                         <p className="text-zinc-300 font-light text-sm md:text-base leading-relaxed">{q}</p>
                      </div>
                   ))}
                </div>
             </div>
         </section>

      </div>
    </div>
  );
};

export default PRDepartment;
