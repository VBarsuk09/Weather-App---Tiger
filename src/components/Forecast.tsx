import React from 'react';
import { DailyWeatherData } from '../types/weather';
import { getWeatherCondition } from '../utils/weatherHelpers';
import { WeatherIcon } from './WeatherIcon';
import { Calendar, Umbrella, Wind, ArrowUp, ArrowDown } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface ForecastProps {
  daily: DailyWeatherData;
}

export const Forecast: React.FC<ForecastProps> = ({ daily }) => {
  return (
    <section id="seven-day-forecast-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-100/80 text-teal-800">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">7-Day Outlook</h3>
            <p className="text-xs text-slate-500 font-normal">Day-by-day meteorological forecast breakdown</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {daily.time.map((dateStr, index) => {
          let dayName = 'Day';
          let formattedDate = dateStr;
          try {
            const parsed = parseISO(dateStr);
            dayName = index === 0 ? 'Today' : format(parsed, 'EEE');
            formattedDate = format(parsed, 'MMM d');
          } catch {
            // fallback
          }

          const weatherCode = daily.weather_code[index] ?? 0;
          const condition = getWeatherCondition(weatherCode, 1);
          const maxTemp = Math.round(daily.temperature_2m_max[index] ?? 0);
          const minTemp = Math.round(daily.temperature_2m_min[index] ?? 0);
          const rainProb = daily.precipitation_probability_max[index] ?? 0;
          const maxWind = Math.round(daily.wind_speed_10m_max[index] ?? 0);

          const isToday = index === 0;

          return (
            <div
              key={dateStr}
              id={`forecast-card-day-${index}`}
              className={`rounded-xl p-3.5 flex flex-col justify-between transition-all duration-200 border ${
                isToday
                  ? 'bg-teal-50/70 border-teal-500/80 shadow-xs ring-1 ring-teal-500/30'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-2xs hover:shadow-xs'
              }`}
            >
              {/* Header */}
              <div className="text-center pb-2 border-b border-slate-100">
                <div className="flex items-center justify-center gap-1">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isToday ? 'text-teal-800 font-extrabold' : 'text-slate-700'
                    }`}
                  >
                    {dayName}
                  </span>
                  {isToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{formattedDate}</span>
              </div>

              {/* Weather Icon & Condition */}
              <div className="my-3 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-teal-700 mb-1.5 border border-slate-200/60">
                  <WeatherIcon name={condition.iconName} className="w-5 h-5" />
                </div>
                <span
                  className="text-xs font-semibold text-slate-700 leading-tight line-clamp-1"
                  title={condition.label}
                >
                  {condition.label}
                </span>
              </div>

              {/* High & Low Temp */}
              <div className="flex items-center justify-center gap-2 py-1.5 px-1 bg-slate-100/70 rounded-lg mb-2.5">
                <div className="flex items-center text-slate-900 font-bold text-xs">
                  <ArrowUp className="w-3 h-3 text-rose-500 mr-0.5" />
                  <span>{maxTemp}°</span>
                </div>
                <div className="flex items-center text-slate-500 font-medium text-xs">
                  <ArrowDown className="w-3 h-3 text-teal-600 mr-0.5" />
                  <span>{minTemp}°</span>
                </div>
              </div>

              {/* Rain prob & Wind speed metrics */}
              <div className="space-y-1 pt-2 border-t border-slate-100 text-[11px]">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Umbrella className="w-3 h-3 text-blue-600" />
                    <span>Rain</span>
                  </span>
                  <span className={`font-semibold ${rainProb > 40 ? 'text-blue-700' : 'text-slate-700'}`}>
                    {rainProb}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Wind className="w-3 h-3 text-slate-500" />
                    <span>Wind</span>
                  </span>
                  <span className="font-semibold text-slate-700">{maxWind} <span className="text-[9px] font-normal text-slate-400">km/h</span></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
