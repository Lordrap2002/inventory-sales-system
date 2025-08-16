import api from '../api/axios';

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const createProduct = async (dto) => {
  const { data } = await api.post('/products', dto);
  return data;
};

export const updateProduct = async (id, dto) => {
  const { data } = await api.put(`/products/${id}`, dto);
  return data;
};

export const deleteProduct = async (id) => {
  const { status } = await api.delete(`/products/${id}`);
  return status;
};
