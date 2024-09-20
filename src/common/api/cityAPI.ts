import apiInstance from './axiosConfig';

const CityAPI = {
  getAll: async () => {
    const response = await apiInstance.request({
      url: 'cities',
      method: 'GET',
    });

    return response;
  },
};

export default CityAPI;
