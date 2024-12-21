import React, { useState, useMemo } from 'react';
import { HarvestExpense, SortField, SortDirection } from '../types/harvest';
import { ExpenseRow } from './ExpenseRow';
import { TableHeader } from './TableHeader';
import { formatAmount } from '../utils/formatters';
import { sortExpenses } from '../utils/sorting';

interface ExpensesTableProps {
  expenses: HarvestExpense[];
}

export function ExpensesTable({ expenses }: ExpensesTableProps) {
  const [sort, setSort] = useState<{ field: SortField; direction: SortDirection }>({
    field: 'spent_date',
    direction: 'desc',
  });

  const sortedExpenses = useMemo(
    () => sortExpenses(expenses, sort.field, sort.direction),
    [expenses, sort]
  );

  const totalAmount = sortedExpenses.reduce((sum, expense) => sum + expense.total_cost, 0);

  const handleSort = (field: SortField) => {
    setSort(current => ({
      field,
      direction: current.field === field && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow">
        <p className="text-gray-500">No expenses found for the selected date range.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Expenses ({sortedExpenses.length})
          </h2>
          <p className="text-lg font-semibold text-gray-900">
            Total: {formatAmount(totalAmount)}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader sort={sort} onSort={handleSort} />
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedExpenses.map((expense) => (
              <ExpenseRow key={expense.id} expense={expense} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}