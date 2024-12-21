import React from 'react';
import { Filter } from 'lucide-react';
import { ExpenseCategory, Project } from '../types/harvest';

interface ExpenseFiltersProps {
  categories: ExpenseCategory[];
  projects: Project[];
  selectedCategory: string;
  selectedProject: string;
  onCategoryChange: (category: string) => void;
  onProjectChange: (project: string) => void;
}

export function ExpenseFilters({
  categories,
  projects,
  selectedCategory,
  selectedProject,
  onCategoryChange,
  onProjectChange
}: ExpenseFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-3">
        <Filter className="h-5 w-5 text-gray-500" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={selectedProject}
          onChange={(e) => onProjectChange(e.target.value)}
          className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.code ? `${project.name} (${project.code})` : project.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}