import React from 'react';

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ id: number; name: string; code?: string }>;
  placeholder: string;
  disabled?: boolean;
}

export function FilterSelect({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder,
  disabled = false 
}: FilterSelectProps) {
  // Create a Set of IDs to track duplicates
  const seenIds = new Set<number>();
  
  // Filter out duplicates and create unique options
  const uniqueOptions = options.filter(option => {
    if (seenIds.has(option.id)) {
      return false;
    }
    seenIds.add(option.id);
    return true;
  });

  return (
    <div className="flex items-center gap-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        aria-label={label}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {uniqueOptions.map((option) => (
          <option key={`${option.id}-${option.name}`} value={option.id}>
            {option.code ? `${option.name} (${option.code})` : option.name}
          </option>
        ))}
      </select>
    </div>
  );
}