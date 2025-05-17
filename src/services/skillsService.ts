import api from './api';

export interface SkillData {
  _id: string;
  name: string;
  icon: string;
  level: number;
  color: string;
  category: string;
  connections: string[];
}

export const skillsService = {
  getAllSkills: async (): Promise<SkillData[]> => {
    const response = await api.get('/skills');
    return response.data;
  },
  
  getSkillsByCategory: async (category: string): Promise<SkillData[]> => {
    const response = await api.get(`/skills?category=${category}`);
    return response.data;
  },
};