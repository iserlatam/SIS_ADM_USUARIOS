import apiClient from "./client";

export const getAllCertificados = () => {
    return apiClient.get('/certificados')
}