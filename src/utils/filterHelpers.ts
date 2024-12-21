import { ExpenseCategory, Project, HarvestExpense } from '../types/harvest';

export function filterProjectsByClient(
  projects: Project[],
  expenses: HarvestExpense[],
  selectedClient: string
): Project[] {
  if (!selectedClient) return projects;
  
  return projects.filter(project => 
    expenses.some(expense => 
      expense.project.id === project.id && 
      expense.client.id.toString() === selectedClient
    )
  );
}

export function filterCategoriesByFilters(
  categories: ExpenseCategory[],
  expenses: HarvestExpense[],
  selectedClient: string,
  selectedProject: string
): ExpenseCategory[] {
  return categories.filter(category => 
    expenses.some(expense => {
      const matchesClient = !selectedClient || expense.client.id.toString() === selectedClient;
      const matchesProject = !selectedProject || expense.project.id.toString() === selectedProject;
      return matchesClient && matchesProject && expense.expense_category.id === category.id;
    })
  );
}