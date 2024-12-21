import { HarvestExpense, SortField, SortDirection } from '../types/harvest';

export function sortExpenses(
  expenses: HarvestExpense[],
  field: SortField,
  direction: SortDirection
): HarvestExpense[] {
  return [...expenses].sort((a, b) => {
    let compareResult = 0;

    switch (field) {
      case 'spent_date':
        compareResult = new Date(a.spent_date).getTime() - new Date(b.spent_date).getTime();
        break;
      case 'notes':
        compareResult = (a.notes || '').localeCompare(b.notes || '');
        break;
      case 'expense_category':
        compareResult = (a.expense_category?.name || '').localeCompare(b.expense_category?.name || '');
        break;
      case 'project':
        compareResult = (a.project?.name || '').localeCompare(b.project?.name || '');
        break;
      case 'total_cost':
        compareResult = a.total_cost - b.total_cost;
        break;
    }

    return direction === 'asc' ? compareResult : -compareResult;
  });
}