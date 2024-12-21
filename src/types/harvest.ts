export interface ExpenseCategory {
  id: number;
  name: string;
  unit_price: number;
  unit_name: string;
}

export interface Project {
  id: number;
  name: string;
  code: string;
}

export interface Client {
  id: number;
  name: string;
  currency: string;
}

export interface HarvestExpense {
  id: number;
  spent_date: string;
  notes: string;
  expense_category: ExpenseCategory;
  project: Project;
  client: Client;
  total_cost: number;
  receipt?: {
    url: string;
  };
}

export type SortField = 'spent_date' | 'notes' | 'expense_category' | 'total_cost' | 'project' | 'client';
export type SortDirection = 'asc' | 'desc';