import axios from 'axios';
import { convertMonthYear, removerAcentos } from '../helper/stringUtils';

const API_URL = 'http://localhost:3001/api/transaction';

export const getPeriod = async (period) => {
  const response = await axios.get(`${API_URL}?period=${period}`);
  const transactions = response.data
    .map((transaction) => {
      return {
        ...transaction,
        descriptionLowerCase: removerAcentos(
          transaction.description.toLowerCase()
        ),
      };
    })
    .sort((a, b) => parseInt(a.day, 10) - parseInt(b.day, 10));
  return transactions;
};

export const getMonthYearList = async () => {
  const response = await axios.get(`${API_URL}/year_month`);
  const list = response.data.map((monthYear) => {
    return {
      value: monthYear,
      label: convertMonthYear(monthYear),
    };
  });
  return list;
};

export const insertTransaction = async (transaction) => {
  const response = await axios.post(API_URL, transaction);
  return response.data;
};

export const updateTransaction = async (id, transaction) => {
  const response = await axios.patch(`${API_URL}/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
