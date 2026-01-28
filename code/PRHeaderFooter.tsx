
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';

interface PRHeaderProps {
  navigate: (path: string) => void;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = "", onClick }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.5,
        ease: "power3.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button ref={btnRef} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export const PRHeader: React.FC<PRHeaderProps> = ({ navigate, isDark, setIsDark }) => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNav(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const borderClass = isDark ? "border-rose-900/20" : "border-rose-900/10";

  return (
    <div className={`fixed top-0 left-0 w-full z-[60] px-6 py-4 md:px-8 md:py-6 flex justify-between items-center transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
      <MagneticButton onClick={() => navigate('/departments')} className="flex items-center gap-3 group relative interactive">
         <div className="absolute inset-0 bg-[#DC143C] rounded-full blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity" />
         <div className={`relative z-10 flex items-center gap-2 px-4 py-2 border ${borderClass} rounded-full bg-black/50 backdrop-blur-md group-hover:border-[#DC143C] transition-colors`}>
            <ArrowLeft size={18} className="text-white" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Nexus</span>
         </div>
      </MagneticButton>
      <MagneticButton onClick={() => setIsDark(!isDark)} className={`p-3 rounded-full transition-all interactive ${isDark ? 'bg-white/10 text-white hover:bg-[#DC143C]' : 'bg-white text-black shadow-lg hover:bg-[#DC143C] hover:text-white'}`}>
         {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </MagneticButton>
    </div>
  );
};

export const PRFooter: React.FC = () => {
  return null;
};
