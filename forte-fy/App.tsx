
import React from 'react';
import DesktopApp from './DesktopApp';
import MobileApp from './mobile/MobileApp';
import { useIsMobile } from './hooks/useIsMobile';

const App: React.FC = () => {
  const isMobile = useIsMobile();

  // Use a key to force re-render when switching device types to ensure fresh state and prevent layout conflicts
  return isMobile ? <MobileApp key="mobile" /> : <DesktopApp key="desktop" />;
};

export default App;
