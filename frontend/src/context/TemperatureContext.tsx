import React, { createContext, useContext, useState, useEffect } from 'react';

type TemperatureUnit = 'C' | 'F';

interface TemperatureContextType {
  unit: TemperatureUnit;
  toggleUnit: () => void;
}

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined);

export const TemperatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<TemperatureUnit>('C');

  useEffect(() => {
    // Check if user is from US based on browser locale
    const isUS = navigator.language.includes('US');
    setUnit(isUS ? 'F' : 'C');
  }, []);

  const toggleUnit = () => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (context === undefined) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
}; 