import { WeatherConditionInfo, WeatherRecommendation, CurrentWeatherData, DailyWeatherData } from '../types/weather';
import { format, parseISO } from 'date-fns';

/**
 * Maps WMO weather interpretation codes to user-friendly labels and icons.
 * Reference: Open-Meteo & WMO Weather interpretation codes
 */
export const getWeatherCondition = (code: number, isDay: number = 1): WeatherConditionInfo => {
  switch (code) {
    case 0:
      return {
        label: isDay ? 'Clear Sky' : 'Clear Night',
        description: 'Bright and clear conditions with no cloud cover',
        iconName: isDay ? 'Sun' : 'Moon',
        category: 'clear',
      };
    case 1:
      return {
        label: isDay ? 'Mainly Clear' : 'Mainly Clear Night',
        description: 'Mostly clear with minimal scattered clouds',
        iconName: isDay ? 'SunMedium' : 'MoonStar',
        category: 'clear',
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        description: 'Scattered clouds with periods of sunshine',
        iconName: isDay ? 'CloudSun' : 'CloudMoon',
        category: 'cloudy',
      };
    case 3:
      return {
        label: 'Overcast',
        description: 'Dense cloud cover across the entire sky',
        iconName: 'Cloud',
        category: 'cloudy',
      };
    case 45:
      return {
        label: 'Foggy',
        description: 'Reduced visibility due to ground-level fog',
        iconName: 'CloudFog',
        category: 'fog',
      };
    case 48:
      return {
        label: 'Depositing Rime Fog',
        description: 'Icy fog depositing frost on outdoor surfaces',
        iconName: 'CloudFog',
        category: 'fog',
      };
    case 51:
      return {
        label: 'Light Drizzle',
        description: 'Very light precipitation of fine water droplets',
        iconName: 'CloudDrizzle',
        category: 'drizzle',
      };
    case 53:
      return {
        label: 'Moderate Drizzle',
        description: 'Continuous light to moderate fine rain',
        iconName: 'CloudDrizzle',
        category: 'drizzle',
      };
    case 55:
      return {
        label: 'Dense Drizzle',
        description: 'Heavy drizzle with reduced visibility',
        iconName: 'CloudDrizzle',
        category: 'drizzle',
      };
    case 56:
    case 57:
      return {
        label: 'Freezing Drizzle',
        description: 'Freezing fine rain creating slippery conditions',
        iconName: 'Snowflake',
        category: 'snow',
      };
    case 61:
      return {
        label: 'Slight Rain',
        description: 'Light rainfall with minimal accumulation',
        iconName: 'CloudRain',
        category: 'rain',
      };
    case 63:
      return {
        label: 'Moderate Rain',
        description: 'Steady, regular rainfall',
        iconName: 'CloudRain',
        category: 'rain',
      };
    case 65:
      return {
        label: 'Heavy Rain',
        description: 'Intense rain showers with rapid water accumulation',
        iconName: 'CloudRain',
        category: 'rain',
      };
    case 66:
    case 67:
      return {
        label: 'Freezing Rain',
        description: 'Rain that freezes on contact with the ground',
        iconName: 'CloudSnow',
        category: 'snow',
      };
    case 71:
      return {
        label: 'Slight Snowfall',
        description: 'Light snowflakes falling intermittently',
        iconName: 'Snowflake',
        category: 'snow',
      };
    case 73:
      return {
        label: 'Moderate Snowfall',
        description: 'Steady snow accumulation across surfaces',
        iconName: 'Snowflake',
        category: 'snow',
      };
    case 75:
      return {
        label: 'Heavy Snowfall',
        description: 'Significant snowfall with potential drifts and hazards',
        iconName: 'Snowflake',
        category: 'snow',
      };
    case 77:
      return {
        label: 'Snow Grains',
        description: 'Very small, opaque white grains of ice',
        iconName: 'Snowflake',
        category: 'snow',
      };
    case 80:
      return {
        label: 'Slight Rain Showers',
        description: 'Brief, intermittent light rain showers',
        iconName: 'CloudRain',
        category: 'rain',
      };
    case 81:
      return {
        label: 'Moderate Rain Showers',
        description: 'Passing rain showers with moderate intensity',
        iconName: 'CloudRain',
        category: 'rain',
      };
    case 82:
      return {
        label: 'Violent Rain Showers',
        description: 'Heavy sudden torrential downpours',
        iconName: 'CloudRain',
        category: 'rain',
      };
    case 85:
    case 86:
      return {
        label: 'Snow Showers',
        description: 'Intermittent snow squalls and showers',
        iconName: 'CloudSnow',
        category: 'snow',
      };
    case 95:
      return {
        label: 'Thunderstorm',
        description: 'Thunderstorm with lightning and gusty winds',
        iconName: 'CloudLightning',
        category: 'thunderstorm',
      };
    case 96:
    case 99:
      return {
        label: 'Thunderstorm with Hail',
        description: 'Severe thunderstorm accompanied by hail',
        iconName: 'CloudLightning',
        category: 'thunderstorm',
      };
    default:
      return {
        label: 'Clear / Variable',
        description: 'Typical atmospheric conditions',
        iconName: 'CloudSun',
        category: 'clear',
      };
  }
};

/**
 * Evaluates deterministic weather rules to produce 3 key planning recommendations.
 * No AI APIs or external keys are used.
 */
export const generateDeterministicRecommendations = (
  current: CurrentWeatherData,
  daily: DailyWeatherData
): WeatherRecommendation[] => {
  const recommendations: WeatherRecommendation[] = [];

  const todayMaxTemp = daily.temperature_2m_max[0] ?? current.temperature_2m;
  const todayMinTemp = daily.temperature_2m_min[0] ?? current.temperature_2m;
  const todayRainProb = daily.precipitation_probability_max[0] ?? 0;
  const todayMaxWind = daily.wind_speed_10m_max[0] ?? current.wind_speed_10m;
  const currentPrecip = current.precipitation ?? 0;

  // Rule 1: Rain / Precipitation Alert
  if (todayRainProb >= 50 || currentPrecip > 0.5) {
    recommendations.push({
      id: 'rain-high',
      title: 'Bring an Umbrella & Rain Gear',
      message: `High precipitation probability of ${todayRainProb}% today. Keep rain protection handy to stay dry during commute and errands.`,
      category: 'Precipitation Alert',
      type: 'warning',
      iconName: 'Umbrella',
    });
  } else if (todayRainProb >= 25) {
    recommendations.push({
      id: 'rain-moderate',
      title: 'Pack Compact Rain Cover',
      message: `Isolated showers possible today (${todayRainProb}% probability). Carrying a compact umbrella or jacket is advisable.`,
      category: 'Precipitation Outlook',
      type: 'info',
      iconName: 'Umbrella',
    });
  }

  // Rule 2: High Heat or Cold Weather
  if (todayMaxTemp >= 32 || current.apparent_temperature >= 34) {
    recommendations.push({
      id: 'temp-hot',
      title: 'Plan Hydration and Shade',
      message: `Daytime high reaching ${Math.round(todayMaxTemp)}°C (feels like ${Math.round(current.apparent_temperature)}°C). Drink plenty of water and limit direct sun exposure between 11 AM and 4 PM.`,
      category: 'Thermal Comfort',
      type: 'warning',
      iconName: 'Sun',
    });
  } else if (todayMinTemp <= 10 || current.apparent_temperature <= 8) {
    recommendations.push({
      id: 'temp-cold',
      title: 'Wear Warm Thermal Layers',
      message: `Chilly conditions with lows near ${Math.round(todayMinTemp)}°C. Dress in insulating layers or wear a windbreaker when heading outdoors early or late.`,
      category: 'Thermal Comfort',
      type: 'info',
      iconName: 'Shirt',
    });
  } else if (todayMaxTemp >= 28) {
    recommendations.push({
      id: 'temp-warm',
      title: 'Light Clothing & Sun Protection',
      message: `Warm and pleasant weather with highs around ${Math.round(todayMaxTemp)}°C. Breathable cotton attire and sun protection are recommended.`,
      category: 'Thermal Comfort',
      type: 'info',
      iconName: 'Sun',
    });
  }

  // Rule 3: High Wind Alert
  if (todayMaxWind >= 28 || current.wind_speed_10m >= 25) {
    recommendations.push({
      id: 'wind-high',
      title: 'Secure Outdoor Items & Watch Gusts',
      message: `Breezy conditions with peak gusts reaching ${Math.round(todayMaxWind)} km/h. Secure lightweight balcony or patio furniture and take care while cycling.`,
      category: 'Wind Advisory',
      type: 'warning',
      iconName: 'Wind',
    });
  }

  // Rule 4: Search the 7-day forecast for the best outdoor activity days
  const favorableDayIndices: number[] = [];
  for (let i = 0; i < daily.time.length; i++) {
    const maxT = daily.temperature_2m_max[i];
    const minT = daily.temperature_2m_min[i];
    const rainP = daily.precipitation_probability_max[i];
    const windS = daily.wind_speed_10m_max[i];

    if (rainP <= 20 && maxT >= 18 && maxT <= 30 && minT >= 12 && windS <= 22) {
      favorableDayIndices.push(i);
    }
  }

  if (favorableDayIndices.length > 0) {
    const bestDayNames = favorableDayIndices
      .slice(0, 2)
      .map((idx) => (idx === 0 ? 'Today' : format(parseISO(daily.time[idx]), 'EEEE')))
      .join(' and ');

    recommendations.push({
      id: 'outdoor-ideal',
      title: 'Favorable Outdoor Activity Windows',
      message: `${bestDayNames} offer prime weather conditions with mild temperatures, calm breezes, and minimal rain probability. Excellent for walks, jogging, or outdoor dining.`,
      category: 'Activity Planner',
      type: 'favorable',
      iconName: 'Compass',
    });
  } else {
    // If no perfect day, give a general forecast trend rule
    const minRainDayIdx = daily.precipitation_probability_max.indexOf(
      Math.min(...daily.precipitation_probability_max)
    );
    if (minRainDayIdx !== -1) {
      const bestDayStr =
        minRainDayIdx === 0 ? 'today' : format(parseISO(daily.time[minRainDayIdx]), 'EEEE');
      recommendations.push({
        id: 'forecast-trend',
        title: 'Weekly Activity Window',
        message: `${bestDayStr.charAt(0).toUpperCase() + bestDayStr.slice(1)} features the lowest precipitation probability (${daily.precipitation_probability_max[minRainDayIdx]}%) this week—ideal for scheduling outdoor tasks.`,
        category: 'Weekly Trend',
        type: 'favorable',
        iconName: 'CalendarCheck',
      });
    }
  }

  // Rule 5: Fallback general advice if less than 3 recommendations
  if (recommendations.length < 3) {
    if (current.relative_humidity_2m > 75) {
      recommendations.push({
        id: 'humidity-high',
        title: 'High Ambient Humidity',
        message: `Relative humidity is high at ${current.relative_humidity_2m}%. Ensure good indoor airflow and keep lightweight moisture-wicking fabrics in mind.`,
        category: 'Atmospheric Note',
        type: 'info',
        iconName: 'Droplets',
      });
    } else {
      recommendations.push({
        id: 'stable-conditions',
        title: 'Stable General Weather',
        message: `Current atmospheric pressure and weather patterns indicate consistent conditions. Standard daily planning applies without major disruptions.`,
        category: 'General Outlook',
        type: 'info',
        iconName: 'CheckCircle2',
      });
    }
  }

  // Always return exactly the top 3 high-relevance recommendations
  return recommendations.slice(0, 3);
};

/**
 * Formats a local date and time string using the target timezone or local representation.
 */
export const formatLocationDateTime = (
  timeIsoString: string,
  timezone: string,
  timezoneAbbr?: string
): { formattedDate: string; formattedTime: string; timezoneLabel: string } => {
  try {
    const dateObj = parseISO(timeIsoString);
    const formattedDate = format(dateObj, 'EEEE, MMMM d, yyyy');
    const formattedTime = format(dateObj, 'HH:mm');
    const timezoneLabel = timezoneAbbr ? `${timezone} (${timezoneAbbr})` : timezone;

    return {
      formattedDate,
      formattedTime,
      timezoneLabel,
    };
  } catch {
    const now = new Date();
    return {
      formattedDate: format(now, 'EEEE, MMMM d, yyyy'),
      formattedTime: format(now, 'HH:mm'),
      timezoneLabel: timezone || 'Local Time',
    };
  }
};
