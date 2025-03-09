import React, { useState } from 'react';
import CurrentLocationWeather from './components/CurrentLocationWeather';
// import CitySearch from './components/CitySearch';
import CityList from './components/CityList';
import Settings from './components/Settings';
import { TemperatureProvider } from './context/TemperatureContext';
import { WeatherData, ForecastData } from './types/weather';
import { getWeather, getForecast } from './services/api';
import './App.css';
import ForecastLogo from './components/ForecastLogo';

interface CityWeather {
  city: string;
  weather: WeatherData;
  forecast: ForecastData;
}

function App() {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddCity = async (city: string) => {
    try {
      // Check if city already exists
      if (cities.some(c => c.city.toLowerCase() === city.toLowerCase())) {
        setError('City already added');
        return;
      }

      const [weather, forecast] = await Promise.all([
        getWeather(city),
        getForecast(city)
      ]);

      setCities(prev => [...prev, { city, weather, forecast }]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add city');
    }
  };

  const handleRemoveCity = (city: string) => {
    setCities(prev => prev.filter(c => c.city !== city));
  };

  return (
    <TemperatureProvider>
      <div className="app-container">
        <div className="cloud-layer"></div>
        <div className="content-wrapper">
          <ForecastLogo />
          <div className="dashboard-grid">
            <div className="main-panel">
              <CurrentLocationWeather 
                onCityAdd={handleAddCity}
                error={error}
              />
            </div>
            
            <CityList 
              cities={cities}
              onRemoveCity={handleRemoveCity}
            />
          </div>
        </div>
      </div>
    </TemperatureProvider>
  );
}

export default App;
