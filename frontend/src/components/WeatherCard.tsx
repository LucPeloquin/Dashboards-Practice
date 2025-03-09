import React, { useEffect, useState } from 'react';
import { WeatherData } from '../types/weather';
import { useTemperature } from '../context/TemperatureContext';
import { getTimeOfDay, getThemeColors, TimeOfDay } from '../utils/timeOfDay';
import { getWeatherEmoji, getWeatherEmojiDescription } from '../utils/weatherEmojis';
import './WeatherCard.css';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { unit } = useTemperature();
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay());
  const [themeColors, setThemeColors] = useState(getThemeColors(timeOfDay));

  useEffect(() => {
    const updateTimeOfDay = () => {
      const newTimeOfDay = getTimeOfDay();
      setTimeOfDay(newTimeOfDay);
      setThemeColors(getThemeColors(newTimeOfDay));
    };

    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const cardStyle = {
    background: themeColors.background,
    color: themeColors.text,
    boxShadow: `0 4px 6px ${themeColors.shadow}`,
  };

  const convertTemp = (celsius: number): number => {
    return unit === 'F' ? (celsius * 9/5) + 32 : celsius;
  };

  const weatherEmoji = getWeatherEmoji(data.weather[0].icon);
  const emojiDescription = getWeatherEmojiDescription(data.weather[0].icon);

  return (
    <div className="weather-card" style={cardStyle}>
      <div className="weather-header">
        <div className="weather-info">
          <h2 className="city-name">{data.name}</h2>
          <div className="weather-main-info">
            <span className="weather-emoji" title={emojiDescription}>
              {weatherEmoji}
            </span>
            <span className="temperature">
              {Math.round(convertTemp(data.main.temp))}°{unit}
            </span>
          </div>
          <p className="description">{data.weather[0].description}</p>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <p className="detail-label">Feels like</p>
          <p className="detail-value">{Math.round(convertTemp(data.main.feels_like))}°{unit}</p>
        </div>
        <div className="detail-item">
          <p className="detail-label">Humidity</p>
          <p className="detail-value">{data.main.humidity}%</p>
        </div>
        <div className="detail-item">
          <p className="detail-label">Min</p>
          <p className="detail-value">{Math.round(convertTemp(data.main.temp_min))}°{unit}</p>
        </div>
        <div className="detail-item">
          <p className="detail-label">Max</p>
          <p className="detail-value">{Math.round(convertTemp(data.main.temp_max))}°{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 