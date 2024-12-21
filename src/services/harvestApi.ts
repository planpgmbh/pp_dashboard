import axios from 'axios';
import { HarvestExpense } from '../types/harvest';

const harvestApi = axios.create({
  baseURL: 'https://api.harvestapp.com/api/v2',
  headers: {
    'Harvest-Account-ID': '548269',
    'Authorization': 'Bearer 866297.pt.0xf5lxdZqcVtanM5k3quwQYYXCIGxXIZ5lpj9oTgGSQ4IobUWmgrZt2Cz1meZk8XNVeGcL4Fwdl2MMnZgZewBA',
    'User-Agent': 'Harvest API Example',
  },
});

export const getExpenses = async (from: string, to: string) => {
  const response = await harvestApi.get<{ expenses: HarvestExpense[] }>('/expenses', {
    params: { from, to },
  });
  return response.data.expenses;
};