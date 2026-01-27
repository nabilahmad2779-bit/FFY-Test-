
import React from 'react';
import { ArrowLeft, Star, Zap, Activity as Pulse } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

interface DepartmentProps {
  dept: any;
  navigate: (path: string) => void;
}

const OpsDepartment: React.FC<DepartmentProps> = ({ dept, navigate }) => {
  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-32 animate-fade-in min-h-screen text-center">
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

export default OpsDepartment;
