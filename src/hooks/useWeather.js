import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData, searchCities, reverseGeocode } from '../services/weatherApi';

const DEFAULT_LOCATION = {
  name: 'Brooklyn',
  country: 'USA',
  displayName: 'Brooklyn, New York, USA',
  latitude: 40.6782,
  longitude: -73.9442
};

const INITIAL_RECENTS = [
  { name: 'Liverpool, UK', lat: 53.4084, lon: -2.9916, temp: '16°', condition: 'Partly Cloudy' },
  { name: 'Palermo, Italy', lat: 38.1157, lon: 13.3615, temp: '24°', condition: 'Sunny' },
  { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503, temp: '22°', condition: 'Clear' }
];

export function useWeather() {
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('weatherwise_last_location');
    return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
  });

  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('weatherwise_unit') || 'C';
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('weatherwise_recents');
    return saved ? JSON.parse(saved) : INITIAL_RECENTS;
  });

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toggle unit C/F
  const toggleUnit = useCallback((newUnit) => {
    setUnit(newUnit);
    localStorage.setItem('weatherwise_unit', newUnit);
  }, []);

  // Fetch weather for active location
  const loadWeather = useCallback(async (targetLoc) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(targetLoc.latitude, targetLoc.longitude);
      setWeather(data);
      setLocation(targetLoc);
      localStorage.setItem('weatherwise_last_location', JSON.stringify(targetLoc));

      // Add to recents if not already there
      setRecentSearches((prev) => {
        const filtered = prev.filter((item) => item.name !== targetLoc.displayName);
        const newItem = {
          name: targetLoc.displayName,
          lat: targetLoc.latitude,
          lon: targetLoc.longitude,
          temp: `${data.current.tempC}°`,
          condition: data.current.conditionText
        };
        const updated = [newItem, ...filtered].slice(0, 5);
        localStorage.setItem('weatherwise_recents', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to fetch weather data for this location.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadWeather(location);
  }, []);

  // Select city by result object
  const selectLocation = (loc) => {
    const newLoc = {
      name: loc.name,
      country: loc.country,
      displayName: loc.displayName,
      latitude: loc.latitude,
      longitude: loc.longitude
    };
    loadWeather(newLoc);
  };

  // Get current user location via Geolocation API
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const geoInfo = await reverseGeocode(lat, lon);
        loadWeather(geoInfo);
      },
      (err) => {
        console.error(err);
        setLoading(false);
        setError('Location permission denied or unavailable. Please search for your city manually.');
      }
    );
  };

  return {
    location,
    weather,
    loading,
    error,
    unit,
    toggleUnit,
    recentSearches,
    selectLocation,
    handleUseCurrentLocation,
    reload: () => loadWeather(location)
  };
}
