import type { AxiosError, AxiosResponse } from 'axios';
import { baseClient } from '.';

export const workoutMethods = {
  getMyActiveWorkout: async () => {
    try {
      const res: AxiosResponse<WorkoutSession | null> =
        await baseClient.get('/workout/active');
      console.log('Fetched active workout:', res.data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return res.data;
    } catch (error) {
      console.log('Error in getMyActiveWorkout method:', error);
      const axiosError = error as AxiosError<{ error: string }>;

      console.error('Error fetching active workout:', {
        status: axiosError.response?.status,
        message: axiosError.response?.data?.error || axiosError.message,
        error,
      });

      throw new Error(axiosError.response?.data?.error || axiosError.message);
    }
  },
};
