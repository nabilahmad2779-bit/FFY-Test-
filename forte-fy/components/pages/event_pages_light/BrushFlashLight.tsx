import React, { useLayoutEffect, useRef, useState } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import { ArrowLeft, Globe, Users, MapPin, Calendar, Trophy, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  onBack: () => void;
}

export const BrushFlashLight: React.FC<EventPageProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'brush-flash');
  const [activeCategory, setActiveCategory] = useState(0);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // 1. Hero Parallax Explosion (Replicated from PC)
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        }
      });

      heroTl.to(".brush-text", { x: "-30vw", y: "-15vh", rotation: -10, scale: 1.5, opacity: 0, filter: "blur(8px)", ease: "power1.inOut" }, 0)
            .to(".flash-text", { x: "30vw", y: "15vh", rotation: 10, scale: 1.5, opacity: 0, filter: "blur(8px)", ease: "power1.inOut" }, 0)
            .to(".hero-bg-img", { scale: 1.5, opacity: 0, filter: "blur(15px)", ease: "power1.inOut" }, 0);

      // 2. Impact Numbers Count Up
      gsap.utils.toArray('.count-up').forEach((el: any) => {
        const target = parseInt(el.getAttribute('data-value'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        
        gsap.fromTo(el, 
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.5,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
            onUpdate: function() {
              const val = Math.ceil(this.targets()[0].innerText);
              el.innerText = val.toLocaleString() + suffix;
            }
          }
        );
      });

      // 3. Horizontal Scroll for Modalities
      const sections = gsap.utils.toArray('.modality-card');
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".modalities-container",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (document.querySelector(".modalities-container")?.scrollWidth || 0),
        }
      });

      // 4. General Fade Up
      gsap.utils.toArray('.fade-up').forEach((elem: any) => {
        gsap.fromTo(elem, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 90%",
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  const DISCIPLINES = [
    {
      id: 'traditional-art',
      title: 'Traditional Art',
      description: 'Mastery of sketching and drawing fundamentals.',
      imageUrl: 'https://picsum.photos/seed/sketch3/800/800',
      color: '#f4d03f',
      accent: 'rgba(244,208,63,0.2)',
    },
    {
      id: 'digital-art',
      title: 'Digital Arts',
      description: 'Intersection of technology and boundless creativity.',
      imageUrl: 'https://picsum.photos/seed/digital3/800/800',
      color: '#00ffff',
      accent: 'rgba(0,255,255,0.2)',
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'Capturing light, perspective, and frozen moments.',
      imageUrl: 'https://picsum.photos/seed/photo3/800/800',
      color: '#ff007f',
      accent: 'rgba(255,0,127,0.2)',
    }
  ];

  const WINNERS = [
    { 
       category: "Traditional Art", 
       color: "#f4d03f",
       winners: [
          { name: "Abrar Zahin", rank: "1st", img: "https://picsum.photos/seed/winner1/200/200" },
          { name: "Samiul Haque", rank: "2nd", img: "https://picsum.photos/seed/winner4/200/200" },
          { name: "Rifat Ahmed", rank: "3rd", img: "https://picsum.photos/seed/winner5/200/200" },
       ]
    },
    { 
       category: "Digital Arts", 
       color: "#00ffff",
       winners: [
          { name: "Nafis Fuad", rank: "1st", img: "https://picsum.photos/seed/winner2/200/200" },
          { name: "Zayed Khan", rank: "2nd", img: "https://picsum.photos/seed/winner6/200/200" },
          { name: "Tanvir Hasan", rank: "3rd", img: "https://picsum.photos/seed/winner7/200/200" },
       ]
    },
    { 
       category: "Photography", 
       color: "#ff007f",
       winners: [
          { name: "Samiul Islam", rank: "1st", img: "https://picsum.photos/seed/winner3/200/200" },
          { name: "Mahir Faisal", rank: "2nd", img: "https://picsum.photos/seed/winner8/200/200" },
          { name: "Adnan Sami", rank: "3rd", img: "https://picsum.photos/seed/winner9/200/200" },
       ]
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f8f8f8] text-[#1a1a1a] overflow-x-hidden font-sans transition-colors duration-500 pb-20">
      
      {/* Back Button */}
      <div className="fixed top-0 left-0 w-full z-[110] px-6 py-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-3 text-[#ff007f] transition-all pointer-events-auto"
        >
          <div className="p-2.5 border-2 border-[#ff007f]/30 rounded-full bg-white/60 backdrop-blur-xl shadow-[0_0_15px_rgba(255,0,127,0.3)]">
            <ArrowLeft size={20} className="text-[#ff007f]" />
          </div>
        </button>
      </div>

      {/* 1. HERO SECTION (Parallax) */}
      <section className="hero-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white">
         {/* Background Image */}
         <div className="hero-bg-img absolute inset-0 z-0">
            <img src="https://picsum.photos/seed/brushflashhero/1080/1920" alt="Exhibition Backdrop" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white" />
         </div>

         {/* Hero Text */}
         <div className="relative z-10 flex flex-col items-center text-center space-y-2">
            <h1 className="brush-text text-7xl font-black tracking-tighter text-[#f4d03f] mix-blend-screen leading-none drop-shadow-[0_0_15px_rgba(244,208,63,0.8)]">
               BRUSH
            </h1>
            <h1 className="flash-text text-7xl font-black tracking-tighter text-transparent [-webkit-text-stroke:2px_#ff007f] mix-blend-screen leading-none drop-shadow-[0_0_15px_rgba(255,0,127,0.8)]">
               & FLASH
            </h1>
         </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="py-20 px-6 bg-[#f0f0f0] relative z-10">
         <div className="max-w-md mx-auto">
            <div className="fade-up text-center mb-10">
               <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="h-px w-6 bg-[#ff007f]" />
                  <span className="text-[#ff007f] text-[9px] font-black uppercase tracking-[0.6em]">Narrative</span>
                  <div className="h-px w-6 bg-[#ff007f]" />
               </div>
               <h2 className="text-2xl font-black leading-tight uppercase text-zinc-800">
                  Raw Talent & <br/><span className="text-[#00ffff]">Boundless Creativity</span>
               </h2>
            </div>

            <div className="fade-up space-y-6 text-center">
               <p className="text-base font-light leading-relaxed text-zinc-600">
                  <span className="font-bold text-[#f4d03f]">Brush & Flash</span> brings together the raw feel of traditional art and the endless possibilities of digital creativity.
               </p>
               <p className="text-base font-light leading-relaxed text-zinc-600">
                  It's about building a real community where every sketch and photo tells a unique story.
               </p>
            </div>
         </div>
      </section>

      {/* 3. METRICS SECTION (Count Up) */}
      <section className="py-20 px-6 bg-white relative z-10 border-t border-black/5">
         <div className="max-w-md mx-auto">
            <div className="fade-up text-center mb-12">
               <span className="text-[#f4d03f] text-[9px] font-black uppercase tracking-[0.6em] mb-2 block">Impact</span>
               <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black/40">Performance Metrics</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               {[
                  { val: "86000", suffix: "+", label: "Visual Impressions", color: "text-[#f4d03f]", icon: Globe },
                  { val: "352", suffix: "", label: "Artists Exhibited", color: "text-[#ff007f]", icon: MapPin },
                  { val: "42", suffix: "", label: "Curators", color: "text-[#00ffff]", icon: Users },
                  { val: "2022", suffix: "", label: "Cycle", color: "text-black", icon: Calendar },
               ].map((stat, i) => (
                  <div key={i} className="fade-up flex flex-col items-center justify-center bg-[#f8f8f8] p-6 rounded-[1.5rem] border border-black/5 shadow-lg aspect-square">
                     <stat.icon size={18} className={`${stat.color} mb-3 opacity-80`} />
                     <h3 className={`text-3xl font-black tracking-tighter mb-1 ${stat.color}`}>
                        <span className="count-up" data-value={stat.val} data-suffix={stat.suffix}>0</span>
                     </h3>
                     <p className="text-[8px] font-black uppercase tracking-[0.2em] text-black/60 text-center">{stat.label}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. DISCIPLINES SECTION (Horizontal Scroll) */}
      <section className="modalities-container h-[100dvh] w-full bg-white relative z-10 border-t border-black/5 flex items-center overflow-hidden">
         <div className="absolute top-6 left-6 z-20 pointer-events-none">
             <span className="text-[#ff007f] text-[9px] font-black uppercase tracking-[0.6em] mb-2 block">Modalities</span>
             <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black/50">Structural Pillars</h2>
         </div>
         
         <div className="flex w-[300%] h-full">
            {DISCIPLINES.map((disc, idx) => (
               <div key={disc.id} className="modality-card w-[100vw] h-full flex flex-col items-center justify-center px-8 pt-32 pb-16 relative shrink-0">
                  <div className="w-full max-w-sm aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 relative mb-8 shadow-2xl" style={{ borderColor: `${disc.color}60`, boxShadow: `0 0 40px ${disc.accent}` }}>
                     <img src={disc.imageUrl} alt={disc.title} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                     <div className="absolute bottom-8 left-8 right-8">
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-3" style={{ textShadow: `0 0 20px ${disc.color}` }}>
                           {disc.title}
                        </h3>
                        <p className="text-sm text-white/90 font-light leading-relaxed">
                           {disc.description}
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     {DISCIPLINES.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-[#ff007f] w-6' : 'bg-gray-600'}`} />
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 5. WINNERS & LEADERSHIP (Interactive Dashboard) */}
      <section className="py-20 px-4 bg-[#f5f5f5] relative z-10 border-t border-black/5">
         <div className="max-w-md mx-auto">
            <div className="fade-up text-center mb-10">
               <span className="text-[#00ffff] text-[9px] font-black uppercase tracking-[0.6em] mb-2 block">Recognition</span>
               <h2 className="text-3xl font-black uppercase italic text-black">The <span className="text-[#ff007f]">Apex</span> Circle</h2>
            </div>

            {/* Interactive Dashboard */}
            <div className="fade-up bg-white rounded-[2rem] p-4 border border-black/5 shadow-2xl mb-12">
               {/* Tabs */}
               <div className="flex p-1 rounded-xl bg-black/5 mb-6 overflow-x-auto hide-scrollbar">
                  {WINNERS.map((cat, idx) => (
                     <button
                        key={idx}
                        onClick={() => setActiveCategory(idx)}
                        className={`flex-1 py-3 px-4 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${activeCategory === idx ? 'bg-white text-black shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                     >
                        {cat.category}
                     </button>
                  ))}
               </div>

               {/* Winners List */}
               <div className="space-y-3 min-h-[300px]">
                  {WINNERS[activeCategory].winners.map((winner, i) => (
                     <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[#f8f8f8] border border-black/5 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="relative">
                           <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2" style={{ borderColor: WINNERS[activeCategory].color }}>
                              <img src={winner.img} alt={winner.name} className="h-full w-full object-cover" />
                           </div>
                           <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold border border-white/20">
                              {i + 1}
                           </div>
                        </div>
                        <div className="flex-1">
                           <h4 className="text-sm font-bold text-black uppercase">{winner.name}</h4>
                           <div className="flex items-center gap-2 mt-1">
                              <Trophy size={12} style={{ color: WINNERS[activeCategory].color }} />
                              <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">{winner.rank} Place</p>
                           </div>
                        </div>
                        <ChevronRight size={16} className="opacity-30" />
                     </div>
                  ))}
               </div>
            </div>

            {/* Campus Ambassador Section */}
            <div className="fade-up">
               <div className="text-center mb-6">
                  <h3 className="text-lg font-black uppercase italic text-black">Leadership <span className="text-[#00ffff]">Spotlight</span></h3>
               </div>
               <div className="grid grid-cols-1 gap-4">
                  {[
                     { name: "Tasnim Mahi", role: "Best Campus Ambassador", img: "https://i.postimg.cc/MpCtwTRz/485146929-652411014185940-2123160853129889170-n-(1).jpg", color: "#00ffff" },
                     { name: "Durrah Mehnaz Arshi", role: "Best Coordinator", img: "https://i.postimg.cc/gkwTb1Qd/1000206343.jpg", color: "#ff007f" },
                  ].map((leader, i) => (
                     <div key={i} className="relative overflow-hidden flex items-center gap-5 bg-white p-5 rounded-3xl border border-black/5 shadow-lg">
                        <div className={`absolute right-0 top-0 w-24 h-24 rounded-bl-full opacity-10`} style={{ backgroundColor: leader.color }} />
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2" style={{ borderColor: leader.color }}>
                           <img src={leader.img} alt={leader.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="text-left relative z-10">
                           <h4 className="text-lg font-black text-black uppercase mb-0.5">{leader.name}</h4>
                           <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: leader.color }}>{leader.role}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 6. GALLERY GRID */}
      <section className="py-20 px-4 bg-white relative z-10 border-t border-black/5">
         <div className="max-w-md mx-auto">
            <div className="fade-up text-center mb-10">
               <h2 className="text-3xl font-black tracking-tighter text-black uppercase">Curated <span className="text-[#ff007f]">Archive</span></h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
               {[1, 2, 3, 4, 5, 6].map((item, i) => (
                  <div key={item} className="fade-up aspect-[3/4] rounded-2xl overflow-hidden relative shadow-lg group">
                     <img src={`https://picsum.photos/seed/minacc${item}/400/500`} alt={`Gallery ${item}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. SPONSORS */}
      <footer className="py-20 px-6 bg-[#f8f8f8] relative z-10 border-t border-black/10">
         <div className="max-w-md mx-auto text-center">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black/40 mb-12">Strategic Partners</h3>
            
            <div className="flex flex-col gap-12 items-center">
               <div className="flex gap-8 items-center justify-center">
                  {[
                     { name: 'Nagad', url: 'https://i.postimg.cc/pTXrrLWm/images.png' },
                     { name: 'Valiant', url: 'https://via.placeholder.com/400x160/000000/00f7ff?text=Valiant' }
                  ].map((s, i) => (
                     <div key={i} className="h-16">
                        <img src={s.url} alt={s.name} className="h-full w-auto object-contain" />
                     </div>
                  ))}
               </div>
               
               <div className="grid grid-cols-4 gap-6 opacity-50">
                  {[...PARTNER_LOGOS].slice(0, 8).map((p, i) => (
                     <div key={i} className="w-12 h-12 flex items-center justify-center">
                        <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain grayscale" />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};
