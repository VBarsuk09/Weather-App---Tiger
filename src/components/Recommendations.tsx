import React from 'react';
import { WeatherRecommendation } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { ShieldCheck, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface RecommendationsProps {
  recommendations: WeatherRecommendation[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  const getTypeBadge = (type: WeatherRecommendation['type']) => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          label: 'Advisory',
        };
      case 'favorable':
        return {
          bg: 'bg-teal-500/15 text-teal-300 border-teal-400/30',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          label: 'Opportunity',
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-500/15 text-blue-300 border-blue-400/30',
          icon: <Info className="w-3.5 h-3.5" />,
          label: 'Insight',
        };
    }
  };

  return (
    <div
      id="planning-recommendations-panel"
      className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md border border-slate-800 relative overflow-hidden"
    >
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-white">
                Planning Intelligence
              </h3>
              <p className="text-xs text-slate-400 font-normal">
                Deterministic rule-based recommendations for outdoor activities
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-800 text-teal-300 border border-slate-700 hidden sm:inline-block">
            Engine: Deterministic
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          {recommendations.map((rec, index) => {
            const badge = getTypeBadge(rec.type);
            return (
              <div
                key={rec.id || index}
                id={`recommendation-card-${index}`}
                className="rounded-xl p-4 bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 flex flex-col justify-between transition-colors shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${badge.bg}`}
                    >
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-slate-700/60 flex items-center justify-center text-teal-300">
                      <WeatherIcon name={rec.iconName} className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {rec.message}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="text-slate-300">{rec.category}</span>
                  <span className="font-mono text-[10px] text-slate-500">RULE #{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
