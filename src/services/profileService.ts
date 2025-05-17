import api from './api';

export interface ProfileData {
  name: string;
  role: string;
  avatarUrl: string;
  coverUrl: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    other?: string[];
  };
}

export const profileService = {
  getProfile: async (): Promise<ProfileData> => {
    const response = await api.get('/profile');
    return response.data;
  },
};