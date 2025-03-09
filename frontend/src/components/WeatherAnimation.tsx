import React, { useEffect, useState } from 'react';
import './WeatherAnimation.css';

interface WeatherAnimationProps {
  weatherCode: string;
}

const WeatherAnimation: React.FC<WeatherAnimationProps> = ({ weatherCode }) => {
  const [prevClass, setPrevClass] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getAnimationClass = (code: string) => {
    const isDay = code.endsWith('d');
    const baseClass = {
      '01': 'clear-sky',
      '02': 'few-clouds',
      '03': 'scattered-clouds',
      '04': 'broken-clouds',
      '09': 'shower-rain',
      '10': 'rain',
      '11': 'thunderstorm',
      '13': 'snow',
      '50': 'mist'
    }[code.slice(0, 2)] || 'default';

    return `${baseClass} ${isDay ? 'day' : 'night'}`;
  };

  useEffect(() => {
    if (prevClass && prevClass !== getAnimationClass(weatherCode)) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    setPrevClass(getAnimationClass(weatherCode));
  }, [weatherCode, prevClass]);

  const renderElements = () => {
    const elements = [];
    const count = {
      'rain': 10,
      'snow': 15,
      'few-clouds': 3,
      'scattered-clouds': 5,
      'broken-clouds': 7
    }[getAnimationClass(weatherCode).split(' ')[0]] || 1;

    for (let i = 0; i < count; i++) {
      elements.push(<div key={i} className={`element-${i + 1}`} />);
    }
    return elements;
  };

  return (
    <div className={`weather-animation ${getAnimationClass(weatherCode)} ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="animation-container">
        <div className="background-layer" />
        {renderElements()}
        <div className="foreground-layer" />
      </div>
    </div>
  );
};

export default WeatherAnimation; 