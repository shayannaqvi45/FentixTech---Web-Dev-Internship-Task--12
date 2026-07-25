import React from 'react';
import { useWeather } from './hooks/useWeather';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HeroWeather from './components/HeroWeather';
import ForecastChart from './components/ForecastChart';
import RecentSearches from './components/RecentSearches';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorMessage from './components/ErrorMessage';

export default function App() {
  const {
    location,
    weather,
    loading,
    error,
    unit,
    toggleUnit,
    recentSearches,
    selectLocation,
    handleUseCurrentLocation,
    reload
  } = useWeather();

  return (
    <div className="app-container">
      {/* Dynamic Ambient Glow Overlay */}
      <div className="cloud-backdrop" />

      {/* Left Sidebar */}
      <Sidebar weather={weather} location={location} />

      {/* Main Weather Dashboard */}
      <main className="main-content">
        <Header
          location={location}
          onSelectLocation={selectLocation}
          onUseCurrentLocation={handleUseCurrentLocation}
          unit={unit}
          onToggleUnit={toggleUnit}
        />

        {error && <ErrorMessage message={error} onRetry={reload} />}

        {loading ? (
          <LoadingSkeleton />
        ) : (
          weather && (
            <>
              {/* Top Row: Hero Main Temp & Recent Searches */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(280px, 340px)', gap: '2rem' }}>
                <HeroWeather weather={weather} unit={unit} />
                <RecentSearches recents={recentSearches} onSelectRecent={selectLocation} />
              </div>

              {/* Forecast Wave Chart */}
              <ForecastChart forecast={weather.forecast} unit={unit} />
            </>
          )
        )}
      </main>
    </div>
  );
}
