export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  timezone: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
      temp_min: number;
      temp_max: number;
      feels_like: number;
    };
    weather: Array<{
      description: string;
      icon: string;
      main: string;
    }>;
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
} 