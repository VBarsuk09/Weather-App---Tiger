import React from 'react';
import { CloudSun, Sparkles, ExternalLink } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-teal-950/60 shadow-md">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-teal-700/40">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-950/40 ring-2 ring-white/20">
              <CloudSun className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Weather Intelligence
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-200 border border-teal-400/40">
                  <Sparkles className="w-3 h-3" /> Live
                </span>
              </div>
              <p className="text-xs sm:text-sm text-teal-100/80 mt-0.5 font-normal">
                Precision forecasts and deterministic planning intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-teal-100/80">
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-950/50 hover:bg-teal-950 text-teal-100 transition-colors border border-teal-700/50 hover:text-white"
              title="Open-Meteo Public Weather API"
            >
              <span>Data by Open-Meteo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="px-2.5 py-1 rounded-lg bg-teal-900/60 border border-teal-600/40 text-teal-200 font-mono text-xs font-medium">
              Metric: °C • km/h
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
