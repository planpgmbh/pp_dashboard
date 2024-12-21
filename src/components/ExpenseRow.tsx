import React from 'react';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import { HarvestExpense } from '../types/harvest';
import { formatAmount, getCategoryName, getProjectName } from '../utils/formatters';

interface ExpenseRowProps {
  expense: HarvestExpense;
}

export function ExpenseRow({ expense }: ExpenseRowProps) {
  const hasReceipt = Boolean(expense.receipt?.url);

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {format(new Date(expense.spent_date), 'MMM d, yyyy')}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {expense.notes || '-'}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {getCategoryName(expense.expense_category)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {getProjectName(expense.project)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatAmount(expense.total_cost)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {hasReceipt ? (
          <a
            href={expense.receipt!.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </a>
        ) : (
          <span className="text-gray-400">No receipt</span>
        )}
      </td>
    </tr>
  );
}