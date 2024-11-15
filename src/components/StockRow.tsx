import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Stock } from '../types';

interface StockRowProps {
  stock: Stock;
  onUpdatePortfolio: (stockName: string, value: number) => void;
}

export const StockRow = ({ stock, onUpdatePortfolio }: StockRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(stock.portfolio1.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newValue = parseInt(editValue, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      onUpdatePortfolio(stock.name, newValue);
      setIsEditing(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{stock.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {stock.sector}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
          {stock.country}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
        {stock.price}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
        stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
      }`}>
        {stock.change}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end space-x-2">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-20 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                autoFocus
                onBlur={() => setIsEditing(false)}
              />
            </form>
          ) : (
            <>
              <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {stock.portfolio1}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <span className="text-sm font-medium bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
          {stock.portfolio2}
        </span>
      </td>
    </tr>
  );
};