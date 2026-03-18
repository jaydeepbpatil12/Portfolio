import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const getProfile = () => API.get('/profile');
export const getProjects = () => API.get('/projects');
export const getCertifications = () => API.get('/certifications');
export const getTraining = () => API.get('/training');
export const getAchievements = () => API.get('/achievements');

// Returns the proxied image URL — use this in img src attributes
export const getImageUrl = (fileId) => `/api/image/${fileId}`;

export default API;
