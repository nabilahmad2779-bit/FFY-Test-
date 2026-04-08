
import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Rocket, Zap, MapPin, Users, Globe, Calendar, Crosshair, Award, Telescope, Star, Radio, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../../../components/ScrollReveal.tsx';
import { PARTNER_LOGOS } from '../../../constants';

const Starfield: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: {x: number, y: number, z: number, pz: number}[] = [];
    const numStars = 400; // Reduced for mobile
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000,
        pz: 0
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 5, 16, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach(star => {
        star.pz = star.z;
        star.z -= 10;
        
        if (star.z < 1) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = 2000;
          star.pz = 2000;
        }

        const x = cx + (star.x / star.z) * 800;
        const y = cy + (star.y / star.z) * 800;
        const px = cx + (star.x / star.pz) * 800;
        const py = cy + (star.y / star.pz) * 800;

        const size = Math.max(0.1, (1 - star.z / 2000) * 3);
        const opacity = 1 - star.z / 2000;

        ctx.beginPath();
        ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(79, 70, 229, ${opacity})`;
        ctx.lineWidth = size;
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className={`absolute inset-0 z-0 ${'bg-[#070510]'}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${'via-[#070510]/50 to-[#070510]'}`} />
    </div>
  );
};

const OrbitStat: React.FC<{ label: string; value: string; icon: any; index: number; isDark: boolean }> = ({ label, value, icon: Icon, index, isDark }) => {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center group perspective-1000 mx-auto">
      <div className={`absolute inset-0 rounded-full border border-dashed ${'border-[#00f7ff]/30'} animate-spin-slow`} style={{ animationDuration: `${25 + index * 5}s` }} />
      <div className={`absolute inset-4 rounded-full border ${'border-[#d946ef]/30'} animate-spin-reverse`} style={{ animationDuration: `${20 + index * 5}s` }} />
      
      <div className={`relative z-10 flex flex-col items-center justify-center text-center ${'bg-[#130f25]/90 border-white/10 shadow-[0_0_40px_rgba(217,70,239,0.2)]'} backdrop-blur-md w-24 h-24 rounded-full border group-hover:scale-110 transition-transform duration-500`}>
         <Icon size={20} className={`${'text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]'} mb-1 group-hover:animate-bounce`} />
         <h3 className={`text-lg font-heading font-black ${'text-white'}`}>{value}</h3>
         <p className={`text-[8px] uppercase tracking-widest ${'text-[#00f7ff]'}`}>{label}</p>
      </div>

      <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full animate-orbit ${'bg-[#00f7ff] shadow-[0_0_15px_#00f7ff]'}`} style={{ animationDuration: `${25 + index * 5}s` }} />
    </div>
  );
};

export const CosmicQuestMobile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const isDark = true;
  return (
    <div className={`min-h-screen pb-24 ${'bg-[#070510] text-white'} animate-fade-in overflow-x-hidden`}>
      {/* HERO SECTION */}
      <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
         <Starfield isDark={isDark} />
         <button onClick={onBack} className="absolute top-8 left-6 p-3 rounded-full bg-black/20 backdrop-blur-xl text-white border border-white/10 z-30">
            <ArrowLeft size={20} />
         </button>
         <div className="relative z-20 text-center px-6 w-full pointer-events-none">
            <h1 className={`text-6xl font-heading font-black uppercase tracking-tighter leading-[0.9] mb-4 ${'text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e0f2fe] to-[#00f7ff] drop-shadow-[0_0_20px_rgba(0,247,255,0.4)]'}`}>
               COSMIC<br/>QUEST
            </h1>
            <p className={`text-base font-light leading-relaxed ${'text-zinc-300 drop-shadow-md'}`}>
               "Commence an extraordinary expedition to the frontiers of knowledge."
            </p>
         </div>
      </div>

      <div className="px-6 py-12 space-y-16">
         <ScrollReveal>
            <div className="text-center mb-8">
               <h2 className={`text-3xl font-heading font-black uppercase mb-4 leading-[1.1] ${'text-white'}`}>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${'from-[#00f7ff] to-[#d946ef]'}`}>Cosmic Quest</span> <br/>
                  An Epic Online Astronomy Event
               </h2>
               <p className={`text-sm font-light leading-relaxed ${'text-zinc-300'}`}>
                  Cosmic Quest represents Forte-FY's premier astronomical initiative, meticulously engineered to cultivate scientific inquiry and intellectual rigor among emerging scholars. Uniting students from Class 6 to 12 (including HSC Batch 22), the event establishes a dynamic nexus where empirical knowledge intersects with creative innovation.
               </p>
            </div>
         </ScrollReveal>

         {/* Strategic Vision */}
         <ScrollReveal>
            <div className={`p-6 rounded-3xl ${'bg-[#0a0718] border border-white/10'} relative overflow-hidden`}>
               <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 ${'bg-[#00f7ff]/10'}`} />
               
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className={`p-2.5 rounded-xl ${'bg-[#00f7ff]/10 border border-[#00f7ff]/20'}`}>
                     <Globe size={20} className={'text-[#00f7ff]'} />
                  </div>
                  <h3 className={`text-xl font-heading font-black uppercase tracking-tight ${'text-white'}`}>Strategic Vision</h3>
               </div>
               
               <div className="space-y-3 relative z-10">
                  {[
                     { title: "Scientific Inquiry", desc: "Cultivating profound curiosity and methodological thinking." },
                     { title: "Space Education", desc: "Promoting advanced astronomical concepts." },
                     { title: "Analytical Rigor", desc: "Developing critical thinking and problem-solving." },
                     { title: "Academic Nexus", desc: "Building a vibrant community of young scholars." }
                  ].map((item, i) => (
                     <div key={i} className={`p-4 rounded-2xl ${'bg-white/5 border border-white/5'}`}>
                        <h4 className={`font-bold mb-1 flex items-center gap-2 text-sm ${'text-white'}`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${'bg-[#00f7ff]'}`} />
                           {item.title}
                        </h4>
                        <p className={`font-light text-xs ${'text-zinc-400'}`}>{item.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </ScrollReveal>

         {/* Academic Divisions */}
         <ScrollReveal>
            <div className={`p-6 rounded-3xl ${'bg-[#0a0718] border border-white/10'} relative overflow-hidden`}>
               <div className={`absolute bottom-0 left-0 w-40 h-40 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 ${'bg-[#d946ef]/10'}`} />
               
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className={`p-2.5 rounded-xl ${'bg-[#d946ef]/10 border border-[#d946ef]/20'}`}>
                     <Users size={20} className={'text-[#d946ef]'} />
                  </div>
                  <h3 className={`text-xl font-heading font-black uppercase tracking-tight ${'text-white'}`}>Academic Divisions</h3>
               </div>
               
               <p className={`font-light text-xs mb-6 relative z-10 ${'text-zinc-400'}`}>
                  Participants are categorized into two distinct academic divisions to ensure equitable intellectual challenges.
               </p>
               
               <div className="space-y-3 relative z-10">
                  <div className={`p-4 rounded-2xl ${'bg-gradient-to-r from-white/5 to-transparent border border-white/10'}`}>
                     <div className="flex justify-between items-center">
                        <span className={`font-bold uppercase tracking-wider text-xs ${'text-white'}`}>Primary</span>
                        <span className={`font-mono text-[10px] font-bold px-2 py-1 rounded ${'text-[#00f7ff] bg-[#00f7ff]/10'}`}>Class 6–8</span>
                     </div>
                  </div>
                  <div className={`p-4 rounded-2xl ${'bg-gradient-to-r from-white/5 to-transparent border border-white/10'}`}>
                     <div className="flex justify-between items-center mb-1">
                        <span className={`font-bold uppercase tracking-wider text-xs ${'text-white'}`}>Secondary</span>
                        <span className={`font-mono text-[10px] font-bold px-2 py-1 rounded ${'text-[#d946ef] bg-[#d946ef]/10'}`}>Class 9–12</span>
                     </div>
                     <p className={`text-[9px] ${'text-zinc-500'}`}>* Includes HSC Batch 22</p>
                  </div>
               </div>
            </div>
         </ScrollReveal>

         {/* Event Segments */}
         <ScrollReveal>
            <div className="flex items-center gap-3 mb-6 justify-center">
               <Crosshair size={24} className={'text-white'} />
               <h3 className={`text-2xl font-heading font-black uppercase tracking-tight ${'text-white'}`}>Event Segments</h3>
            </div>
            <div className="space-y-4">
               <div className={`p-6 rounded-3xl ${'bg-gradient-to-b from-white/5 to-transparent border border-white/10'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${'bg-[#00f7ff]/10 border border-[#00f7ff]/20 text-[#00f7ff]'}`}>
                     <span className="font-black">1</span>
                  </div>
                  <h4 className={`font-bold uppercase mb-2 ${'text-white'}`}>Astro Quiz</h4>
                  <p className={`font-light text-xs mb-3 ${'text-zinc-400'}`}>A 25-minute competitive quiz featuring 25 curated questions.</p>
                  <p className={`text-[10px] italic ${'text-zinc-500'}`}>Tests logic, speed, and conceptual clarity.</p>
               </div>

               <div className={`p-6 rounded-3xl ${'bg-gradient-to-b from-white/5 to-transparent border border-white/10'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${'bg-[#d946ef]/10 border border-[#d946ef]/20 text-[#d946ef]'}`}>
                     <span className="font-black">2</span>
                  </div>
                  <h4 className={`font-bold uppercase mb-2 ${'text-white'}`}>Astro Movie Quiz</h4>
                  <p className={`font-light text-xs mb-3 ${'text-zinc-400'}`}>A unique quiz focused on iconic space-themed films.</p>
                  <p className={`text-[10px] italic ${'text-zinc-500'}`}>Blends cinematic storytelling with scientific understanding.</p>
               </div>

               <div className={`p-6 rounded-3xl ${'bg-gradient-to-b from-white/5 to-transparent border border-white/10'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${'bg-[#ffd700]/10 border border-[#ffd700]/20 text-[#ffd700]'}`}>
                     <span className="font-black">3</span>
                  </div>
                  <h4 className={`font-bold uppercase mb-2 ${'text-white'}`}>Astro Article Writing</h4>
                  <p className={`font-light text-xs mb-3 ${'text-zinc-400'}`}>A creative writing competition (300–450 words) on space topics.</p>
                  <p className={`text-[10px] italic ${'text-zinc-500'}`}>Celebrates originality and depth of research.</p>
               </div>
            </div>
         </ScrollReveal>

         {/* Recognition & Rewards */}
         <ScrollReveal>
            <div className={`p-6 rounded-3xl text-center relative overflow-hidden ${'bg-gradient-to-r from-[#0d091f] to-[#1a103c] border border-white/10'}`}>
               <Award size={32} className={`mx-auto mb-4 ${'text-[#ffd700]'}`} />
               <h3 className={`text-2xl font-heading font-black uppercase tracking-tight mb-4 ${'text-white'}`}>Recognition & Rewards</h3>
               
               <div className="flex flex-col gap-4">
                  <div className={`p-4 rounded-2xl ${'bg-white/5 border border-[#ffd700]/30'}`}>
                     <span className="text-3xl mb-1 block">🥇</span>
                     <span className={`font-black uppercase tracking-widest text-sm block mb-1 ${'text-white'}`}>1st Prize</span>
                     <span className={`font-mono font-bold block ${'text-[#ffd700]'}`}>3,500 BDT</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className={`p-4 rounded-2xl ${'bg-white/5 border border-white/10'}`}>
                        <span className="text-2xl mb-1 block">🥈</span>
                        <span className={`font-bold uppercase tracking-wider text-xs block mb-1 ${'text-white'}`}>2nd Prize</span>
                        <span className={`font-mono text-xs block ${'text-[#00f7ff]'}`}>2,500 BDT</span>
                     </div>
                     <div className={`p-4 rounded-2xl ${'bg-white/5 border border-white/10'}`}>
                        <span className="text-2xl mb-1 block">🥉</span>
                        <span className={`font-bold uppercase tracking-wider text-xs block mb-1 ${'text-white'}`}>3rd Prize</span>
                        <span className={`font-mono text-xs block ${'text-[#d946ef]'}`}>1,500 BDT</span>
                     </div>
                  </div>
               </div>
            </div>
         </ScrollReveal>

         {/* Mission Telemetry (Orbit Style) */}
         <ScrollReveal>
            <h3 className={`text-2xl font-heading font-black uppercase tracking-tight mb-8 text-center ${'text-white'}`}>Mission <span className={'text-[#00f7ff]'}>Telemetry</span></h3>
            <div className="flex flex-col items-center gap-8">
               <OrbitStat label="Mission Reach" value="126K+" icon={Telescope} index={0} isDark={isDark} />
               <OrbitStat label="Cadets" value="1,264" icon={Users} index={1} isDark={isDark} />
               <OrbitStat label="Ambassadors" value="340" icon={Star} index={2} isDark={isDark} />
            </div>
         </ScrollReveal>

         {/* Timeline */}
         <ScrollReveal>
            <div className="relative pt-8 pb-8">
               <div className={`absolute left-6 top-0 bottom-0 w-px ${'bg-white/10'}`} />
               <div className="space-y-12 relative z-10">
                  {[
                     { title: "Cosmic Olympiad", icon: Award, desc: "A rigorous test of astronomical knowledge." },
                     { title: "Sky Observation", icon: Telescope, desc: "Direct observation of celestial bodies." },
                     { title: "Space Workshops", icon: Users, desc: "Interactive sessions on rocketry and astrophysics." },
                     { title: "Cosmic Quiz", icon: Zap, desc: "Rapid-fire trivia rounds on space history." }
                  ].map((item, i) => (
                     <div key={i} className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full border-2 z-10 flex items-center justify-center shrink-0 ${'border-[#d946ef] bg-[#050014] text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]'}`}>
                           <item.icon size={20} />
                        </div>
                        <div className={`flex-1 p-5 rounded-2xl ${'bg-white/[0.02] border border-white/10'}`}>
                           <h3 className={`text-lg font-bold uppercase mb-2 ${'text-white'}`}>{item.title}</h3>
                           <p className={`font-light text-xs ${'text-zinc-400'}`}>{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </ScrollReveal>

         {/* Ambassador Recruitment */}
         <ScrollReveal>
            <div className={`p-8 rounded-[2rem] text-center relative overflow-hidden ${'bg-[#080410] border border-[#00f7ff]/30'}`}>
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none" />
               
               <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 animate-pulse ${'bg-[#00f7ff]/10 border border-[#00f7ff]/30 text-[#00f7ff]'}`}>
                  <Radio size={12} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Incoming Transmission</span>
               </div>

               <h2 className={`text-3xl font-heading font-black uppercase italic mb-4 ${'text-white'}`}>
                  Ambassador <br/><span className={'text-transparent bg-clip-text bg-gradient-to-r from-[#00f7ff] to-[#d946ef]'}>Recruitment.</span>
               </h2>
               
               <p className={`text-sm font-light mb-8 ${'text-zinc-300'}`}>
                  Are you passionate about spreading the cosmic enthusiasm? Become an Event Ambassador!
               </p>

               <button 
                  onClick={() => window.open('https://forms.google.com', '_blank')}
                  className={`inline-flex items-center gap-2 px-6 py-3 font-black uppercase tracking-widest rounded-full transition-colors text-xs ${'bg-white text-black hover:bg-[#00f7ff] shadow-[0_0_20px_rgba(255,255,255,0.2)]'}`}
               >
                  <span>Accept Mission</span>
                  <ArrowUpRight size={14} />
               </button>
            </div>
         </ScrollReveal>

         {/* Partners */}
         <ScrollReveal>
            <div className="text-center pb-8">
               <h3 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-8 ${'text-[#d946ef]'}`}>Allied Science Divisions</h3>
               <div className="flex flex-wrap justify-center gap-4">
                  {[...PARTNER_LOGOS].filter(p => p.name.includes('Science') || p.name.includes('Astro') || p.name.includes('Club')).slice(0,6).map((p, i) => (
                     <div key={i} className={`w-14 h-14 rounded-full border p-2 ${'border-white/10 bg-white/[0.02]'}`}>
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain grayscale" />
                     </div>
                  ))}
               </div>
            </div>
         </ScrollReveal>
      </div>
      
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes orbit { from { transform: translate(-50%, -50%) rotate(0deg) translateY(-2.5rem) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg) translateY(-2.5rem) rotate(-360deg); } }
        .animate-spin-slow { animation: spin-slow linear infinite; }
        .animate-spin-reverse { animation: spin-reverse linear infinite; }
        .animate-orbit { animation: orbit linear infinite; }
      `}</style>
    </div>
  );
};
