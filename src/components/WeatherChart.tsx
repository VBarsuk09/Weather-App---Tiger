import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { DailyWeatherData } from '../types/weather';
import { format, parseISO } from 'date-fns';
import { TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeatherChartProps {
  daily: DailyWeatherData;
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ daily }) => {
  const labels = daily.time.map((t, idx) => {
    try {
      const parsed = parseISO(t);
      if (idx === 0) return 'Today';
      return format(parsed, 'EEE, d');
    } catch {
      return t;
    }
  });

  const maxTemps = daily.temperature_2m_max;
  const minTemps = daily.temperature_2m_min;

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: maxTemps,
        borderColor: '#0f766e', // teal-700
        backgroundColor: 'rgba(15, 118, 110, 0.10)',
        pointBackgroundColor: '#0f766e',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
        fill: true,
      },
      {
        label: 'Min Temp (°C)',
        data: minTemps,
        borderColor: '#0284c7', // sky-600
        backgroundColor: 'rgba(2, 132, 199, 0.08)',
        pointBackgroundColor: '#0284c7',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          padding: 16,
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 12,
            weight: 600,
          },
          color: '#334155', // slate-700
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 13,
          weight: 700,
        },
        bodyFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 12,
          weight: 500,
        },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return ` ${label.split(' ')[0]}: ${Math.round(value)}°C`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 11,
            weight: 500,
          },
          color: '#64748b',
        },
      },
      y: {
        border: {
          dash: [4, 4],
        },
        grid: {
          color: '#e2e8f0',
        },
        ticks: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 11,
            weight: 500,
          },
          color: '#64748b',
          callback: (value) => `${value}°C`,
        },
      },
    },
  };

  return (
    <div
      id="temperature-chart-card"
      className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow transition-shadow h-full flex flex-col justify-between"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-100/80 text-teal-800">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">7-Day Temperature Comparison</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Daily maximum & minimum thermal trajectories
          </p>
        </div>
      </div>

      <div className="w-full h-64 sm:h-72">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};
