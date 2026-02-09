
import React from 'react';
import { ArrowLeft, Star, Zap, Activity as Pulse } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

interface DepartmentProps {
  dept: any;
  navigate: (path: string) => void;
}

const Acad_Light: React.FC<DepartmentProps> = ({ dept, navigate }) => {
  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-32 animate-fade-in min-h-screen text-center bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-5">
        <button 
          onClick={() => navigate('/departments')}
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-cyan-600 transition-colors mb-16 mx-auto"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Return to Nexus
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className={`w-28 h-28 md:w-40 md:h-40 rounded-[2.5rem] md:rounded-[3.5rem] bg-slate-50 flex items-center justify-center mb-10 border border-slate-200 shadow-2xl ${dept.colorClass} mx-auto`} style={{ color: dept.accent }}>
                {React.cloneElement(dept.icon as React.ReactElement<any>, { size: 64, className: "md:w-16 md:h-16" })}
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-black uppercase italic tracking-tighter leading-none mb-4 text-slate-900">{dept.name}</h1>
              <p className="text-cyan-600 font-black uppercase text-[10px] md:text-[12px] tracking-[0.4em] mb-12">{dept.tagline}</p>
              
              <div className="bg-slate-50 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Star size={100} className="text-slate-900" />
                </div>
                <div className="relative z-10">
                   <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Department Head</h4>
                   <h3 className="text-2xl md:text-3xl font-heading font-black italic tracking-tight text-slate-900 mb-2">{dept.lead}</h3>
                   <div className="w-12 h-1 bg-cyan-600/30 rounded-full mt-6 mx-auto" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-12">
            <ScrollReveal delay={100}>
               <div className="bg-slate-50 border border-slate-200 p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] relative group hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-6 mb-8 justify-center lg:justify-start">
                     <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600">
                        <Zap size={24} />
                     </div>
                     <h3 className="text-2xl md:text-4xl font-heading font-black uppercase italic tracking-tight text-slate-900">Core Operations</h3>
                  </div>
                  <p className="text-slate-600 text-lg md:text-2xl font-light leading-relaxed italic">
                    {dept.work}
                  </p>
               </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
               <div className="bg-slate-50 border border-slate-200 p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] to-transparent" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-8 justify-center lg:justify-start">
                       <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600">
                          <Pulse size={24} />
                       </div>
                       <h3 className="text-2xl md:text-4xl font-heading font-black uppercase italic tracking-tight text-slate-900">Institutional Impact</h3>
                    </div>
                    <p className="text-slate-700 text-lg md:text-2xl font-bold leading-relaxed mb-10">
                      {dept.impact}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                       <div className="px-5 py-2 bg-white rounded-full text-[9px] font-black text-cyan-600 uppercase tracking-widest border border-cyan-200 shadow-sm">Metric Verified</div>
                       <div className="px-5 py-2 bg-white rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest border border-slate-200 shadow-sm">System Sync: OK</div>
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

export default Acad_Light;
