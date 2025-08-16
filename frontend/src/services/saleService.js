import api from '../api/axios';

export const getSales = async () => {
  const { data } = await api.get('/sales');
  return data;
};

export const createSale = async (payload) => {
  const { data } = await api.post('/sales', payload);
  return data;
};