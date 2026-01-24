
import React, { useState, useEffect, useRef } from 'react';
import { NavSection, Demographics, Department, Alumni, Member } from './types';
import { FORTE_EVENTS, HALL_OF_FAME, HERO_IMAGE_URL, COLLABORATIONS, AWARDS, PARTNER_LOGOS, SPONSORS, DEPARTMENTS, ALUMNI } from './constants';
import { jsPDF } from 'jspdf';
import { 
  Rocket, Users, Mail, Phone, ChevronRight, 
  Loader2, Quote, Menu, X, ArrowUpRight,
  Star, Target, Laptop, GraduationCap,
  Activity as Pulse, Disc, Briefcase, Megaphone, Trophy,
  Shield, Terminal, Radio, Zap, Globe, Cpu, ChevronDown,
  Layers, Bookmark, CheckCircle, Database,
  Linkedin, Facebook, Instagram, Download, Play, ArrowLeft, ExternalLink, Award
} from 'lucide-react';

// --- Utility Components ---

const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    setCount(0);
    startTime.current = null;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (percentage < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
};

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-[1000ms] transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- ICON MAPPER ---
const IconMap: Record<string, React.ReactNode> = {
  Users: <Users />,
  Megaphone: <Megaphone />,
  GraduationCap: <GraduationCap />,
  Laptop: <Laptop />,
};

// --- PAGES ---

const OurHistoryPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-5 min-h-screen bg-[#030303]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Chronicle of Origins</h2>
          <h1 className="text-5xl md:text-8xl font-heading font-black uppercase italic tracking-tighter leading-none mb-8">Our <span className="text-white/40">History</span></h1>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <ScrollReveal>
            <div className="space-y-8 text-zinc-400 text-lg leading-relaxed font-light">
              <p className="text-white font-bold text-2xl italic border-l-4 border-cyan-500 pl-6 mb-10">Established May 26, 2022. The moment raw potential met systemic structure.</p>
              <p>Forte-FY was founded with a singular, unyielding purpose: to bridge the vast gap between youth curiosity and professional excellence. In a world where talent is evenly distributed but opportunity is not, we set out to build a sanctuary for intentional learning.</p>
              <p>Our founding journey began in Dhaka, where a small collective of visionaries recognized that the youth needed more than just a platform—they needed a roadmap. We didn't just want to host events; we wanted to manufacture character.</p>
              <p>Since that day, every initiative has been a brick in a foundation built on precision, resilience, and the belief that the future is something you don't wait for—you manifest it.</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200} className="relative group">
            <div className="aspect-video glass rounded-[2.5rem] overflow-hidden relative shadow-2xl border-white/10 group-hover:border-cyan-500/30 transition-all duration-700">
              <img src={HERO_IMAGE_URL} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Founding Cinematic" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_30px_#00f7ff] group-hover:scale-110 transition-transform">
                  <Play size={32} className="ml-1" />
                </button>
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Cinematic Manifestation v1.0</span>
                <span className="text-[10px] font-mono text-cyan-500">03:42 SEC</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

const StructuralPillarsPage: React.FC<{ onDeptClick: (id: string) => void }> = ({ onDeptClick }) => {
  return (
    <div className="pt-24 pb-20 px-5 min-h-screen bg-[#030303]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Organizational Architecture</h2>
          <h1 className="text-5xl md:text-8xl font-heading font-black uppercase italic tracking-tighter leading-none mb-8">Structural <span className="text-white/40">Pillars</span></h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto italic font-light">The four domains that power the manifestation of youth excellence.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DEPARTMENTS.map((dept, i) => (
            <ScrollReveal key={dept.id} delay={i * 100}>
              <div 
                onClick={() => onDeptClick(dept.id)}
                className={`group cursor-pointer border p-10 rounded-[2.5rem] transition-all duration-500 flex flex-col relative overflow-hidden ${dept.colorClass} hover:scale-[1.02] h-full shadow-2xl`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 shadow-inner" style={{ color: dept.accent }}>
                  {IconMap[dept.icon]}
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60 leading-none">{dept.tagline}</h4>
                <h3 className="text-3xl font-heading font-black text-white italic tracking-tight mb-6">{dept.name}</h3>
                <p className="text-zinc-500 text-base font-light leading-relaxed mb-10">{dept.description}</p>
                <div className="mt-auto flex items-center gap-2 text-white font-bold uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                  Enter Domain <ArrowUpRight size={14} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

const DepartmentDetailPage: React.FC<{ dept: Department; onBack: () => void }> = ({ dept, onBack }) => {
  return (
    <div className="pt-24 pb-20 px-5 min-h-screen bg-[#030303]">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-cyan-500 transition-colors mb-12 uppercase font-black text-[10px] tracking-widest">
          <ArrowLeft size={16} /> Back to Pillars
        </button>

        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            <div className={`w-32 h-32 rounded-3xl flex items-center justify-center border-2 border-white/10 ${dept.colorClass}`} style={{ color: dept.accent }}>
              <div className="scale-[2]">{IconMap[dept.icon]}</div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-heading font-black uppercase italic tracking-tighter mb-4 text-white">{dept.name}</h1>
              <p className="text-cyan-500 font-black uppercase tracking-[0.3em] text-xs italic">{dept.tagline}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass rounded-[3rem] p-10 md:p-16 border-white/5 shadow-3xl mb-12">
            <h3 className="text-zinc-500 uppercase font-black text-[10px] tracking-[0.4em] mb-8">Mission Synthesis</h3>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-zinc-300 italic mb-12">"{dept.fullDescription}"</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dept.goals.map((goal, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                  <CheckCircle size={18} className="text-cyan-500" />
                  <span className="text-white font-bold uppercase tracking-widest text-[10px]">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="bg-[#111] border border-white/5 rounded-[2rem] p-10 flex flex-col items-center text-center">
             <Pulse className="text-cyan-500 animate-pulse mb-6" size={32} />
             <h4 className="text-white font-black uppercase tracking-[0.2em] mb-2">Live Department Status</h4>
             <p className="text-zinc-600 font-mono text-xs">OPS_LEVEL: NOMINAL | PERSONNEL: ACTIVE</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

const HallOfFamePage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-5 min-h-screen bg-[#030303]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Resonant Figures</h2>
          <h1 className="text-5xl md:text-8xl font-heading font-black uppercase italic tracking-tighter leading-none mb-8">Hall of <span className="text-white/40">Fame</span></h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto italic font-light">Extraordinary role holders who redefined our institutional standards.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {HALL_OF_FAME.map((member, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className="group relative flex flex-col md:flex-row items-center gap-10 glass p-10 rounded-[3rem] border-white/5 hover:border-cyan-500/30 transition-all duration-700 h-full shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Award size={120} className="text-cyan-500" />
                </div>
                <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-4 border-white/10 p-1 group-hover:border-cyan-500/50 transition-all duration-700">
                  <img src={member.image} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" alt={member.name} />
                </div>
                <div className="flex-1 text-center md:text-left relative z-10">
                  <h3 className="text-3xl font-heading font-black text-white italic uppercase mb-2 group-hover:text-cyan-400 transition-colors leading-tight">{member.name}</h3>
                  <p className="text-cyan-500 font-black uppercase text-[10px] tracking-[0.3em] mb-6">{member.role}</p>
                  <div className="relative">
                    <Quote className="absolute -top-6 -left-4 w-10 h-10 text-cyan-500/5 group-hover:text-cyan-500/10" />
                    <p className="text-zinc-400 italic text-lg leading-relaxed">"{member.impact}"</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

const AlumniPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-5 min-h-screen bg-[#030303]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Institutional Legacy</h2>
          <h1 className="text-5xl md:text-8xl font-heading font-black uppercase italic tracking-tighter leading-none mb-8">Our <span className="text-white/40">Alumni</span></h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto italic font-light">Where the manifestation continues. Tracking the professional trajectory of our former members.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ALUMNI.map((alum, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="group relative glass rounded-[2.5rem] p-8 border-white/5 hover:border-cyan-500/30 transition-all duration-700 text-center flex flex-col h-full shadow-xl">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-8 border-2 border-white/10 group-hover:border-cyan-500/50 transition-all">
                  <img src={alum.image} alt={alum.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h3 className="text-xl font-heading font-black text-white italic uppercase mb-3">{alum.name}</h3>
                <div className="mb-6 flex-1">
                  <p className="text-cyan-500 font-black uppercase text-[8px] tracking-[0.2em] mb-2">Current Designation</p>
                  <p className="text-zinc-300 font-bold text-sm mb-4 leading-tight">{alum.designation}</p>
                  <div className="w-10 h-px bg-white/10 mx-auto mb-4" />
                  <p className="text-zinc-600 font-black uppercase text-[8px] tracking-[0.2em] mb-2">Institution</p>
                  <p className="text-zinc-400 text-xs italic leading-tight">{alum.university}</p>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-center">
                  <Linkedin size={16} className="text-zinc-800 group-hover:text-cyan-500 transition-colors cursor-pointer" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- APP ROOT ---

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.Home);
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (section: NavSection) => {
    setActiveSection(section);
    setSelectedDeptId(null); // Clear department selection when navigating
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDept = (id: string) => {
    setSelectedDeptId(id);
    setActiveSection(NavSection.DepartmentDetail);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPortfolio = () => {
    const doc = new jsPDF();
    const primaryColor = [0, 247, 255]; // Cyan
    const darkColor = [3, 3, 3];
    const grayColor = [150, 150, 150];
    
    const drawFooter = (pageNum: number) => {
        doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.rect(0, 280, 210, 17, 'F');
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        doc.setFontSize(8);
        doc.text(`Forte-FY | Institutional Portfolio | Page ${pageNum}`, 105, 290, { align: "center" });
    };

    // Cover Page
    doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.rect(5, 5, 200, 287);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(10);
    doc.text("FOR A FORTUNATE FUTURE", 105, 100, { align: "center", charSpace: 2 });
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(64);
    doc.text("MANIFEST", 105, 135, { align: "center" });
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(72);
    doc.text("TOMORROW.", 105, 165, { align: "center" });
    drawFooter(1);

    // Structure & Pillars
    doc.addPage();
    doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(10);
    doc.text("STRUCTURAL PILLARS", 20, 30);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.text("ARCHITECTURE", 20, 45);
    let yPos = 65;
    DEPARTMENTS.forEach(dept => {
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(16);
      doc.text(dept.name, 20, yPos);
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(10);
      const splitDesc = doc.splitTextToSize(dept.fullDescription, 170);
      doc.text(splitDesc, 20, yPos + 8);
      yPos += splitDesc.length * 6 + 15;
    });
    drawFooter(2);

    // Alumni
    doc.addPage();
    doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(10);
    doc.text("ALUMNI TRACKER", 20, 30);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.text("LEGACY DATA", 20, 45);
    yPos = 65;
    ALUMNI.forEach(alum => {
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text(alum.name, 20, yPos);
      doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      doc.setFontSize(9);
      doc.text(`${alum.designation} at ${alum.university}`, 20, yPos + 6);
      yPos += 20;
    });
    drawFooter(3);

    doc.save("Forte-FY_Institutional_Portfolio.pdf");
  };

  const renderContent = () => {
    switch (activeSection) {
      case NavSection.Home:
        return (
          <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20 px-5 overflow-hidden group/hero">
            <div className="absolute inset-0 z-0 overflow-hidden">
               <img src={HERO_IMAGE_URL} className="w-full h-full object-cover grayscale brightness-[0.2] transition-all duration-[3000ms] group-hover/hero:scale-105" alt="Hero Backdrop" />
               <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] opacity-80" />
            </div>
            <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2.5 glass rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-10 text-cyan-500 border border-cyan-500/20 shadow-cyan">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" /> For a Fortunate Future
                </div>
                <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] font-heading font-black uppercase leading-[0.85] mb-6 md:mb-8 tracking-tighter w-full px-2">
                  <span className="text-white italic">Manifest</span> <br />
                  <span className="text-[#00f7ff] italic">Tomorrow.</span>
                </h1>
                <p className="text-sm md:text-xl text-zinc-500 max-w-2xl mb-8 md:mb-12 leading-relaxed font-light px-2 mx-auto">Established May 26, 2022. We manufacture a generation of accomplished individuals through rigorous skill elevation.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3.5 md:gap-5 w-full max-w-xs sm:max-w-none mx-auto px-4">
                  <button onClick={() => handleNav(NavSection.OurHistory)} className="px-7 py-3.5 md:px-10 md:py-5 bg-cyan-500 hover:bg-white text-black font-black uppercase tracking-widest transition-all rounded-lg md:rounded-full flex items-center justify-center gap-2.5 md:gap-3 text-xs md:text-base group active:scale-95 shadow-xl min-w-[150px]">Explore History <Rocket size={18} className="shrink-0" /></button>
                  <button onClick={handleDownloadPortfolio} className="px-7 py-3.5 md:px-10 md:py-5 glass hover:bg-white/10 text-white font-black uppercase tracking-widest transition-all rounded-lg md:rounded-full flex items-center justify-center gap-2.5 md:gap-3 text-xs md:text-base active:scale-95 border border-white/10 min-w-[150px]">Portfolio PDF <Download size={18} className="shrink-0" /></button>
                </div>
              </ScrollReveal>
            </div>
          </section>
        );
      case NavSection.OurHistory: return <OurHistoryPage />;
      case NavSection.StructuralPillars: return <StructuralPillarsPage onDeptClick={openDept} />;
      case NavSection.DepartmentDetail: 
        const dept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
        return <DepartmentDetailPage dept={dept} onBack={() => setActiveSection(NavSection.StructuralPillars)} />;
      case NavSection.HallOfFame: return <HallOfFamePage />;
      case NavSection.OurAlumni: return <AlumniPage />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen text-white bg-[#030303] text-center overflow-x-hidden selection:bg-cyan-500 selection:text-black w-full flex flex-col transition-all duration-300">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 md:h-20 flex items-center px-4 md:px-0 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-cyan-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-10 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => handleNav(NavSection.Home)}>
            <div className="w-8 h-8 md:w-10 md:h-10 border border-cyan-500/50 rounded-full flex items-center justify-center transition-transform group-hover:rotate-180 duration-1000">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_#00f7ff]" />
            </div>
            <span className="font-heading font-black text-sm md:text-xl tracking-tighter uppercase italic group-hover:text-cyan-400 transition-colors">Forte-FY</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => handleNav(NavSection.OurHistory)} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-cyan-400 ${activeSection === NavSection.OurHistory ? 'text-cyan-400' : 'text-zinc-600'}`}>Our History</button>
            <div className="relative group/pill-nav">
              <button onClick={() => handleNav(NavSection.StructuralPillars)} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-cyan-400 flex items-center gap-1 ${activeSection === NavSection.StructuralPillars ? 'text-cyan-400' : 'text-zinc-600'}`}>Structural Pillars <ChevronDown size={12} /></button>
              <div className="absolute top-full left-0 mt-4 w-48 glass rounded-2xl border-white/5 opacity-0 invisible group-hover/pill-nav:opacity-100 group-hover/pill-nav:visible transition-all duration-300 p-2 shadow-3xl">
                {DEPARTMENTS.map(d => (
                  <button key={d.id} onClick={() => openDept(d.id)} className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all">{d.name}</button>
                ))}
              </div>
            </div>
            <button onClick={() => handleNav(NavSection.HallOfFame)} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-cyan-400 ${activeSection === NavSection.HallOfFame ? 'text-cyan-400' : 'text-zinc-600'}`}>Hall of Fame</button>
            <button onClick={() => handleNav(NavSection.OurAlumni)} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-cyan-400 ${activeSection === NavSection.OurAlumni ? 'text-cyan-400' : 'text-zinc-600'}`}>Our Alumni</button>
            
            <button onClick={handleDownloadPortfolio} className="px-5 py-2 bg-cyan-500 text-black hover:bg-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-2">Portfolio <Download size={12} /></button>
          </div>
          
          <button className="lg:hidden text-white p-2 z-50 rounded-full active:bg-white/5 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {renderContent()}

      <footer className="bg-black py-20 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full text-center md:text-left mb-16">
            <div>
              <h4 className="text-cyan-500 font-black uppercase text-[10px] tracking-[0.4em] mb-8 italic">Direct Outreach</h4>
              <p className="text-white font-bold text-sm mb-4">fortefy.org@gmail.com</p>
              <p className="text-zinc-500 text-xs">+880 1974 362254</p>
            </div>
            <div>
              <h4 className="text-cyan-500 font-black uppercase text-[10px] tracking-[0.4em] mb-8 italic">Strategic Links</h4>
              <div className="flex flex-col gap-4 items-center md:items-start">
                <button onClick={() => handleNav(NavSection.OurHistory)} className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Founding Chronicle</button>
                <button onClick={() => handleNav(NavSection.StructuralPillars)} className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Institutional Pillars</button>
                <button onClick={() => handleNav(NavSection.OurAlumni)} className="text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Alumni Directory</button>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <h4 className="text-cyan-500 font-black uppercase text-[10px] tracking-[0.4em] mb-8 italic text-right">Connect Nexus</h4>
              <div className="flex gap-4">
                <Linkedin size={20} className="text-zinc-800 hover:text-cyan-500 transition-colors" />
                <Facebook size={20} className="text-zinc-800 hover:text-cyan-500 transition-colors" />
                <Instagram size={20} className="text-zinc-800 hover:text-cyan-500 transition-colors" />
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-white/5 mb-8" />
          <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.5em]">Manifesting Tomorrow since 2022</p>
        </div>
      </footer>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[70] bg-black/98 backdrop-blur-3xl text-white flex flex-col p-8 animate-fade-in text-center overflow-y-auto">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading font-black text-2xl uppercase italic tracking-tighter text-cyan-500">Forte-FY</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-cyan-500"><X size={32}/></button>
          </div>
          <div className="flex flex-col gap-10 items-center justify-center flex-1">
             <button onClick={() => handleNav(NavSection.OurHistory)} className="text-4xl font-heading font-black uppercase italic hover:text-cyan-400 tracking-tighter transition-all">Our History</button>
             
             <div className="w-full">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 mb-6">Structural Pillars</p>
                <div className="grid grid-cols-2 gap-4">
                  {DEPARTMENTS.map(d => (
                    <button key={d.id} onClick={() => openDept(d.id)} className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400">{d.name}</button>
                  ))}
                </div>
             </div>

             <button onClick={() => handleNav(NavSection.HallOfFame)} className="text-4xl font-heading font-black uppercase italic hover:text-cyan-400 tracking-tighter transition-all">Hall of Fame</button>
             <button onClick={() => handleNav(NavSection.OurAlumni)} className="text-4xl font-heading font-black uppercase italic hover:text-cyan-400 tracking-tighter transition-all">Our Alumni</button>
          </div>
          <div className="mt-16">
            <button onClick={handleDownloadPortfolio} className="w-full py-5 bg-cyan-500 text-black rounded-2xl font-heading font-black uppercase italic tracking-tighter text-2xl shadow-xl flex items-center justify-center gap-3">Get Portfolio <Download size={24} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
