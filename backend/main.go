package main

import (
    "log"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "github.com/joho/godotenv"
    "dashboards/handlers"
    "dashboards/services"
)

func main() {
    // Load .env file
    if err := godotenv.Load(); err != nil {
        log.Printf("Warning: .env file not found")
    }

    // Initialize services and handlers
    weatherService := services.NewWeatherService()
    weatherHandler := handlers.NewWeatherHandler(weatherService)

    // Initialize router
    r := gin.Default()

    // Configure CORS
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "POST"},
        AllowHeaders:     []string{"Origin", "Content-Type"},
        AllowCredentials: true,
    }))

    // Routes
    r.GET("/api/weather/:city", weatherHandler.GetWeather)
    r.GET("/api/forecast/:city", weatherHandler.GetForecast)

    // Start server
    if err := r.Run(":8080"); err != nil {
        log.Fatal("Failed to start server: ", err)
    }
} 