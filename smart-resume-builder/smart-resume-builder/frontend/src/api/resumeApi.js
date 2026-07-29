import axios from 'axios';

const api = axios.create({
  baseURL: '/api/resumes',
});

export const createResume = (data) => api.post('/', data).then((r) => r.data);
export const getResumes = () => api.get('/').then((r) => r.data);
export const getResume = (id) => api.get(`/${id}`).then((r) => r.data);
export const updateResume = (id, data) => api.put(`/${id}`, data).then((r) => r.data);
export const deleteResume = (id) => api.delete(`/${id}`).then((r) => r.data);
export const getAISuggestions = (data) =>
  api.post('/suggest', data).then((r) => r.data.suggestions);
