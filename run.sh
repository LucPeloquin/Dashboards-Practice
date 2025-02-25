#!/bin/bash

# Start the backend server
echo "Starting Go backend server..."
cd backend
go run main.go &

# Wait a moment for backend to initialize
sleep 2

# Start the frontend server
echo "Starting React frontend server..."
cd ../frontend
npm start 