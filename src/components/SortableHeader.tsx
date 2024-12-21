import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortField, SortDirection } from '../types/harvest';

interface SortableHeaderProps {
  label: string;
  field: SortField;
  currentSort: {
    field: SortField;
    direction: SortDirection;
  };
  onSort: (field: SortField) => void;
}

export function SortableHeader({ label, field, currentSort, onSort }: SortableHeaderProps) {
  const isActive = currentSort.field === field;

  return (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        <span className="inline-block w-4">
          {isActive ? (
            currentSort.direction === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="h-4 w-4 opacity-50" />
          )}
        </span>
      </div>
    </th>
  );
}