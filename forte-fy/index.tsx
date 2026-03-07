
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Check if the root has already been created (for HMR or re-renders)
// @ts-ignore
if (!rootElement._reactRootContainer) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // If it exists, we might want to unmount or just let HMR handle it.
  // For this specific error, ensuring we don't call createRoot twice is key.
  // In a real HMR scenario, we might want to update the existing root, but
  // standard Vite HMR usually handles this. This check prevents the specific console error.
}
