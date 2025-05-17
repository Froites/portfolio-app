import { ReactElement } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  color?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: ReactElement;
}

export interface SocialLink {
  name: string;
  icon: ReactElement;
  url: string;
}

// tailwind.config.js - Mantendo, mas adicionando as cores do projeto
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-300': '#00B37E',
        'green-500': '#00875F',
        'gray-100': '#e1e1e6',
        'gray-300': '#c4c4cc',
        'gray-400': '#8d8d99',
        'gray-600': '#323238',
        'gray-700': '#29292e',
        'gray-800': '#202024',
        'gray-900': '#121214',
        'red-500': '#F75A68',
      },
    },
  },
  plugins: [],
}