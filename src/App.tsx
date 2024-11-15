import React, { useState, useMemo } from 'react';
import { TableHeader } from './components/TableHeader';
import { TableFilters } from './components/TableFilters';
import { StockRow } from './components/StockRow';
import { SectorPieChart } from './components/SectorPieChart';
import { CountryPieChart } from './components/CountryPieChart';
import { stocks as initialStocks } from './data/stocks';
import { Stock } from './types';

function App() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleUpdatePortfolio = (stockName: string, newValue: number) => {
    setStocks(currentStocks =>
      currentStocks.map(stock =>
        stock.name === stockName
          ? { ...stock, portfolio1: newValue }
          : stock
      )
    );
  };

  const filteredStocks = useMemo(() => {
    return stocks.filter(stock => {
      const matchesSector = !selectedSector || stock.sector === selectedSector;
      const matchesCountry = !selectedCountry || stock.country === selectedCountry;
      return matchesSector && matchesCountry;
    });
  }, [stocks, selectedSector, selectedCountry]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <TableHeader />
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectorPieChart 
              stocks={stocks} 
              portfolioKey="portfolio1" 
              title="Portfolio 1 Sector Distribution" 
            />
            <SectorPieChart 
              stocks={stocks} 
              portfolioKey="portfolio2" 
              title="Portfolio 2 Sector Distribution" 
            />
            <CountryPieChart 
              stocks={stocks} 
              portfolioKey="portfolio1" 
              title="Portfolio 1 Country Distribution" 
            />
            <CountryPieChart 
              stocks={stocks} 
              portfolioKey="portfolio2" 
              title="Portfolio 2 Country Distribution" 
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <TableFilters
            stocks={stocks}
            selectedSector={selectedSector}
            selectedCountry={selectedCountry}
            onSectorChange={setSelectedSector}
            onCountryChange={setSelectedCountry}
          />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sector
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Portfolio 1
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Portfolio 2
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStocks.map((stock) => (
                  <StockRow 
                    key={stock.name} 
                    stock={stock} 
                    onUpdatePortfolio={handleUpdatePortfolio}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {filteredStocks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No stocks match the selected filters
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          Data is for demonstration purposes only
        </div>
      </div>
    </div>
  );
}

export default App;