export const getWeatherEmoji = (weatherCode: string): string => {
  // Weather codes reference: https://openweathermap.org/weather-conditions
  const code = weatherCode.slice(0, 2);
  const isDay = weatherCode.endsWith('d');

  const emojiMap: { [key: string]: string } = {
    '01': isDay ? '☀️' : '🌙', // clear sky
    '02': isDay ? '🌤️' : '🌑', // few clouds
    '03': '🌥️',  // scattered clouds
    '04': '☁️',   // broken/overcast clouds
    '09': '🌧️',   // shower rain
    '10': '🌦️',   // rain
    '11': '⛈️',   // thunderstorm
    '13': '🌨️',   // snow
    '50': '🌫️',   // mist/fog
  };

  return emojiMap[code] || '❓';
};

export const getWeatherEmojiDescription = (weatherCode: string): string => {
  const emojiDescriptions: { [key: string]: string } = {
    '☀️': 'Sunny',
    '🌙': 'Clear Night',
    '🌤️': 'Partly Cloudy',
    '🌑': 'Partly Cloudy Night',
    '🌥️': 'Mostly Cloudy',
    '☁️': 'Overcast',
    '🌧️': 'Showers',
    '🌦️': 'Rain',
    '⛈️': 'Thunderstorm',
    '🌨️': 'Snow',
    '🌫️': 'Foggy',
    '❓': 'Unknown Weather'
  };

  const emoji = getWeatherEmoji(weatherCode);
  return emojiDescriptions[emoji] || 'Unknown Weather';
}; 