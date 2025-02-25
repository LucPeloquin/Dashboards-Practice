package handlers

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "dashboards/services"
)

type WeatherHandler struct {
    weatherService *services.WeatherService
}

func NewWeatherHandler(weatherService *services.WeatherService) *WeatherHandler {
    return &WeatherHandler{
        weatherService: weatherService,
    }
}

func (h *WeatherHandler) GetWeather(c *gin.Context) {
    city := c.Param("city")
    if city == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "City parameter is required"})
        return
    }

    weather, err := h.weatherService.GetWeather(city)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, weather)
}

func (h *WeatherHandler) GetForecast(c *gin.Context) {
    city := c.Param("city")
    if city == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "City parameter is required"})
        return
    }

    forecast, err := h.weatherService.GetForecast(city)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, forecast)
} 