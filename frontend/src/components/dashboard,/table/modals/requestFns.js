import * as dashboardDs from '../../../../services/dashboardDS';

export const postFormData = async ({ id, data }) => {
  const response = await dashboardDs.postNewCertificado(data);
  return response;
};

export const updateData = async ({ id, data }) => {
  const response = await dashboardDs.updateCertificado(id, data);
  return response;
};
