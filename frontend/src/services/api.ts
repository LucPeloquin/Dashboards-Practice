import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

const API_BASE_URL = 'http://localhost:8080';

export const getWeather = async (city: string): Promise<WeatherData> => {
    try {
        const encodedCity = encodeURIComponent(city);
        const response = await axios.get<WeatherData>(`${API_BASE_URL}/api/weather/${encodedCity}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error || 'Failed to fetch weather data';
            throw new Error(message);
        }
        throw error;
    }
};

export const getForecast = async (city: string): Promise<ForecastData> => {
    try {
        const encodedCity = encodeURIComponent(city);
        const response = await axios.get<ForecastData>(`${API_BASE_URL}/api/forecast/${encodedCity}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error || 'Failed to fetch forecast data';
            throw new Error(message);
        }
        throw error;
    }
}; 