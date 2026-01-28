
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';

interface HRHeaderProps {
  navigate: (path: string) => void;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HRHeader: React.FC<HRHeaderProps> = ({ navigate, isDark, setIsDark }) => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navColor = isDark ? "text-white mix-blend-difference" : "text-[#2e1065]";
  const navBtnHover = "hover:text-[#bf00ff]";

  return (
    <div className={`fixed top-0 left-0 w-full z-[60] p-6 flex justify-between items-center transition-transform duration-500 ${showNav ? 'translate-y-0' : '-translate-y-full'} ${navColor}`}>
      <button 
        onClick={() => navigate('/departments')}
        className={`flex items-center gap-3 ${navBtnHover} transition-colors text-xs font-bold tracking-[0.2em] uppercase group`}
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Nexus</span>
      </button>

      <div className="flex items-center gap-6">
         <button onClick={() => setIsDark(!isDark)} className={`${navBtnHover} transition-colors p-2 rounded-full hover:bg-black/5`}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
         </button>
      </div>
    </div>
  );
};

export const HRFooter: React.FC = () => {
  return null;
};
