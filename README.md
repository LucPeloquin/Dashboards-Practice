# Weather Dashboard

A modern weather dashboard application that provides real-time weather data and forecasts for cities around the world. This project demonstrates the implementation of a full-stack application with a React frontend and Go backend.

## Features

- Current weather conditions for any city
- 5-day weather forecast
- Current location weather detection
- City search functionality
- Weather animations based on conditions
- Responsive design for desktop and mobile devices

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Data Visualization**: Chart.js
- **Styling**: CSS with responsive design

### Backend
- **Language**: Go (Golang)
- **Web Framework**: Gin
- **Environment Variables**: godotenv
- **CORS Support**: gin-contrib/cors

## API Integration

This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data, including:
- Current weather conditions
- 5-day/3-hour forecast data

## Project Structure

```
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── services/       # API service calls
│   │   ├── context/        # React context for state management
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
│
├── backend/                # Go backend
│   ├── config/             # Configuration settings
│   ├── handlers/           # HTTP request handlers
│   ├── models/             # Data models
│   ├── services/           # Business logic and API integrations
│   └── main.go             # Application entry point
```

## Getting Started

### Prerequisites
- Node.js and npm for the frontend
- Go 1.x for the backend
- OpenWeatherMap API key

### Environment Setup
1. Create a `.env` file in the backend directory with:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

2. Create a `.env` file in the frontend directory with:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

### Running the Application
1. Start the backend:
   ```
   cd backend
   go run main.go
   ```

2. Start the frontend:
   ```
   cd frontend
   npm install
   npm start
   ```

3. Access the application at `http://localhost:3000`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
