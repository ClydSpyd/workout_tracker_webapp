import { create } from 'zustand';
import workoutSessionSkeleton, {
  dummyWorkoutData,
} from '../assets/dummy_data/workout';

interface WorkoutStore {
  currentWorkout: WorkoutSession;
  setCurrentWorkout: (workout: WorkoutSession) => void;
  updateCurrentWorkout: (updatedWorkout: Partial<WorkoutSession>) => void;
  toggleSetCompletion: (exerciseIndex: number, setIndex: number) => void;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  currentWorkout: dummyWorkoutData,
  setCurrentWorkout: (workout) => set({ currentWorkout: workout }),

  updateCurrentWorkout: (updatedWorkout: Partial<WorkoutSession>) => {
    const current = get().currentWorkout;
    if (current) {
      set({ currentWorkout: { ...current, ...updatedWorkout } });
    }
  },

  toggleSetCompletion: (exerciseIndex: number, setIndex: number) => {
    const current = get().currentWorkout;
    if (current) {
      const updatedExercises = [...current.exercises];
      const targetSet = updatedExercises[exerciseIndex].sets[setIndex];
      if (targetSet) {
        targetSet.completed = !targetSet.completed;
        set({
          currentWorkout: {
            ...current,
            exercises: updatedExercises,
          },
        });
      }
    }
  },
}));
