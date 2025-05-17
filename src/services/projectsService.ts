import api from './api';

export interface ProjectData {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
  url?: string;
  technologies: string[];
  category: string;
  featured: boolean;
}

export const projectsService = {
  getAllProjects: async (): Promise<ProjectData[]> => {
    const response = await api.get('/projects');
    return response.data;
  },
  
  getFeaturedProjects: async (): Promise<ProjectData[]> => {
    const response = await api.get('/projects/featured');
    return response.data;
  },
  
  getProjectsByTechnology: async (technology: string): Promise<ProjectData[]> => {
    const response = await api.get(`/projects?technology=${technology}`);
    return response.data;
  },
};