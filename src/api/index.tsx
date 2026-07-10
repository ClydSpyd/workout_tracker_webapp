import axios from 'axios';
import { workoutMethods } from './workouts';

export const baseClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // withCredentials: true,
});

baseClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export const API = {
  workout: workoutMethods,
};
