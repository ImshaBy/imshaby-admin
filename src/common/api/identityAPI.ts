import apiInstance from './axiosConfig';

const { REACT_APP_FUSION_ADDRESS } = process.env;
const IdentityAPI = {
  getUser: async () => {
    const response = await apiInstance.request({
      baseURL: `${REACT_APP_FUSION_ADDRESS}/api/`,
      url: 'user',
      method: 'GET',
    });

    return response.data;
  },
};

export default IdentityAPI;
