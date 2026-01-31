
import React, { useState } from 'react';
import { Home, Layers, Menu, Moon, Sun } from 'lucide-react';
import { MobileMenuMainPage } from '../components/MobileMenuMainPage';

// Import New Pages
import { MobileStory } from './pages/MobileStory';
import { MobileEvents } from './pages/MobileEvents';
import { MobileHallOfFame } from './pages/MobileHallOfFame';
import { MobileAlumni } from './pages/MobileAlumni';
import { MobilePanel } from './pages/MobilePanel';
import { HERO_IMAGE_URL, DEPARTMENT_LIST } from '../constants';

// Mobile View Components (Existing Home & Departments)
const MobileHome: React.FC<{ isDark: boolean; onNavigate: (view: string) => void }> = ({ isDark, onNavigate }) => {
  return (
    <div className={`pb-24 pt-20 px-6 animate-fade-in`}>
      {/* Hero Card */}
      <div className={`relative rounded-3xl overflow-hidden aspect-[4/5] mb-8 shadow-xl ${isDark ? 'bg-gray-900' : 'bg-slate-100'}`}>
         <img src={HERO_IMAGE_URL} className="absolute inset-0 w-full h-full object-cover grayscale brightness-75" alt="Hero" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
         <div className="absolute bottom-0 left-0 p-8">
            <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${isDark ? 'bg-cyan-500 text-black' : 'bg-white text-black'}`}>
               Est. 2022
            </div>
            <h1 className="text-5xl font-heading font-black uppercase italic text-white leading-[0.85] tracking-tighter mb-4">
               Manifest<br/>Tomorrow.
            </h1>
            <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
               We manufacture a generation of accomplished individuals through rigorous skill elevation.
            </p>
            <button 
               onClick={() => onNavigate('departments')}
               className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2"
            >
               Explore Departments
            </button>
         </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
         <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <span className={`text-3xl font-heading font-black italic mb-1 ${isDark ? 'text-cyan-500' : 'text-blue-600'}`}>150K+</span>
            <span className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Total Reach</span>
         </div>
         <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <span className={`text-3xl font-heading font-black italic mb-1 ${isDark ? 'text-cyan-500' : 'text-blue-600'}`}>10+</span>
            <span className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Major Events</span>
         </div>
      </div>
    </div>
  );
};

const MobileDepartments: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className={`pb-24 pt-20 px-6 animate-fade-in`}>
      <h2 className={`text-3xl font-heading font-black uppercase italic mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
         Our <span className="text-cyan-500">Pillars</span>
      </h2>
      <div className="flex flex-col gap-4">
         {DEPARTMENT_LIST.map((dept) => (
            <div key={dept.id} className={`p-6 rounded-2xl border relative overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
               <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-cyan-500/10 text-cyan-500' : 'bg-blue-50 text-blue-600'}`}>
                     {dept.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isDark ? 'bg-white/5 text-zinc-400' : 'bg-slate-100 text-slate-500'}`}>
                     {dept.id.toUpperCase()}
                  </span>
               </div>
               <h3 className={`text-xl font-heading font-black uppercase italic mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{dept.name}</h3>
               <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>{dept.description}</p>
            </div>
         ))}
      </div>
    </div>
  );
};

// Main Mobile Layout with View Switcher
const MobileApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const renderContent = () => {
     switch(activeTab) {
        case 'home': return <MobileHome isDark={isDark} onNavigate={setActiveTab} />;
        case 'departments': return <MobileDepartments isDark={isDark} />;
        case 'story': return <MobileStory isDark={isDark} />;
        case 'events': return <MobileEvents isDark={isDark} />;
        case 'hall-of-fame': return <MobileHallOfFame isDark={isDark} />;
        case 'alumni': return <MobileAlumni isDark={isDark} />;
        case 'panel': return <MobilePanel isDark={isDark} />;
        default: return <MobileHome isDark={isDark} onNavigate={setActiveTab} />;
     }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
       
       {/* Top Bar */}
       <header className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 z-40 backdrop-blur-md border-b ${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-slate-200'}`}>
          <div 
            className="flex items-center gap-2"
            onClick={() => setActiveTab('home')}
          >
             <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-cyan-500' : 'bg-blue-600'}`} />
             <span className="font-heading font-black uppercase italic text-lg">Forte-FY</span>
          </div>
          <button onClick={() => setIsDark(!isDark)} className="p-2">
             {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
       </header>

       {/* Main Content Area */}
       <main className="min-h-screen">
          {renderContent()}
       </main>

       {/* Bottom Navigation */}
       <nav className={`fixed bottom-0 left-0 w-full h-20 px-6 pb-4 flex items-center justify-around z-40 backdrop-blur-xl border-t ${isDark ? 'bg-black/90 border-white/10' : 'bg-white/90 border-slate-200'}`}>
          <button 
             onClick={() => setActiveTab('home')}
             className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'home' ? (isDark ? 'text-cyan-500' : 'text-blue-600') : 'text-zinc-500'}`}
          >
             <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
             <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
          </button>
          
          <button 
             onClick={() => setActiveTab('departments')}
             className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'departments' ? (isDark ? 'text-cyan-500' : 'text-blue-600') : 'text-zinc-500'}`}
          >
             <Layers size={24} strokeWidth={activeTab === 'departments' ? 2.5 : 2} />
             <span className="text-[9px] font-black uppercase tracking-widest">Units</span>
          </button>

          <button 
             onClick={() => setIsMenuOpen(true)}
             className={`flex flex-col items-center gap-1 p-2 text-zinc-500`}
          >
             <Menu size={24} />
             <span className="text-[9px] font-black uppercase tracking-widest">Menu</span>
          </button>
       </nav>

       {isMenuOpen && (
          <MobileMenuMainPage 
             isDark={isDark} 
             setIsDark={setIsDark}
             onClose={() => setIsMenuOpen(false)} 
             navigate={setActiveTab} 
          />
       )}
    </div>
  );
};

export default MobileApp;
