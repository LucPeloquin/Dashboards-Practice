import React, { useState } from 'react';
import './CitySearch.css';

interface CitySearchProps {
  onCityAdd: (city: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCityAdd }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onCityAdd(city.trim());
      setCity('');
    }
  };

  return (
    <div className="city-search-panel">
      <h2 className="panel-title">Add City</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Add City
        </button>
      </form>
    </div>
  );
};

export default CitySearch; 