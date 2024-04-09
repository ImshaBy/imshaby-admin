import apiInstance from './axiosConfig';

const { VITE_FUSION_ADDRESS } = import.meta.env;
const IdentityAPI = {
  getUser: async () => {
    const response = await apiInstance.request({
      baseURL: `${VITE_FUSION_ADDRESS}/api/`,
      url: 'user',
      method: 'GET',
    });

    return response.data;
  },
};

export default IdentityAPI;
