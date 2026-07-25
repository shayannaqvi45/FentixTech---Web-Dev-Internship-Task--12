import React, { useState } from 'react';
import WeatherIcon from './WeatherIcon';

export default function ForecastChart({ forecast, unit }) {
  const [activeDayIdx, setActiveDayIdx] = useState(3); // Default highlight Wednesday / mid week

  if (!forecast || forecast.length === 0) return null;

  const isC = unit === 'C';
  const temps = forecast.map((d) => (isC ? d.maxTempC : d.maxTempF));

  const minVal = Math.min(...temps) - 2;
  const maxVal = Math.max(...temps) + 2;
  const range = maxVal - minVal || 1;

  // Compute SVG Coordinates for 7 points
  const width = 700;
  const height = 90;
  const paddingX = 45;
  const stepX = (width - paddingX * 2) / (forecast.length - 1);

  const points = temps.map((t, i) => {
    const x = paddingX + i * stepX;
    // invert Y since SVG 0 is top
    const normalized = (t - minVal) / range;
    const y = height - 20 - normalized * (height - 35);
    return { x, y, temp: t };
  });

  // Construct smooth SVG Bezier path string
  const pathD = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = a[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  }, '');

  const activePoint = points[activeDayIdx] || points[0];

  return (
    <section className="forecast-section">
      <div className="section-title">
        <span>7-Day Atmospheric Trend</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>
          Interactive Wave Forecast
        </span>
      </div>

      <div className="glass-panel" style={{ padding: '1.25rem 1rem' }}>
        {/* SVG Dynamic Temperature Wave Curve */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox={`0 0 ${width} ${height}`} className="forecast-svg" style={{ minWidth: '600px' }}>
            <defs>
              <linearGradient id="waveGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
              </linearGradient>
            </defs>

            {/* Filled area under curve */}
            <path
              d={`${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`}
              fill="url(#waveGlow)"
              opacity="0.25"
            />

            {/* Smooth Bezier Line */}
            <path d={pathD} fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="2.5" />

            {/* Active Node Dashed Vertical Line */}
            <line
              x1={activePoint.x}
              y1={activePoint.y}
              x2={activePoint.x}
              y2={height}
              stroke="var(--accent-orange)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Point Nodes */}
            {points.map((pt, idx) => (
              <g key={idx} style={{ cursor: 'pointer' }} onClick={() => setActiveDayIdx(idx)}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={idx === activeDayIdx ? 7 : 4}
                  fill={idx === activeDayIdx ? '#ffffff' : 'var(--bg-dark)'}
                  stroke={idx === activeDayIdx ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.6)'}
                  strokeWidth={idx === activeDayIdx ? '3' : '2'}
                  style={{ transition: 'all 0.3s ease' }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* 7-Day Columns */}
        <div className="forecast-days-row">
          {forecast.map((item, idx) => (
            <div
              key={idx}
              className={`day-col ${idx === activeDayIdx ? 'glass-panel' : ''}`}
              style={{
                cursor: 'pointer',
                borderColor: idx === activeDayIdx ? 'var(--accent-orange)' : 'transparent',
                background: idx === activeDayIdx ? 'rgba(255,255,255,0.08)' : 'transparent'
              }}
              onClick={() => setActiveDayIdx(idx)}
            >
              <span className="day-name">{item.dayName}</span>
              <WeatherIcon name={item.icon} size={22} className="day-icon" />
              <div className="day-temp">{isC ? item.maxTempC : item.maxTempF}°</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {isC ? item.minTempC : item.minTempF}°
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
