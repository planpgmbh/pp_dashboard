import { format, startOfYear, endOfDay } from 'date-fns';

export function getCurrentYearDateRange() {
  const now = new Date();
  return {
    startDate: format(startOfYear(now), 'yyyy-MM-dd'),
    endDate: format(endOfDay(now), 'yyyy-MM-dd')
  };
}