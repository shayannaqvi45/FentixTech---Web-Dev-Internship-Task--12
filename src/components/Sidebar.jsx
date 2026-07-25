import React from 'react';
import { CloudSun, Activity, Compass, MapPin } from 'lucide-react';

export default function Sidebar({ weather, location }) {
  const aqi = weather?.aqi || { value: 42, status: 'Good', badgeClass: 'aqi-good' };

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="brand-header">
        <div className="brand-logo-icon">
          <CloudSun size={24} />
        </div>
        <h1 className="brand-title">WeatherWise</h1>
      </div>

      {/* Air Quality / Status Widget */}
      <div className="glass-panel widget-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="widget-label">Status & Air Quality</span>
          <Activity size={16} color="var(--text-muted)" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>
              AQI {aqi.value}
            </div>
            <span className={`aqi-badge ${aqi.badgeClass}`} style={{ marginTop: '0.4rem' }}>
              {aqi.status}
            </span>
          </div>

          {/* Mini Curve Graph Visual matching mockup */}
          <svg width="90" height="50" viewBox="0 0 90 50">
            <path
              d="M 5 40 Q 30 10, 55 30 T 85 15"
              fill="none"
              stroke="var(--accent-orange)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="55" cy="30" r="4" fill="#ffffff" stroke="var(--accent-orange)" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 3D Globe / Select Area Widget */}
      <div className="glass-panel globe-widget">
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 5 }}>
          <span className="widget-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Compass size={14} /> Location Area
          </span>
        </div>

        <div className="globe-sphere">
          <div className="globe-pin" />
        </div>

        <div style={{ position: 'absolute', bottom: '12px', zIndex: 5, textAlign: 'center', width: '90%' }}>
          <div
            style={{
              background: 'rgba(0,0,0,0.6)',
              padding: '0.3rem 0.75rem',
              borderRadius: '20px',
              border: '1px solid var(--border-glass)',
              fontSize: '0.8rem',
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            <MapPin size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--accent-orange)' }} />
            {location?.displayName || 'Brooklyn, New York, USA'}
          </div>
        </div>
      </div>

      {/* Decorative App Badge / Quote */}
      <div
        style={{
          marginTop: 'auto',
          padding: '1rem',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.4'
        }}
      >
        <p>Real-time forecasts, air quality index, and 7-day atmospheric trends worldwide.</p>
      </div>
    </aside>
  );
}
