// import { URLSearchParams } from 'url';

import { Mass, Period } from '../../models/mass/types';
import apiInstance from './axiosConfig';

const MassAPI = {
  get: async (massId: string) => {
    const response = await apiInstance.request({
      url: `mass/${massId}`,
      method: 'GET',
    });

    return response;
  },
  getWeekSchedule: async (parishId: string, date: string) => {
    const response = await apiInstance.request({
      url: `mass/week?parishId=${parishId}&date=${date}`,
      method: 'GET',
    });

    return response;
  },
  create: async (mass: Mass | null) => {
    if (!mass) return {};

    const { data } = await apiInstance.request({
      url: 'mass',
      method: 'POST',
      data: mass,
    });

    return data;
  },
  update: async (mass: Mass | null) => {
    if (!mass) return {};

    const { data } = await apiInstance.request({
      url: `mass/${mass.id}`,
      method: 'PUT',
      data: mass,
    });

    return data;
  },
  delete: async (massId: string, period: Period) => {
    const params = new URLSearchParams();
    if (period?.from) {
      params.append('from', period.from);
    }
    if (period?.to) {
      params.append('to', period.to);
    }

    const response = await apiInstance.request({
      url: `mass/${massId}?${params}`,
      method: 'DELETE',
    });

    return response;
  },
};

export default MassAPI;
