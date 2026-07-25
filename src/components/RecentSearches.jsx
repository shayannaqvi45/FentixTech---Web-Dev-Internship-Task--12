import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

export default function RecentSearches({ recents, onSelectRecent }) {
  if (!recents || recents.length === 0) return null;

  return (
    <section className="recent-searches-section">
      <div className="section-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Clock size={16} color="var(--text-muted)" /> Recently Searched
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
          See All <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </span>
      </div>

      <div className="recent-cards-row">
        {recents.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel recent-card"
            onClick={() =>
              onSelectRecent({
                name: item.name.split(',')[0],
                country: item.name.split(',')[1] || '',
                displayName: item.name,
                latitude: item.lat,
                longitude: item.lon
              })
            }
          >
            <div>
              <div className="recent-card-city">{item.name}</div>
              <div className="recent-card-desc">{item.condition}</div>
            </div>
            <div className="recent-card-temp">{item.temp}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
