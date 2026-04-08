
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DesktopApp from './DesktopApp';
import MobileApp from './mobile/MobileApp';
import { useIsMobile } from './hooks/useIsMobile';

const App: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Landing Page */}
        <Route 
          path="/" 
          element={isMobile ? <MobileApp key="mobile" /> : <DesktopApp key="desktop" />} 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
