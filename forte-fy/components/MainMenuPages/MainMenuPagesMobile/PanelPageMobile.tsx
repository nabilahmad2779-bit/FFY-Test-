
import React from 'react';
import { PanelPageMobileLight } from './MobileMenuLight/PanelPageMobileLight.tsx';

export const PanelPageMobile: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  if (!isDark) {
    return <PanelPageMobileLight />;
  }

  return <div className="min-h-screen bg-black" />;
};

