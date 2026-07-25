# WeatherWise — Responsive React Weather Application 🌤️

A modern, high-performance Weather Application built with **React.js** and **Vite**, featuring a dark glassmorphic design inspired by premium UI/UX standards. WeatherWise allows users to search for any city globally, view real-time atmospheric metrics, examine 7-day temperature trends on an interactive SVG wave graph, monitor Air Quality Index (AQI), and toggle between Celsius and Fahrenheit seamlessly.

![WeatherWise Interface](https://raw.githubusercontent.com/placeholder/weatherwise-preview.png)

---

## 🚀 Live Demo & Repository

- **Live Demo**: [Deploy to Vercel/Netlify](celadon-melomakarona-2cec58.netlify.app) 
- **GitHub Repository**: [GitHub Link]([https://github.com/your-username/weatherwise-react](https://github.com/shayannaqvi45/FentixTech---Web-Dev-Internship-Task--12.git))

---

## ✨ Features

- 🔍 **City Search with Auto-Complete**: Search any city or country worldwide with debounced location suggestions.
- 📍 **Browser Geolocation**: One-click "My Location" button to automatically retrieve weather for your current position via reverse geocoding.
- 🌡️ **Real-Time Weather Metrics**:
  - Current Temperature & High / Low Range
  - Weather Description & Condition Icons
  - "Feels Like" Temperature
  - Humidity Percentage
  - Wind Speed (km/h & mph)
  - UV Index (0–11 scale)
  - Surface Atmospheric Pressure (hPa)
- 📈 **Interactive 7-Day SVG Temperature Wave Curve**: Animated smooth Bezier curve graph visualizing daily high and low trends across the week.
- 🍃 **Air Quality Index (AQI)**: Real-time AQI badge indicator (Good, Moderate, Unhealthy).
- 🕒 **Recent Search Quick-Switch Cards**: Save recent city searches to local storage for one-tap switching.
- 🔄 **Dynamic Unit Converter**: Instant toggle between Celsius (°C) and Fahrenheit (°F) with persistent preferences.
- 🎨 **Dark Glassmorphic UI/UX**: Custom CSS design system with backdrop blurs, glow effects, floating globe visualization, and ambient cloud backdrops.
- 📱 **Fully Responsive**: Optimized for desktop monitors, tablets, and mobile smartphones.
- ⚡ **Robust Error & Loading States**: Skeleton placeholders during data fetching and informative error cards for invalid search queries.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (Hooks, Custom Hooks, State Management) |
| **Build Tool** | Vite |
| **Icons** | Lucide React |
| **Styling** | Custom Vanilla CSS (Glassmorphism, Flexbox/Grid, HSL Variables, Keyframe Animations) |
| **APIs** | Open-Meteo Weather API & Open-Meteo Geocoding (Free, 0-key configuration) |

---

## 📁 Project Component Structure

```
task 12/
├── index.html                  # HTML entry point & Google Fonts (Outfit, Inter)
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
├── README.md                   # Project documentation
└── src/
    ├── main.jsx                # React app mounting
    ├── index.css               # Master design system & CSS variables
    ├── App.jsx                 # Main layout & component assembly
    ├── hooks/
    │   └── useWeather.js       # Custom state management & data fetching hook
    ├── services/
    │   └── weatherApi.js       # Open-Meteo API integrations & WMO weather code interpreter
    └── components/
        ├── Header.jsx          # Location display, auto-complete search bar & unit toggle
        ├── Sidebar.jsx         # Branding, AQI status card & globe visualizer
        ├── HeroWeather.jsx     # Main temperature display & metrics grid
        ├── ForecastChart.jsx   # Interactive SVG Bezier wave chart & 7-day forecast
        ├── RecentSearches.jsx  # Horizontal cards for recent city history
        ├── WeatherIcon.jsx     # Lucide icon mapper component
        ├── LoadingSkeleton.jsx # Skeleton loader fallback
        └── ErrorMessage.jsx    # Error alert component with retry option
```

---

## 💻 Local Setup & Installation

Follow these steps to run the application locally on your machine:

### Prerequisites
- Node.js (version 16.0 or higher)
- npm or yarn

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/weatherwise-react.git
   cd weatherwise-react
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173` to view the application live.

---

## 🚢 Production Build & Deployment

### Build for Production
```bash
npm run build
```
This generates a production-ready `dist/` bundle optimized for deployment.

### Deploying to Netlify
1. Log in to [Netlify](celadon-melomakarona-2cec58.netlify.app).
2. Drag and drop the `dist/` directory or connect your GitHub repository.
3. Set build command to `npm run build` and publish directory to `dist`.

---

## ⚖️ Evaluation Criteria Check

- ✅ **React Component Structure & Reusability**: Modular components (`Header`, `Sidebar`, `HeroWeather`, `ForecastChart`, `RecentSearches`, `WeatherIcon`).
- ✅ **API Integration**: Asynchronous fetch handling using Open-Meteo Geocoding, Forecast, and Air Quality endpoints.
- ✅ **State Management**: Clean state management via custom `useWeather` hook with `localStorage` persistence.
- ✅ **Responsive Design**: Mobile-first breakpoints and glassmorphic scaling.
- ✅ **Error Handling**: Graceful fallback UI for network errors or unmapped locations.
- ✅ **UI/UX**: Premium aesthetic matching modern dark-mode glassmorphic designs.

---

## 📜 License

Distributed under the MIT License.
