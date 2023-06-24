import apiClient from './client';

export const getAllCertificados = () => {
  return apiClient.get('/certificados');
};

export const postNewCertificado = (data) => {
  return apiClient.post('/certificados/nuevo-registro', data);
};

export const updateCertificado = (id, data) => {
  return apiClient.put(`/certificados/actualizar-registro/id/${id}`, data);
};

export const deleteCertificado = (id) => {
  return apiClient.delete(`/certificados/eliminar-registro/id/${id}`);
};
