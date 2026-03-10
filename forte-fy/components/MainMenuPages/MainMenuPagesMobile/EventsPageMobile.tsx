
import React, { useState, useRef, useLayoutEffect } from 'react';
import { FORTE_EVENTS } from '../../../constants.tsx';
import SmartImage from '../../SmartImage.tsx';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { EventsPageMobileLight } from './MobileMenuLight/EventsPageMobileLight.tsx';

interface EventsPageMobileProps {
  isDark: boolean;
  navigate: (path: string) => void;
}

export const EventsPageMobile: React.FC<EventsPageMobileProps> = ({ isDark, navigate }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isDark) {
      const ctx = gsap.context(() => {
          gsap.fromTo(".archive-col", 
              { x: '-100%', opacity: 0 },
              { x: '0%', opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
          );
          gsap.fromTo(".archive-header",
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
          );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [isDark]);

  if (!isDark) {
    return <EventsPageMobileLight navigate={navigate} />;
  }

  const handleEventClick = (eventId: string) => {
    if (expandedId === eventId) {
      navigate(`/events/${eventId}`);
    } else {
      setExpandedId(eventId);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col pt-24 pb-6 px-6 bg-[#050505] text-white transition-colors duration-700">
      
      {/* Minimal Header */}
      <header className="archive-header w-full mb-6 shrink-0">
        <div>
            <h1 className="text-[10px] font-black uppercase tracking-[0.4em] mb-1 opacity-50 text-cyan-500">Initiative Records</h1>
            <h2 className="text-4xl font-heading font-black uppercase italic tracking-tighter">The Archive</h2>
        </div>
      </header>

      {/* Flex Accordion - Expands on Tap */}
      <div className="flex-1 flex flex-col gap-2 h-[70vh] w-full">
        {FORTE_EVENTS.map((event) => {
            const isExpanded = expandedId === event.id;
            return (
              <div 
                  key={event.id}
                  onClick={() => handleEventClick(event.id)}
                  className={`archive-col relative h-full rounded-2xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isExpanded ? 'flex-[3]' : 'flex-1'}`}
              >
                  {/* Image Background */}
                  <div className="absolute inset-0 bg-gray-900">
                      <SmartImage 
                          src={event.image} 
                          alt={event.name} 
                          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isExpanded ? 'opacity-100 scale-105' : 'opacity-60 scale-100'}`} 
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 ${isExpanded ? 'opacity-30' : 'opacity-80'}`} />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end items-start z-10">
                      <div className={`w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'translate-y-0' : 'translate-y-8'}`}>
                          <div className={`flex justify-between items-center mb-3 transition-opacity duration-500 delay-100 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-cyan-500/30">
                                  {event.year}
                              </span>
                              <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                  <ArrowUpRight className="text-white" size={16} />
                              </div>
                          </div>
                          
                          <h3 className="text-3xl font-heading font-black uppercase italic tracking-tighter text-white leading-[0.9] mb-2 drop-shadow-xl whitespace-nowrap overflow-hidden text-ellipsis">
                              {event.name}
                          </h3>
                          
                          <p className={`text-[10px] font-medium text-zinc-300/90 uppercase tracking-wider transition-opacity duration-500 delay-200 line-clamp-2 max-w-lg ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                              {event.tagline}
                          </p>
                      </div>
                  </div>

                  {/* Expanded Border Highlight */}
                  <div className={`absolute inset-0 border-2 rounded-2xl transition-all duration-500 pointer-events-none ${isExpanded ? 'border-cyan-500/50' : 'border-cyan-500/0'}`} />
              </div>
            );
        })}
      </div>
    </div>
  );
};
