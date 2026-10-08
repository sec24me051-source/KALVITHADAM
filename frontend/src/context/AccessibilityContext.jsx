import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    largeText: false,
    highContrast: false,
    reduceMotion: false,
    lowData: false,
    language: 'English',
  });

  useEffect(() => {
    const saved = localStorage.getItem('accessibility');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('accessibility', JSON.stringify(settings));
    const body = document.body;
    body.classList.toggle('large-text', settings.largeText);
    body.classList.toggle('high-contrast', settings.highContrast);
    body.classList.toggle('reduce-motion', settings.reduceMotion);
    body.classList.toggle('low-data', settings.lowData);
  }, [settings]);

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <AccessibilityContext.Provider value={{ settings, toggle }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
export default AccessibilityContext;
