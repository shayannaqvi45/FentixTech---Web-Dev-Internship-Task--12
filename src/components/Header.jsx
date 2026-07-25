import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, Loader2 } from 'lucide-react';
import { searchCities } from '../services/weatherApi';

export default function Header({ location, onSelectLocation, onUseCurrentLocation, unit, onToggleUnit }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Debounced search for city suggestions
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const timer = setTimeout(async () => {
      const results = await searchCities(query);
      setSuggestions(results);
      setSearching(false);
      setShowDropdown(true);
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    onSelectLocation(item);
    setQuery('');
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  // Format today date (e.g., Friday, January 4)
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="top-nav">
      {/* Location & Date Title */}
      <div className="location-info">
        <MapPin size={20} color="var(--accent-orange)" />
        <span style={{ fontWeight: 600 }}>{location?.displayName || 'Brooklyn, New York, USA'}</span>
        <span className="location-date">({dateFormatted})</span>
      </div>

      {/* Search Input Bar */}
      <div className="search-box-container" ref={dropdownRef}>
        <div className="search-input-wrapper">
          {searching ? (
            <Loader2 size={18} className="loading-skeleton" color="var(--accent-blue)" />
          ) : (
            <Search size={18} color="var(--text-muted)" />
          )}
          <input
            type="text"
            className="search-input"
            placeholder="Search any city or country worldwide..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Auto-suggestions Dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((item) => (
              <div key={item.id} className="suggestion-item" onClick={() => handleSelect(item)}>
                <MapPin size={16} color="var(--text-muted)" />
                <div>
                  <div style={{ fontWeight: '500' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.displayName}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="action-controls">
        <button
          className="icon-btn"
          title="Use My Current Location"
          onClick={onUseCurrentLocation}
        >
          <Navigation size={18} />
        </button>

        {/* °C / °F Selector Switch */}
        <div className="unit-toggle">
          <button
            className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
            onClick={() => onToggleUnit('C')}
          >
            °C
          </button>
          <button
            className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
            onClick={() => onToggleUnit('F')}
          >
            °F
          </button>
        </div>
      </div>
    </header>
  );
}
