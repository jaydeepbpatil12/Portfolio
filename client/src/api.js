import axios from 'axios';

// In development: Vite proxy handles /api → localhost:5000
// In production: VITE_API_URL points to the Render backend
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export const getProfile = () => API.get('/profile');
export const getProjects = () => API.get('/projects');
export const getCertifications = () => API.get('/certifications');
export const getTraining = () => API.get('/training');
export const getAchievements = () => API.get('/achievements');

// Returns the proxied image URL — use this in img src attributes
export const getImageUrl = (fileId) => `${BASE_URL}/image/${fileId}`;

export default API;
