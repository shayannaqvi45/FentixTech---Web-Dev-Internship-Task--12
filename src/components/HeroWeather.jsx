import React from 'react';
import { Thermometer, Wind, Droplets, Gauge, Sun, Eye } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

export default function HeroWeather({ weather, unit }) {
  if (!weather || !weather.current) return null;

  const { current } = weather;
  const isC = unit === 'C';
  const temp = isC ? current.tempC : current.tempF;
  const feelsLike = isC ? current.feelsLikeC : current.feelsLikeF;
  const maxTemp = isC ? current.maxTempC : current.maxTempF;
  const minTemp = isC ? current.minTempC : current.minTempF;
  const windSpeed = isC ? `${current.windSpeedKm} km/h` : `${current.windSpeedMph} mph`;

  return (
    <section className="hero-weather-section">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <WeatherIcon name={current.icon} size={48} className="hero-icon" />
        <div className="temp-main-row">
          <span className="temp-large">{temp}°</span>
          <div className="high-low-container">
            <span className="high-low-pill">
              H <strong style={{ color: '#fff' }}>{maxTemp}°</strong>
            </span>
            <span className="high-low-pill">
              L <strong style={{ color: '#fff' }}>{minTemp}°</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Headline Condition Text */}
      <h2 className="weather-desc-headline">
        {current.conditionText}
      </h2>

      {/* Atmospheric Sub-Text */}
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', lineHeight: '1.5' }}>
        With real-time data and advanced satellite telemetry, WeatherWise delivers precision forecasts for locations worldwide.
      </p>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <Thermometer size={16} color="var(--accent-orange)" />
            <span>Feels Like</span>
          </div>
          <div className="metric-value">{feelsLike}°</div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <Droplets size={16} color="var(--accent-blue)" />
            <span>Humidity</span>
          </div>
          <div className="metric-value">{current.humidity}%</div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <Wind size={16} color="var(--accent-amber)" />
            <span>Wind Speed</span>
          </div>
          <div className="metric-value">{windSpeed}</div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <Sun size={16} color="#eab308" />
            <span>UV Index</span>
          </div>
          <div className="metric-value">{current.uvIndex} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)' }}>/11</span></div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <Gauge size={16} color="var(--accent-purple)" />
            <span>Pressure</span>
          </div>
          <div className="metric-value">{current.pressure} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>hPa</span></div>
        </div>
      </div>
    </section>
  );
}
