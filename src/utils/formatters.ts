/**
 * Formats a number as a currency amount
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Gets the category name from an expense category
 */
export function getCategoryName(category: ExpenseCategory | undefined): string {
  return category?.name || 'Uncategorized';
}

/**
 * Gets the project name and code from a project
 */
export function getProjectName(project: Project | undefined): string {
  if (!project) return 'No Project';
  return project.code ? `${project.name} (${project.code})` : project.name;
}

/**
 * Gets the client name and currency
 */
export function getClientName(client: Client | undefined): string {
  if (!client) return 'No Client';
  return `${client.name} (${client.currency})`;
}