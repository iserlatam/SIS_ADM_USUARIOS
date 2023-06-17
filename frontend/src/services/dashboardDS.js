import apiClient from "./client";

export const getAllCertificados = () => {
    return apiClient.get('/certificados')
}

export const postNewCertificado = (data) => {
    return apiClient.post('/certificados/nuevo-registro', data)
}