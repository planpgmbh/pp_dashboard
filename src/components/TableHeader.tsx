import React from 'react';
import { SortableHeader } from './SortableHeader';
import { SortField, SortDirection } from '../types/harvest';

interface TableHeaderProps {
  sort: {
    field: SortField;
    direction: SortDirection;
  };
  onSort: (field: SortField) => void;
}

export function TableHeader({ sort, onSort }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        <SortableHeader
          label="Date"
          field="spent_date"
          currentSort={sort}
          onSort={onSort}
        />
        <SortableHeader
          label="Description"
          field="notes"
          currentSort={sort}
          onSort={onSort}
        />
        <SortableHeader
          label="Category"
          field="expense_category"
          currentSort={sort}
          onSort={onSort}
        />
        <SortableHeader
          label="Project"
          field="project"
          currentSort={sort}
          onSort={onSort}
        />
        <SortableHeader
          label="Amount"
          field="total_cost"
          currentSort={sort}
          onSort={onSort}
        />
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Receipt
        </th>
      </tr>
    </thead>
  );
}