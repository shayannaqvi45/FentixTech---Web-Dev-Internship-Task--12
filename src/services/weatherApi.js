/**
 * Open-Meteo Weather Service
 * Completely free, no API key required, reliable real-time weather & forecasts.
 */

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const AQI_BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

/**
 * Maps WMO Weather Codes to descriptive text and icon names
 */
export function interpretWMO(code) {
  switch (code) {
    case 0:
      return { text: 'Clear sky', icon: 'Sun', category: 'clear' };
    case 1:
      return { text: 'Mainly clear', icon: 'Sun', category: 'clear' };
    case 2:
      return { text: 'Partly cloudy', icon: 'CloudSun', category: 'cloudy' };
    case 3:
      return { text: 'Overcast clouds', icon: 'Cloud', category: 'cloudy' };
    case 45:
    case 48:
      return { text: 'Fog and depositing rime fog', icon: 'CloudFog', category: 'fog' };
    case 51:
    case 53:
    case 55:
      return { text: 'Light drizzle', icon: 'CloudDrizzle', category: 'rain' };
    case 61:
      return { text: 'Slight rain showers', icon: 'CloudRain', category: 'rain' };
    case 63:
      return { text: 'Moderate rain', icon: 'CloudRain', category: 'rain' };
    case 65:
      return { text: 'Heavy rainfall', icon: 'CloudRainWind', category: 'rain' };
    case 71:
    case 73:
    case 75:
      return { text: 'Snowfall', icon: 'Snowflake', category: 'snow' };
    case 80:
    case 81:
    case 82:
      return { text: 'Heavy rain showers', icon: 'CloudRain', category: 'rain' };
    case 95:
      return { text: 'Stormy with thunder', icon: 'CloudLightning', category: 'storm' };
    case 96:
    case 99:
      return { text: 'Heavy thunderstorm with hail', icon: 'CloudLightning', category: 'storm' };
    default:
      return { text: 'Partly cloudy', icon: 'CloudSun', category: 'cloudy' };
  }
}

/**
 * Search locations by city query string
 */
export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    const response = await fetch(
      `${GEOCODING_BASE_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );
    if (!response.ok) throw new Error('Failed to fetch location suggestions.');
    const data = await response.json();
    
    if (!data.results) return [];
    
    return data.results.map((loc) => ({
      id: loc.id,
      name: loc.name,
      country: loc.country || '',
      admin1: loc.admin1 || '',
      latitude: loc.latitude,
      longitude: loc.longitude,
      displayName: `${loc.name}${loc.admin1 ? ', ' + loc.admin1 : ''}, ${loc.country || ''}`
    }));
  } catch (err) {
    console.error('Geocoding search error:', err);
    return [];
  }
}

/**
 * Reverse geocode coordinates to location name
 */
export async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (!res.ok) throw new Error('Reverse geocode failed');
    const data = await res.json();
    const city = data.city || data.locality || data.principalSubdivision || 'Current Location';
    const country = data.countryName || '';
    return {
      name: city,
      country: country,
      displayName: `${city}${country ? ', ' + country : ''}`,
      latitude: lat,
      longitude: lon
    };
  } catch (err) {
    return {
      name: 'Current Location',
      country: '',
      displayName: 'Current Location',
      latitude: lat,
      longitude: lon
    };
  }
}

/**
 * Fetch full weather data (Current, Daily 7-day, Air Quality)
 */
export async function fetchWeatherData(lat, lon) {
  const weatherUrl = `${FORECAST_BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`;
  const aqiUrl = `${AQI_BASE_URL}?latitude=${lat}&longitude=${lon}&current=us_aqi`;

  const [weatherRes, aqiRes] = await Promise.allSettled([
    fetch(weatherUrl),
    fetch(aqiUrl)
  ]);

  if (weatherRes.status !== 'fulfilled' || !weatherRes.value.ok) {
    throw new Error('Weather data unavailable for this city. Please try another search.');
  }

  const weatherData = await weatherRes.value.json();
  let aqiValue = 42; // default good

  if (aqiRes.status === 'fulfilled' && aqiRes.value.ok) {
    const aqiData = await aqiRes.value.json();
    if (aqiData.current && aqiData.current.us_aqi !== undefined) {
      aqiValue = Math.round(aqiData.current.us_aqi);
    }
  }

  const current = weatherData.current;
  const daily = weatherData.daily;
  const condition = interpretWMO(current.weather_code);

  // Format 7-day forecast
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const forecast7Day = daily.time.map((timeStr, idx) => {
    const dateObj = new Date(timeStr);
    const dayName = daysOfWeek[dateObj.getUTCDay()];
    const wCode = daily.weather_code[idx];
    const wCond = interpretWMO(wCode);
    return {
      dateStr: timeStr,
      dayName: idx === 0 ? 'Today' : dayName,
      maxTempC: Math.round(daily.temperature_2m_max[idx]),
      minTempC: Math.round(daily.temperature_2m_min[idx]),
      maxTempF: Math.round((daily.temperature_2m_max[idx] * 9/5) + 32),
      minTempF: Math.round((daily.temperature_2m_min[idx] * 9/5) + 32),
      condition: wCond.text,
      icon: wCond.icon
    };
  });

  return {
    current: {
      tempC: Math.round(current.temperature_2m),
      tempF: Math.round((current.temperature_2m * 9/5) + 32),
      feelsLikeC: Math.round(current.apparent_temperature),
      feelsLikeF: Math.round((current.apparent_temperature * 9/5) + 32),
      humidity: current.relative_humidity_2m,
      windSpeedKm: Math.round(current.wind_speed_10m),
      windSpeedMph: Math.round(current.wind_speed_10m * 0.621371),
      pressure: Math.round(current.surface_pressure),
      uvIndex: Math.round(current.uv_index || 0),
      weatherCode: current.weather_code,
      conditionText: condition.text,
      icon: condition.icon,
      maxTempC: Math.round(daily.temperature_2m_max[0]),
      minTempC: Math.round(daily.temperature_2m_min[0]),
      maxTempF: Math.round((daily.temperature_2m_max[0] * 9/5) + 32),
      minTempF: Math.round((daily.temperature_2m_min[0] * 9/5) + 32),
    },
    aqi: {
      value: aqiValue,
      status: aqiValue <= 50 ? 'Good' : aqiValue <= 100 ? 'Moderate' : 'Unhealthy',
      badgeClass: aqiValue <= 50 ? 'aqi-good' : aqiValue <= 100 ? 'aqi-moderate' : 'aqi-unhealthy'
    },
    forecast: forecast7Day,
    timezone: weatherData.timezone
  };
}
