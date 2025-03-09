import React from 'react';
import { ForecastData } from '../types/weather';
import './WeatherForecast.css';

interface WeatherForecastProps {
  forecast: ForecastData;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Ensure forecast.list exists and is an array before mapping
  const dailyForecast = forecast?.list
    ? forecast.list
        .filter(item => item.dt_txt.includes('12:00:00'))
        .slice(0, 5)
    : [];

  if (!dailyForecast.length) {
    return null;
  }

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecast.map((day) => (
          <div key={day.dt} className="forecast-item">
            <div className="forecast-day">{getDayOfWeek(day.dt_txt)}</div>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <div className="forecast-temp">{Math.round(day.main.temp)}°C</div>
            <div className="forecast-description">
              {day.weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast; 