import React from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  Snowflake,
  CloudLightning
} from 'lucide-react';

const iconMap = {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  Snowflake,
  CloudLightning
};

export default function WeatherIcon({ name, size = 28, className = '' }) {
  const IconComponent = iconMap[name] || CloudSun;
  return <IconComponent size={size} className={className} />;
}
