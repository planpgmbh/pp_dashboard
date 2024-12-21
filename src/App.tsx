import React from 'react';
import { ExportSettingsButton } from './components/export/ExportSettingsButton';
import { ExpenseFilters } from './components/filters/ExpenseFilters';
import { ExpensesTable } from './components/ExpensesTable';
import { DateRangeSelector } from './components/DateRangeSelector';
import { getCurrentYearDateRange } from './utils/dates';
import { useState, useEffect } from 'react';
import { getExpenses } from './services/harvestApi';
import { filterExpenses } from './utils/filters';
import { HarvestExpense, ExpenseCategory, Project, Client } from './types/harvest';
import { translations } from './utils/translations';

function App() {
  const [expenses, setExpenses] = useState<HarvestExpense[]>([]);
  const [dateRange, setDateRange] = useState(getCurrentYearDateRange());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpenses(dateRange.startDate, dateRange.endDate);
      setExpenses(data);
    };
    fetchExpenses();
  }, [dateRange.startDate, dateRange.endDate]);

  const categories = Array.from(new Set(expenses.map(e => e.expense_category)))
    .filter((c): c is ExpenseCategory => c !== undefined);
  
  const projects = Array.from(new Set(expenses.map(e => e.project)))
    .filter((p): p is Project => p !== undefined);
  
  const clients = Array.from(new Set(expenses.map(e => e.client)))
    .filter((c): c is Client => c !== undefined);

  const filteredExpenses = filterExpenses(expenses, selectedCategory, selectedProject, selectedClient);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{translations['Expense Overview']}</h1>
          <ExportSettingsButton />
        </div>

        <DateRangeSelector
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onStartDateChange={(date) => setDateRange(prev => ({ ...prev, startDate: date }))}
          onEndDateChange={(date) => setDateRange(prev => ({ ...prev, endDate: date }))}
          onUpdate={() => {/* Fetch expenses */}}
        />

        <ExpenseFilters
          categories={categories}
          projects={projects}
          clients={clients}
          expenses={expenses}
          selectedCategory={selectedCategory}
          selectedProject={selectedProject}
          selectedClient={selectedClient}
          onCategoryChange={setSelectedCategory}
          onProjectChange={setSelectedProject}
          onClientChange={setSelectedClient}
        />

        <ExpensesTable expenses={filteredExpenses} />
      </div>
    </div>
  );
}

export default App;