import api from './api';

export interface ServiceData {
  _id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  details: string[];
  technologies: string[];
}

export const servicesService = {
  getAllServices: async (): Promise<ServiceData[]> => {
    const response = await api.get('/services');
    return response.data;
  },
};