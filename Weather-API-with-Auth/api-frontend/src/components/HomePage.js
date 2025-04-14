import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file here

function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('Pollachi'); // Default location
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get weather information on page load
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7aebcb723a6f91af7cdeba4df9a7d06a`);
        setWeatherData(response.data);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again later.');
      }
    };

    fetchWeatherData();
  }, [location]);

  // Handle location change input
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  // Handle location search
  const handleLocationSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      // Trigger the weather fetch when a valid location is entered
      setWeatherData(null); // Reset the data while fetching new weather
    } else {
      setError('Please enter a location.');
    }
  };

  return (
    <div className="home-container">
      <div className="d-flex justify-content-between">
        <h1>Weather Information</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <form className="location-form" onSubmit={handleLocationSearch}>
        <input
          type="text"
          placeholder="Search Location"
          className="location-input"
          value={location}
          onChange={handleLocationChange}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weatherData ? (
        <div className="weather-card mt-4">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p className="temp">Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p className="loading-text">Loading weather data...</p>
      )}
    </div>
  );
}

export default HomePage;
