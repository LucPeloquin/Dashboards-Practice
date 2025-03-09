import React from 'react';
import { useTemperature } from '../context/TemperatureContext';
import './Settings.css';

const Settings: React.FC = () => {
  const { unit, toggleUnit } = useTemperature();

  return (
    <button className="settings-button" onClick={toggleUnit} title="Toggle Temperature Unit">
      ⚙️ {unit}°
    </button>
  );
};

export default Settings; 