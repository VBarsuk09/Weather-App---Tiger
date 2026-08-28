import React from 'react';
import {
  Sun,
  SunMedium,
  Moon,
  MoonStar,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Snowflake,
  CloudLightning,
  Umbrella,
  Wind,
  Droplets,
  Compass,
  Shirt,
  CalendarCheck,
  CheckCircle2,
  LucideProps,
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  name: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Sun':
      return <Sun {...props} />;
    case 'SunMedium':
      return <SunMedium {...props} />;
    case 'Moon':
      return <Moon {...props} />;
    case 'MoonStar':
      return <MoonStar {...props} />;
    case 'CloudSun':
      return <CloudSun {...props} />;
    case 'CloudMoon':
      return <CloudMoon {...props} />;
    case 'Cloud':
      return <Cloud {...props} />;
    case 'CloudFog':
      return <CloudFog {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...props} />;
    case 'CloudRain':
      return <CloudRain {...props} />;
    case 'CloudSnow':
      return <CloudSnow {...props} />;
    case 'Snowflake':
      return <Snowflake {...props} />;
    case 'CloudLightning':
      return <CloudLightning {...props} />;
    case 'Umbrella':
      return <Umbrella {...props} />;
    case 'Wind':
      return <Wind {...props} />;
    case 'Droplets':
      return <Droplets {...props} />;
    case 'Compass':
      return <Compass {...props} />;
    case 'Shirt':
      return <Shirt {...props} />;
    case 'CalendarCheck':
      return <CalendarCheck {...props} />;
    case 'CheckCircle2':
      return <CheckCircle2 {...props} />;
    default:
      return <CloudSun {...props} />;
  }
};
