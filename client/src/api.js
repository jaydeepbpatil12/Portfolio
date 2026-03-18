import axios from 'axios';

// Vercel routes /api/* to the serverless backend on the same domain
const BASE_URL = '/api';

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
