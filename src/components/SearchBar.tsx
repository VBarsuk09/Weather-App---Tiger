import React, { useState } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (cityName: string) => void;
  isLoading: boolean;
  activeCityName?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  activeCityName = 'Chennai',
}) => {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setValidationError('Please enter a city name to search.');
      return;
    }
    setValidationError(null);
    onSearch(trimmed);
  };

  const handleQuickClick = (city: string) => {
    setQuery('');
    setValidationError(null);
    onSearch(city);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleClear = () => {
    setQuery('');
    setValidationError(null);
  };

  return (
    <div id="search-section" className="w-full max-w-3xl mx-auto -mt-8 relative z-20 px-4 sm:px-0">
      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg shadow-slate-900/10 border border-slate-200">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1 flex items-center">
            <div className="absolute left-4 text-slate-400 pointer-events-none">
              <Search className="w-5 h-5" />
            </div>
            <label htmlFor="city-search-input" className="sr-only">
              Search city name
            </label>
            <input
              id="city-search-input"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Enter city (e.g. Chennai, London, Tokyo, New York)..."
              disabled={isLoading}
              className="w-full pl-12 pr-10 py-3 sm:py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 placeholder-slate-400 rounded-lg sm:rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-3 focus:ring-teal-700/15 text-sm sm:text-base outline-none transition-all"
            />
            {query && !isLoading && (
              <button
                id="clear-search-btn"
                type="button"
                onClick={handleClear}
                aria-label="Clear input"
                className="absolute right-3.5 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            id="submit-search-btn"
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 sm:py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm sm:text-base rounded-lg sm:rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Get Weather</span>
              </>
            )}
          </button>
        </form>

        {validationError && (
          <p id="search-validation-error" className="mt-2 px-2 text-xs font-medium text-rose-600 animate-fadeIn">
            {validationError}
          </p>
        )}

        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            <span>Quick search:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Chennai', 'London'].map((city) => {
              const isActive = activeCityName.toLowerCase() === city.toLowerCase();
              return (
                <button
                  key={city}
                  id={`quick-search-${city.toLowerCase()}`}
                  type="button"
                  onClick={() => handleQuickClick(city)}
                  disabled={isLoading}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 ring-1 ring-teal-300 font-semibold shadow-xs'
                      : 'bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200/80 hover:border-teal-200'
                  }`}
                >
                  <MapPin className={`w-3 h-3 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                  <span>{city}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
