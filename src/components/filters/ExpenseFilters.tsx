import React from 'react';
import { Filter } from 'lucide-react';
import { FilterSelect } from './FilterSelect';
import { ExpenseCategory, Project, Client, HarvestExpense } from '../../types/harvest';
import { filterProjectsByClient, filterCategoriesByFilters } from '../../utils/filterHelpers';

interface ExpenseFiltersProps {
  categories: ExpenseCategory[];
  projects: Project[];
  clients: Client[];
  expenses: HarvestExpense[];
  selectedCategory: string;
  selectedProject: string;
  selectedClient: string;
  onCategoryChange: (category: string) => void;
  onProjectChange: (project: string) => void;
  onClientChange: (client: string) => void;
}

export function ExpenseFilters({
  categories,
  projects,
  clients,
  expenses,
  selectedCategory,
  selectedProject,
  selectedClient,
  onCategoryChange,
  onProjectChange,
  onClientChange
}: ExpenseFiltersProps) {
  const filteredProjects = filterProjectsByClient(projects, expenses, selectedClient);
  const filteredCategories = filterCategoriesByFilters(
    categories,
    expenses,
    selectedClient,
    selectedProject
  );

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow">
      <Filter className="h-5 w-5 text-gray-500" />
      
      <FilterSelect
        label="Client"
        value={selectedClient}
        onChange={(value) => {
          onClientChange(value);
          onProjectChange('');
          onCategoryChange('');
        }}
        options={clients}
        placeholder="All Clients"
      />

      <FilterSelect
        label="Project"
        value={selectedProject}
        onChange={(value) => {
          onProjectChange(value);
          onCategoryChange('');
        }}
        options={filteredProjects}
        placeholder="All Projects"
        disabled={!selectedClient}
      />

      <FilterSelect
        label="Category"
        value={selectedCategory}
        onChange={onCategoryChange}
        options={filteredCategories}
        placeholder="All Categories"
        disabled={!selectedClient}
      />
    </div>
  );
}