import React from 'react';
import { CurrentWeatherData, GeoLocation, WeatherApiResponse } from '../types/weather';
import { getWeatherCondition, formatLocationDateTime } from '../utils/weatherHelpers';
import { WeatherIcon } from './WeatherIcon';
import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Clock,
  Globe,
  MapPin,
} from 'lucide-react';

interface CurrentWeatherProps {
  current: CurrentWeatherData;
  location: GeoLocation;
  weatherData: WeatherApiResponse;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  current,
  location,
  weatherData,
}) => {
  const isDay = current.is_day ?? 1;
  const condition = getWeatherCondition(current.weather_code, isDay);
  const { formattedDate, formattedTime, timezoneLabel } = formatLocationDateTime(
    current.time,
    weatherData.timezone,
    weatherData.timezone_abbreviation
  );

  const regionAndCountry = [location.admin1, location.country].filter(Boolean).join(', ');

  return (
    <div
      id="current-weather-card"
      className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow transition-shadow relative overflow-hidden h-full flex flex-col justify-between"
    >
      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        {/* Location header */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-teal-700" />
              Current Conditions
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium text-slate-700">{formattedTime}</span>
            </div>
          </div>

          <h2 id="current-location-name" className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {location.name}
          </h2>
          {regionAndCountry && (
            <p id="current-location-region" className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              {regionAndCountry}
            </p>
          )}
        </div>

        {/* Temperature & Condition hero */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-4 border-y border-slate-100">
          <div className="flex items-baseline gap-1.5">
            <span id="current-temperature-val" className="text-6xl sm:text-7xl font-extrabold text-slate-900 tracking-tight">
              {Math.round(current.temperature_2m)}
            </span>
            <span className="text-3xl sm:text-4xl font-bold text-teal-700">°C</span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-teal-700 shadow-2xs">
              <WeatherIcon name={condition.iconName} className="w-8 h-8" />
            </div>
            <div>
              <p id="current-weather-condition-label" className="text-lg sm:text-xl font-bold text-slate-800">
                {condition.label}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                <Thermometer className="w-3.5 h-3.5 text-slate-400" />
                <span>Feels like</span>
                <strong className="text-slate-800 font-semibold">{Math.round(current.apparent_temperature)}°C</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-100/80 text-teal-800">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500">Humidity</p>
              <p id="current-humidity-val" className="text-base font-bold text-slate-800">
                {current.relative_humidity_2m}%
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-200/70 text-slate-700">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500">Wind Speed</p>
              <p id="current-wind-val" className="text-base font-bold text-slate-800">
                {current.wind_speed_10m} <span className="text-xs font-normal text-slate-500">km/h</span>
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 col-span-2 sm:col-span-1">
            <div className="p-2 rounded-lg bg-blue-100/80 text-blue-800">
              <CloudRain className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500">Precipitation</p>
              <p id="current-precip-val" className="text-base font-bold text-slate-800">
                {current.precipitation} <span className="text-xs font-normal text-slate-500">mm</span>
              </p>
            </div>
          </div>
        </div>

        {/* Date & Timezone Footer */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500">
          <span>{formattedDate}</span>
          <span className="font-mono text-[11px] text-slate-400">{timezoneLabel}</span>
        </div>
      </div>
    </div>
  );
};
