import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div id="loading-state-container" className="space-y-8 animate-pulse">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 rounded-xl bg-teal-100/80 flex items-center justify-center text-teal-700 mb-3 shadow-2xs">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Retrieving Meteorological Intelligence...</h3>
        <p className="text-xs text-slate-500 mt-1">Connecting to Open-Meteo geocoding & forecast engines</p>
      </div>

      {/* Current weather & chart skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 h-80 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-8 w-48 bg-slate-200 rounded" />
            <div className="h-4 w-32 bg-slate-100 rounded" />
          </div>
          <div className="h-16 w-36 bg-slate-200 rounded" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 bg-slate-100 rounded-lg" />
            <div className="h-12 bg-slate-100 rounded-lg" />
            <div className="h-12 bg-slate-100 rounded-lg" />
          </div>
        </div>

        <div className="lg:col-span-7 h-80 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div className="h-6 w-48 bg-slate-200 rounded" />
          <div className="h-48 w-full bg-slate-100 rounded-xl" />
        </div>
      </div>

      {/* 7-day skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-44 bg-white rounded-xl border border-slate-200 p-3.5 space-y-3">
            <div className="h-4 w-12 mx-auto bg-slate-200 rounded" />
            <div className="h-8 w-8 mx-auto bg-slate-100 rounded-full" />
            <div className="h-4 w-16 mx-auto bg-slate-200 rounded" />
            <div className="h-3 w-12 mx-auto bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
