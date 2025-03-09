import React, { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
import CitySearch from './CitySearch';
import LoadingSpinner from './LoadingSpinner';
import { WeatherData } from '../types/weather';
import { getWeather } from '../services/api';
import './CurrentLocationWeather.css';

interface CurrentLocationWeatherProps {
  onCityAdd: (city: string) => Promise<void>;
  error: string | null;
}

const CurrentLocationWeather: React.FC<CurrentLocationWeatherProps> = ({ onCityAdd, error }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentLocationWeather = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
              );
              const [locationData] = await response.json();
              const weatherData = await getWeather(locationData.name);
              setWeather(weatherData);
            } catch (err) {
              setLocationError('Failed to fetch current location weather');
            } finally {
              setLoading(false);
            }
          },
          () => {
            setLocationError('Unable to get current location');
            setLoading(false);
          }
        );
      } else {
        setLocationError('Geolocation is not supported by your browser');
        setLoading(false);
      }
    };

    getCurrentLocationWeather();
  }, []);

  return (
    <div className="current-location-panel">
      <h2 className="panel-title">Current Location</h2>
      {loading ? (
        <LoadingSpinner />
      ) : locationError ? (
        <div className="error-message">{locationError}</div>
      ) : weather ? (
        <WeatherCard data={weather} />
      ) : null}
      
      <CitySearch onCityAdd={onCityAdd} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CurrentLocationWeather; 