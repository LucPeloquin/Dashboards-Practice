import React, { useEffect } from 'react';

const ForecastLogo: React.FC = () => {
  useEffect(() => {
    const sunburst = document.getElementById('sunburst');
    if (!sunburst) return;
    
    const angles = [];
    const numberOfRays = 13;
    
    for (let i = 0; i < numberOfRays; i++) {
      angles.push(i * (180 / (numberOfRays - 1)));
    }
    
    angles.forEach(angle => {
      const ray = document.createElement('div');
      ray.className = 'ray';
      ray.style.transform = `rotate(${angle}deg)`;
      ray.style.width = '150px';
      sunburst.appendChild(ray);
      
      if (angle !== 0 && angle !== 180) {
        const mirrorRay = document.createElement('div');
        mirrorRay.className = 'ray';
        mirrorRay.style.transform = `rotate(${360 - angle}deg)`;
        mirrorRay.style.width = '150px';
        sunburst.appendChild(mirrorRay);
      }
    });
  }, []);

  return (
    <div className="logo-container">
      <div className="sunburst" id="sunburst"></div>
      <div className="logo-text">Forecast Channel</div>
    </div>
  );
};

export default ForecastLogo; 