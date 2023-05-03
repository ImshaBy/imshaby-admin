import Qs from 'qs';

import { Filters, Parish } from '../../models/parish/types';
import apiInstance from './axiosConfig';

const ParishAPI = {
  get: async (parishId: string) => {
    const response = await apiInstance.request({
      url: `parish/${parishId}`,
      method: 'GET',
    });

    return response;
  },
  getAll: async (filters: Filters) => {
    const LIMIT = 100;
    const params = {
      filter: Object.entries(filters).map(([key, value]) => new Array<string | undefined>().concat(value).map((data) => `${key}==${data}`)),
      limit: LIMIT,
    };
    const response = await apiInstance.request({
      url: 'parish/',
      method: 'GET',
      params,
      paramsSerializer(query) {
        return Qs.stringify(query, { indices: false });
        // 'a=b&a=c&a=d'
      },
      data: {}, // bugfix: https://github.com/axios/axios/issues/86#issuecomment-405930811
    });

    return response;
  },
  update: async (parishId: string, parish: Parish | Object) => {
    const response = await apiInstance.request({
      url: `parish/${parishId}`,
      method: 'PUT',
      data: parish,
    });

    return response;
  },
};

export default ParishAPI;
