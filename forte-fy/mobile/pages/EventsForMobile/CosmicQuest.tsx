
import React from 'react';
import { ArrowLeft, Rocket, Zap, MapPin, Users, Globe, Calendar, Crosshair, Award, Telescope, Star } from 'lucide-react';
import ScrollReveal from '../../../components/ScrollReveal.tsx';

export const CosmicQuestMobile: React.FC<{ onBack: () => void; isDark: boolean }> = ({ onBack, isDark }) => {
  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-[#070510] text-white' : 'bg-[#f8faff] text-slate-900'} animate-fade-in`}>
      <div className="relative h-[45vh]">
         <img src="https://i.postimg.cc/v8X1sLPm/485180030-651196477640727-5766733535341963819-n.jpg" className="w-full h-full object-cover" alt="Cosmic Quest" />
         <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#070510] via-[#070510]/40' : 'from-[#f8faff] via-[#f8faff]/40'} to-transparent`} />
         <button onClick={onBack} className="absolute top-8 left-6 p-3 rounded-full bg-black/50 backdrop-blur-xl text-white border border-white/10">
            <ArrowLeft size={20} />
         </button>
         <div className="absolute bottom-6 left-6 right-6">
            <h1 className={`text-5xl font-heading font-black uppercase tracking-tighter mb-2 ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e0f2fe] to-[#00f7ff]' : 'text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-900'}`}>
               Cosmic<br/>Quest
            </h1>
            <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
               "Commence an extraordinary expedition to the frontiers of knowledge."
            </p>
         </div>
      </div>

      <div className="px-6 py-8 space-y-12">
         <ScrollReveal>
            <p className={`text-base font-light leading-relaxed ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
               Cosmic Quest represents Forte-FY's premier astronomical initiative, meticulously engineered to cultivate scientific inquiry and intellectual rigor among emerging scholars. Uniting students from Class 6 to 12 (including HSC Batch 22), the event establishes a dynamic nexus where empirical knowledge intersects with creative innovation.
            </p>
         </ScrollReveal>

         {/* Strategic Vision */}
         <ScrollReveal>
            <div className={`p-6 rounded-3xl ${isDark ? 'bg-[#0a0718] border border-white/10' : 'bg-white border border-slate-200 shadow-sm'} relative overflow-hidden`}>
               <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 ${isDark ? 'bg-[#00f7ff]/10' : 'bg-indigo-100'}`} />
               
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className={`p-2.5 rounded-xl ${isDark ? 'bg-[#00f7ff]/10 border border-[#00f7ff]/20' : 'bg-indigo-50 border border-indigo-100'}`}>
                     <Globe size={20} className={isDark ? 'text-[#00f7ff]' : 'text-indigo-600'} />
                  </div>
                  <h3 className={`text-xl font-heading font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Strategic Vision</h3>
               </div>
               
               <div className="space-y-3 relative z-10">
                  {[
                     { title: "Scientific Inquiry", desc: "Cultivating profound curiosity and methodological thinking." },
                     { title: "Space Education", desc: "Promoting advanced astronomical concepts." },
                     { title: "Analytical Rigor", desc: "Developing critical thinking and problem-solving." },
                     { title: "Academic Nexus", desc: "Building a vibrant community of young scholars." }
                  ].map((item, i) => (
                     <div key={i} className={`p-4 rounded-2xl ${isDark ? 'bg-white/5 border border-white/5' : 'bg-slate-50 border border-slate-100'}`}>
                        <h4 className={`font-bold mb-1 flex items-center gap-2 text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#00f7ff]' : 'bg-indigo-600'}`} />
                           {item.title}
                        </h4>
                        <p className={`font-light text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{item.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </ScrollReveal>

         {/* Academic Divisions */}
         <ScrollReveal>
            <div className={`p-6 rounded-3xl ${isDark ? 'bg-[#0a0718] border border-white/10' : 'bg-white border border-slate-200 shadow-sm'} relative overflow-hidden`}>
               <div className={`absolute bottom-0 left-0 w-40 h-40 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 ${isDark ? 'bg-[#d946ef]/10' : 'bg-fuchsia-100'}`} />
               
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className={`p-2.5 rounded-xl ${isDark ? 'bg-[#d946ef]/10 border border-[#d946ef]/20' : 'bg-fuchsia-50 border border-fuchsia-100'}`}>
                     <Users size={20} className={isDark ? 'text-[#d946ef]' : 'text-fuchsia-600'} />
                  </div>
                  <h3 className={`text-xl font-heading font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Academic Divisions</h3>
               </div>
               
               <p className={`font-light text-xs mb-6 relative z-10 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Participants are categorized into two distinct academic divisions to ensure equitable intellectual challenges.
               </p>
               
               <div className="space-y-3 relative z-10">
                  <div className={`p-4 rounded-2xl ${isDark ? 'bg-gradient-to-r from-white/5 to-transparent border border-white/10' : 'bg-slate-50 border border-slate-100'}`}>
                     <div className="flex justify-between items-center">
                        <span className={`font-bold uppercase tracking-wider text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>Primary</span>
                        <span className={`font-mono text-[10px] font-bold px-2 py-1 rounded ${isDark ? 'text-[#00f7ff] bg-[#00f7ff]/10' : 'text-indigo-600 bg-indigo-50'}`}>Class 6–8</span>
                     </div>
                  </div>
                  <div className={`p-4 rounded-2xl ${isDark ? 'bg-gradient-to-r from-white/5 to-transparent border border-white/10' : 'bg-slate-50 border border-slate-100'}`}>
                     <div className="flex justify-between items-center mb-1">
                        <span className={`font-bold uppercase tracking-wider text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>Secondary</span>
                        <span className={`font-mono text-[10px] font-bold px-2 py-1 rounded ${isDark ? 'text-[#d946ef] bg-[#d946ef]/10' : 'text-fuchsia-600 bg-fuchsia-50'}`}>Class 9–12</span>
                     </div>
                     <p className={`text-[9px] ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>* Includes HSC Batch 22</p>
                  </div>
               </div>
            </div>
         </ScrollReveal>

         {/* Event Segments */}
         <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
               <Crosshair size={24} className={isDark ? 'text-white' : 'text-slate-900'} />
               <h3 className={`text-2xl font-heading font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Event Segments</h3>
            </div>
            <div className="space-y-4">
               <div className={`p-6 rounded-3xl ${isDark ? 'bg-gradient-to-b from-white/5 to-transparent border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-[#00f7ff]/10 border border-[#00f7ff]/20 text-[#00f7ff]' : 'bg-indigo-50 border border-indigo-100 text-indigo-600'}`}>
                     <span className="font-black">1</span>
                  </div>
                  <h4 className={`font-bold uppercase mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Astro Quiz</h4>
                  <p className={`font-light text-xs mb-3 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>A 25-minute competitive quiz featuring 25 curated questions.</p>
                  <p className={`text-[10px] italic ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Tests logic, speed, and conceptual clarity.</p>
               </div>

               <div className={`p-6 rounded-3xl ${isDark ? 'bg-gradient-to-b from-white/5 to-transparent border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-[#d946ef]/10 border border-[#d946ef]/20 text-[#d946ef]' : 'bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-600'}`}>
                     <span className="font-black">2</span>
                  </div>
                  <h4 className={`font-bold uppercase mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Astro Movie Quiz</h4>
                  <p className={`font-light text-xs mb-3 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>A unique quiz focused on iconic space-themed films.</p>
                  <p className={`text-[10px] italic ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Blends cinematic storytelling with scientific understanding.</p>
               </div>

               <div className={`p-6 rounded-3xl ${isDark ? 'bg-gradient-to-b from-white/5 to-transparent border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-[#ffd700]/10 border border-[#ffd700]/20 text-[#ffd700]' : 'bg-amber-50 border border-amber-100 text-amber-500'}`}>
                     <span className="font-black">3</span>
                  </div>
                  <h4 className={`font-bold uppercase mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Astro Article Writing</h4>
                  <p className={`font-light text-xs mb-3 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>A creative writing competition (300–450 words) on space topics.</p>
                  <p className={`text-[10px] italic ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Celebrates originality and depth of research.</p>
               </div>
            </div>
         </ScrollReveal>

         {/* Recognition & Rewards */}
         <ScrollReveal>
            <div className={`p-6 rounded-3xl text-center relative overflow-hidden ${isDark ? 'bg-gradient-to-r from-[#0d091f] to-[#1a103c] border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
               <Award size={32} className={`mx-auto mb-4 ${isDark ? 'text-[#ffd700]' : 'text-amber-400'}`} />
               <h3 className={`text-2xl font-heading font-black uppercase tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Recognition & Rewards</h3>
               
               <div className="flex flex-col gap-6">
                  <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5 border border-[#ffd700]/30' : 'bg-amber-50 border border-amber-200'}`}>
                     <span className="text-3xl mb-1 block">🥇</span>
                     <span className={`font-black uppercase tracking-widest text-sm block mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>1st Prize</span>
                     <span className={`font-mono font-bold block ${isDark ? 'text-[#ffd700]' : 'text-amber-600'}`}>3,500 BDT</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-100'}`}>
                        <span className="text-2xl mb-1 block">🥈</span>
                        <span className={`font-bold uppercase tracking-wider text-xs block mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>2nd Prize</span>
                        <span className={`font-mono text-xs block ${isDark ? 'text-[#00f7ff]' : 'text-indigo-600'}`}>2,500 BDT</span>
                     </div>
                     <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-100'}`}>
                        <span className="text-2xl mb-1 block">🥉</span>
                        <span className={`font-bold uppercase tracking-wider text-xs block mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>3rd Prize</span>
                        <span className={`font-mono text-xs block ${isDark ? 'text-[#d946ef]' : 'text-fuchsia-600'}`}>1,500 BDT</span>
                     </div>
                  </div>
               </div>
            </div>
         </ScrollReveal>

         {/* Stats */}
         <ScrollReveal>
            <h3 className={`text-xl font-heading font-black uppercase tracking-tight mb-6 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Mission Telemetry</h3>
            <div className="grid grid-cols-2 gap-4">
               {[
                  { label: 'Reach', value: '126K+', icon: Telescope, color: isDark ? 'text-[#00f7ff]' : 'text-indigo-600' },
                  { label: 'Cadets', value: '1,264', icon: Users, color: isDark ? 'text-[#d946ef]' : 'text-fuchsia-600' },
                  { label: 'Ambassadors', value: '340', icon: Star, color: isDark ? 'text-[#ffd700]' : 'text-amber-500' },
                  { label: 'Cycle', value: '2022', icon: Calendar, color: isDark ? 'text-white' : 'text-slate-900' },
               ].map((stat, i) => (
                  <div key={i} className={`p-5 rounded-2xl text-center ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
                     <stat.icon size={20} className={`mx-auto mb-3 ${stat.color}`} />
                     <p className={`text-2xl font-heading font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</p>
                     <p className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>{stat.label}</p>
                  </div>
               ))}
            </div>
         </ScrollReveal>
      </div>
    </div>
  );
};
