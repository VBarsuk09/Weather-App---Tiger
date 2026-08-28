# Weather Intelligence

A modern, responsive, and high-performance meteorological intelligence web application. Built with React, TypeScript, Tailwind CSS, and Chart.js, powered exclusively by the free and public **Open-Meteo APIs**.

---

## 🌟 Application Overview

**Weather Intelligence** provides users with immediate, accurate atmospheric data and deterministic planning insights for any city worldwide. With zero external API keys, authentication, or paid third-party dependencies, the application delivers real-time weather analytics, interactive 7-day temperature trends, comprehensive daily forecasts, and rule-based planning recommendations.

---

## ✨ Features

- **Global City Search**: Accessible search form with instant geocoding resolution for any global location.
- **Quick-Search Shortcuts**: One-click quick search buttons for **Chennai** and **London**, with Chennai automatically loaded on startup.
- **Current Meteorological Overview**:
  - City name, administrative region/state, and country
  - Real-time temperature (°C) and apparent / "feels like" temperature (°C)
  - WMO (World Meteorological Organization) weather interpretation code with intuitive icons & status badges
  - Relative humidity percentage (%)
  - Wind speed (km/h)
  - Current precipitation (mm)
  - Localized date, time, and timezone information
- **7-Day Meteorological Forecast**:
  - Daily outlook cards for each of the next 7 days
  - Day and formatted calendar date
  - WMO weather condition with custom icons
  - Maximum and minimum daily temperatures
  - Maximum precipitation probability (%)
  - Maximum wind speed (km/h)
- **7-Day Interactive Temperature Chart**:
  - High-contrast visual comparison of daily maximum and minimum temperatures
  - Powered by Chart.js with responsive scaling across mobile, tablet, and desktop screens
  - Custom tooltips and subtle gradient area fills
- **Deterministic Planning Intelligence**:
  - Rule-based decision engine generating 3 personalized planning recommendations without AI APIs
  - Deterministic rules for umbrella/rain preparedness, hydration/heat advisories, thermal layers/cold conditions, high wind cautions, and optimal outdoor activity windows
- **Comprehensive State & Error Handling**:
  - Animated loading skeletons during data fetches
  - Inline input validation for empty or invalid searches
  - Friendly "City Not Found" card with troubleshooting tips
  - Network error detection with automatic retry capabilities
- **Modern & Accessible UI**:
  - Refined blue, teal, and white weather-inspired color palette
  - High color contrast meeting WCAG AA standards
  - Fully keyboard-navigable and screen-reader accessible with semantic HTML and unique `id` attributes
  - Seamless responsive design optimized for mobile, tablet, and ultra-wide displays

---

## 🌐 Open-Meteo Endpoints Used

All weather and location data is fetched directly on the client side using the free, public Open-Meteo APIs:

1. **Geocoding API**:
   ```
   https://geocoding-api.open-meteo.com/v1/search?name={cityName}&count=1&language=en&format=json
   ```
   *Converts city search strings into precise latitude, longitude, country, region, and timezone coordinates.*

2. **Forecast Weather API**:
   ```
   https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max&timezone=auto
   ```
   *Retrieves metric (°C, km/h, mm) current conditions and 7-day daily forecast statistics.*

---

## 🛠️ Local Installation & Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Step-by-Step Instructions

1. **Clone or Download the Repository**:
   ```bash
   git clone <repository-url>
   cd weather-intelligence
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:3000` (or `http://localhost:5173`).*

4. **Build for Production**:
   ```bash
   npm run build
   ```
   *Compiles TypeScript and bundles static assets into the deployable `dist/` directory.*

---

## 🔗 Google AI Studio to GitHub Connection

To push this application to your GitHub repository directly from Google AI Studio:

1. In the Google AI Studio application editor, open the **Project Settings** or top-right menu.
2. Select **Export to GitHub** (or **Connect to GitHub**).
3. Authenticate with your GitHub account when prompted.
4. Choose whether to create a new repository or link to an existing repository.
5. Commit and push the branch. All application source files, configurations, and public assets will sync to your repository.

---

## 🚀 Cloudflare Pages Deployment

Deploying **Weather Intelligence** to Cloudflare Pages is fast and requires zero server configuration:

1. Log in to your **Cloudflare Dashboard** and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your connected GitHub repository (`weather-intelligence`).
3. Configure the build settings as follows:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Root Directory**: `/` (leave blank or default)
   - **Environment Variables**: *None required (no API keys or secrets).*
4. Click **Save and Deploy**.
5. Once deployment completes, Cloudflare Pages provides a global, CDN-cached URL (e.g., `https://weather-intelligence.pages.dev`).

*Note: The included `public/_redirects` file (`/* /index.html 200`) ensures single-page application (SPA) client-side routing operates smoothly without 404 errors.*

---

## 🧪 Testing Instructions

Verify core functionality with the following test scenarios:

1. **Default Initial Load (Chennai)**:
   - Load the application in your browser.
   - Verify that weather for **Chennai, Tamil Nadu, India** loads automatically.
   - Confirm current temperature, humidity, wind, and the 7-day outlook populate with tropical weather indicators and planning insights (e.g. hydration/rain recommendations).

2. **Quick Search (London)**:
   - Click the **London** quick search chip under the search bar.
   - Verify the location updates to **London, Greater London, United Kingdom**.
   - Observe temperature changes on the 7-day chart and updated recommendation cards.

3. **Custom City Search**:
   - Type `"Tokyo"`, `"Paris"`, or `"Sydney"` into the search box and press **Enter** or click **Get Weather**.
   - Verify geocoding resolves correctly and refreshes the data dashboard.

4. **Invalid City Search**:
   - Type an invalid string (e.g., `"XYZ1234NonExistentCity"`) and click **Get Weather**.
   - Confirm that the friendly **City Not Found** card appears with troubleshooting tips and a **Try Again** button.

5. **Empty Input Validation**:
   - Clear the input field and click **Get Weather**.
   - Confirm that an accessible inline error prompt (`"Please enter a city name to search."`) appears.

6. **Responsive Layout Check**:
   - Resize the viewport to mobile width (375px - 480px).
   - Verify that cards stack into a clean vertical flow, the temperature chart resizes smoothly, and touch targets remain accessible (≥44px).

---

## 🛡️ Responsible-AI Statement

This application is built strictly as a client-side utility using deterministic logic and public open data:
- **No Private or Confidential Data**: No employee data, client information, proprietary telemetry, or confidential records are collected or transmitted.
- **No Paid Google Services or Secrets**: No Gemini APIs, Google Cloud Platform billing, paid service tiers, or proprietary private keys are used or required.
- **Deterministic Transparency**: All planning recommendations are generated using explicit, auditable meteorological thresholds rather than generative language model inference.

---

## 📜 Attribution

Weather data and geocoding services are generously provided by [Open-Meteo](https://open-meteo.com/) under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.
