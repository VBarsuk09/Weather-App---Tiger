import React from 'react';
import { AlertCircle, RefreshCw, MapPin, SearchX, WifiOff } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
  errorType?: 'not_found' | 'network' | 'validation' | 'generic';
  onRetry: () => void;
  onQuickSearch: (city: string) => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  errorType = 'generic',
  onRetry,
  onQuickSearch,
}) => {
  const isNotFound = errorType === 'not_found' || error.toLowerCase().includes('not found');
  const isNetwork = errorType === 'network' || error.toLowerCase().includes('network') || error.toLowerCase().includes('connection');

  return (
    <div
      id="error-state-card"
      className="max-w-2xl mx-auto my-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden"
    >
      <div className="w-14 h-14 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
        {isNotFound ? (
          <SearchX className="w-7 h-7" />
        ) : isNetwork ? (
          <WifiOff className="w-7 h-7" />
        ) : (
          <AlertCircle className="w-7 h-7" />
        )}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        {isNotFound ? 'City Not Found' : isNetwork ? 'Network Connection Issue' : 'Unable to Retrieve Weather'}
      </h3>

      <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
        {error}
      </p>

      {isNotFound ? (
        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200 text-xs text-slate-600 text-left space-y-1.5">
          <p className="font-semibold text-slate-800">Search tips:</p>
          <ul className="list-disc list-inside space-y-0.5 text-slate-500">
            <li>Check for spelling errors (e.g. "Paris", "San Francisco").</li>
            <li>Try searching with country or major regional names.</li>
            <li>Use the quick search shortcuts below.</li>
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          id="retry-search-btn"
          type="button"
          onClick={onRetry}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg text-sm transition-colors shadow-xs"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <button
          id="reset-chennai-btn"
          type="button"
          onClick={() => onQuickSearch('Chennai')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-sm transition-colors border border-slate-200"
        >
          <MapPin className="w-4 h-4 text-teal-700" />
          <span>Reset to Chennai</span>
        </button>
      </div>
    </div>
  );
};
