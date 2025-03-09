import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherForecast from './WeatherForecast';
import { WeatherData, ForecastData } from '../types/weather';
import './CityList.css';

interface CityWeather {
  city: string;
  weather: WeatherData;
  forecast: ForecastData;
}

interface CityListProps {
  cities: CityWeather[];
  onRemoveCity: (city: string) => void;
}

const CityList: React.FC<CityListProps> = ({ cities, onRemoveCity }) => {
  return (
    <div className="city-list">
      {cities.map((cityData) => (
        <div key={cityData.city} className="city-item">
          <div className="city-header">
            <h3>{cityData.city}</h3>
            <button
              onClick={() => onRemoveCity(cityData.city)}
              className="remove-city"
            >
              ×
            </button>
          </div>
          <WeatherCard data={cityData.weather} />
          <WeatherForecast forecast={cityData.forecast} />
        </div>
      ))}
    </div>
  );
};

export default CityList; 