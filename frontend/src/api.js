import axios from 'axios';

const API_URL = 'https://66bbaf0e6a4ab5edd63920a3.mockapi.io/Inventario';

export const fetchItems = () => axios.get(API_URL);
export const createItem = (item) => axios.post(API_URL, item);
export const updateItem = (id, item) => axios.put(`${API_URL}/${id}`, item);
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`);
