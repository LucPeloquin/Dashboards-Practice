package services

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "net/url"
    "os"
    "strings"
)

type WeatherService struct {
    apiKey string
    baseURL string
}

type WeatherData struct {
    Main struct {
        Temp      float64 `json:"temp"`
        FeelsLike float64 `json:"feels_like"`
        TempMin   float64 `json:"temp_min"`
        TempMax   float64 `json:"temp_max"`
        Humidity  int     `json:"humidity"`
    } `json:"main"`
    Weather []struct {
        Description string `json:"description"`
        Icon        string `json:"icon"`
        Main        string `json:"main"`
    } `json:"weather"`
    Name string `json:"name"`
}

type ForecastData struct {
    List []struct {
        Dt   int64 `json:"dt"`
        Main struct {
            Temp     float64 `json:"temp"`
            Humidity int     `json:"humidity"`
        } `json:"main"`
        Weather []struct {
            Description string `json:"description"`
            Icon        string `json:"icon"`
        } `json:"weather"`
        DtTxt string `json:"dt_txt"`
    } `json:"list"`
}

func NewWeatherService() *WeatherService {
    apiKey := os.Getenv("OPENWEATHER_API_KEY")
    if apiKey == "" {
        log.Fatal("OPENWEATHER_API_KEY is not set in environment variables")
    }
    return &WeatherService{
        apiKey: apiKey,
        baseURL: "https://api.openweathermap.org/data/2.5",
    }
}

func (s *WeatherService) GetForecast(city string) (*ForecastData, error) {
    // Validate and clean city input
    city = strings.TrimSpace(city)
    if city == "" {
        return nil, fmt.Errorf("city name cannot be empty")
    }

    // Build URL with proper encoding
    params := url.Values{}
    params.Add("q", city)
    params.Add("appid", s.apiKey)
    params.Add("units", "metric")

    url := fmt.Sprintf("%s/forecast?%s", s.baseURL, params.Encode())
    log.Printf("Requesting forecast URL: %s", url)

    // Create a new request
    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        return nil, fmt.Errorf("failed to create request: %v", err)
    }

    // Add headers
    req.Header.Add("Accept", "application/json")
    req.Header.Add("Content-Type", "application/json")

    // Make the request
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("failed to make request: %v", err)
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, fmt.Errorf("failed to read response body: %v", err)
    }

    // Check content type of response
    contentType := resp.Header.Get("Content-Type")
    log.Printf("Response Content-Type: %s", contentType)

    if resp.StatusCode != http.StatusOK {
        log.Printf("API Error Response: %s", string(body))
        return nil, fmt.Errorf("API error (status %d): %s", resp.StatusCode, string(body))
    }

    var data ForecastData
    if err := json.Unmarshal(body, &data); err != nil {
        return nil, fmt.Errorf("failed to parse response: %v, body: %s", err, string(body))
    }

    return &data, nil
}

func (s *WeatherService) GetWeather(city string) (*WeatherData, error) {
    // Validate and clean city input
    city = strings.TrimSpace(city)
    if city == "" {
        return nil, fmt.Errorf("city name cannot be empty")
    }

    // Build URL with proper encoding
    params := url.Values{}
    params.Add("q", city)
    params.Add("appid", s.apiKey)
    params.Add("units", "metric")

    url := fmt.Sprintf("%s/weather?%s", s.baseURL, params.Encode())
    log.Printf("Requesting weather URL: %s", url)

    // Create a new request
    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        return nil, fmt.Errorf("failed to create request: %v", err)
    }

    // Add headers
    req.Header.Add("Accept", "application/json")
    req.Header.Add("Content-Type", "application/json")

    // Make the request
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("failed to make request: %v", err)
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, fmt.Errorf("failed to read response body: %v", err)
    }

    if resp.StatusCode != http.StatusOK {
        log.Printf("API Error Response: %s", string(body))
        return nil, fmt.Errorf("API error (status %d): %s", resp.StatusCode, string(body))
    }

    var data WeatherData
    if err := json.Unmarshal(body, &data); err != nil {
        return nil, fmt.Errorf("failed to parse response: %v, body: %s", err, string(body))
    }

    return &data, nil
} 