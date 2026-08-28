import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { WeatherChart } from './components/WeatherChart';
import { Recommendations } from './components/Recommendations';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorMessage } from './components/ErrorMessage';
import { GeoLocation, WeatherApiResponse, GeocodingResponse } from './types/weather';
import { generateDeterministicRecommendations } from './utils/weatherHelpers';
import { Sparkles, ExternalLink, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const [currentCityQuery, setCurrentCityQuery] = useState<string>('Chennai');
  const [activeCityName, setActiveCityName] = useState<string>('Chennai');
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'not_found' | 'network' | 'validation' | 'generic'>('generic');

  const fetchWeatherForCity = useCallback(async (cityName: string) => {
    if (!cityName.trim()) {
      setError('Please enter a valid city name.');
      setErrorType('validation');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentCityQuery(cityName);

    try {
      // Step 1: Geocoding via Open-Meteo public Geocoding API
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cityName.trim()
      )}&count=1&language=en&format=json`;

      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) {
        throw new Error(`Geocoding service unavailable (Status ${geoRes.status})`);
      }

      const geoData: GeocodingResponse = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError(`We couldn't find any meteorological station or city named "${cityName}". Please check the spelling or search a major neighboring city.`);
        setErrorType('not_found');
        setIsLoading(false);
        return;
      }

      const topResult = geoData.results[0];
      const selectedLocation: GeoLocation = {
        name: topResult.name,
        latitude: topResult.latitude,
        longitude: topResult.longitude,
        admin1: topResult.admin1,
        admin2: topResult.admin2,
        country: topResult.country,
        country_code: topResult.country_code,
        timezone: topResult.timezone,
      };

      setLocation(selectedLocation);
      setActiveCityName(selectedLocation.name);

      // Step 2: Forecast via Open-Meteo public Weather API
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${topResult.latitude}&longitude=${topResult.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max&timezone=auto`;

      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) {
        throw new Error(`Weather service unavailable (Status ${weatherRes.status})`);
      }

      const weatherJson: WeatherApiResponse = await weatherRes.json();
      setWeatherData(weatherJson);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to retrieve weather data due to a network error. Please verify your internet connection.';
      setError(message);
      setErrorType('network');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load initial city "Chennai" upon opening
  useEffect(() => {
    fetchWeatherForCity('Chennai');
  }, [fetchWeatherForCity]);

  const handleRetry = () => {
    if (currentCityQuery) {
      fetchWeatherForCity(currentCityQuery);
    } else {
      fetchWeatherForCity('Chennai');
    }
  };

  const recommendations =
    weatherData && location
      ? generateDeterministicRecommendations(weatherData.current, weatherData.daily)
      : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-teal-700 selection:text-white">
      {/* Top Banner & Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Search Bar */}
        <SearchBar
          onSearch={fetchWeatherForCity}
          isLoading={isLoading}
          activeCityName={activeCityName}
        />

        {/* Dynamic State Rendering */}
        <div className="mt-8">
          {isLoading && <LoadingSkeleton />}

          {!isLoading && error && (
            <ErrorMessage
              error={error}
              errorType={errorType}
              onRetry={handleRetry}
              onQuickSearch={fetchWeatherForCity}
            />
          )}

          {!isLoading && !error && weatherData && location && (
            <div id="weather-results-dashboard" className="space-y-8 animate-fadeIn">
              {/* Top Overview: Current Weather & Temperature Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-5 flex flex-col">
                  <CurrentWeather
                    current={weatherData.current}
                    location={location}
                    weatherData={weatherData}
                  />
                </div>

                <div className="lg:col-span-7 flex flex-col">
                  <WeatherChart daily={weatherData.daily} />
                </div>
              </div>

              {/* Deterministic Planning Recommendations */}
              <Recommendations recommendations={recommendations} />

              {/* 7-Day Outlook Forecast Grid */}
              <Forecast daily={weatherData.daily} />

              {/* Meteorological Highlights Bar */}
              <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span>
                    <strong>Coordinates:</strong> {location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E • <strong>Elevation:</strong> {weatherData.elevation}m ASL
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => fetchWeatherForCity(location.name)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-teal-50 text-teal-800 font-medium border border-slate-200 hover:border-teal-300 shadow-2xs transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Now</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer & Visible Open-Meteo Attribution */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Weather Intelligence</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">Deterministic Forecast System</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600">
            <span>Weather data provided by</span>
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-teal-700 hover:text-teal-800 underline inline-flex items-center gap-1"
            >
              <span>Open-Meteo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-slate-400">
            Open-source Free API • No Keys Required
          </div>
        </div>
      </footer>
    </div>
  );
}
