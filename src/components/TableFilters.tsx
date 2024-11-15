import React from 'react';
import { Filter } from 'lucide-react';
import { Stock } from '../types';

interface TableFiltersProps {
  stocks: Stock[];
  selectedSector: string;
  selectedCountry: string;
  onSectorChange: (sector: string) => void;
  onCountryChange: (country: string) => void;
}

export const TableFilters = ({
  stocks,
  selectedSector,
  selectedCountry,
  onSectorChange,
  onCountryChange,
}: TableFiltersProps) => {
  const sectors = Array.from(new Set(stocks.map(stock => stock.sector))).sort();
  const countries = Array.from(new Set(stocks.map(stock => stock.country))).sort();

  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="sector" className="text-sm text-gray-600">
              Sector:
            </label>
            <select
              id="sector"
              value={selectedSector}
              onChange={(e) => onSectorChange(e.target.value)}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Sectors</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="country" className="text-sm text-gray-600">
              Country:
            </label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};