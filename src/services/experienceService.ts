import api from './api';

export interface ExperienceData {
  _id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string[];
  achievements: string[];
  technologies: string[];
}

export const experienceService = {
  getAllExperience: async (): Promise<ExperienceData[]> => {
    const response = await api.get('/experience');
    return response.data;
  },
};