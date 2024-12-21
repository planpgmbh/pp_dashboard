import { HarvestExpense } from '../types/harvest';

export function filterExpenses(
  expenses: HarvestExpense[],
  categoryId: string,
  projectId: string,
  clientId: string
): HarvestExpense[] {
  return expenses.filter((expense) => {
    const matchesCategory = !categoryId || expense.expense_category?.id.toString() === categoryId;
    const matchesProject = !projectId || expense.project?.id.toString() === projectId;
    const matchesClient = !clientId || expense.client?.id.toString() === clientId;
    return matchesCategory && matchesProject && matchesClient;
  });
}