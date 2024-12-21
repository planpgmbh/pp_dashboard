import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onUpdate: () => void;
}

export function DateRangeSelector({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onUpdate,
}: DateRangeSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end mb-6">
      <div className="flex-1">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <div className="relative">
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
          />
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div className="flex-1">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <div className="relative">
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
          />
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <button
        onClick={onUpdate}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Update
      </button>
    </div>
  );
}